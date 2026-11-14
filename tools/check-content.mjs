#!/usr/bin/env node
/* ══════════════════════════════════════════════════════════════
   콘텐츠 검증 스크립트  ◀ 활동을 추가 · 수정한 뒤, 커밋하기 전에 실행
   ──────────────────────────────────────────────────────────────
   실행:  node tools/check-content.mjs           (오류 + 경고)
          node tools/check-content.mjs --id 활동id (그 활동의 경고만. 오류는 전부)
          node tools/check-content.mjs --strict  (경고도 실패로 처리)
          node tools/check-content.mjs --quiet   (오류만)

   content/common.js · ko.js · en.js 와 img/ · video/ 폴더가
   docs/CONTENT_GUIDELINES.md 의 스키마와 맞는지 확인합니다.
   · ERROR  : 화면이 깨지거나 내용이 빠지는 문제. 반드시 고칩니다 (종료 코드 1).
   · WARN   : 규정에서 벗어난 부분. 새로 추가한 활동에서는 0건이어야 합니다.
              (기존 활동의 알려진 경고는 docs/PORTFOLIO_AUDIT.md 에 정리되어 있습니다)
   · INFO   : 참고 사항.

   설치할 것이 없습니다 (Node.js 18 이상, 외부 패키지 없음).
   사이트 동작에는 관여하지 않는 개발용 도구입니다.
   ══════════════════════════════════════════════════════════════ */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import {fileURLToPath} from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = new Set(process.argv.slice(2));
const STRICT = args.has("--strict"), QUIET = args.has("--quiet");
// --id <활동id>: 그 활동에 대한 경고 · 참고만 보여 줍니다 (오류는 항상 전부). 다른 활동의 알려진 경고를 가립니다
const idArg = process.argv.indexOf("--id");
const ONLY_ID = idArg > 0 ? process.argv[idArg + 1] : null;

/* ---------- 규정 값 (docs/CONTENT_GUIDELINES.md 와 같은 숫자) ---------- */
const LIMITS = {
  summary: {ko: 110, en: 260},   // 상세 페이지 제목 아래 요약(lede)
  short:   {ko: 70,  en: 120},   // 목록용 한 줄
  cardRole:   {ko: 45, en: 90},  // 대표 활동 카드 MY ROLE
  cardResult: {ko: 60, en: 130}, // 대표 활동 카드 RESULT
  cardWhat: {ko: 60, en: 130},   // 대표 활동 카드의 목적 한 문장
  glance: {ko: 110, en: 230},    // 핵심 요약 한 칸
  key: {ko: 10, en: 16},         // 요약 패널의 큰 숫자
  toc: {ko: 16, en: 24},         // 목차 이름
  shotsMax: 8                    // 사진 줄에 넣는 사진 수
};
// index.html 의 renderDetail 이 그릴 수 있는 본문 블록 (여기에 없는 키는 화면에 나오지 않습니다)
const BLOCKS = ["h", "p", "lead", "q", "facts", "stat", "flow", "boxes", "cards", "cmp", "people", "roles", "h3", "checks", "ul", "note", "cert", "files", "link"];
const BLOCK_EXTRA = {h: ["k", "toc", "fold"], link: ["href"], people: ["note"]};
const PANEL_KEYS = ["role", "roleLabel", "team", "scale", "scaleLabel", "budget", "period", "where", "result", "resultLabel", "key", "links"];
const PROJ_KEYS = ["name", "type", "what", "role", "roleLabel", "tools", "team", "period", "date", "result", "resultLabel", "key", "stack", "links"];
// 핵심 요약: 문제(problem) 또는 목적(goal) · 핵심 판단(decision) · 결과(result, resultLabel, key) · 측정 범위나 한계(note)
const GLANCE_KEYS = ["problem", "goal", "decision", "decisionLabel", "result", "resultLabel", "key", "note"];
const CARD_KEYS = ["what", "role", "roleLabel", "result", "resultLabel"];
const ACT_KEYS = ["title", "org", "summary", "short", "card", "panel", "proj", "glance", "vid", "deck", "photosTitle", "body"];
const COMMON_ACT_KEYS = ["id", "start", "end", "dates", "noDate", "category", "notion", "video"];

