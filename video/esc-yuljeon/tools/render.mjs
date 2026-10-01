// 프레임 렌더링: index.html 을 헤드리스 크로미움으로 열고 renderFrame(t)을 프레임마다 호출해 캡처한다.
//
//   node tools/render.mjs --stills 2,12.5,40      특정 시각(초)만 PNG로 저장 → build/stills/
//   node tools/render.mjs --workers 3             전체 영상(무음) → build/video.mp4
//   node tools/render.mjs --from 115 --to 120 --out patch.mp4   일부 구간만 → build/patch.mp4
import { chromium } from "playwright-core";
import { spawn } from "node:child_process";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BUILD = path.join(ROOT, "build");
const EXE = process.env.CHROME || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const VIDEO = (await import(path.join(ROOT, "scenes.js"))).default;
const FPS = VIDEO.fps;

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => (a.startsWith("--") ? [...acc, [a.slice(2), arr[i + 1] && !arr[i + 1].startsWith("--") ? arr[i + 1] : true]] : acc), [])
);

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".png": "image/png", ".woff2": "font/woff2", ".css": "text/css" };
function serve() {
  return new Promise((res) => {
    const srv = http.createServer((req, rsp) => {
      const p = path.join(ROOT, decodeURIComponent(new URL(req.url, "http://x").pathname));
      if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { rsp.writeHead(404); rsp.end(); return; }
      rsp.writeHead(200, { "Content-Type": TYPES[path.extname(p)] || "application/octet-stream" });
      fs.createReadStream(p).pipe(rsp);
    });
    srv.listen(0, "127.0.0.1", () => res(srv));
  });
}

async function openPage(browser, port) {
  const page = await browser.newPage({ viewport: { width: VIDEO.width, height: VIDEO.height }, deviceScaleFactor: 1 });
  page.on("pageerror", (e) => { console.error("pageerror:", e.message); process.exitCode = 1; });
  page.on("console", (m) => { if (m.type() === "error") console.error("console:", m.text()); });
  await page.goto(`http://127.0.0.1:${port}/index.html`);
  await page.evaluate(() => window.ready);
  return page;
}

async function main() {
  fs.mkdirSync(BUILD, { recursive: true });
  const srv = await serve();
  const port = srv.address().port;
  const browser = await chromium.launch({ executablePath: EXE, args: ["--font-render-hinting=none", "--disable-lcd-text"] });
  try {
    if (args.stills) {
      const dir = path.join(BUILD, "stills");
      fs.mkdirSync(dir, { recursive: true });
      const page = await openPage(browser, port);
      for (const s of String(args.stills).split(",")) {
        const t = Number(s);
        await page.evaluate((tt) => window.renderFrame(tt), t);
        const f = path.join(dir, `t${t.toFixed(2).padStart(6, "0")}.png`);
        await page.screenshot({ path: f });
        console.log(f);
      }
      return;
    }
    const from = Number(args.from ?? 0), to = Number(args.to ?? VIDEO.duration);
    const f0 = Math.round(from * FPS), f1 = Math.round(to * FPS);
    const workers = Number(args.workers ?? 3);
    const per = Math.ceil((f1 - f0) / workers);
    const started = Date.now();
    let done = 0;
    const parts = [];
    await Promise.all(Array.from({ length: workers }, async (_, w) => {
      const a = f0 + w * per, b = Math.min(f1, a + per);
      if (a >= b) return;
      const out = path.join(BUILD, `part_${w}.mp4`);
      parts[w] = out;
      const ff = spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "png", "-i", "-",
        "-c:v", "libx264", "-preset", "slow", "-crf", "14", "-tune", "animation", "-pix_fmt", "yuv420p", "-r", String(FPS), out], { stdio: ["pipe", "inherit", "inherit"] });
      const page = await openPage(browser, port);
      for (let f = a; f < b; f++) {
        await page.evaluate((tt) => window.renderFrame(tt), f / FPS);
        const buf = await page.screenshot({ type: "png" });
        if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
        done++;
        if (done % 150 === 0) {
          const el = (Date.now() - started) / 1000;
          console.log(`frames ${done}/${f1 - f0}  ${(done / el).toFixed(1)} fps  eta ${(((f1 - f0) - done) / (done / el)).toFixed(0)}s`);
        }
      }
      ff.stdin.end();
      await new Promise((r, j) => ff.on("close", (c) => (c === 0 ? r() : j(new Error("ffmpeg exit " + c)))));
      await page.close();
    }));
    const list = path.join(BUILD, "parts.txt");
    fs.writeFileSync(list, parts.filter(Boolean).map((p) => `file '${p}'`).join("\n"));
    await new Promise((r, j) => spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", list, "-c", "copy", path.join(BUILD, args.out || "video.mp4")], { stdio: "inherit" })
      .on("close", (c) => (c === 0 ? r() : j(new Error("concat failed")))));
    console.log(`video: build/${args.out || "video.mp4"} (${((Date.now() - started) / 1000).toFixed(0)}s)`);
  } finally {
    await browser.close();
    srv.close();
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
