#!/usr/bin/env node
/* ═══════════════════════════════════════
   새 활동 추가 스크립트  ◀ 활동 하나를 content/ 세 파일에 규칙대로 넣습니다

   실행:  node tools/add-activity.mjs 활동.spec.json            (실제로 넣음)
          node tools/add-activity.mjs 활동.spec.json --dry-run   (넣지 않고 계획만 출력)
   입력:  tools/templates/activity.spec.json 을 복사해 채운 JSON (본문 블록은 tools/templates/BLOCKS.md)

   하는 일
     1. 입력을 검사한다 (id 중복 · 구분 · 날짜 · 사진 파일 · 개인정보 확인 · 한/영 모두 있음)
     2. content/common.js  activities 에 start 가 늦은 순서 자리로 한 줄, photos 맨 위에 사진 등록
        content/ko.js · en.js  activities 맨 위에 항목 삽입
     3. index.html 의 ?v= 세 곳을 새 값으로 올린다
     4. node tools/check-content.mjs --id <활동id> 를 실행한다. 오류가 나면 모든 파일을 원래대로 되돌린다
   content 파일을 사람이 열어 볼 필요가 없습니다. 설치할 것 없음 (Node.js 18 이상).
   ═══════════════════════════════════════ */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import {spawnSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);
const DRY = argv.includes("--dry-run"), ALLOW_WARN = argv.includes("--allow-warnings");
const specPath = argv.find((a) => !a.startsWith("--"));
if (!specPath) { console.error("사용법: node tools/add-activity.mjs 활동.spec.json [--dry-run]"); process.exit(2); }

const errors = [], notes = [];
const fail = (m) => errors.push(m);
const rd = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");

/* ---------- 입력 읽기 ---------- */
let spec;
try { spec = JSON.parse(fs.readFileSync(path.resolve(specPath), "utf8")); }
catch (e) { console.error("입력 JSON 을 읽지 못했습니다: " + e.message); process.exit(2); }

/* ---------- 현재 content 읽기 (중복 · 구분 확인용) ---------- */
function load(files) {
  const ctx = {window: {}}; ctx.window.SITE = {}; ctx.SITE = ctx.window.SITE; vm.createContext(ctx);
  for (const [name, text] of Object.entries(files)) vm.runInContext(text, ctx, {filename: name});
  return ctx.SITE;
}
const FILES = ["content/common.js", "content/ko.js", "content/en.js"];
const orig = Object.fromEntries(FILES.map((f) => [f, rd(f)]));
let before;
try { before = load(orig); } catch (e) { console.error("현재 content 가 이미 문법 오류입니다: " + e.message); process.exit(2); }
const C = before.common;