/* ---------- 파일 읽기 ---------- */
const ctx = {window: {}};
ctx.window.SITE = {};
ctx.SITE = ctx.window.SITE;
vm.createContext(ctx);
const out = {error: [], warn: [], info: []};
const E = (m) => out.error.push(m), W = (m) => out.warn.push(m), I = (m) => out.info.push(m);

for (const f of ["common", "ko", "en"]) {
  try {
    vm.runInContext(fs.readFileSync(path.join(ROOT, "content", f + ".js"), "utf8"), ctx, {filename: "content/" + f + ".js"});
  } catch (err) {
    E(`content/${f}.js 를 읽지 못했습니다 (문법 오류): ${err.message}`);
  }
}
const C = ctx.SITE.common, KO = ctx.SITE.ko, EN = ctx.SITE.en;
if (!C || !KO || !EN) { report(); process.exit(1); }
const LANGS = {ko: KO, en: EN};
const exists = (rel) => fs.existsSync(path.join(ROOT, rel));
const img = (name) => `img/${name}.webp`;
const pad2 = (n) => (n < 10 ? "0" : "") + n;
const isTbd = (t) => /^\[(확인 필요|To confirm)/.test(String(t));
const typeOf = (b) => BLOCKS.find((k) => b[k] != null) || null;

/* ---------- 1. activities: id · 날짜 · 구분 ---------- */
const ids = C.activities.map((a) => a.id);
const cats = Object.keys(C.categories);
const seen = new Set();
C.activities.forEach((a, i) => {
  const at = `common.js activities[${a.id || i}]`;
  if (!a.id) return E(`${at}: id 가 없습니다`);
  if (seen.has(a.id)) E(`${at}: id 가 중복됩니다`);
  seen.add(a.id);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(a.id)) E(`${at}: id 는 영문 소문자 · 숫자 · 하이픈만 씁니다 (주소 #a/${a.id} 로 쓰임)`);
  Object.keys(a).forEach((k) => { if (!COMMON_ACT_KEYS.includes(k)) W(`${at}: 알 수 없는 키 "${k}" (화면에 쓰이지 않습니다)`); });
  const dateRe = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRe.test(a.start || "")) E(`${at}: start 는 "YYYY-MM-DD" 형식이어야 합니다`);
  if (a.end && !dateRe.test(a.end)) E(`${at}: end 는 "YYYY-MM-DD" 형식이어야 합니다`);
  if (a.end && a.end < a.start) E(`${at}: end 가 start 보다 빠릅니다`);
  (a.dates || []).forEach((d) => { if (!dateRe.test(d)) E(`${at}: dates 의 "${d}" 는 "YYYY-MM-DD" 형식이어야 합니다`); });
  if (!cats.includes(a.category)) E(`${at}: category "${a.category}" 는 ${cats.join(" / ")} 중 하나여야 합니다`);
  if (a.video && !/^https:\/\//.test(a.video)) E(`${at}: video 는 https:// 로 시작하는 외부 영상 주소입니다 (직접 올린 mp4 는 photos[id].video)`);
  if (i > 0 && C.activities[i - 1].start < a.start) W(`${at}: activities 는 start 가 늦은 것부터 적습니다 (바로 위 항목보다 날짜가 늦음). 순서가 '이전/다음 활동' 링크 순서가 됩니다`);
});
for (const [lg, L] of Object.entries(LANGS)) {
  Object.keys(L.activities).forEach((id) => { if (!ids.includes(id)) E(`${lg}.js activities["${id}"]: common.js 의 activities 에 같은 id 가 없습니다`); });
  cats.forEach((c) => { if (!L.categories[c]) E(`${lg}.js categories.${c}: 구분 이름이 없습니다`); });
}

