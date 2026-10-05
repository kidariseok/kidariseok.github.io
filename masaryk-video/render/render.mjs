// Frame-accurate render: every frame is seek(t) -> screenshot, piped to ffmpeg.
// usage: node render/render.mjs <workdir> [--from s] [--to s] [--workers n]
// Produces <workdir>/video.mp4 (lossless-ish intermediate, no audio).
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const args = process.argv.slice(2);
const work = path.resolve(args[0] || "render/out");
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? parseFloat(args[i + 1]) : d; };
mkdirSync(work, { recursive: true });
const TL = JSON.parse(readFileSync(path.join(root, "motion/timeline.js"), "utf8").replace(/^window.TL=/, "").replace(/;\s*$/, ""));
const fps = TL.fps;
const f0 = Math.round(opt("--from", 0) * fps);
const f1 = Math.round(opt("--to", TL.duration) * fps);
const workers = opt("--workers", 4);
const per = Math.ceil((f1 - f0) / workers);

async function chunk(k) {
  const a = f0 + k * per, b = Math.min(f1, a + per);
  if (a >= b) return null;
  const out = path.join(work, `seg_${String(k).padStart(2, "0")}.mp4`);
  const browser = await chromium.launch({ args: ["--allow-file-access-from-files", "--disable-web-security", "--force-color-profile=srgb"] });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  const errs = [];
  page.on("pageerror", (e) => errs.push(String(e)));
  await page.goto("file://" + path.join(root, "motion/index.html"));
  await page.waitForFunction("window.READY === true", null, { timeout: 60000 });
  const ff = spawn("ffmpeg", ["-loglevel", "error", "-y", "-f", "image2pipe", "-framerate", String(fps), "-c:v", "mjpeg", "-i", "-",
    "-c:v", "libx264", "-preset", "veryfast", "-crf", "12", "-pix_fmt", "yuv420p", "-r", String(fps), out], { stdio: ["pipe", "inherit", "inherit"] });
  const t0 = Date.now();
  for (let f = a; f < b; f++) {
    await page.evaluate((t) => window.seek(t), f / fps);
    const buf = await page.screenshot({ type: "jpeg", quality: 95 });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
    if ((f - a) % 300 === 0) console.log(`  worker ${k}: frame ${f - a}/${b - a}  ${((Date.now() - t0) / Math.max(1, f - a)).toFixed(0)} ms/frame`);
  }
  ff.stdin.end();
  await new Promise((r) => ff.on("close", r));
  await browser.close();
  if (errs.length) console.log(`worker ${k} errors:\n` + errs.slice(0, 5).join("\n"));
  return out;
}

const t = Date.now();
const segs = (await Promise.all(Array.from({ length: workers }, (_, k) => chunk(k)))).filter(Boolean);
writeFileSync(path.join(work, "list.txt"), segs.map((s) => `file '${s}'`).join("\n"));
await new Promise((r) => spawn("ffmpeg", ["-loglevel", "error", "-y", "-f", "concat", "-safe", "0", "-i", path.join(work, "list.txt"), "-c", "copy", path.join(work, "video.mp4")], { stdio: "inherit" }).on("close", r));
console.log(`rendered ${f1 - f0} frames in ${((Date.now() - t) / 1000).toFixed(0)}s -> ${path.join(work, "video.mp4")}`);