/* ---------- 입력 검사 ---------- */
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const validDate = (s) => DATE.test(s) && !Number.isNaN(Date.parse(s));
const id = spec.id;
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id || "")) fail(`id: 영문 소문자 · 숫자 · 하이픈만 (지금 "${id}")`);
else if (C.activities.some((a) => a.id === id)) fail(`id: "${id}" 는 이미 있습니다`);
if (!Object.keys(C.categories || {}).includes(spec.category)) fail(`category: ${Object.keys(C.categories).join(" / ")} 중 하나 (지금 "${spec.category}")`);
if (!validDate(spec.start)) fail(`start: YYYY-MM-DD 형식 (지금 "${spec.start}")`);
if (spec.end != null && spec.end !== "") { if (!validDate(spec.end)) fail(`end: YYYY-MM-DD 형식`); else if (spec.end < spec.start) fail("end 가 start 보다 이릅니다"); }
if (spec.video && !/^https:\/\//.test(spec.video)) fail("video: https:// 로 시작하는 YouTube 주소");
if (spec.deck || (spec.ko && spec.ko.deck) || (spec.en && spec.en.deck)) fail("발표자료(deck)는 이 스크립트가 아직 지원하지 않습니다 (세션에서 따로 추가)");
for (const lg of ["ko", "en"]) {
  const t = spec[lg];
  if (!t || typeof t !== "object") { fail(`${lg}: 한국어와 영어를 모두 적습니다 (영어가 없으면 영어 화면이 빕니다)`); continue; }
  if (!t.title) fail(`${lg}.title 이 없습니다`);
  if (!t.summary) fail(`${lg}.summary 가 없습니다`);
  const hasRole = (t.panel && t.panel.role) || (t.proj && Array.isArray(t.proj.role) && t.proj.role.length);
  if (!hasRole) fail(`${lg}.panel.role (프로젝트면 proj.role) 이 없습니다 (내가 맡은 일)`);
  if (!Array.isArray(t.body) || !t.body.length) fail(`${lg}.body 에 본문 블록이 1개 이상 필요합니다`);
}
const photos = spec.photos || null;
if (photos) {
  const names = [photos.cover, ...(photos.shots || [])].filter(Boolean);
  for (const n of names) if (!fs.existsSync(path.join(ROOT, "img", n + ".webp"))) fail(`사진 img/${n}.webp 가 없습니다 (tools/prep-photo.py 로 먼저 만들 것)`);
  if (names.length && spec.privacy_checked !== true) fail("사진이 있으면 privacy_checked: true 가 필요합니다 (다른 사람의 얼굴 · 이름 · 주소 · 번호가 없는지 확인한 뒤)");
  if (photos.video) {
    if (!photos.video.src || !fs.existsSync(path.join(ROOT, photos.video.src))) fail("photos.video.src 파일이 없습니다");
  }
}
if (errors.length) { console.error("입력 오류 (아무것도 바꾸지 않았습니다):\n" + errors.map((m) => "  · " + m).join("\n")); process.exit(1); }

/* ---------- 직렬화 ---------- */
const q = (s) => JSON.stringify(s);
function commonActivity() {
  const lines = [`      id: ${q(id)}`, `      start: ${q(spec.start)}`];
  if (spec.end) lines.push(`      end: ${q(spec.end)}`);
  lines.push(`      category: ${q(spec.category)}`);
  if (spec.notion) lines.push(`      notion: ${q(spec.notion)}`);
  if (spec.video) lines.push(`      video: ${q(spec.video)}`);
  return "    {\n" + lines.join(",\n") + "\n    },\n";
}
function commonPhotos() {
  if (!photos) return null;
  const parts = [];
  if (photos.cover) parts.push(`cover:${q(photos.cover)}`);
  if (photos.shots && photos.shots.length) parts.push(`shots:[${photos.shots.map(q).join(", ")}]`);
  if (photos.video) parts.push(`video:{src:${q(photos.video.src)}, poster:${q(photos.video.poster)}}`);
  if (!parts.length) return null;
  return `    ${q(id)}: {${parts.join(", ")}},\n`;
}
const ACT_ORDER = ["title", "org", "summary", "short", "card", "panel", "proj", "vid", "photosTitle", "body"];
function langEntry(t) {
  const keys = ACT_ORDER.filter((k) => t[k] != null);
  const unknown = Object.keys(t).filter((k) => !ACT_ORDER.includes(k));
  if (unknown.length) fail(`알 수 없는 항목: ${unknown.join(", ")}`);
  const out = [`    ${q(id)}: {`];
  keys.forEach((k, i) => {
    const comma = i < keys.length - 1 ? "," : "";
    if (k === "body") {
      out.push(`      "body": [`);
      t.body.forEach((b, j) => out.push(`        ${JSON.stringify(b)}${j < t.body.length - 1 ? "," : ""}`));
      out.push(`      ]${comma}`);
    } else out.push(`      ${q(k)}: ${JSON.stringify(t[k])}${comma}`);
  });
  out.push("    },");
  return out.join("\n") + "\n";
}

/* ---------- 텍스트 삽입 ---------- */
// activities: [ ... ] 안의 최상위 항목 {…} 들의 위치 (문자열 · 주석을 건너뛰며 중괄호를 센다)
function topEntries(text, openIdx) {
  const entries = []; let depth = 0, start = -1, i = openIdx + 1;
  while (i < text.length) {
    const ch = text[i], nx = text[i + 1];
    if (ch === "/" && nx === "/") { i = text.indexOf("\n", i); if (i < 0) break; continue; }
    if (ch === "/" && nx === "*") { i = text.indexOf("*/", i) + 2; continue; }
    if (ch === '"' || ch === "'" || ch === "`") {
      const qch = ch; i++;
      while (i < text.length && text[i] !== qch) { if (text[i] === "\\") i++; i++; }
      i++; continue;
    }
    if (ch === "{" ) { if (depth === 0) start = i; depth++; }
    else if (ch === "}") { depth--; if (depth === 0) entries.push({start, end: i + 1}); }
    else if (ch === "]" && depth === 0) break;
    i++;
  }
  return entries;
}
function insertCommonActivity(text) {
  const open = text.indexOf("activities: [");
  if (open < 0 || text.indexOf("activities: [", open + 1) >= 0) throw new Error("common.js 의 'activities: [' 자리를 하나로 찾지 못했습니다");
  const ents = topEntries(text, open + "activities: ".length);
  const startOf = (e) => (text.slice(e.start, e.end).match(/start:\s*"(\d{4}-\d{2}-\d{2})"/) || [])[1];
  const target = ents.find((e) => (startOf(e) || "") < spec.start);   // start 가 더 이른 첫 항목 바로 위
  const newEntry = commonActivity();
  if (target) {
    const lineStart = text.lastIndexOf("\n", target.start) + 1;
    return {text: text.slice(0, lineStart) + newEntry + text.slice(lineStart), where: `${ents.indexOf(target) + 1}번째 자리 (start ${startOf(target)} 인 활동 바로 위)`};
  }
  const last = ents[ents.length - 1];
  return {text: text.slice(0, last.end) + ",\n" + newEntry.replace(/,\n$/, "") + text.slice(last.end), where: "맨 끝"};
}
function insertAfterLine(text, line, block, label) {
  const re = new RegExp("^" + line.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "$", "gm");
  const m = [...text.matchAll(re)];
  if (m.length !== 1) throw new Error(`${label}: '${line.trim()}' 줄을 하나로 찾지 못했습니다 (${m.length}개)`);
  const at = m[0].index + m[0][0].length + 1;
  return text.slice(0, at) + block + text.slice(at);
}

let next = {...orig}, where;
try {
  ({text: next["content/common.js"], where} = insertCommonActivity(next["content/common.js"]));
  const ph = commonPhotos();
  if (ph) next["content/common.js"] = insertAfterLine(next["content/common.js"], "  photos: {", ph, "common.js photos");
  for (const lg of ["ko", "en"]) {
    const f = `content/${lg}.js`;
    next[f] = insertAfterLine(next[f], "  activities: {", langEntry(spec[lg]), f);
  }
} catch (e) { fail(e.message); }
if (errors.length) { console.error("삽입 오류 (아무것도 바꾸지 않았습니다):\n" + errors.map((m) => "  · " + m).join("\n")); process.exit(1); }

/* ---------- 다시 읽어 확인 (파일을 쓰기 전에) ---------- */
let after;
try { after = load(next); } catch (e) { console.error("삽입 후 문법 오류: " + e.message + "\n(아무것도 바꾸지 않았습니다)"); process.exit(1); }
const placed = after.common.activities.find((a) => a.id === id);
const sameJson = (a, b) => JSON.stringify(a) === JSON.stringify(b);
if (!placed || placed.start !== spec.start || placed.category !== spec.category) { console.error("삽입 확인 실패: common.js 의 항목이 입력과 다릅니다"); process.exit(1); }
for (const lg of ["ko", "en"]) {
  const got = (after[lg].activities || {})[id];
  if (!got || !sameJson(got, spec[lg])) { console.error(`삽입 확인 실패: ${lg}.js 의 항목이 입력과 다릅니다`); process.exit(1); }
}
const order = after.common.activities.map((a) => a.start);
if (order.some((s, i) => i && order[i - 1] < s)) notes.push("주의: activities 의 start 순서가 늦은 것부터가 아닙니다 (기존 순서 문제일 수 있음)");

const summary = [
  `[add-activity] ${id} · ${spec.category} · ${spec.start}${spec.end ? " ~ " + spec.end : ""}`,
  `  common.js : activities ${where}${photos ? " · photos 등록" : ""}${spec.video ? " · video 주소" : ""}`,
  `  ko.js / en.js : 본문 블록 ${spec.ko.body.length}개 / ${spec.en.body.length}개`,
];
if (DRY) { console.log(summary.join("\n") + "\n  (--dry-run: 파일을 쓰지 않았습니다)"); notes.forEach((n) => console.log("  " + n)); process.exit(0); }

/* ---------- 쓰기 · 버전 · 검증 (실패하면 되돌림) ---------- */
// 이미 있던 오류(다른 활동의 문제)는 이번 추가를 막지 않는다. 쓰기 전에 오류 목록을 기억해 두고, 새로 생긴 오류만 본다
const sectionLines = (out, label) => { let sec = "", r = []; for (const l of out.split("\n")) { const m = l.match(/^(ERROR|WARN|INFO) \(/); if (m) sec = m[1]; else if (sec === label && l.startsWith("  · ")) r.push(l); } return r; };
const baseErrors = new Set(sectionLines(spawnSync(process.execPath, [path.join(ROOT, "tools/check-content.mjs"), "--quiet"], {encoding: "utf8"}).stdout, "ERROR"));
const indexOrig = rd("index.html");
const stamp = String(Math.floor(Date.now() / 1000));
const indexNext = indexOrig.replace(/(content\/(?:common|ko|en)\.js\?v=)[0-9A-Za-z-]+/g, "$1" + stamp);
const restore = () => { for (const f of FILES) fs.writeFileSync(path.join(ROOT, f), orig[f]); fs.writeFileSync(path.join(ROOT, "index.html"), indexOrig); };
for (const f of FILES) fs.writeFileSync(path.join(ROOT, f), next[f]);
fs.writeFileSync(path.join(ROOT, "index.html"), indexNext);
const chk = spawnSync(process.execPath, [path.join(ROOT, "tools/check-content.mjs"), "--id", id], {encoding: "utf8"});
const lines = chk.stdout.split("\n").filter((l) => l.trim());
console.log(summary.join("\n"));
console.log("  index.html : ?v=" + stamp);
const newErrors = sectionLines(chk.stdout, "ERROR").filter((l) => !baseErrors.has(l));
const warns = sectionLines(chk.stdout, "WARN").length;
if (newErrors.length || (warns && !ALLOW_WARN)) {
  restore();
  console.log(newErrors.length ? "  새 검증 오류가 있어 모든 파일을 원래대로 되돌렸습니다:" : "  새 활동에 경고가 있어 모든 파일을 원래대로 되돌렸습니다 (새 활동의 경고는 0건이어야 합니다. 내용을 고쳐 다시 실행. 그대로 넣으려면 --allow-warnings):");
  lines.forEach((l) => console.log("    " + l));
  process.exit(1);
}
if (baseErrors.size) notes.push(`참고: 이번 추가와 무관한 기존 오류 ${baseErrors.size}건이 있습니다 (그대로 둠)`);
console.log("  검증 (--id " + id + "):");
lines.forEach((l) => console.log("    " + l));
notes.forEach((n) => console.log("  " + n));