/* ---------- 2. 활동별 글자 (ko · en) ---------- */
const projects = C.projects || [], featured = C.featured || [], reps = C.archiveReps || [];
for (const a of C.activities) {
  const k = KO.activities[a.id], e = EN.activities[a.id];
  if (!k) { E(`ko.js activities["${a.id}"]: 항목이 없습니다`); continue; }
  if (!e) { E(`en.js activities["${a.id}"]: 항목이 없습니다 (영어 화면에서 제목이 id 로 보입니다)`); }
  for (const [lg, t] of [["ko", k], ["en", e]]) {
    if (!t) continue;
    const at = `${lg}.js ${a.id}`;
    Object.keys(t).forEach((key) => { if (!ACT_KEYS.includes(key)) W(`${at}: 알 수 없는 키 "${key}" (화면에 쓰이지 않습니다)`); });
    if (!t.title) E(`${at}: title 이 없습니다`);
    if (!t.summary) E(`${at}: summary 가 없습니다`);
    else if (t.summary.length > LIMITS.summary[lg]) W(`${at}: summary ${t.summary.length}자 (권장 ${LIMITS.summary[lg]}자 이하)`);
    if (t.short && t.short.length > LIMITS.short[lg]) W(`${at}: short ${t.short.length}자 (권장 ${LIMITS.short[lg]}자 이하)`);
    if (!Array.isArray(t.body) || !t.body.length) E(`${at}: body 가 비어 있습니다`);

    // 요약 패널: 프로젝트는 proj, 나머지는 panel
    if (t.panel) {
      Object.keys(t.panel).forEach((key) => { if (!PANEL_KEYS.includes(key)) W(`${at}.panel: 알 수 없는 키 "${key}"`); });
      if (!t.panel.role) W(`${at}.panel: role(MY ROLE)이 없습니다. 활동 기록 목록의 한 줄 설명도 이 값을 씁니다`);
      if (t.panel.key && !t.panel.result) W(`${at}.panel: key 는 result 가 있을 때만 화면에 나옵니다`);
      if (t.panel.key && t.panel.key.length > LIMITS.key[lg]) W(`${at}.panel.key: ${t.panel.key.length}자 (권장 ${LIMITS.key[lg]}자 이하, 숫자 하나)`);
      checkLinks(at + ".panel", t.panel.links);
    }
    if (t.proj) {
      Object.keys(t.proj).forEach((key) => { if (!PROJ_KEYS.includes(key)) W(`${at}.proj: 알 수 없는 키 "${key}"`); });
      ["name", "type", "what"].forEach((key) => { if (!t.proj[key]) E(`${at}.proj: ${key} 가 없습니다 (프로젝트 카드에 쓰임)`); });
      ["role", "stack"].forEach((key) => { if (!Array.isArray(t.proj[key]) || !t.proj[key].length) E(`${at}.proj: ${key} 는 글자 목록(배열)이어야 합니다`); });
      if (t.proj.key && t.proj.key.length > LIMITS.key[lg]) W(`${at}.proj.key: ${t.proj.key.length}자 (권장 ${LIMITS.key[lg]}자 이하)`);
      checkLinks(at + ".proj", t.proj.links);
    }
    if (!t.panel && !t.proj) W(`${at}: panel 이 없습니다. 상세 페이지 요약 패널에 PERIOD 한 칸만 나옵니다 (최소 panel.role 필요)`);
    if (t.glance) {
      Object.keys(t.glance).forEach((key) => { if (!GLANCE_KEYS.includes(key)) W(`${at}.glance: 알 수 없는 키 "${key}"`); });
      if (!t.glance.problem && !t.glance.goal) W(`${at}.glance: problem(문제) 또는 goal(목적) 중 하나가 있어야 합니다`);
      if (!t.glance.result && !(t.proj || {}).result && !(t.panel || {}).result) W(`${at}.glance: result 가 없습니다 (결과 칸이 비어요)`);
      for (const key of ["problem", "goal", "decision", "result"]) {
        const v = t.glance[key];
        if (v && v.replace(/<[^>]+>/g, "").length > LIMITS.glance[lg]) W(`${at}.glance.${key}: ${v.replace(/<[^>]+>/g, "").length}자 (권장 ${LIMITS.glance[lg]}자 이하, 한두 문장)`);
      }
    }
    if (t.card) {
      Object.keys(t.card).forEach((key) => { if (!CARD_KEYS.includes(key)) W(`${at}.card: 알 수 없는 키 "${key}"`); });
      if (t.card.what && t.card.what.length > LIMITS.cardWhat[lg]) W(`${at}.card.what: ${t.card.what.length}자 (권장 ${LIMITS.cardWhat[lg]}자 이하)`);
      if (!t.card.role || !t.card.result) W(`${at}.card: role 과 result 두 줄이 모두 있어야 합니다`);
      if (t.card.role && t.card.role.length > LIMITS.cardRole[lg]) W(`${at}.card.role: ${t.card.role.length}자 (권장 ${LIMITS.cardRole[lg]}자 이하)`);
      if (t.card.result && t.card.result.length > LIMITS.cardResult[lg]) W(`${at}.card.result: ${t.card.result.length}자 (권장 ${LIMITS.cardResult[lg]}자 이하)`);
    }
    checkBody(at, t.body || []);
    scanTbd(at, t);
  }
  if (k && e) {
    // 한국어 · 영어 구조 비교
    for (const key of ["org", "short", "card", "panel", "proj", "glance", "vid", "deck", "photosTitle"]) {
      if (!!k[key] !== !!e[key]) W(`${a.id}: "${key}" 가 ${k[key] ? "ko.js 에만" : "en.js 에만"} 있습니다 (두 언어 파일은 같은 모양으로 유지)`);
    }
    for (const key of ["panel", "proj", "glance", "card", "vid"]) {
      if (k[key] && e[key]) {
        const a1 = Object.keys(k[key]).sort().join(","), b1 = Object.keys(e[key]).sort().join(",");
        if (a1 !== b1) W(`${a.id}.${key}: ko 와 en 의 항목이 다릅니다 (ko: ${a1} / en: ${b1})`);
      }
    }
    const fk = (k.body || []).filter((x) => x.h != null).map((x) => (x.fold ? 1 : 0)).join(""), fe = (e.body || []).filter((x) => x.h != null).map((x) => (x.fold ? 1 : 0)).join("");
    if (fk !== fe) W(`${a.id}.body: 접어 둔 소제목(fold)의 위치가 ko 와 en 에서 다릅니다`);
    const sk = (k.body || []).map(typeOf), se = (e.body || []).map(typeOf);
    if (sk.join(" ") !== se.join(" ")) {
      let at = 0;
      while (at < sk.length && sk[at] === se[at]) at++;
      W(`${a.id}.body: ko(${sk.length}블록)와 en(${se.length}블록)의 블록 순서가 다릅니다. ${at + 1}번째 블록부터 (ko: ${sk[at] || "없음"} / en: ${se[at] || "없음"})`);
    }
  }
  // 목록에서의 역할
  if (projects.includes(a.id)) {
    if (!k.proj) E(`${a.id}: common.js projects 에 있지만 ko.js 에 proj 가 없습니다 (프로젝트 카드가 나오지 않음)`);
    const v = (C.photos[a.id] || {}).video;
    if (!v) W(`${a.id}: 프로젝트 카드는 영상(photos["${a.id}"].video) 또는 최소한 poster 가 있어야 왼쪽 칸이 비지 않습니다`);
  }
  if (featured.includes(a.id)) {
    if (!k.card) W(`${a.id}: common.js featured 에 있지만 card {role, result} 가 없습니다`);
    if (!(C.photos[a.id] || {}).cover) W(`${a.id}: 대표 활동 카드에는 표지 사진(photos["${a.id}"].cover)이 필요합니다`);
  }
}

