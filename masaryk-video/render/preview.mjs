// Render selected timestamps to PNG for review.
// usage: node render/preview.mjs out_dir t1 t2 ...   (t may be "s04+12.5" = scene-relative)
import { chromium } from "playwright";
import { mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const [out, ...ts] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const TL = JSON.parse(readFileSync(path.join(root, "motion/timeline.js"), "utf8").replace(/^window.TL=/, "").replace(/;\s*$/, ""));
const browser = await chromium.launch({ args: ["--allow-file-access-from-files", "--disable-web-security"] });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
const errs = [];
page.on("pageerror", (e) => errs.push(String(e)));
page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
await page.goto("file://" + path.join(root, "motion/index.html"));
await page.waitForFunction("window.READY === true", null, { timeout: 30000 }).catch(() => {});
if (errs.length) console.log("ERRORS:\n" + errs.join("\n"));
for (const raw of ts) {
  let t = raw;
  const m = /^(s\d\d)\+([\d.]+)$/.exec(raw);
  if (m) t = TL.scenes.find((s) => s.id === m[1]).start + parseFloat(m[2]);
  const k = /^(s\d\d)@(\w+)([+-][\d.]+)?$/.exec(raw);
  if (k) { const sc = TL.scenes.find((s) => s.id === k[1]); t = sc.start + sc.cues[k[2]] + parseFloat(k[3] || 0); }
  t = parseFloat(t);
  await page.evaluate((t) => window.seek(t), t);
  const f = path.join(out, `f_${raw.replace(/[^\w.+]/g, "_")}.png`);
  await page.screenshot({ path: f });
}
if (errs.length) console.log("ERRORS(after):\n" + errs.join("\n"));
await browser.close();
