#!/usr/bin/env node
/* 사이드 프로젝트 통계 (docs/SIDE_PROJECTS.md 5장)
   사용: node tools/side-stats.mjs [owner=kidariseok] [from=2026-09-01]
   - 커밋: gh CLI 로 owner 의 모든 저장소 기본 브랜치 커밋을 날짜(KST)별로 셈. AI 에이전트 커밋 포함.
   - AI 작업 시간: ~/.claude/projects · ~/.codex/sessions 의 jsonl 타임스탬프만 읽고, 15분 넘게 멈춘 구간을 뺌. 이번 달 '작업한 날' 평균.
   - 출력: common.js 의 side.stats 에 그대로 붙일 JSON. 대화 내용은 읽거나 저장하지 않는다(타임스탬프만). */
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const [owner = 'kidariseok', from = '2026-09-01'] = process.argv.slice(2)
const KST = 9 * 3600e3
const day = (ms) => new Date(ms + KST).toISOString().slice(0, 10)
const gh = (...a) => execFileSync('gh', a, { encoding: 'utf8', maxBuffer: 64 << 20 })

const repos = gh('repo', 'list', owner, '--limit', '200', '--json', 'name', '--jq', '.[].name').split('\n').filter(Boolean)
const perDay = {}
let used = 0
for (const r of repos) {
  let out = ''
  try { out = gh('api', `repos/${owner}/${r}/commits?since=${from}T00:00:00Z&per_page=100`, '--paginate', '--jq', '.[].commit.author.date') } catch { continue }
  const ds = out.split('\n').filter(Boolean)
  if (ds.length) used++
  for (const d of ds) { const k = day(Date.parse(d)); perDay[k] = (perDay[k] || 0) + 1 }
}
const today = day(Date.now())
const daily = []
for (let t = Date.parse(from + 'T00:00:00+09:00'); day(t) <= today; t += 86400e3) daily.push(perDay[day(t)] || 0)
const first = Object.keys(perDay).sort()[0]

// AI 작업 시간 (이번 달)
const month = today.slice(0, 7)
const files = []
const walk = (dir) => { try { for (const e of fs.readdirSync(dir, { withFileTypes: true })) { const p = path.join(dir, e.name); if (e.isDirectory()) walk(p); else if (e.name.endsWith('.jsonl')) files.push(p) } } catch {} }
walk(path.join(os.homedir(), '.claude/projects')); walk(path.join(os.homedir(), '.codex/sessions'))
const ts = []
const monthStart = Date.parse(month + '-01T00:00:00+09:00')
for (const f of files) {
  if (fs.statSync(f).mtimeMs < monthStart) continue
  for (const line of fs.readFileSync(f, 'utf8').split('\n')) {
    const m = line.slice(0, 400).match(/"timestamp"\s*:\s*"([^"]+)"/)
    if (!m) continue
    const t = Date.parse(m[1])
    if (t >= monthStart) ts.push(t)
  }
}
ts.sort((a, b) => a - b)
const hours = {}
for (let i = 1; i < ts.length; i++) { const g = ts[i] - ts[i - 1]; if (g <= 15 * 60e3) { const k = day(ts[i - 1]); hours[k] = (hours[k] || 0) + g / 3600e3 } }
const work = Object.values(hours).filter((h) => h > 0.25)
const avg = work.length ? Math.round((work.reduce((a, b) => a + b, 0) / work.length) * 10) / 10 : 0

const commits = daily.reduce((a, b) => a + b, 0)
const span = first ? Math.round((Date.parse(today) - Date.parse(first)) / 86400e3) + 1 : 0
console.log(JSON.stringify({ updated: today, from: first, span, commits, repos: used, days: daily.filter(Boolean).length, avgHours: avg, avgMonth: month, dailyFrom: from, daily }))
