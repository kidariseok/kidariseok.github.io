#!/usr/bin/env node
/* 채용 담당자 페르소나 점검용 화면 캡처 (docs/RECRUITER_REVIEW.md 1장 0단계)
   ──────────────────────────────────────────────────────────────
   메인 'SELECTED WORK' 화면과 대표 활동 상세의 첫 두 화면을 KO/EN · 1440/390px 로 찍고,
   본문 텍스트(.txt)와 페이지 높이 · 가로 넘침을 함께 남깁니다. 사이트 파일은 건드리지 않습니다.

   준비: Playwright 가 설치되어 있어야 합니다 (npm i -g playwright && npx playwright install chromium)
   사용: python3 -m http.server 8000   (다른 창에서)
         node tools/review-capture.mjs <출력 폴더> [활동id ...]
         활동id 를 빼면 메인에 노출된 대표 활동(common.js 의 projects + featured)을 찍습니다.
   출력: main_<ko|en>_<desk|mob>_work<N>.png · main_<ko|en>.txt
         <id>_<ko|en>_<desk|mob>_<1|2>.png (1 = 스크롤 없는 첫 화면) · <id>_<ko|en>.txt
         heights.txt · overflow.txt(가로 넘침이 있을 때만)
   출력 폴더는 저장소 밖(임시 폴더)에 두세요. 보고서만 docs/review-log/ 에 남깁니다. */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require("playwright")); }
catch { console.error("Playwright 를 찾지 못했습니다. npm i -g playwright 후 다시 실행하세요."); process.exit(1); }

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = process.argv[2];
if (!out) { console.error("사용: node tools/review-capture.mjs <출력 폴더> [활동id ...]"); process.exit(1); }
const BASE = process.env.BASE_URL || "http://localhost:8000/";

let ids = process.argv.slice(3);
if (!ids.length) {
  const ctx = { window: { SITE: {} } }; ctx.SITE = ctx.window.SITE; vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, "content/common.js"), "utf8"), ctx);
  ids = [...(ctx.SITE.common.projects || []), ...(ctx.SITE.common.featured || [])];
}
fs.mkdirSync(out, { recursive: true });
for (const f of ["heights.txt", "overflow.txt"]) fs.rmSync(path.join(out, f), { force: true });

async function setLang(page, lang) {
  await page.evaluate((l) => { const b = document.getElementById("btn-" + l); if (b && b.getAttribute("aria-pressed") !== "true") b.click(); }, lang);
  await page.waitForTimeout(300);
}

const browser = await chromium.launch();
for (const lang of ["ko", "en"]) {
  for (const vp of [{ w: 1440, h: 900, tag: "desk", screens: 3 }, { w: 390, h: 844, tag: "mob", screens: 4 }]) {
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 1, reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: "networkidle" });
    await setLang(page, lang);
    await page.evaluate(() => document.getElementById("work").scrollIntoView());
    await page.waitForTimeout(500);
    for (let s = 0; s < vp.screens; s++) {
      await page.screenshot({ path: path.join(out, `main_${lang}_${vp.tag}_work${s + 1}.png`) });
      await page.evaluate((h) => window.scrollBy(0, h - 80), vp.h);
      await page.waitForTimeout(350);
    }
    if (vp.tag === "desk") {
      const txt = await page.evaluate(() => ["work", "about", "activities", "credentials"]
        .map((id) => `##### #${id}\n` + ((document.getElementById(id) || {}).innerText || "")).join("\n\n"));
      fs.writeFileSync(path.join(out, `main_${lang}.txt`), txt);
    }
    for (const id of ids) {
      await page.goto(BASE + "#a/" + id, { waitUntil: "networkidle" });
      await setLang(page, lang);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(out, `${id}_${lang}_${vp.tag}_1.png`) });
      await page.evaluate((h) => window.scrollBy(0, h - 80), vp.h);
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(out, `${id}_${lang}_${vp.tag}_2.png`) });
      if (vp.tag === "desk") {
        fs.writeFileSync(path.join(out, `${id}_${lang}.txt`), await page.evaluate(() => document.getElementById("detail-view").innerText));
        const h = await page.evaluate(() => document.documentElement.scrollHeight);
        fs.appendFileSync(path.join(out, "heights.txt"), `${id} ${lang} ${h}px\n`);
      }
      const ov = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (ov > 0) fs.appendFileSync(path.join(out, "overflow.txt"), `${id} ${lang} ${vp.tag} overflow ${ov}px\n`);
    }
    await ctx.close();
  }
}
await browser.close();
console.log("캡처 완료:", out);
