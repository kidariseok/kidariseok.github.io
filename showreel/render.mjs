// Frame-by-frame capture of index.html.
//   node render.mjs frames <outDir> [fps] [shard] [shards] → outDir/f00000.png …  (every shards-th frame from shard)
//   node render.mjs stills <outDir> <beat,beat…> → outDir/b<beat>.png  (quick checks)
// Serves the repo root on a local port so ../img and fonts load exactly as on the site.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require(path.join(process.execPath, '../../lib/node_modules/playwright'))); }

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png',
  '.woff2': 'font/woff2', '.m4a': 'audio/mp4', '.mp4': 'video/mp4' };
const server = http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!p.startsWith(root) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': TYPES[path.extname(p)] || 'application/octet-stream' });
  fs.createReadStream(p).pipe(res);
});
await new Promise(r => server.listen(0, r));
const port = server.address().port;

const [mode, outDir, arg, shardArg, shardsArg] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ args: ['--font-render-hinting=none', '--disable-lcd-text', '--force-color-profile=srgb'] });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
page.on('console', m => console.log('[page]', m.text()));
page.on('pageerror', e => console.error('[page error]', e));
await page.goto(`http://localhost:${port}/showreel/index.html?render`);
await page.evaluate(() => window.ready);
await page.waitForTimeout(800);

const SPB = 60 / 128;
async function shot(t, file) {
  await page.evaluate(t => window.renderFrame(t), t);
  // two animation frames so SVG masks and images have painted
  await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
  await page.screenshot({ path: file, type: 'png' });
}

if (mode === 'stills') {
  for (const b of arg.split(',')) await shot(parseFloat(b) * SPB, path.join(outDir, `b${b}.png`));
} else {
  const fps = parseInt(arg || '60', 10), n = Math.round(15 * fps);
  const shard = parseInt(shardArg || '0', 10), shards = parseInt(shardsArg || '1', 10);
  const t0 = Date.now();
  for (let f = shard; f < n; f += shards) {
    const file = path.join(outDir, `f${String(f).padStart(5, '0')}.png`);
    if (fs.existsSync(file)) continue;          // resumable
    await shot(f / fps, file + '.tmp.png');
    fs.renameSync(file + '.tmp.png', file);
    if ((f - shard) % (60 * shards) === 0) console.log(`[${shard}] frame ${f}/${n}  ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
}
await browser.close();
server.close();
