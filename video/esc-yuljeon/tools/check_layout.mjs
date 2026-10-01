// 레이아웃 검사: 모든 자막이 화면 안에 들어오는지, 글자가 자기 상자를 넘치지 않는지 확인한다.
//   node tools/check_layout.mjs
import { chromium } from "playwright-core";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const VIDEO = (await import(path.join(ROOT, "scenes.js"))).default;
const EXE = process.env.CHROME || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".png": "image/png", ".woff2": "font/woff2" };
const srv = http.createServer((q, r) => {
  const p = path.join(ROOT, decodeURIComponent(new URL(q.url, "http://x").pathname));
  if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) { r.writeHead(404); r.end(); return; }
  r.writeHead(200, { "Content-Type": TYPES[path.extname(p)] || "application/octet-stream" });
  fs.createReadStream(p).pipe(r);
}).listen(0);
const port = srv.address().port;
const browser = await chromium.launch({ executablePath: EXE });
const page = await browser.newPage({ viewport: { width: VIDEO.width, height: VIDEO.height } });
await page.goto(`http://127.0.0.1:${port}/index.html`);
await page.evaluate(() => window.ready);

const problems = [];
// 1) 자막: 표시 구간 가운데 시각에서 상자 위치·줄 수
for (const sc of VIDEO.scenes) {
  for (const s of sc.subs || []) {
    const t = sc.start + (s.at[0] + s.at[1]) / 2;
    const r = await page.evaluate((tt) => {
      window.renderFrame(tt);
      return [...document.querySelectorAll(".subholder")].filter((h) => h.style.display !== "none").map((h) => {
        const b = h.firstChild.getBoundingClientRect();
        const lines = h.firstChild.querySelectorAll("br").length + 1;
        return { left: b.left, right: b.right, top: b.top, bottom: b.bottom, lines, text: h.textContent };
      });
    }, t);
    for (const b of r) {
      const bad = b.left < 16 || b.right > VIDEO.width - 16 || b.top < 0 || b.bottom > VIDEO.height - 16 || b.lines > 2;
      if (bad) problems.push({ kind: "subtitle", t, ...b });
    }
  }
}
// 2) 장면 속 글자: 부모 상자를 넘치는 한 줄 글자
const samples = VIDEO.scenes.map((sc) => sc.start + (sc.end - sc.start) * 0.8);
for (const t of samples) {
  const r = await page.evaluate((tt) => {
    window.renderFrame(tt);
    const out = [];
    for (const e of document.querySelectorAll(".scene .nowrap")) {
      if (!e.offsetParent) continue;
      const b = e.getBoundingClientRect(), p = e.parentElement.getBoundingClientRect();
      const boxed = e.parentElement.classList.contains("plank") || e.parentElement.style.borderRadius;
      if (b.width === 0) continue;
      if (b.right > 1920 + 1 || b.left < -1) out.push({ why: "offscreen", text: e.textContent, l: b.left, r: b.right });
      if (boxed && e.scrollWidth > p.width + 1 - (b.left - p.left)) out.push({ why: "overflow", text: e.textContent, w: e.scrollWidth, room: p.width - (b.left - p.left) });
    }
    return out;
  }, t);
  for (const x of r) problems.push({ kind: "text", t, ...x });
}
console.log(problems.length ? JSON.stringify(problems, null, 1) : "layout OK: 자막 " + VIDEO.scenes.reduce((n, s) => n + (s.subs || []).length, 0) + "개, 장면 " + samples.length + "개 검사");
await browser.close();
srv.close();