function checkLinks(at, links) {
  if (links == null) return;
  if (!Array.isArray(links)) return E(`${at}.links: [{t:"글자", href:"주소"}] 목록이어야 합니다`);
  links.forEach((l) => {
    if (!l.t || !l.href) return E(`${at}.links: t(글자)와 href(주소)가 모두 필요합니다`);
    if (l.href.startsWith("#a/")) { if (!ids.includes(l.href.slice(3))) E(`${at}.links: "${l.href}" 에 해당하는 활동이 없습니다`); }
    else if (!/^https:\/\//.test(l.href)) W(`${at}.links: "${l.href}" 는 https:// 또는 #a/활동id 로 시작해야 합니다`);
  });
}

function checkBody(at, body) {
  let h2 = 0, numbered = 0, kicker = 0;
  body.forEach((b, i) => {
    const pos = `${at}.body[${i}]`;
    const t = typeOf(b);
    if (!t) return E(`${pos}: 알 수 없는 블록 {${Object.keys(b).join(", ")}} (쓸 수 있는 블록: ${BLOCKS.join(" ")})`);
    Object.keys(b).forEach((key) => {
      if (key !== t && !(BLOCK_EXTRA[t] || []).includes(key)) W(`${pos}: {${t}} 블록에 쓰이지 않는 키 "${key}" (한 블록에는 한 종류만)`);
    });
    if (t === "h") {
      h2++;
      if (b.k) kicker++;
      if (/^\d+\.\s/.test(b.h)) numbered++;
      const tocMax = LIMITS.toc[/\.js /.test(at) && at.startsWith("en") ? "en" : "ko"];
      if (b.toc && b.toc.length > tocMax) W(`${pos}: toc "${b.toc}" ${b.toc.length}자 (목차 이름은 ${tocMax}자 이하)`);
    }
    if (t === "link") {
      if (!b.href) E(`${pos}: {link} 에는 href 가 필요합니다`);
      else if (b.href.startsWith("#a/")) { if (!ids.includes(b.href.slice(3))) E(`${pos}: "${b.href}" 에 해당하는 활동이 없습니다`); }
      else if (!/^https:\/\//.test(b.href)) W(`${pos}: {link} 의 주소 "${b.href}" 는 https:// (바깥 링크) 또는 #a/활동id (사이트 안) 로 시작해야 합니다`);
    }
    if (t === "cert") {
      if (!b.cert.img) E(`${pos}: {cert} 에는 img 가 필요합니다`);
      else if (!exists(img(b.cert.img))) E(`${pos}: ${img(b.cert.img)} 파일이 없습니다`);
      if (!b.cert.alt) W(`${pos}: {cert} 에는 alt(이미지 설명)를 적습니다`);
    }
    if (t === "cards" && (b.cards.length < 2 || b.cards.length > 4)) W(`${pos}: {cards} 는 한 줄에 2–4장 (지금 ${b.cards.length}장). 더 많으면 블록을 나눕니다`);
    if (t === "cmp" && b.cmp.length !== 2) W(`${pos}: {cmp} 는 정확히 두 칸입니다 (지금 ${b.cmp.length}칸)`);
    if (t === "stat" && b.stat.length > 3) W(`${pos}: {stat} 는 숫자 3개까지`);
    if (t === "roles") ["tl", "ml", "team", "mine"].forEach((key) => { if (!b.roles[key]) E(`${pos}: {roles} 에 ${key} 가 없습니다`); });
    for (const m of JSON.stringify(b).matchAll(/href=\\?["'](#a\/[^"'\\]+)/g)) {
      if (!ids.includes(m[1].slice(3))) E(`${pos}: "${m[1]}" 에 해당하는 활동이 없습니다`);
    }
  });
  if (h2 >= 3 && kicker > 0 && kicker < h2 && numbered === 0) I(`${at}: 소제목 ${h2}개 중 ${kicker}개만 k(작은 번호 제목)가 있습니다. 한 페이지 안에서는 한 가지 방식으로 통일하는 것이 원칙입니다`);
  if (kicker > 0 && numbered > 0) W(`${at}: 소제목 번호 방식이 섞여 있습니다 ({k:"01 · 이름"} 과 "01. 이름" 을 한 페이지에서 같이 쓰지 않습니다)`);
}

function scanTbd(at, obj) {
  const hits = [];
  (function walk(v) {
    if (typeof v === "string") { if (isTbd(v)) hits.push(v); }
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") Object.values(v).forEach(walk);
  })(obj);
  if (hits.length) W(`${at}: 확인되지 않은 항목이 ${hits.length}개 남아 있습니다 ("${hits[0].slice(0, 30)}…"). 배포 전에 확정하거나 지웁니다`);
}

/* ---------- 3. 목록 구성: projects · featured · archiveReps ---------- */
for (const [name, list] of [["projects", projects], ["featured", featured], ["archiveReps", reps]]) {
  list.forEach((id) => { if (!ids.includes(id)) E(`common.js ${name}: "${id}" 에 해당하는 활동이 없습니다`); });
}
projects.forEach((id) => { if (featured.includes(id)) W(`common.js: "${id}" 가 projects 와 featured 에 모두 있습니다 (SELECTED WORK 에 두 번 나옴)`); });
reps.forEach((id) => { if (projects.includes(id) || featured.includes(id)) W(`common.js archiveReps: "${id}" 는 이미 SELECTED WORK 에 나오는 활동입니다 (겹치지 않게)`); });
cats.forEach((c) => {
  const n = reps.filter((id) => (C.activities.find((a) => a.id === id) || {}).category === c).length;
  if (n !== 1) W(`common.js archiveReps: 구분 "${c}" 의 대표 활동이 ${n}개입니다 (구분마다 정확히 1개)`);
});
if (featured.length !== 4) W(`common.js featured: ${featured.length}개 (대표 활동 카드는 4장 기준으로 설계되어 있습니다: 넓은 화면 2×2, 휴대폰 2×2)`);

/* ---------- 4. 사진 · 영상 · 발표자료 파일 ---------- */
const usedImages = new Set(["hero"]);   // hero.webp 는 index.html 의 og:image
for (const [id, p] of Object.entries(C.photos || {})) {
  const at = `common.js photos["${id}"]`;
  if (!ids.includes(id)) { E(`${at}: 해당하는 활동이 없습니다`); continue; }
  const need = (name, what) => { usedImages.add(name); if (!exists(img(name))) E(`${at}: ${what} ${img(name)} 파일이 없습니다`); };
  if (p.cover) need(p.cover, "cover");
  (p.shots || []).forEach((s) => need(s, "shots"));
  if (p.shots && new Set(p.shots).size !== p.shots.length) W(`${at}: shots 에 같은 사진이 두 번 들어 있습니다`);
  if (p.shots && p.shots.length > LIMITS.shotsMax) W(`${at}: shots ${p.shots.length}장 (권장 ${LIMITS.shotsMax}장 이하)`);
  if (p.shots && !p.cover) W(`${at}: shots 가 있으면 cover 도 지정합니다`);
  if (p.video) {
    if (!p.video.src || !exists(p.video.src)) E(`${at}: video.src "${p.video.src}" 파일이 없습니다`);
    else {
      const mb = fs.statSync(path.join(ROOT, p.video.src)).size / 1048576;
      if (mb > 40) W(`${at}: ${p.video.src} ${mb.toFixed(0)}MB (권장 40MB 이하. 더 길면 YouTube 에 올리고 activities 의 video 를 씁니다)`);
    }
    if (!p.video.poster) W(`${at}: video.poster 가 없습니다 (재생 전 화면이 검게 보임)`);
    else need(p.video.poster, "video.poster");
    for (const [lg, L] of Object.entries(LANGS)) {
      const vid = (L.activities[id] || {}).vid;
      if (!vid || !vid.t) E(`${lg}.js ${id}: photos 에 video 가 있지만 vid {k, t, d} 글자가 없습니다 (영상 섹션이 나오지 않음)`);
    }
  }
}
for (const [lg, L] of Object.entries(LANGS)) {
  for (const [id, t] of Object.entries(L.activities)) {
    if (t.vid && !((C.photos || {})[id] || {}).video) W(`${lg}.js ${id}: vid 글자는 있지만 common.js photos["${id}"].video 가 없습니다`);
    if (t.photosTitle && !((C.photos || {})[id] || {}).shots) W(`${lg}.js ${id}: photosTitle 은 shots 가 있을 때만 쓰입니다`);
    if (t.deck && !(C.decks || {})[id]) W(`${lg}.js ${id}: deck 글자는 있지만 common.js decks["${id}"] 가 없습니다`);
  }
}
for (const [id, d] of Object.entries(C.decks || {})) {
  const at = `common.js decks["${id}"]`;
  if (!ids.includes(id)) { E(`${at}: 해당하는 활동이 없습니다`); continue; }
  for (let n = 1; n <= d.count; n++) {
    usedImages.add(d.file + pad2(n));
    if (!exists(img(d.file + pad2(n)))) E(`${at}: ${img(d.file + pad2(n))} 파일이 없습니다 (count ${d.count})`);
  }
  if (exists(img(d.file + pad2(d.count + 1)))) W(`${at}: ${img(d.file + pad2(d.count + 1))} 파일이 있는데 count 는 ${d.count} 입니다`);
  const sums = {};
  for (const [lg, L] of Object.entries(LANGS)) {
    const dk = (L.activities[id] || {}).deck;
    if (!dk || !dk.title || !Array.isArray(dk.chapters)) { E(`${lg}.js ${id}: deck {title, chapters} 가 없습니다`); continue; }
    sums[lg] = dk.chapters.reduce((s, ch) => s + (ch.slides || []).length, 0);
    if (sums[lg] !== d.count) E(`${lg}.js ${id}.deck: 설명이 달린 슬라이드 ${sums[lg]}장 ≠ count ${d.count}장 (모자라면 뒤쪽 슬라이드가 화면에서 빠집니다)`);
    dk.chapters.forEach((ch, ci) => {
      if (!ch.name) E(`${lg}.js ${id}.deck.chapters[${ci}]: name 이 없습니다`);
      (ch.slides || []).forEach((s, si) => { if (!s.t || !s.d) W(`${lg}.js ${id}.deck.chapters[${ci}].slides[${si}]: t(제목)와 d(설명)를 모두 적습니다`); });
    });
  }
  const kc = (KO.activities[id].deck || {}).chapters || [], ec = ((EN.activities[id] || {}).deck || {}).chapters || [];
  if (kc.map((c) => c.slides.length).join() !== ec.map((c) => c.slides.length).join()) W(`${id}.deck: ko 와 en 의 챕터 구성(장 수)이 다릅니다`);
  kc.forEach((c, i) => { if (ec[i] && !!c.pm !== !!ec[i].pm) W(`${id}.deck.chapters[${i}]: pm("내가 한 일")이 ${c.pm ? "ko 에만" : "en 에만"} 있습니다`); });
}
// 본문에서 쓰는 이미지 ({cert})
for (const L of Object.values(LANGS)) for (const t of Object.values(L.activities)) (t.body || []).forEach((b) => { if (b.cert && b.cert.img) usedImages.add(b.cert.img); });
// 쓰이지 않는 파일 · 규격
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
for (const f of fs.readdirSync(path.join(ROOT, "img")).sort()) {
  const ext = path.extname(f), stem = f.slice(0, -ext.length);
  if (ext !== ".webp") { if (!html.includes(f)) I(`img/${f}: 화면에서 쓰이지 않는 파일입니다 (활동 사진은 .webp 만 불러옵니다)`); continue; }
  if (!usedImages.has(stem)) I(`img/${f}: 어디에서도 쓰이지 않습니다`);
  if (!/^[a-z0-9]+(_[a-z0-9]+)*$/.test(stem)) W(`img/${f}: 파일 이름은 영문 소문자 · 숫자 · 밑줄(_)만 씁니다`);
  const kb = fs.statSync(path.join(ROOT, "img", f)).size / 1024;
  if (kb > 400) W(`img/${f}: ${kb.toFixed(0)}KB (사진 한 장은 400KB 이하)`);
  else if (kb > 250 && usedImages.has(stem)) I(`img/${f}: ${kb.toFixed(0)}KB (권장 250KB 이하)`);
}

/* ---------- 5. 그 밖의 연결 ---------- */
for (const g of C.certGroups || []) for (const c of g.items) {
  for (const [lg, L] of Object.entries(LANGS)) if (!(L.certs || {})[c.id] || !L.certs[c.id].name) E(`${lg}.js certs["${c.id}"]: 이름이 없습니다`);
}
for (const a of C.awards || []) for (const [lg, L] of Object.entries(LANGS)) if (!(L.awards || {})[a.id]) E(`${lg}.js awards["${a.id}"]: 항목이 없습니다`);
if (C.volunteerLog) {
  for (const r of C.volunteerLog.records) for (const [lg, L] of Object.entries(LANGS)) {
    const V = L.volunteerLog || {};
    if (!(V.orgs || {})[r.org]) E(`${lg}.js volunteerLog.orgs["${r.org}"]: 이름이 없습니다`);
    if (!(V.titles || {})[r.title]) E(`${lg}.js volunteerLog.titles["${r.title}"]: 이름이 없습니다`);
    if (!(V.fields || {})[r.field]) E(`${lg}.js volunteerLog.fields["${r.field}"]: 이름이 없습니다`);
  }
}
for (const k of Object.keys(KO.ui)) if (EN.ui[k] == null) W(`en.js ui.${k}: 영어 문구가 없습니다 (한국어로 대신 보입니다)`);
for (const [lg, f] of Object.entries(C.cv || {})) if (!exists(f)) E(`common.js cv.${lg}: ${f} 파일이 없습니다`);
// 캐시 버전: content 세 파일의 ?v= 값은 항상 같아야 합니다
const vers = [...html.matchAll(/content\/(common|ko|en)\.js\?v=(\d+)/g)].map((m) => m[2]);
if (vers.length !== 3) W(`index.html: content 스크립트 3개의 ?v= 값을 찾지 못했습니다`);
else if (new Set(vers).size !== 1) E(`index.html: content/common.js · ko.js · en.js 의 ?v= 값이 서로 다릅니다 (${vers.join(", ")})`);
else I(`index.html: content 스크립트 버전 ?v=${vers[0]}. content/ 파일을 고쳤다면 이 숫자를 세 곳 모두 새 값으로 바꿔야 방문자 브라우저가 새 내용을 받습니다`);

report();
process.exit(out.error.length || (STRICT && out.warn.filter((m) => !ONLY_ID || m.includes(ONLY_ID)).length) ? 1 : 0);

function report() {
  const show = (label, list) => { if (list.length) { console.log(`\n${label} (${list.length})`); list.forEach((m) => console.log("  · " + m)); } };
  const mine = (m) => !ONLY_ID || m.includes(ONLY_ID);
  const warn = out.warn.filter(mine), info = out.info.filter(mine);
  show("ERROR", out.error);
  if (!QUIET) { show("WARN", warn); show("INFO", info); }
  const skipped = out.warn.length - warn.length;
  console.log(`\n활동 ${C ? C.activities.length : 0}개 확인: 오류 ${out.error.length} · 경고 ${warn.length} · 참고 ${info.length}` + (ONLY_ID ? ` (--id ${ONLY_ID}: 다른 활동의 경고 ${skipped}건은 숨김)` : ""));
}
