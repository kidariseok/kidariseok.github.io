/* ESC_ 지금 우리 율전은 — 게임 소개 영상 렌더러
 *
 * window.renderFrame(t) 가 t초의 화면을 그린다. 모든 움직임은 t 의 순수 함수라서
 * 같은 t 는 언제 그려도 같은 프레임이 나온다(프레임 단위 캡처용).
 * 장면 텍스트·타이밍은 scenes.js 에서 바꾼다.
 */
/* global VIDEO */
(function () {
  "use strict";

  const W = VIDEO.width, H = VIDEO.height;
  const stage = document.getElementById("stage");
  const SC = Object.fromEntries(VIDEO.scenes.map((s) => [s.id, s]));

  // ───────────────────────── 에셋 ─────────────────────────
  const ASSET = {};
  [
    // gen (prep_assets.py 결과, 1x)
    "bd_sky_dome", "bd_sky", "bd_cave_dome", "bd_cave", "cloud_a", "cloud_b", "cloud_c", "cloud_d",
    "vignette_169", "vignette_soft_169", "qr",
    "bug_a_t", "bug_b_t", "campfire_t", "hand_dark_t", "item_flashlight_t", "item_mask_t", "item_radio_t",
    "item_shield_t", "item_suit_t", "monkey_bug1_t", "monkey_bug2_t", "monkey_infected_t", "monkey_t",
    "mw_suit_t", "myungwoong_t", "professor_t", "yuloong_t", "sword_clean", "monkey_shadow_clean",
  ].forEach((k) => (ASSET[k] = "gen/" + k + ".png"));
  [
    "bug_glitch_bg", "silhouette", "window_hands", "monkey_shadow", "sword", "logo_dark", "map",
    "bg_dark_dido", "vignette", "tb_suit_get", "hero_sword", "party_sign", "hand_red",
  ].forEach((k) => (ASSET[k] = "layers/" + k + ".png"));
  [
    "login", "select_before", "select_myungwoong", "select_after", "prologue_map", "prologue_sword",
    "main_dark", "main_light", "main_clear", "qr_success", "q1_story1", "q1_story3", "q1_choice", "q1_wrong",
    "q1_correct", "cave_blank", "q1_progress", "q2_story", "q2_phone", "q2_input1", "q2_input2",
    "q2_itemget_noitem", "q2_equip", "q3_story", "q3_input", "q3_shield", "q4_flashlight", "q5_input",
    "q5_correct", "q5_allitems", "final_mission", "final_rule", "game_clear", "end_monkeys", "end_peace",
    "certificate", "ranking", "party",
  ].forEach((k) => (ASSET[k] = "screens/" + k + ".png"));
  ASSET.poster_light = "raw/poster_light.png";

  const IMG = {};
  function preload() {
    return Promise.all(
      Object.entries(ASSET).map(
        ([k, p]) =>
          new Promise((res, rej) => {
            const i = new Image();
            i.onload = () => i.decode().then(() => { IMG[k] = i; res(); }, rej);
            i.onerror = () => rej(new Error("asset load failed: " + p));
            i.src = "assets/" + p;
          })
      )
    );
  }

  // ───────────────────────── 수학 · 이징 ─────────────────────────
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const lerp = (a, b, t) => a + (b - a) * t;
  const seg = (t, a, b) => clamp((t - a) / (b - a));
  const ease = {
    out: (t) => 1 - Math.pow(1 - t, 3),
    outQ: (t) => 1 - Math.pow(1 - t, 4),
    in: (t) => t * t * t,
    inOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    sine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
    outBack: (t) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
    outBackSoft: (t) => { const c1 = 0.9, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
  };
  function rng(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const hash = (n) => rng(Math.floor(n) * 7919 + 104729)();
  function noise1(x, seed = 0) {
    const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f);
    return lerp(hash(i + seed * 1013), hash(i + 1 + seed * 1013), u) * 2 - 1;
  }
  // 짧은 흔들림(충격 직후 감쇠)
  function shake(lt, t0, amp, dur = 0.45, seed = 1) {
    const k = seg(lt, t0, t0 + dur);
    if (k <= 0 || k >= 1) return [0, 0];
    const d = Math.pow(1 - k, 2) * amp;
    return [noise1(lt * 38, seed) * d, noise1(lt * 38, seed + 7) * d];
  }
  const beat = (sc, name) => (typeof name === "number" ? name : sc.beats[name]);

  // ───────────────────────── DOM 도우미 ─────────────────────────
  const PX_KEYS = new Set(["left", "top", "right", "bottom", "width", "height", "fontSize", "borderRadius", "marginLeft", "marginTop", "paddingLeft"]);
  function el(tag, cls, parent, css) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (css) for (const [k, v] of Object.entries(css)) e.style[k] = typeof v === "number" && PX_KEYS.has(k) ? v + "px" : v;
    if (parent) parent.appendChild(e);
    return e;
  }
  function px(n) { return n + "px"; }
  function sprite(key, parent, x, y, scale = 1, opts = {}) {
    const i = IMG[key];
    if (!i) throw new Error("missing image " + key);
    const e = el("img", "abs" + (opts.smooth ? "" : " px"), parent);
    e.src = i.src;
    e.w = i.naturalWidth * scale; e.h = i.naturalHeight * scale;
    Object.assign(e.style, { left: px(x), top: px(y), width: px(e.w), height: px(e.h) });
    if (opts.origin) e.style.transformOrigin = opts.origin;
    return e;
  }
  function tf(e, o = {}) {
    let s = "";
    if (o.x || o.y) s += `translate(${(o.x || 0).toFixed(2)}px,${(o.y || 0).toFixed(2)}px) `;
    if (o.r) s += `rotate(${o.r.toFixed(3)}deg) `;
    const sx = (o.sx ?? 1) * (o.s ?? 1), sy = (o.sy ?? 1) * (o.s ?? 1);
    if (sx !== 1 || sy !== 1) s += `scale(${sx.toFixed(4)},${sy.toFixed(4)})`;
    e.style.transform = s;
    if (o.o !== undefined) e.style.opacity = clamp(o.o).toFixed(3);
    if (o.f !== undefined) e.style.filter = o.f;
  }
  function vis(e, v) { e.style.display = v ? "" : "none"; }
  function outline(w, c) {
    const out = [];
    for (let dx = -w; dx <= w; dx += w) for (let dy = -w; dy <= w; dy += w) if (dx || dy) out.push(`${dx}px ${dy}px 0 ${c}`);
    return out.join(",");
  }
  function text(parent, str, cls, css, ol) {
    const e = el("div", "abs nowrap " + (cls || ""), parent, css);
    rich(e, str);
    if (ol) e.style.textShadow = ol;
    return e;
  }
  // {g:..} {r:..} {y:..} 강조 + \n 줄바꿈 → 글자 단위 span (타자 효과용)
  function rich(container, str) {
    const spans = [];
    const re = /\{([gry]):([^}]*)\}/g;
    let last = 0, m;
    const parts = [];
    while ((m = re.exec(str))) {
      if (m.index > last) parts.push([null, str.slice(last, m.index)]);
      parts.push([m[1], m[2]]);
      last = re.lastIndex;
    }
    if (last < str.length) parts.push([null, str.slice(last)]);
    for (const [c, s] of parts) {
      for (const ch of s) {
        if (ch === "\n") { el("br", null, container); continue; }
        const sp = el("span", c ? "hl-" + c : null, container);
        sp.textContent = ch;
        spans.push(sp);
      }
    }
    return spans;
  }
  const OL = {
    wood: outline(3, "#6B3A1E") + ",0 6px 0 rgba(60,30,10,.35)",
    dark: outline(3, "#161616") + ",0 6px 0 rgba(0,0,0,.4)",
    red: outline(3, "#3E0808") + ",0 6px 0 rgba(0,0,0,.4)",
    green: outline(3, "#2A4512") + ",0 6px 0 rgba(0,0,0,.3)",
    ink: outline(4, "#1b1020") + ",0 8px 0 rgba(0,0,0,.45)",
    ink3: outline(3, "#1b1020") + ",0 6px 0 rgba(0,0,0,.45)",
  };

  // ───────────────────────── 공용 부품 ─────────────────────────
  const scenes = {};       // id → { root, update(lt) }
  const BUILD = {};        // id → (root, sc) => update(lt)

  // 4배 확대한 1x 배경(480×270 → 1920×1080)
  function backdrop(key, parent) {
    const e = sprite(key, parent, 0, 0, 4);
    return e;
  }
  function clouds(parent, list) {
    return list.map((c) => ({ ...c, e: sprite(c.key, parent, 0, 0, c.s || 4) }));
  }
  function updateClouds(cl, t) {
    for (const c of cl) {
      const span = W + c.e.w + 200;
      const x = ((c.x + t * c.v) % span + span) % span - c.e.w - 100;
      tf(c.e, { x, y: c.y });
    }
  }
  const CLOUDS = [
    { key: "cloud_a", x: 160, y: 120, v: 14 }, { key: "cloud_b", x: 1180, y: 80, v: 9 },
    { key: "cloud_c", x: 760, y: 250, v: 20 }, { key: "cloud_d", x: 1600, y: 330, v: 16 },
    { key: "cloud_c", x: 300, y: 420, v: 11, s: 3 },
  ];

  // 떠다니는 불씨(전역 시간 기준이라 장면이 바뀌어도 이어진다)
  function embers(parent, n, seed, palette) {
    const r = rng(seed);
    const list = [];
    for (let i = 0; i < n; i++) {
      const size = [4, 4, 8, 8, 12][Math.floor(r() * 5)];
      const e = el("div", "abs", parent, { width: px(size), height: px(size), background: palette[Math.floor(r() * palette.length)] });
      list.push({ e, x: r() * W, sp: 18 + r() * 40, ph: r() * 10, amp: 10 + r() * 30, off: r() * (H + 200), o: 0.25 + r() * 0.55 });
    }
    return (t) => {
      for (const p of list) {
        const y = H + 60 - ((t * p.sp + p.off) % (H + 200));
        const x = p.x + Math.sin(t * 0.7 + p.ph) * p.amp;
        tf(p.e, { x: Math.round(x / 4) * 4, y: Math.round(y / 4) * 4, o: p.o * (0.6 + 0.4 * Math.sin(t * 2 + p.ph)) });
      }
    };
  }

  // 픽셀 불꽃놀이 (1x 캔버스 → 4배)
  function fireworks(parent, bursts) {
    const cv = el("canvas", "abs px", parent, { width: px(W), height: px(H) });
    cv.width = W / 4; cv.height = H / 4;
    const ctx = cv.getContext("2d");
    const prepared = bursts.map((b, i) => {
      const r = rng(1000 + i * 31);
      const parts = [];
      for (let k = 0; k < (b.n || 28); k++) {
        const a = (k / (b.n || 28)) * Math.PI * 2 + r() * 0.2;
        parts.push({ a, v: 34 + r() * 18 });
      }
      return { ...b, parts };
    });
    return (lt) => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      for (const b of prepared) {
        const rise = 0.45;
        const tt = lt - b.t;
        if (tt < 0 || tt > rise + 1.5) continue;
        if (tt < rise) { // 올라가는 꼬리
          const y = lerp(cv.height + 4, b.y, ease.out(tt / rise));
          ctx.fillStyle = "#fff6c8"; ctx.fillRect(Math.round(b.x), Math.round(y), 1, 2);
          continue;
        }
        const tau = tt - rise, fade = 1 - tau / 1.5;
        for (const p of b.parts) {
          const d = p.v * (1 - Math.exp(-tau * 2.2)) / 2.2 * 2.2;
          const x = b.x + Math.cos(p.a) * d, y = b.y + Math.sin(p.a) * d + 9 * tau * tau;
          ctx.globalAlpha = clamp(fade);
          ctx.fillStyle = b.c; ctx.fillRect(Math.round(x), Math.round(y), 1, 1);
          ctx.globalAlpha = clamp(fade * 0.5);
          ctx.fillStyle = b.c2 || "#fff"; ctx.fillRect(Math.round(x - Math.cos(p.a) * 2), Math.round(y - Math.sin(p.a) * 2), 1, 1);
        }
        ctx.globalAlpha = 1;
      }
    };
  }

  // 반짝이(픽셀 십자 별)
  function sparkles(parent, n, seed, area, color = "#fff7c2") {
    const r = rng(seed);
    const list = [];
    for (let i = 0; i < n; i++) {
      const g = el("div", "abs", parent);
      const s = [4, 8][Math.floor(r() * 2)];
      el("div", "abs", g, { left: px(-s / 2), top: px(-s * 1.5), width: px(s), height: px(s * 3), background: color });
      el("div", "abs", g, { left: px(-s * 1.5), top: px(-s / 2), width: px(s * 3), height: px(s), background: color });
      list.push({ g, x: area[0] + r() * (area[2] - area[0]), y: area[1] + r() * (area[3] - area[1]), ph: r() * 6, f: 1.5 + r() * 2 });
    }
    return (lt, alpha = 1) => {
      for (const p of list) {
        const k = Math.max(0, Math.sin(lt * p.f + p.ph));
        tf(p.g, { x: p.x, y: p.y, s: 0.4 + k * 0.8, o: k * alpha });
      }
    };
  }

  // 1x 캔버스 디더 비네트(장면 전체를 덮는 어두운 점 패턴)
  function vignette(parent, key = "vignette_169", o = 1) {
    const e = backdrop(key, parent);
    e.style.opacity = o;
    return e;
  }

  // ───────────────────────── 휴대폰 ─────────────────────────
  const PHONE = { sl: 420, st: 40, s: 0.92 }; // 화면 왼쪽 위(스테이지 좌표)와 배율
  function makePhone(parent, sl, st, s) {
    const root = el("div", "abs", parent, { left: px(sl - 14 * s), top: px(st - 20 * s), width: px(421 * s), height: px(892 * s) });
    const body = el("div", "phone", root, { transform: `scale(${s})` });
    el("div", "slit", body);
    const scr = el("div", "screen", body);
    return {
      root, scr, s, sl, st,
      X: (x) => sl + x * s, Y: (y) => st + y * s, // 화면 좌표 → 스테이지 좌표
      cx: sl + 393 * s / 2, cy: st + 852 * s / 2,
    };
  }
  // 화면 전환 순서: [{t, key|build, tr:'fade'|'slide'|'cut'}]
  function screenSeq(ph, items) {
    const layers = items.map((it) => {
      let e;
      if (it.key) { e = el("img", "abs scrimg", ph.scr); e.src = IMG[it.key].src; }
      else { e = el("div", "abs scrimg", ph.scr); e._upd = it.build(e); }
      vis(e, false);
      return e;
    });
    return (lt) => {
      let cur = 0;
      for (let i = 0; i < items.length; i++) if (lt >= items[i].t) cur = i;
      const it = items[cur];
      const dur = it.dur ?? (it.tr === "slide" ? 0.38 : 0.2);
      const p = cur === 0 ? 1 : seg(lt, it.t, it.t + dur);
      layers.forEach((e, i) => vis(e, i === cur || (i === cur - 1 && p < 1)));
      const ce = layers[cur], pe = layers[cur - 1];
      ce.style.zIndex = 2; if (pe) pe.style.zIndex = 1;
      if (it.tr === "slide" && p < 1) {
        tf(ce, { x: (1 - ease.out(p)) * 393 });
        tf(pe, { x: -ease.out(p) * 140, o: 1 - 0.6 * p });
      } else if (it.tr === "cut" || p >= 1) {
        tf(ce, { o: 1 });
      } else {
        tf(ce, { o: ease.inOut(p) });
        if (pe) tf(pe, { o: 1 });
      }
      if (ce._upd) ce._upd(lt - it.t, lt);
      if (pe && pe._upd && p < 1) pe._upd(lt - items[cur - 1].t, lt);
      return cur;
    };
  }
  function makeTap(parent) {
    const dot = el("div", "tapdot", parent), ring = el("div", "tapring", parent);
    return (lt, taps) => {
      let best = null;
      for (const tp of taps) if (lt >= tp.t - 0.32 && lt <= tp.t + 0.5) best = tp;
      if (!best) { vis(dot, false); vis(ring, false); return; }
      vis(dot, true); vis(ring, true);
      const x = typeof best.x === "function" ? best.x(lt) : best.x;
      const y = typeof best.y === "function" ? best.y(lt) : best.y;
      const a = seg(lt, best.t - 0.32, best.t - 0.12), d = seg(lt, best.t + 0.18, best.t + 0.5);
      const press = lt >= best.t - 0.04 && lt < best.t + 0.12 ? 0.8 : 1;
      dot.style.left = px(x); dot.style.top = px(y);
      tf(dot, { s: lerp(0.5, 1, ease.out(a)) * press, o: ease.out(a) * (1 - d) * 0.92 });
      const rp = seg(lt, best.t, best.t + 0.42);
      ring.style.left = px(x); ring.style.top = px(y);
      tf(ring, { s: lerp(0.5, 2.4, ease.out(rp)), o: rp > 0 ? (1 - rp) * 0.9 : 0 });
    };
  }
  function makeTyping(parent, rect, str) {
    const box = el("div", "typebox", parent, { left: px(rect[0]), top: px(rect[1]), width: px(rect[2] - rect[0] + 1), height: px(rect[3] - rect[1] + 1) });
    const tx = el("span", null, box), caret = el("span", "caret", box);
    const chars = Array.from(str);
    return (lt, t0, t1, show = true) => {
      vis(box, show);
      if (!show) return;
      const n = Math.floor(seg(lt, t0, t1) * chars.length + 1e-6);
      tx.textContent = chars.slice(0, n).join("");
      caret.style.opacity = Math.floor(lt * 3) % 2 === 0 ? 1 : 0;
    };
  }
  // 화면 일부 강조(폰 화면 좌표)
  function flashRect(parent, r, color) {
    const e = el("div", "abs", parent, { left: px(r[0]), top: px(r[1]), width: px(r[2] - r[0]), height: px(r[3] - r[1]), background: color, zIndex: 20, borderRadius: "4px" });
    return (lt, t0, dur = 0.5) => {
      const k = seg(lt, t0, t0 + dur);
      vis(e, k > 0 && k < 1);
      tf(e, { o: (1 - k) * 0.75 });
    };
  }
  // 확대 콜아웃: 폰 화면의 src 영역을 오른쪽 패널에 크게 보여준다
  function makeCallout(parent, ph, cfg) {
    const [x0, y0, x1, y1] = cfg.src;
    const sw = x1 - x0, sh = y1 - y0;
    const z = Math.min(cfg.maxW / sw, cfg.maxH / sh);
    const w = Math.round(sw * z), h = Math.round(sh * z);
    const bx = cfg.x, by = cfg.y + Math.round((cfg.maxH - h) / 2);
    // 연결 사다리꼴
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", W); svg.setAttribute("height", H);
    svg.style.cssText = "position:absolute;left:0;top:0;";
    parent.appendChild(svg);
    const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    const sx0 = ph.X(x0), sy0 = ph.Y(y0), sx1 = ph.X(x1), sy1 = ph.Y(y1);
    poly.setAttribute("points", `${sx1},${sy0} ${bx},${by} ${bx},${by + h} ${sx1},${sy1}`);
    poly.setAttribute("fill", "rgba(255,240,200,0.10)");
    svg.appendChild(poly);
    const hl = el("div", "hlrect", ph.scr, { left: px(x0 - 3), top: px(y0 - 3), width: px(sw), height: px(sh) });
    const box = el("div", "callout", parent, { left: px(bx), top: px(by), width: px(w), height: px(h) });
    const inner = el("div", "abs", box, { width: px(w), height: px(h), transformOrigin: "50% 50%" });
    const im = el("img", "abs px", inner, { width: px(393 * z), height: px(852 * z), left: px(-x0 * z), top: px(-y0 * z) });
    im.src = IMG[cfg.key].src;
    if (cfg.extra) cfg.extra(inner, z, x0, y0);
    return (lt) => {
      const a = seg(lt, cfg.t0, cfg.t0 + 0.4), b = seg(lt, cfg.t1 - 0.25, cfg.t1);
      const on = lt >= cfg.t0 && lt < cfg.t1;
      vis(box, on); vis(svg, on); vis(hl, on);
      if (!on) return;
      const o = ease.out(a) * (1 - ease.in(b));
      tf(box, { s: lerp(0.86, 1, ease.outBack(a)), y: lerp(20, 0, ease.out(a)), o });
      tf(inner, { s: 1 + 0.03 * seg(lt, cfg.t0, cfg.t1) });
      svg.style.opacity = o; hl.style.opacity = o;
    };
  }

  // 플레이 장면 공통 배경 + 폰 + STEP 라벨
  function playBase(root, sc, opts = {}) {
    const bg = el("div", "fill", root, { background: "radial-gradient(ellipse at 32% 45%, #3b1d33 0%, #1d0f22 45%, #0c0711 100%)" });
    const glow = el("div", "abs", root, { left: px(PHONE.sl - 260), top: px(PHONE.st - 120), width: px(880), height: px(1060),
      background: "radial-gradient(ellipse at center, rgba(255,140,60,.22) 0%, rgba(120,40,160,.12) 45%, transparent 70%)" });
    vignette(root, "vignette_soft_169", 0.9);
    const emb = embers(root, 34, 77, ["#ff9a3c", "#ffcf6b", "#b65cff", "#ff6a3c"]);
    const ph = opts.noPhone ? null : makePhone(root, PHONE.sl, PHONE.st, PHONE.s);
    let lab = null;
    if (sc.label) {
      lab = el("div", "abs", root, { left: px(980), top: px(96) });
      text(lab, sc.label.step, "t36", { left: 0, top: 0, color: "#FFE14A" }, OL.ink3);
      text(lab, sc.label.title, "t60", { left: 0, top: 50 }, OL.ink);
    }
    return {
      ph,
      update(lt, t) {
        emb(t);
        tf(glow, { o: 0.8 + 0.2 * Math.sin(t * 1.3) });
        if (lab) { const a = seg(lt, 0.05, 0.5); tf(lab, { x: lerp(40, 0, ease.out(a)), o: ease.out(a) }); }
      },
    };
  }

  // 아이템 획득 화면(동굴 + 아이템 + 회색 대화창)
  function itemGetBuild(itemKey, msg, opts = {}) {
    return (e) => {
      sprite(opts.bgKey || "cave_blank", e, 0, 0, 1, { smooth: true });
      const rays = el("div", "abs", e, { left: px(196 - 240), top: px(390 - 240), width: px(480), height: px(480), borderRadius: "50%",
        background: "repeating-conic-gradient(from 0deg, rgba(255,240,170,.28) 0deg 10deg, rgba(255,240,170,0) 10deg 30deg)" });
      const halo = el("div", "abs", e, { left: px(196 - 150), top: px(390 - 150), width: px(300), height: px(300), borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,245,190,.75) 0%, rgba(255,220,120,.25) 45%, transparent 70%)" });
      const i = IMG[itemKey];
      const sc = opts.scale || 1;
      const it = sprite(itemKey, e, 196 - (i.naturalWidth * sc) / 2, 390 - (i.naturalHeight * sc) / 2, sc);
      let box = null;
      if (msg) {
        box = sprite("tb_suit_get", e, 19, 589, 1, { smooth: true });
        const cover = el("div", "abs", e, { left: px(19 + 14), top: px(589 + 14), width: px(355 - 28), height: px(153 - 28), background: "#404040",
          display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", font: '700 16px/24px "Galmuri11"', color: "#fff", whiteSpace: "pre" });
        cover.textContent = msg;
        box._cover = cover;
      }
      return (lt) => {
        const a = seg(lt, 0, 0.45);
        tf(rays, { r: lt * 40, o: 0.9 * ease.out(a) });
        tf(halo, { s: 0.9 + 0.08 * Math.sin(lt * 6), o: ease.out(a) });
        const gone = opts.collect !== undefined ? seg(lt, opts.collect, opts.collect + 0.08) : 0;
        tf(it, { s: lerp(0.3, 1, ease.outBack(a)), y: Math.sin(lt * 4) * 4, o: 1 - gone });
        if (box) { const b = seg(lt, 0.15, 0.45); tf(box, { y: lerp(20, 0, ease.out(b)), o: b }); tf(box._cover, { y: lerp(20, 0, ease.out(b)), o: b }); }
      };
    };
  }

  // ───────────────────────── A. 스토리 ─────────────────────────
  function campus(root, sc, withRed) {
    const cam = el("div", "fill", root, { transformOrigin: "50% 62%" });
    backdrop("bd_sky_dome", cam);
    const cl = clouds(cam, CLOUDS);
    const red = el("div", "fill", cam, { background: "#B83B51", mixBlendMode: "multiply", opacity: 0 });
    const flash = el("div", "fill", root, { background: "#fff", opacity: 0 });
    let swarm = [];
    if (withRed) {
      const r = rng(5);
      for (let i = 0; i < 9; i++) {
        const e = sprite(i % 2 ? "bug_b_t" : "bug_a_t", cam, 0, 0, i % 2 ? 1.2 : 0.8);
        swarm.push({ e, y: 90 + r() * 360, d: 0.35 + r() * 1.6, sp: 900 + r() * 500, amp: 20 + r() * 40, ph: r() * 6 });
      }
    }
    const vg = vignette(root, "vignette_soft_169", 0);
    return (lt) => {
      const t = sc.start + lt;
      const k = seg(t, 0, 7);
      let [sx, sy] = [0, 0];
      if (withRed) [sx, sy] = shake(lt, beat(sc, "hit"), 22, 0.6, 3);
      tf(cam, { s: 1 + 0.06 * ease.sine(k), x: sx, y: sy });
      updateClouds(cl, t);
      if (withRed) {
        const h = beat(sc, "hit");
        red.style.opacity = (0.88 * ease.out(seg(lt, h, h + 0.5))).toFixed(3);
        flash.style.opacity = (0.7 * (1 - seg(lt, h, h + 0.18)) * (lt >= h ? 1 : 0)).toFixed(3);
        vg.style.opacity = (0.8 * seg(lt, h, h + 0.6)).toFixed(3);
        for (const b of swarm) {
          const tt = lt - b.d;
          vis(b.e, tt > 0);
          if (tt <= 0) continue;
          tf(b.e, { x: -160 + tt * b.sp, y: b.y + Math.sin(tt * 7 + b.ph) * b.amp, r: Math.sin(tt * 18) * 12 });
        }
      }
    };
  }
  BUILD.peace = (root, sc) => campus(root, sc, false);
  BUILD.zombie = (root, sc) => campus(root, sc, true);

  BUILD.bugs = (root, sc) => {
    const cam = el("div", "fill", root, { transformOrigin: "50% 45%" });
    el("div", "fill", cam, { left: "-80px", top: "-60px", right: "-80px", bottom: "-60px", background: "linear-gradient(180deg, #8E8DAF 0%, #9A7896 50%, #A56781 100%)" });
    const gx = 960 - 512, gy = 470 - 426;
    const base = sprite("bug_glitch_bg", cam, gx, gy, 4); base.style.mixBlendMode = "screen";
    const cy1 = sprite("bug_glitch_bg", cam, gx, gy, 4); cy1.style.mixBlendMode = "screen"; cy1.style.filter = "hue-rotate(160deg) saturate(2)";
    const sl1 = sprite("bug_glitch_bg", cam, gx, gy, 4), sl2 = sprite("bug_glitch_bg", cam, gx, gy, 4);
    sl1.style.mixBlendMode = sl2.style.mixBlendMode = "screen";
    const big = sprite("bug_a_t", cam, 0, 0, 4), small = sprite("bug_b_t", cam, 0, 0, 4);
    vignette(root, "vignette_169", 0.85);
    return (lt) => {
      tf(cam, { s: 1.0 + 0.05 * ease.sine(seg(lt, 0, 4)) });
      const step = Math.floor(lt * 9);
      const g = hash(step * 3 + 1) > 0.55;
      tf(base, { x: g ? (hash(step) - 0.5) * 16 : 0 });
      tf(cy1, { x: 10 + (g ? 8 : 0), o: 0.45 });
      [sl1, sl2].forEach((s, i) => {
        const y0 = Math.floor(hash(step * 7 + i) * 780), hh = 30 + Math.floor(hash(step * 11 + i) * 90);
        s.style.clipPath = `inset(${Math.floor(y0 / 4) * 4}px 0 ${Math.max(0, 852 - y0 - hh)}px 0)`;
        tf(s, { x: (hash(step * 5 + i) - 0.5) * 60, o: g ? 0.9 : 0 });
      });
      // 벌레: 화면 밖에서 기어 들어와 꿈틀
      const a = ease.out(seg(lt, 0.0, 1.7)), b = ease.out(seg(lt, 0.35, 2.0));
      const wob = (s) => Math.abs(Math.sin(lt * 16 + s)) * 8;
      tf(big, { x: lerp(-560, 560, a), y: 330 - wob(0), r: Math.sin(lt * 16) * 5, s: 1 + 0.03 * Math.sin(lt * 5) });
      tf(small, { x: lerp(2000, 1200, b), y: 520 - wob(1.4), r: Math.sin(lt * 16 + 1.4) * 6 });
    };
  };

  BUILD.help = (root, sc) => {
    const cam = el("div", "fill", root, { transformOrigin: "50% 40%" });
    el("div", "fill", cam, { left: "-80px", top: "-60px", right: "-80px", bottom: "-60px", background: "radial-gradient(ellipse at 50% 45%, #C5465A 0%, #B23A50 45%, #6E1E2B 100%)" });
    const sil = sprite("silhouette", cam, 960 - 666, 20, 3.4);
    sil.style.mixBlendMode = "multiply";
    const slams = [
      { b: "slam1", x: 250, y: 230, r: -16 }, { b: "slam2", x: 1440, y: 190, r: 14 }, { b: "slam3", x: 300, y: 560, r: -6 },
    ].map((s) => ({ ...s, e: sprite("hand_dark_t", cam, s.x, s.y, 1.9) }));
    slams.forEach((s) => (s.e.style.mixBlendMode = "multiply"));
    const dark = el("div", "fill", root, { background: "radial-gradient(ellipse at center, transparent 40%, rgba(40,0,8,.75) 100%)" });
    vignette(root, "vignette_169", 0.8);
    return (lt) => {
      let sx = 0, sy = 0;
      for (const s of slams) { const [a, b] = shake(lt, beat(sc, s.b), 26, 0.45, s.x); sx += a; sy += b; }
      tf(cam, { s: 1 + 0.07 * ease.sine(seg(lt, 0, 5)), x: sx, y: sy });
      for (const s of slams) {
        const t0 = beat(sc, s.b);
        const k = seg(lt, t0, t0 + 0.14);
        vis(s.e, lt >= t0);
        tf(s.e, { s: lerp(1.5, 1, ease.out(k)), r: s.r, o: lerp(0.4, 1, k) * (1 - 0.25 * seg(lt, t0 + 1.2, t0 + 3)) });
      }
      const flick = 0.85 + 0.15 * noise1(lt * 12, 4);
      dark.style.opacity = flick.toFixed(3);
    };
  };

  BUILD.danger = (root, sc) => {
    el("div", "fill", root, { background: "radial-gradient(ellipse at 50% 40%, #2a2226 0%, #0d0a0c 100%)" });
    const far = sprite("monkey_shadow_clean", root, 0, 120, 2), farG = [sprite("monkey_shadow_clean", root, 0, 120, 2)];
    const near = sprite("monkey_shadow_clean", root, 0, 260, 4);
    const ghosts = [0, 1, 2].map(() => sprite("monkey_shadow_clean", root, 0, 260, 4));
    const siren = el("div", "fill", root, { mixBlendMode: "screen" });
    const sparks = el("div", "fill", root);
    const sp = Array.from({ length: 14 }, () => el("div", "abs", sparks, { width: "8px", height: "8px", background: "#ffe08a" }));
    vignette(root, "vignette_169", 1);
    return (lt) => {
      const nx = (tt) => lerp(1500, 200, ease.sine(seg(tt, -0.2, 3.2)));
      tf(near, { x: nx(lt), y: Math.abs(Math.sin(lt * 9)) * -10 });
      ghosts.forEach((g, i) => tf(g, { x: nx(lt - 0.07 * (i + 1)), y: Math.abs(Math.sin((lt - 0.07 * (i + 1)) * 9)) * -10, o: 0.32 - i * 0.09 }));
      const fx = (tt) => lerp(200, 1500, seg(tt, 0, 3.2));
      tf(far, { x: fx(lt), sx: -1, o: 0.7 });
      tf(farG[0], { x: fx(lt - 0.08), sx: -1, o: 0.25 });
      const pulse = Math.pow(0.5 + 0.5 * Math.sin(lt * Math.PI * 4), 2);
      const cx = 50 + 40 * Math.sin(lt * 2.2);
      siren.style.background = `radial-gradient(ellipse at ${cx}% 10%, rgba(255,40,40,${(0.85 * pulse).toFixed(3)}) 0%, rgba(255,0,0,${(0.4 * pulse).toFixed(3)}) 45%, transparent 75%)`;
      sp.forEach((s, i) => {
        const st = Math.floor(lt * 6 + i * 0.37);
        const on = hash(st * 13 + i) > 0.6;
        const k = (lt * 6 + i * 0.37) % 1;
        vis(s, on);
        if (on) tf(s, { x: 300 + hash(st * 5 + i) * 1300, y: 140 + hash(st * 9 + i) * 500 + k * 60, o: 1 - k });
      });
    };
  };

  function greenStage(root, from, to) {
    const bg = el("div", "fill", root, { background: `radial-gradient(ellipse at 50% 45%, ${from} 0%, ${to} 100%)` });
    const rays = el("div", "abs", root, { left: px(960 - 1400), top: px(450 - 1400), width: px(2800), height: px(2800), borderRadius: "50%",
      background: "repeating-conic-gradient(from 0deg, rgba(255,255,220,.07) 0deg 8deg, transparent 8deg 22deg)" });
    return { bg, rays };
  }

  function silhouetteFilter(c) {
    return `brightness(0) drop-shadow(6px 0 0 ${c}) drop-shadow(-6px 0 0 ${c}) drop-shadow(0 6px 0 ${c}) drop-shadow(0 -6px 0 ${c}) drop-shadow(0 0 24px ${c})`;
  }
  const HERO_POS = { L: { x: 640, key: "yuloong_t", name: "율웅이" }, R: { x: 1280, key: "myungwoong_t", name: "명웅이" } };
  const HERO_S = 3, HERO_FEET = 760;

  BUILD.hero_needed = (root, sc) => {
    const black = el("div", "fill", root, { background: "#000" });
    const g = greenStage(root, "#5C9A66", "#284A30");
    root.insertBefore(black, root.firstChild);
    const spk = sparkles(root, 22, 9, [120, 80, 1800, 760]);
    const sil = ["L", "R"].map((k, i) => {
      const p = HERO_POS[k];
      const e = sprite(p.key, root, p.x - (92 * HERO_S) / 2, HERO_FEET - 147 * HERO_S, HERO_S);
      e.style.filter = silhouetteFilter("#bff5c8");
      const q = text(root, "?", "t96", { left: px(p.x - 30), top: px(HERO_FEET - 147 * HERO_S - 130), color: "#FFE14A" }, OL.ink);
      return { e, q, i };
    });
    return (lt) => {
      const a = ease.inOut(seg(lt, 0, 0.9));
      g.bg.style.opacity = a; g.rays.style.opacity = a;
      tf(g.rays, { r: lt * 6, o: a });
      spk(lt, a);
      for (const s of sil) {
        const k = ease.out(seg(lt, 0.5 + s.i * 0.2, 1.6 + s.i * 0.2));
        tf(s.e, { y: lerp(260, 0, k) + Math.sin(lt * 2 + s.i) * 6, o: k });
        tf(s.q, { y: Math.sin(lt * 3 + s.i) * 10, s: lerp(0.3, 1, ease.outBack(seg(lt, 1.3 + s.i * 0.2, 1.7 + s.i * 0.2))), o: seg(lt, 1.3 + s.i * 0.2, 1.5 + s.i * 0.2) });
      }
    };
  };

  BUILD.heroes = (root, sc) => {
    const g = greenStage(root, "#5C9A66", "#284A30");
    const spk = sparkles(root, 22, 9, [120, 80, 1800, 760]);
    const flash = el("div", "fill", root, { background: "#fff", opacity: 0 });
    const hs = ["L", "R"].map((k) => {
      const p = HERO_POS[k];
      const wrap = el("div", "abs", root, { left: px(p.x - (92 * HERO_S) / 2), top: px(HERO_FEET - 147 * HERO_S), transformOrigin: "50% 100%" });
      const e = sprite(p.key, wrap, 0, 0, HERO_S);
      const sil = sprite(p.key, wrap, 0, 0, HERO_S); sil.style.filter = silhouetteFilter("#bff5c8");
      const plate = el("div", "plank", root, { left: px(p.x - 110), top: px(HERO_FEET + 6), width: px(220), height: px(64) });
      text(plate, p.name, "t36", { left: 0, top: 10, width: "220px", textAlign: "center" }, OL.wood);
      const dust = Array.from({ length: 6 }, () => el("div", "abs", root, { width: "16px", height: "16px", background: "#e9f7dc" }));
      return { k, p, wrap, e, sil, plate, dust };
    });
    return (lt) => {
      tf(g.rays, { r: (sc.start - SC.hero_needed.start + lt) * 6 });
      spk(lt + 3);
      flash.style.opacity = (0.55 * (1 - seg(lt, 0.12, 0.4)) * (lt >= 0.12 ? 1 : 0)).toFixed(3);
      for (const h of hs) {
        const j = beat(sc, h.k === "L" ? "jumpL" : "jumpR"), l = beat(sc, h.k === "L" ? "landL" : "landR");
        const reveal = seg(lt, j - 0.05, j + 0.15);
        h.sil.style.opacity = (1 - reveal).toFixed(3);
        const jp = seg(lt, j, l);
        const hop = Math.sin(Math.PI * jp) * 200;
        const sq = seg(lt, l, l + 0.25);
        const squash = lt >= l ? Math.sin(Math.PI * sq) * (1 - sq) : 0;
        const idle = lt > l + 0.3 ? Math.abs(Math.sin((lt - l) * 3.2)) * 10 : 0;
        tf(h.wrap, { y: -hop - idle + Math.sin(lt * 2) * 0, sx: 1 + squash * 0.18, sy: 1 - squash * 0.16 });
        const pk = seg(lt, l + 0.05, l + 0.4);
        tf(h.plate, { s: lerp(0.4, 1, ease.outBack(pk)), o: pk });
        h.dust.forEach((d, i) => {
          const dk = seg(lt, l, l + 0.5);
          const dir = i < 3 ? -1 : 1;
          vis(d, dk > 0 && dk < 1);
          tf(d, { x: h.p.x + dir * (30 + dk * (60 + i * 25)), y: HERO_FEET - 10 - dk * (20 + (i % 3) * 18), o: 1 - dk, s: 1 + dk });
        });
      }
    };
  };

  BUILD.professor = (root, sc) => {
    el("div", "fill", root, { background: "radial-gradient(ellipse at 30% 60%, #3E6A47 0%, #2B4830 50%, #142418 100%)" });
    const spot = el("div", "abs", root, { left: px(-100), top: px(160), width: px(1000), height: px(900), background: "radial-gradient(ellipse at center, rgba(255,250,210,.22) 0%, transparent 65%)" });
    const prof = sprite("professor_t", root, 230, 860 - 133 * 4, 4, { origin: "50% 100%" });
    const sw = sprite("sword_clean", root, 1240, 210, 3);
    sw.style.filter = silhouetteFilter("#c9ffd6");
    const q = text(root, "?", "t96", { left: px(1440), top: px(150), color: "#FFE14A" }, OL.ink);
    const spk = sparkles(root, 14, 21, [1100, 120, 1800, 700], "#e9ffd2");
    vignette(root, "vignette_soft_169", 0.9);
    return (lt) => {
      const a = ease.out(seg(lt, 0, 0.65));
      tf(prof, { x: lerp(-700, 0, a), y: Math.sin(lt * 2.4) * 6, sy: 1 + 0.015 * Math.sin(lt * 2.4) });
      tf(spot, { o: a });
      const b = seg(lt, 2.7, 3.3);
      tf(sw, { y: lerp(40, 0, ease.out(b)) + Math.sin(lt * 2) * 10, r: -8 + Math.sin(lt * 1.5) * 3, o: b });
      tf(q, { s: lerp(0.3, 1, ease.outBack(seg(lt, 3.0, 3.4))), y: Math.sin(lt * 3) * 8, o: seg(lt, 3.0, 3.2) });
      spk(lt, b);
    };
  };

  BUILD.need_you = (root, sc) => {
    const cover = sprite("window_hands", root, 960 - (393 * 4.9) / 2, 540 - (658 * 4.9) / 2, 4.9);
    cover.style.filter = "blur(14px) brightness(.35)";
    const cam = el("div", "fill", root, { transformOrigin: "50% 50%" });
    const main = sprite("window_hands", cam, 960 - (393 * 1.64) / 2, 0, 1.64);
    const shade = el("div", "fill", root, { background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,.7) 100%)" });
    vignette(root, "vignette_169", 0.7);
    const btn = el("div", "plank", root, { left: px(960 - 190), top: px(560), width: px(380), height: px(110), transformOrigin: "50% 50%" });
    text(btn, "지금 플레이", "t48", { left: 0, top: 24, width: "380px", textAlign: "center" }, OL.wood);
    const flash = el("div", "fill", root, { background: "#fff", opacity: 0 });
    const tap = makeTap(root);
    return (lt) => {
      const p = beat(sc, "press");
      tf(cam, { s: 1 + 0.08 * ease.sine(seg(lt, 0, 3.6)), x: noise1(lt * 2, 3) * 6 });
      const a = seg(lt, 0.7, 1.1);
      const pressed = lt >= p && lt < p + 0.14 ? 0.92 : 1;
      tf(btn, { s: lerp(0.5, 1, ease.outBack(a)) * pressed * (1 + 0.03 * Math.sin(lt * 5) * (lt < p ? 1 : 0)), o: a });
      tap(lt, [{ t: p, x: 960, y: 615 }]);
      flash.style.opacity = (0.8 * (1 - seg(lt, p + 0.1, p + 0.5)) * (lt >= p + 0.1 ? 1 : 0)).toFixed(3);
      shade.style.opacity = (0.85 + 0.15 * noise1(lt * 8, 2)).toFixed(3);
    };
  };

  // ───────────────────────── B. 타이틀 ─────────────────────────
  BUILD.title = (root, sc) => {
    const cam = el("div", "fill", root, { transformOrigin: "50% 60%" });
    const bg = el("div", "fill", cam);
    backdrop("bd_cave_dome", bg);
    const mk = sprite("monkey_infected_t", bg, 1190, 712 - 92 * 2.6 - 6, 2.6, { origin: "50% 100%" });
    vignette(bg, "vignette_169", 1);
    const emb = embers(root, 28, 13, ["#ff9a3c", "#ffcf6b", "#b65cff"]);
    const LS = 1.5, logoW = 509 * LS;
    const lg = el("div", "abs", root, { left: px(960 - logoW / 2), top: px(60), width: px(logoW), height: px(172 * LS) });
    const base = sprite("logo_dark", lg, 0, 0, LS);
    const ca = sprite("logo_dark", lg, 0, 0, LS); ca.style.mixBlendMode = "screen"; ca.style.filter = "sepia(1) saturate(6) hue-rotate(150deg)";
    const cb = sprite("logo_dark", lg, 0, 0, LS); cb.style.mixBlendMode = "screen"; cb.style.filter = "sepia(1) saturate(6) hue-rotate(-40deg)";
    const slices = [0, 1, 2].map(() => sprite("logo_dark", lg, 0, 0, LS));
    const sub = text(root, "- 에브리타임 (자과캠) 편 -", "t60", { left: 0, top: px(880), width: px(W), textAlign: "center" }, OL.ink);
    const info = text(root, "온라인 방탈출 · 2024 소프트웨어융합대학 할로윈 파티", "t36", { left: 0, top: px(970), width: px(W), textAlign: "center", color: "#E9D9FF" }, OL.ink3);
    return (lt) => {
      tf(cam, { s: 1.04 - 0.04 * ease.out(seg(lt, 0, 6)) });
      emb(sc.start + lt);
      tf(mk, { x: lerp(120, 0, ease.out(seg(lt, 1.0, 1.8))), y: Math.abs(Math.sin(lt * 2.6)) * -10, r: Math.sin(lt * 2.6) * 3, o: seg(lt, 1.0, 1.4) });
      const L = beat(sc, "logo");
      const a = seg(lt, L, L + 0.5);
      const glitchOn = (lt >= L && lt < L + 0.7) || (lt % 1.9 > 1.82 && lt > 1.5);
      const st = Math.floor(lt * 20);
      tf(lg, { s: lerp(1.25, 1, ease.out(a)), o: lt >= L ? (glitchOn ? (hash(st) > 0.2 ? 1 : 0.4) : 1) : 0 });
      const off = glitchOn ? 10 + hash(st * 3) * 12 : 2;
      tf(ca, { x: -off, o: glitchOn ? 0.7 : 0.25 }); tf(cb, { x: off, o: glitchOn ? 0.7 : 0.25 });
      slices.forEach((s, i) => {
        const y0 = Math.floor(hash(st * 7 + i) * 230), hh = 14 + Math.floor(hash(st * 11 + i) * 40);
        s.style.clipPath = `inset(${y0}px 0 ${Math.max(0, 258 - y0 - hh)}px 0)`;
        tf(s, { x: (hash(st * 5 + i) - 0.5) * 80, o: glitchOn ? 1 : 0 });
      });
      const b = seg(lt, beat(sc, "sub"), beat(sc, "sub") + 0.5), c = seg(lt, beat(sc, "info"), beat(sc, "info") + 0.5);
      tf(sub, { y: lerp(24, 0, ease.out(b)), o: b });
      tf(info, { y: lerp(24, 0, ease.out(c)), o: c });
    };
  };

  // ───────────────────────── C. 세계관 ─────────────────────────
  BUILD.select_hero = (root, sc) => {
    const cam = el("div", "fill", root);
    backdrop("bd_sky", cam);
    const cl = clouds(cam, CLOUDS);
    const head = el("div", "plank", root, { left: px(960 - 330), top: px(36), width: px(660), height: px(108) });
    text(head, "SELECT YOUR HERO", "t60", { left: 0, top: 18, width: "660px", textAlign: "center" }, OL.wood);
    const cards = [
      { x: 330, key: "myungwoong_t", name: "명웅이", tag: "명륜의 영웅", line: "인문사회과학적 지식", b: "cardL", pick: "pickL" },
      { x: 1050, key: "yuloong_t", name: "율웅이", tag: "율전의 영웅", line: "자연과학적 지식", b: "cardR", pick: "pickR" },
    ].map((c) => {
      const card = el("div", "plank", root, { left: px(c.x), top: px(244), width: px(540), height: px(570), transformOrigin: "50% 100%" });
      const glow = el("div", "abs", card, { left: "-14px", top: "-14px", width: "568px", height: "608px", borderRadius: "14px", boxShadow: "0 0 0 8px #FFE14A, 0 0 40px 10px rgba(255,225,74,.6)", opacity: 0 });
      const spr = sprite(c.key, card, 270 - 92 * 1.2, 34, 2.4, { origin: "50% 100%" });
      text(card, c.tag, "t36", { left: 0, top: 398, width: "540px", textAlign: "center", color: "#FFE14A" }, OL.wood);
      text(card, c.name, "t60", { left: 0, top: 440, width: "540px", textAlign: "center" }, OL.wood);
      text(card, c.line, "t24b", { left: 0, top: 520, width: "540px", textAlign: "center" }, OL.wood);
      return { ...c, card, glow, spr };
    });
    const arrow = el("div", "abs", root, { width: 0, height: 0, borderLeft: "26px solid transparent", borderRight: "26px solid transparent", borderTop: "34px solid #E8322C",
      filter: "drop-shadow(0 4px 0 rgba(0,0,0,.35))" });
    return (lt) => {
      updateClouds(cl, sc.start + lt);
      const h = seg(lt, beat(sc, "header"), beat(sc, "header") + 0.45);
      tf(head, { y: lerp(-180, 0, ease.outBack(h)) });
      const pL = beat(sc, "pickL"), pR = beat(sc, "pickR");
      const sel = lt < pR ? 0 : 1;
      cards.forEach((c, i) => {
        const a = seg(lt, beat(sc, c.b), beat(sc, c.b) + 0.55);
        const picked = (i === 0 && lt >= pL && lt < pR) || (i === 1 && lt >= pR);
        const pt = i === 0 ? pL : pR;
        const lift = picked ? ease.outBack(seg(lt, pt, pt + 0.3)) : (i === 0 && lt >= pR ? 1 - ease.out(seg(lt, pR, pR + 0.3)) : 0);
        tf(c.card, { y: lerp(700, 0, ease.outBackSoft(a)) - lift * 22, s: 1 + lift * 0.03 });
        c.glow.style.opacity = lift.toFixed(3);
        const hop = picked ? Math.abs(Math.sin((lt - pt) * 5)) * 18 * (1 - seg(lt, pt + 1.2, pt + 1.6)) : 0;
        tf(c.spr, { y: -hop, sy: 1 + 0.02 * Math.sin(lt * 3 + i) });
      });
      const ax = lt < pR ? lerp(cards[0].x + 270, cards[1].x + 270, ease.inOut(seg(lt, pR - 0.3, pR))) : cards[1].x + 270;
      const ao = seg(lt, pL - 0.3, pL);
      arrow.style.left = px(ax - 26); arrow.style.top = px(172);
      tf(arrow, { y: Math.sin(lt * 7) * 8, o: ao });
      void sel;
    };
  };

  BUILD.mission = (root, sc) => {
    const base = playBase(root, sc, {});
    const ph = base.ph;
    const seq = screenSeq(ph, [
      { t: 0, key: "prologue_map" },
      { t: beat(sc, "swap"), key: "prologue_sword", tr: "slide" },
    ]);
    const hd = text(root, "MISSION", "t72", { left: px(1000), top: px(120), color: "#FFE14A" }, OL.ink);
    const l1 = el("div", "abs", root, { left: px(1000), top: px(250) });
    const pin = sprite("qr", l1, 0, 0, 0.32, { smooth: false });
    text(l1, "할로윈 파티장 곳곳의 QR 찾기", "t48", { left: 90, top: 4 }, OL.ink);
    const l2 = el("div", "abs", root, { left: px(1000), top: px(350) });
    const swIcon = sprite("sword", l2, -4, -12, 0.5);
    text(l2, "전설의 검 '정보처리기사' 얻기", "t48", { left: 90, top: 4 }, OL.ink);
    const sw = sprite("sword", root, 1300, 420, 2.6, { origin: "50% 50%" });
    const shine = el("div", "abs", root, { left: px(1300), top: px(420), width: px(163 * 2.6), height: px(179 * 2.6),
      background: "linear-gradient(115deg, transparent 40%, rgba(255,255,255,.85) 50%, transparent 60%)", mixBlendMode: "overlay",
      WebkitMaskImage: `url(${IMG.sword.src})`, WebkitMaskSize: "100% 100%" });
    const spk = sparkles(root, 12, 31, [1260, 400, 1760, 860]);
    void pin; void swIcon;
    return (lt) => {
      base.update(lt, sc.start + lt);
      seq(lt);
      const a = seg(lt, 0.2, 0.6), b = seg(lt, 0.6, 1.0), c = seg(lt, beat(sc, "swap") - 0.2, beat(sc, "swap") + 0.3);
      tf(hd, { x: lerp(40, 0, ease.out(a)), o: a });
      tf(l1, { x: lerp(40, 0, ease.out(b)), o: b });
      tf(l2, { x: lerp(40, 0, ease.out(c)), o: c });
      const g = beat(sc, "glint");
      const d = seg(lt, g - 0.4, g + 0.2);
      tf(sw, { y: lerp(60, 0, ease.out(d)) + Math.sin(lt * 2.2) * 10, r: -6 + Math.sin(lt * 1.6) * 3, o: d });
      const sh = seg(lt, g, g + 0.7);
      tf(shine, { y: lerp(60, 0, ease.out(d)) + Math.sin(lt * 2.2) * 10, o: sh > 0 && sh < 1 ? 1 : 0 });
      shine.style.backgroundPosition = `${lerp(-400, 400, sh)}px 0`;
      shine.style.backgroundSize = "200% 100%";
      spk(lt, d);
    };
  };

  BUILD.concept = (root, sc) => {
    el("div", "abs", root, { left: 0, top: 0, width: px(960), height: px(H), background: "linear-gradient(135deg, #3a1a08 0%, #241005 100%)" });
    el("div", "abs", root, { left: px(960), top: 0, width: px(960), height: px(H), background: "linear-gradient(225deg, #0f3018 0%, #08180c 100%)" });
    vignette(root, "vignette_169", 0.75);
    const emb = embers(root, 24, 5, ["#ff9a3c", "#ffcf6b", "#58e07f"]);
    const head = el("div", "abs", root, { left: 0, top: px(70), width: px(W), textAlign: "center" });
    const hl = el("div", "t72 nowrap", head, { display: "inline-block", textShadow: OL.ink });
    hl.innerHTML = '<span style="color:#FF9A2E">HALLOWEEN</span> <span>×</span> <span style="color:#4BE07A">YULJEON</span>';
    const rows = sc.rows.map((r, i) => {
      const y = 230 + i * 190;
      const L = el("div", "abs", root, { left: px(150), top: px(y), width: px(660), height: px(140), borderRadius: "10px", background: "#2a1408",
        boxShadow: "inset 0 0 0 5px #FF9A2E, 0 12px 0 rgba(0,0,0,.35)", transformOrigin: "50% 50%" });
      text(L, r.left, "t48", { left: 0, top: 40, width: "660px", textAlign: "center", color: "#FFD9A8" }, OL.ink3);
      const arrow = text(root, "▶", "t60", { left: px(928), top: px(y + 34), color: "#fff" }, OL.ink3);
      const R = el("div", "abs", root, { left: px(1090), top: px(y), width: px(700), height: px(140), borderRadius: "10px", background: "#0c2414",
        boxShadow: "inset 0 0 0 5px #4BE07A, 0 12px 0 rgba(0,0,0,.35)", transformOrigin: "50% 50%" });
      let ic;
      if (r.icon === "qr") ic = sprite("qr", R, 22, 18, 0.536, { smooth: false });
      else if (r.icon === "professor") ic = sprite("professor_t", R, 22, 10, 0.9);
      else ic = sprite("monkey_bug1_t", R, 20, 14, 1.2);
      text(R, r.right, "t36", { left: 150, top: r.note ? 26 : 48, color: "#D8FFE0" }, OL.ink3);
      if (r.note) text(R, r.note, "t24", { left: 152, top: 80, color: "#9FE8B4" }, OL.ink3);
      void ic;
      return { L, R, arrow, b: ["row1", "row2", "row3"][i] };
    });
    return (lt) => {
      emb(sc.start + lt);
      const h = seg(lt, 0.05, 0.45);
      tf(head, { y: lerp(-40, 0, ease.out(h)), o: h });
      for (const r of rows) {
        const t0 = beat(sc, r.b);
        const a = seg(lt, t0, t0 + 0.4), b = seg(lt, t0 + 0.3, t0 + 0.7), c = seg(lt, t0 + 0.2, t0 + 0.45);
        r.L.style.transform = `perspective(900px) rotateX(${lerp(-90, 0, ease.outBack(a))}deg)`; r.L.style.opacity = a > 0 ? 1 : 0;
        r.R.style.transform = `perspective(900px) rotateX(${lerp(-90, 0, ease.outBack(b))}deg)`; r.R.style.opacity = b > 0 ? 1 : 0;
        tf(r.arrow, { x: Math.sin(lt * 6) * 4 * c, o: c });
      }
    };
  };

  // ───────────────────────── D. 플레이 ─────────────────────────
  const HERO_SPRITE = { yuloong: [50, 409], myungwoong: [246, 409] };
  BUILD.step1 = (root, sc) => {
    const base = playBase(root, sc), ph = base.ph;
    const B = (n) => beat(sc, n);
    const seq = screenSeq(ph, [
      { t: 0, key: "login" },
      { t: B("toSelect"), tr: "slide", build: (e) => {
        sprite("select_before", e, 0, 0, 1, { smooth: true });
        const y = sprite("yuloong_t", e, HERO_SPRITE.yuloong[0] + 10, HERO_SPRITE.yuloong[1] + 6, 0.6);
        const m = sprite("myungwoong_t", e, HERO_SPRITE.myungwoong[0] + 10, HERO_SPRITE.myungwoong[1] + 6, 0.6);
        return (lt) => { tf(y, { y: Math.abs(Math.sin(lt * 4)) * -4 }); tf(m, { y: Math.abs(Math.sin(lt * 4 + 1)) * -4 }); };
      } },
      { t: B("toPicked"), key: "select_myungwoong" },
      { t: B("toAfter"), key: "select_after" },
    ]);
    const typing = makeTyping(ph.scr, [64, 376, 328, 417], "미르미");
    const tap = makeTap(ph.scr);
    const call = makeCallout(root, ph, { key: "select_myungwoong", src: [12, 532, 381, 690], x: 1000, y: 300, maxW: 780, maxH: 460, t0: B("toPicked") + 0.15, t1: B("toAfter") + 0.9 });
    return (lt) => {
      base.update(lt, sc.start + lt);
      seq(lt);
      typing(lt, B("typeStart"), B("typeEnd"), lt < B("toSelect") + 0.4);
      tap(lt, [{ t: B("tapNext"), x: 197, y: 700 }, { t: B("tapHero"), x: 294, y: 456 }, { t: B("tapDone"), x: 318, y: 662 }]);
      call(lt);
    };
  };

  BUILD.step2 = (root, sc) => {
    const base = playBase(root, sc), ph = base.ph;
    const B = (n) => beat(sc, n);
    const STARS = [[67, 42], [175, 42], [97, 116], [246, 178], [73, 202], [150, 241], [301, 291]];
    const seq = screenSeq(ph, [
      { t: 0, key: "prologue_map" },
      { t: B("toScan"), tr: "slide", build: (e) => {
        el("div", "fill", e, { background: "#111" });
        const cam = el("div", "abs", e, { left: 0, top: 0, width: "393px", height: "852px", transformOrigin: "60% 70%" });
        const pst = sprite("poster_light", cam, -185, 0, 852 / 1024, { smooth: true });
        el("div", "fill", e, { background: "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,.55) 100%)" });
        const frame = el("div", "abs", e, { width: "200px", height: "200px" });
        const corners = [[0, 0], [1, 0], [0, 1], [1, 1]].map(([cx, cy]) => {
          const c = el("div", "abs", frame, { width: "34px", height: "34px", borderColor: "#fff", borderStyle: "solid", borderWidth: "0" });
          c.style[cy ? "borderBottomWidth" : "borderTopWidth"] = "6px"; c.style[cx ? "borderRightWidth" : "borderLeftWidth"] = "6px";
          c.style.left = cx ? "calc(100% - 34px)" : "0"; c.style.top = cy ? "calc(100% - 34px)" : "0";
          return c;
        });
        const line = el("div", "abs", frame, { left: "8px", width: "calc(100% - 16px)", height: "4px", background: "#4BE07A", boxShadow: "0 0 12px #4BE07A" });
        const lab = el("div", "abs t24b", e, { left: 0, top: "60px", width: "393px", textAlign: "center", color: "#fff", textShadow: OL.ink3 });
        lab.textContent = "QR 스캔";
        const fl = el("div", "fill", e, { background: "#fff", opacity: 0 });
        const qx = -185 + 466 * (852 / 1024), qy = 782 * (852 / 1024), qs = 194 * (852 / 1024);
        return (lt) => {
          tf(cam, { x: noise1(lt * 1.5, 1) * 6, y: noise1(lt * 1.5, 2) * 6, r: -2 + noise1(lt, 3) * 1, s: 1.1 });
          const k = ease.inOut(seg(lt, 0.2, B("lock") - B("toScan")));
          const fw = lerp(300, qs + 16, k), fx = lerp(46, qx - 8, k), fy = lerp(270, qy - 8, k);
          Object.assign(frame.style, { left: px(fx), top: px(fy), width: px(fw), height: px(fw) });
          const locked = lt >= B("lock") - B("toScan");
          corners.forEach((c) => (c.style.borderColor = locked ? "#4BE07A" : "#fff"));
          line.style.top = px(8 + ((Math.sin(lt * 5) + 1) / 2) * (fw - 20));
          const s = B("scan") - B("toScan");
          fl.style.opacity = (0.85 * (1 - seg(lt, s, s + 0.25)) * (lt >= s ? 1 : 0)).toFixed(3);
          void pst;
        };
      } },
      { t: B("toCoin"), key: "qr_success" },
    ]);
    // 지도 확대 + QR 위치 깜빡임
    const call = makeCallout(root, ph, {
      key: "prologue_map", src: [16, 104, 377, 404], x: 1000, y: 280, maxW: 760, maxH: 520, t0: 0.3, t1: B("toScan") - 0.05,
      extra: (inner, z, x0, y0) => {
        inner._pins = STARS.map(([sx, sy], i) => {
          const p = el("div", "abs", inner, { left: px((16 + sx - x0) * z - 18), top: px((104 + sy - y0) * z - 18), width: "36px", height: "36px",
            borderRadius: "6px", background: "#FFE14A", boxShadow: "0 0 0 4px #1b1020, 0 0 18px 6px rgba(255,225,74,.6)" });
          const q = el("div", "abs t24b", p, { left: "4px", top: "3px", color: "#1b1020" }); q.textContent = "QR";
          return { p, i };
        });
        PIN_REF = inner._pins;
      },
    });
    const pins = PIN_REF;
    const call2 = makeCallout(root, ph, { key: "qr_success", src: [88, 338, 306, 516], x: 1000, y: 280, maxW: 720, maxH: 470, t0: B("toCoin") + 0.1, t1: 99 });
    const spk = sparkles(root, 12, 41, [1000, 260, 1720, 760], "#fff3a0");
    return (lt) => {
      base.update(lt, sc.start + lt);
      seq(lt);
      call(lt);
      pins.forEach(({ p, i }) => {
        const a = seg(lt, B("pins") + i * 0.12, B("pins") + i * 0.12 + 0.3);
        tf(p, { s: lerp(0.2, 1, ease.outBack(a)) * (1 + 0.12 * Math.sin(lt * 8 + i)), o: a });
      });
      call2(lt);
      spk(lt, seg(lt, B("toCoin") + 0.2, B("toCoin") + 0.5));
    };
  };
  let PIN_REF = null;

  function equipBuild(oldKey, newKey, msg) {
    return (e) => {
      sprite("cave_blank", e, 0, 0, 1, { smooth: true });
      const halo = el("div", "abs", e, { left: px(196 - 160), top: px(390 - 160), width: "320px", height: "320px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,255,255,.55) 0%, transparent 65%)" });
      const o = IMG[oldKey], n = IMG[newKey];
      const a = sprite(oldKey, e, 196 - o.naturalWidth / 2, 410 - o.naturalHeight / 2, 1);
      const b = sprite(newKey, e, 196 - n.naturalWidth / 2, 500 - n.naturalHeight, 1);
      const box = sprite("tb_suit_get", e, 19, 589, 1, { smooth: true });
      const cover = el("div", "abs", e, { left: px(33), top: px(603), width: px(327), height: px(125), background: "#404040", display: "flex", alignItems: "center",
        justifyContent: "center", textAlign: "center", font: '700 16px/24px "Galmuri11"', color: "#fff", whiteSpace: "pre" });
      cover.textContent = msg;
      return (lt) => {
        const spin = seg(lt, 0, 0.7);
        const ang = spin * Math.PI * 4;
        const sx = Math.cos(ang);
        const showNew = spin > 0.5;
        vis(a, !showNew); vis(b, showNew);
        tf(showNew ? b : a, { sx: Math.abs(sx) < 0.08 ? 0.08 : sx, y: -Math.sin(Math.PI * spin) * 30 });
        tf(halo, { s: 0.8 + 0.4 * Math.sin(Math.PI * spin), o: Math.sin(Math.PI * spin) + (spin >= 1 ? 0.35 : 0) });
        const c = seg(lt, 0.5, 0.8);
        tf(box, { y: lerp(20, 0, ease.out(c)), o: c }); tf(cover, { y: lerp(20, 0, ease.out(c)), o: c });
      };
    };
  }

  BUILD.stage1 = (root, sc) => {
    const base = playBase(root, sc), ph = base.ph;
    const B = (n) => beat(sc, n);
    const seq = screenSeq(ph, [
      { t: 0, key: "q1_story1" },
      { t: B("story2"), key: "q1_story3" },
      { t: B("toQuiz"), key: "q1_choice" },
      { t: B("toWrong"), key: "q1_wrong" },
      { t: B("back"), key: "q1_choice" },
      { t: B("toRight"), key: "q1_correct" },
      { t: B("toItem"), build: itemGetBuild("item_suit_t", null, { scale: 1, collect: B("slot") - 0.6 - B("toItem") }), dur: 0.25 },
      { t: B("toEquip"), build: equipBuild("item_suit_t", "mw_suit_t", "미르미는 '완전한 방호복'을 장착했다!"), dur: 0.2 },
      { t: B("toProgress"), key: "q1_progress" },
    ]);
    // 아이템 획득 문구(원본 대화창 이미지)
    const tbGet = sprite("tb_suit_get", ph.scr, 19, 589, 1, { smooth: true }); tbGet.style.zIndex = 25;
    const tap = makeTap(ph.scr);
    const wrongFx = flashRect(ph.scr, [62, 342, 332, 394], "#ff3b30");
    const rightFx = flashRect(ph.scr, [62, 528, 332, 580], "#3DE06A");
    const call = makeCallout(root, ph, { key: "q1_choice", src: [30, 222, 366, 615], x: 1000, y: 260, maxW: 760, maxH: 520, t0: B("zoomIn"), t1: B("tapWrong") - 0.1 });
    return (lt) => {
      base.update(lt, sc.start + lt);
      const cur = seq(lt);
      const [sx] = shake(lt, B("toWrong"), 18, 0.35, 9);
      tf(base.ph.root, { x: sx });
      const tg = seg(lt, B("toItem") + 0.25, B("toItem") + 0.55);
      vis(tbGet, lt >= B("toItem") && lt < B("toEquip"));
      tf(tbGet, { y: lerp(20, 0, ease.out(tg)), o: tg });
      tap(lt, [{ t: B("tapWrong"), x: 197, y: 368 }, { t: B("tapRight"), x: 197, y: 554 }]);
      wrongFx(lt, B("tapWrong"), 0.4);
      rightFx(lt, B("tapRight"), 0.4);
      call(lt);
      void cur;
    };
  };

  BUILD.stage2 = (root, sc) => {
    const base = playBase(root, sc), ph = base.ph;
    const B = (n) => beat(sc, n);
    const BUBBLES = [[113, 184, 273, 241, "msg1"], [113, 252, 273, 309, "msg2"], [113, 320, 273, 377, "msg3"]];
    const seq = screenSeq(ph, [
      { t: 0, key: "q2_story" },
      { t: B("toPhone"), tr: "slide", build: (e) => {
        sprite("q2_phone", e, 0, 0, 1, { smooth: true });
        const parts = BUBBLES.map(([x0, y0, x1, y1, bn]) => {
          el("div", "abs", e, { left: px(x0), top: px(y0), width: px(x1 - x0), height: px(y1 - y0), background: "rgb(63,63,116)" });
          const b = el("div", "abs", e, { left: px(x0), top: px(y0), width: px(x1 - x0), height: px(y1 - y0), backgroundImage: `url(${IMG.q2_phone.src})`,
            backgroundPosition: `${-x0}px ${-y0}px`, backgroundSize: "393px 852px", transformOrigin: "0% 50%" });
          return { b, at: B(bn) - B("toPhone") };
        });
        return (lt) => parts.forEach((p) => { const k = seg(lt, p.at, p.at + 0.25); tf(p.b, { s: lerp(0.6, 1, ease.outBack(k)), o: k }); });
      } },
      { t: B("toInput"), key: "q2_input1" },
      { t: B("toFilled"), key: "q2_input2" },
      { t: B("toItem"), build: itemGetBuild("item_mask_t", null, { bgKey: "q2_itemget_noitem", scale: 1, collect: B("slot") - 0.6 - B("toItem") }), dur: 0.25 },
      { t: B("toEquip"), key: "q2_equip" },
    ]);
    const typing = makeTyping(ph.scr, [64, 681, 328, 722], "원피스");
    const tap = makeTap(ph.scr);
    const call = makeCallout(root, ph, { key: "q2_input2", src: [104, 168, 290, 392], x: 1000, y: 270, maxW: 760, maxH: 500, t0: B("toFilled") + 0.05, t1: B("toItem") + 0.05 });
    return (lt) => {
      base.update(lt, sc.start + lt);
      seq(lt);
      typing(lt, B("typeStart"), B("typeEnd"), lt >= B("toInput") && lt < B("toFilled"));
      tap(lt, [{ t: B("tapSubmit"), x: 288, y: 767 }]);
      call(lt);
    };
  };

  BUILD.stage3 = (root, sc) => {
    const base = playBase(root, sc), ph = base.ph;
    const B = (n) => beat(sc, n);
    const seq = screenSeq(ph, [
      { t: 0, key: "q3_story" },
      { t: B("toInput"), key: "q3_input" },
      { t: B("toItem"), build: (e) => {
        sprite("q3_shield", e, 0, 0, 1, { smooth: true });
        const patch = el("div", "abs", e, { left: "120px", top: "320px", width: "160px", height: "170px", backgroundImage: `url(${IMG.q2_itemget_noitem.src})`,
          backgroundPosition: "-120px -320px", backgroundSize: "393px 852px" });
        const halo = el("div", "abs", e, { left: px(196 - 160), top: px(400 - 160), width: "320px", height: "320px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,210,150,.6) 0%, transparent 65%)", mixBlendMode: "screen" });
        const col = B("slot") - 0.6 - B("toItem");
        return (lt) => { tf(halo, { s: 0.85 + 0.15 * Math.sin(lt * 6), o: seg(lt, 0, 0.3) * (1 - seg(lt, col, col + 0.2)) }); patch.style.opacity = seg(lt, col, col + 0.08).toFixed(3); };
      }, dur: 0.25 },
    ]);
    const typing = makeTyping(ph.scr, [64, 472, 328, 513], "");
    const tap = makeTap(ph.scr);
    const call = makeCallout(root, ph, { key: "q3_input", src: [36, 362, 357, 440], x: 1000, y: 300, maxW: 780, maxH: 420, t0: B("toInput") + 0.15, t1: B("tapSubmit") + 0.1 });
    return (lt) => {
      base.update(lt, sc.start + lt);
      seq(lt);
      typing(lt, 0, 1, lt >= B("toInput") && lt < B("toItem"));
      tap(lt, [{ t: B("tapSubmit"), x: 290, y: 557 }]);
      call(lt);
    };
  };

  BUILD.stage45 = (root, sc) => {
    const base = playBase(root, sc), ph = base.ph;
    const B = (n) => beat(sc, n);
    const seq = screenSeq(ph, [
      { t: 0, build: (e) => {
        sprite("q4_flashlight", e, 0, 0, 1, { smooth: true });
        const beam = el("div", "abs", e, { left: px(125 - 120), top: px(449 - 120), width: "240px", height: "240px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,250,170,.85) 0%, rgba(255,230,120,.25) 40%, transparent 70%)", mixBlendMode: "screen" });
        return (lt) => {
          const f = lt < 0.5 ? (hash(Math.floor(lt * 18)) > 0.45 ? 1 : 0.15) : 0.85 + 0.15 * Math.sin(lt * 9);
          tf(beam, { o: f });
        };
      } },
      { t: B("toInput"), key: "q5_input" },
      { t: B("toCorrect"), key: "q5_correct" },
      { t: B("toItem"), build: itemGetBuild("item_radio_t", "하버드, 예일, 프린스턴의 가호가 담긴\n'통신짱짱 무전기'를 얻었다!", { scale: 1, collect: B("slot5") - 0.6 - B("toItem") }), dur: 0.25 },
      { t: B("toAll"), key: "q5_allitems" },
    ]);
    const typing = makeTyping(ph.scr, [64, 461, 328, 502], "하예프");
    const tap = makeTap(ph.scr);
    const call = makeCallout(root, ph, { key: "q5_input", src: [44, 378, 349, 425], x: 1000, y: 300, maxW: 780, maxH: 400, t0: B("toInput") + 0.1, t1: B("toCorrect") });
    return (lt) => {
      base.update(lt, sc.start + lt);
      seq(lt);
      typing(lt, B("typeStart"), B("typeEnd"), lt >= B("toInput") && lt < B("toCorrect"));
      tap(lt, [{ t: B("tapSubmit"), x: 288, y: 546 }]);
      call(lt);
    };
  };

  BUILD.mainscreens = (root, sc) => {
    const base = playBase(root, sc, { noPhone: true });
    const S = 0.62;
    const xs = [560, 960, 1360];
    const items = sc.phones.map((p, i) => {
      const sl = xs[i] - (393 * S) / 2, st = 190;
      const ph = makePhone(root, sl, st, S);
      const im = el("img", "abs scrimg", ph.scr); im.src = IMG[p.screen].src;
      if (p.screen === "main_clear") {
        const cov = el("div", "abs", ph.scr, { left: "112px", top: "268px", width: "170px", height: "30px", background: "rgb(134,197,227)",
          font: '700 18px/30px "Galmuri11"', color: "#fff", textAlign: "center", textShadow: outline(1, "#555") });
        cov.textContent = "- 미르미 -";
      }
      const lab = text(root, p.label, "t48", { left: px(xs[i] - 200), top: px(100), width: "400px", textAlign: "center" }, OL.ink);
      return { ph, lab, b: ["p1", "p2", "p3"][i] };
    });
    const arrows = [760, 1160].map((x) => text(root, "▶", "t60", { left: px(x - 22), top: px(440) }, OL.ink3));
    return (lt) => {
      base.update(lt, sc.start + lt);
      items.forEach((it, i) => {
        const a = seg(lt, beat(sc, it.b), beat(sc, it.b) + 0.55);
        tf(it.ph.root, { y: lerp(120, 0, ease.outBackSoft(a)) + Math.sin(lt * 1.6 + i) * 5, o: a });
        tf(it.lab, { y: lerp(30, 0, ease.out(a)), o: a });
      });
      arrows.forEach((ar, i) => { const a = seg(lt, 0.8 + i * 0.25, 1.2 + i * 0.25); tf(ar, { x: Math.sin(lt * 5) * 6, o: a }); });
    };
  };

  BUILD.final = (root, sc) => {
    const base = playBase(root, sc), ph = base.ph;
    const B = (n) => beat(sc, n);
    const P0 = B("toPlay");
    // 미니게임 원숭이 경로(화면 좌표, 미니게임 시작 기준 시간 τ)
    const MK = [
      { key: "monkey_bug1_t", hit: "hit1", f: (t) => [70 + 90 * (1 + Math.sin(1.7 * t + 0.3)), 170 + 70 * (1 + Math.sin(2.3 * t + 1.1))] },
      { key: "monkey_bug2_t", hit: "hit2", f: (t) => [150 + 80 * (1 + Math.sin(1.3 * t + 2.1)), 280 + 60 * (1 + Math.sin(1.9 * t + 0.2))] },
      { key: "monkey_infected_t", hit: "hit3", f: (t) => [40 + 110 * (1 + Math.sin(1.1 * t + 4.0)), 220 + 80 * (1 + Math.sin(2.7 * t + 2.5))] },
      { key: "monkey_t", hit: null, f: (t) => [120 + 70 * (1 + Math.sin(0.9 * t + 1.0)), 340 + 40 * (1 + Math.sin(1.6 * t))] },
    ];
    const seq = screenSeq(ph, [
      { t: 0, key: "final_mission" },
      { t: B("toRule"), key: "final_rule" },
      { t: P0, tr: "slide", build: (e) => {
        sprite("bg_dark_dido", e, 0, 0, 1, { smooth: true });
        sprite("vignette", e, 0, 0, 1);
        const hero = sprite("hero_sword", e, 30, 590, 0.82, { origin: "40% 80%" });
        const ms = MK.map((m) => ({ ...m, e: sprite(m.key, e, 0, 0, 1) }));
        const fx = MK.map(() => {
          const s = el("div", "abs", e, { width: "120px", height: "10px", background: "#fff", boxShadow: "0 0 10px #fff", transformOrigin: "50% 50%" });
          const puff = Array.from({ length: 6 }, () => el("div", "abs", e, { width: "12px", height: "12px", background: "#fff" }));
          return { s, puff };
        });
        return (lt) => {
          ms.forEach((m, i) => {
            const [x, y] = m.f(lt);
            const h = m.hit ? B(m.hit) - P0 : 1e9;
            const dead = lt >= h + 0.12;
            const fl = lt >= h && lt < h + 0.12;
            vis(m.e, !dead);
            tf(m.e, { x, y, sx: Math.cos(lt * 2 + i) > 0 ? 1 : -1, f: fl ? "brightness(4)" : "none", s: fl ? 1.15 : 1 });
            const k = seg(lt, h, h + 0.3);
            vis(fx[i].s, k > 0 && k < 1);
            if (k > 0 && k < 1) {
              const [hx, hy] = m.f(h);
              tf(fx[i].s, { x: hx - 12, y: hy + 44, r: -35, sx: lerp(0.2, 1.6, ease.out(k)), o: 1 - k });
            }
            fx[i].puff.forEach((p, j) => {
              const pk = seg(lt, h + 0.08, h + 0.5);
              vis(p, pk > 0 && pk < 1);
              if (pk > 0 && pk < 1) {
                const [hx, hy] = m.f(h);
                const a = (j / 6) * Math.PI * 2;
                tf(p, { x: hx + 42 + Math.cos(a) * pk * 60, y: hy + 42 + Math.sin(a) * pk * 60, o: 1 - pk, s: 1 + pk });
              }
            });
          });
          const sw = ["hit1", "hit2", "hit3"].map((n) => seg(lt, B(n) - P0 - 0.1, B(n) - P0 + 0.15)).find((v) => v > 0 && v < 1) || 0;
          tf(hero, { r: -Math.sin(Math.PI * sw) * 18, y: Math.abs(Math.sin(lt * 3)) * -4 });
        };
      } },
      { t: B("clear"), key: "game_clear" },
    ]);
    const tap = makeTap(ph.scr);
    const taps = MK.filter((m) => m.hit).map((m) => ({ t: B(m.hit), x: (lt) => m.f(lt - P0)[0] + 48, y: (lt) => m.f(lt - P0)[1] + 48 }));
    const call = makeCallout(root, ph, { key: "final_rule", src: [16, 535, 381, 690], x: 1000, y: 300, maxW: 780, maxH: 420, t0: B("toRule") + 0.15, t1: P0 + 0.1 });
    const fw = fireworks(root, [
      { t: B("clear") - 0.35, x: 300, y: 70, c: "#FFE14A" }, { t: B("clear") - 0.15, x: 400, y: 50, c: "#b65cff" },
      { t: B("clear") + 0.3, x: 360, y: 90, c: "#4BE07A" }, { t: B("clear") + 0.6, x: 430, y: 60, c: "#FF9A2E" },
    ]);
    const clr = text(root, "GAME CLEAR!", "t96", { left: px(1010), top: px(400), color: "#FFE14A" }, OL.ink);
    return (lt) => {
      base.update(lt, sc.start + lt);
      seq(lt);
      tap(lt, taps);
      call(lt);
      fw(lt);
      const c = seg(lt, B("clear"), B("clear") + 0.5);
      tf(clr, { s: lerp(0.4, 1, ease.outBack(c)) * (1 + 0.03 * Math.sin(lt * 6)), o: c });
    };
  };

  // ───────────────────────── E. 엔딩 ─────────────────────────
  BUILD.peace_again = (root, sc) => {
    const cam = el("div", "fill", root, { transformOrigin: "50% 60%" });
    const cv = el("canvas", "abs px", cam, { width: px(W), height: px(H) });
    cv.width = 480; cv.height = 270;
    const ctx = cv.getContext("2d");
    const off = (keys) => {
      const c = document.createElement("canvas"); c.width = 480; c.height = 270;
      const x = c.getContext("2d"); keys.forEach((k) => x.drawImage(IMG[k], 0, 0));
      return x.getImageData(0, 0, 480, 270);
    };
    const dark = off(["bd_cave_dome", "vignette_169"]), light = off(["bd_sky_dome"]);
    const out = ctx.createImageData(480, 270);
    const BAY = [0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23, 61, 29, 53, 21];
    let lastP = -1;
    const cl = clouds(cam, CLOUDS);
    const monkeys = [
      { x: 330, from: -320, d: 1.5 }, { x: 1300, from: 2100, d: 1.8 }, { x: 1560, from: 2300, d: 2.05 },
    ].map((m) => ({ ...m, e: sprite("monkey_t", cam, m.x, 840 - 92 * 3, 3, { origin: "50% 100%" }) }));
    const hearts = Array.from({ length: 8 }, (_, i) => text(cam, "♥", "t48", { left: 0, top: 0, color: "#ff5b7f" }, outline(3, "#5a1020")));
    return (lt) => {
      tf(cam, { s: 1.05 - 0.05 * ease.out(seg(lt, 0, 5)) });
      const p = ease.inOut(seg(lt, 0.2, 1.9));
      const q = Math.round(p * 64);
      if (q !== lastP) {
        lastP = q;
        for (let y = 0; y < 270; y++) for (let x = 0; x < 480; x++) {
          const i = (y * 480 + x) * 4;
          const src = BAY[(y % 8) * 8 + (x % 8)] < q ? light : dark;
          out.data[i] = src.data[i]; out.data[i + 1] = src.data[i + 1]; out.data[i + 2] = src.data[i + 2]; out.data[i + 3] = 255;
        }
        ctx.putImageData(out, 0, 0);
      }
      updateClouds(cl, sc.start + lt);
      cl.forEach((c) => (c.e.style.opacity = p.toFixed(3)));
      monkeys.forEach((m, i) => {
        const a = ease.out(seg(lt, m.d, m.d + 0.7));
        const hopIn = Math.sin(Math.PI * seg(lt, m.d, m.d + 0.7)) * 120;
        const idle = lt > m.d + 0.7 ? Math.abs(Math.sin((lt - m.d) * 4 + i)) * 40 : 0;
        tf(m.e, { x: lerp(m.from - m.x, 0, a), y: -hopIn - idle, sx: m.from < m.x ? 1 : -1 });
      });
      hearts.forEach((h, i) => {
        const m = monkeys[i % 3];
        const t0 = m.d + 0.9 + (i >> 1) * 0.5;
        const k = seg(lt, t0, t0 + 1.4);
        vis(h, k > 0 && k < 1);
        tf(h, { x: m.x + 120 + (i % 2 ? 40 : -20) + Math.sin(k * 6) * 12, y: 560 - k * 200, o: 1 - k, s: 0.8 + k * 0.4 });
      });
    };
  };

  BUILD.certificate = (root, sc) => {
    const cam = el("div", "fill", root);
    backdrop("bd_sky", cam);
    const cl = clouds(cam, CLOUDS);
    const fw = fireworks(root, [
      { t: 0.6, x: 90, y: 60, c: "#FFE14A" }, { t: 0.9, x: 390, y: 50, c: "#b65cff" }, { t: 1.6, x: 240, y: 40, c: "#4BE07A" },
      { t: 2.9, x: 420, y: 70, c: "#FF9A2E" }, { t: 3.3, x: 60, y: 80, c: "#ff5b7f" }, { t: 4.2, x: 300, y: 45, c: "#FFE14A" }, { t: 4.8, x: 150, y: 55, c: "#b65cff" },
    ]);
    const mk = (key, cx, b) => {
      const S = 0.8, ph = makePhone(root, cx - (393 * S) / 2, 64, S);
      const im = el("img", "abs scrimg", ph.scr); im.src = IMG[key].src;
      return { ph, b, im };
    };
    const P = [mk("certificate", 700, "cert"), mk("ranking", 1220, "rank")];
    return (lt) => {
      updateClouds(cl, sc.start + lt);
      fw(lt);
      P.forEach((p, i) => {
        const a = seg(lt, beat(sc, p.b), beat(sc, p.b) + 0.6);
        tf(p.ph.root, { y: lerp(1150, 0, ease.outBackSoft(a)) + Math.sin(lt * 1.5 + i) * 6, r: lerp(i ? 6 : -6, 0, ease.out(a)), o: a > 0 ? 1 : 0 });
        if (i === 0) tf(p.im, { y: lerp(-120, 0, ease.out(seg(lt, beat(sc, p.b) + 0.3, beat(sc, p.b) + 1.2))) });
      });
    };
  };

  BUILD.party = (root, sc) => {
    const cam = el("div", "fill", root, { transformOrigin: "50% 70%" });
    backdrop("bd_sky_dome", cam);
    const cl = clouds(cam, CLOUDS);
    const fw = fireworks(cam, [
      { t: 0.4, x: 80, y: 40, c: "#FFE14A" }, { t: 0.8, x: 400, y: 35, c: "#b65cff" }, { t: 1.4, x: 120, y: 60, c: "#4BE07A" },
      { t: 1.9, x: 370, y: 55, c: "#FF9A2E" }, { t: 2.6, x: 60, y: 30, c: "#ff5b7f" }, { t: 3.1, x: 420, y: 45, c: "#FFE14A" }, { t: 3.6, x: 250, y: 30, c: "#b65cff" },
    ]);
    const fire = sprite("campfire_t", cam, 960 - 75, 1000 - 156, 3, { origin: "50% 100%" });
    const dancers = [
      { key: "yuloong_t", x: 560, y: 1040, s: 1.6 }, { key: "myungwoong_t", x: 1360, y: 1040, s: 1.6 },
      { key: "monkey_t", x: 740, y: 935, s: 1.8 }, { key: "monkey_t", x: 1180, y: 935, s: 1.8 }, { key: "monkey_t", x: 300, y: 980, s: 1.6 }, { key: "monkey_t", x: 1620, y: 980, s: 1.6 },
    ].map((d, i) => {
      const im = IMG[d.key];
      return { ...d, i, e: sprite(d.key, cam, d.x - (im.naturalWidth * d.s) / 2, d.y - im.naturalHeight * d.s, d.s, { origin: "50% 100%" }) };
    });
    const sign = sprite("party_sign", root, 960 - 393, 60, 2);
    const logoW = 509 * 1.4;
    const logo = sprite("logo_dark", root, 960 - logoW / 2, 34, 1.4);
    const team = text(root, "구름톤 유니브 성균관대", "t48", { left: 0, top: px(286), width: px(W), textAlign: "center" }, OL.ink);
    return (lt) => {
      tf(cam, { s: 1 + 0.03 * ease.sine(seg(lt, 0, 5)) });
      updateClouds(cl, sc.start + lt);
      fw(lt);
      tf(fire, { sy: 1 + 0.06 * Math.sin(lt * 14), sx: 1 + 0.03 * Math.sin(lt * 11) });
      dancers.forEach((d) => {
        const hop = Math.abs(Math.sin(lt * 4.2 + d.i * 0.9)) * 28;
        const flip = Math.sin(lt * 2.1 + d.i) > 0 ? 1 : -1;
        tf(d.e, { y: -hop, sx: flip });
      });
      const sIn = seg(lt, beat(sc, "sign"), beat(sc, "sign") + 0.9), sOut = seg(lt, beat(sc, "logo") - 0.3, beat(sc, "logo") + 0.3);
      tf(sign, { y: lerp(-420, 0, ease.outBackSoft(sIn)) - ease.in(sOut) * 500, r: Math.sin(lt * 2) * 1.2 });
      const L = seg(lt, beat(sc, "logo"), beat(sc, "logo") + 0.6);
      tf(logo, { s: lerp(1.3, 1, ease.out(L)), o: L });
      const T = seg(lt, beat(sc, "logo") + 0.4, beat(sc, "logo") + 0.9);
      tf(team, { y: lerp(20, 0, ease.out(T)), o: T });
    };
  };

  // ───────────────────────── 전역 HUD ─────────────────────────
  const PLAY_FROM = SC.step1.start, PLAY_TO = SC.final.end;
  let hud = null;
  function buildHud() {
    const root = el("div", "fill", stage, { zIndex: 50, pointerEvents: "none" });
    const figma = text(root, "Figma 디자인 기반 플레이 재현", "t24", { left: px(1500), top: px(34), width: "380px", textAlign: "right", color: "#fff" }, OL.ink3);
    const slotsWrap = el("div", "abs", root, { left: px(232), top: px(150) });
    text(slotsWrap, "ITEMS", "t24b", { left: 0, top: 0, width: "84px", textAlign: "center", color: "#FFE14A" }, OL.ink3);
    const items = VIDEO.items.map((it, i) => {
      const slot = el("div", "slot", slotsWrap, { left: 0, top: px(40 + i * 98) });
      const key = it.key + "_t";
      const im = IMG[key];
      const k = Math.min(64 / im.naturalWidth, 64 / im.naturalHeight);
      const icon = sprite(key, slot, 42 - (im.naturalWidth * k) / 2, 42 - (im.naturalHeight * k) / 2, k);
      const ring = el("div", "abs", slot, { left: "-6px", top: "-6px", width: "96px", height: "96px", borderRadius: "12px", boxShadow: "0 0 0 4px #FFE14A, 0 0 24px 6px rgba(255,225,74,.7)", opacity: 0 });
      const fly = sprite(key, root, 0, 0, Math.min(140 / im.naturalWidth, 140 / im.naturalHeight));
      const tFill = SC[it.scene].start + SC[it.scene].beats[it.beat];
      return { slot, icon, ring, fly, tFill, cx: 232 + 42, cy: 150 + 40 + i * 98 + 42 };
    });
    const allAt = SC.stage45.start + SC.stage45.beats.toAll;
    hud = (t) => {
      const playOn = t >= PLAY_FROM - 0.01 && t < PLAY_TO;
      const certOn = t >= SC.certificate.start && t < SC.certificate.end;
      vis(figma, playOn || certOn);
      if (playOn) figma.style.opacity = (0.75 * seg(t, PLAY_FROM, PLAY_FROM + 0.5) * (1 - seg(t, PLAY_TO - 0.4, PLAY_TO))).toFixed(3);
      if (certOn) figma.style.opacity = (0.75 * seg(t, SC.certificate.start + 0.3, SC.certificate.start + 0.8)).toFixed(3);
      vis(slotsWrap, playOn);
      if (playOn) {
        const a = seg(t, PLAY_FROM, PLAY_FROM + 0.5) * (1 - seg(t, PLAY_TO - 0.4, PLAY_TO));
        tf(slotsWrap, { x: lerp(-60, 0, ease.out(seg(t, PLAY_FROM, PLAY_FROM + 0.5))), o: a });
      }
      for (const it of items) {
        const filled = t >= it.tFill;
        vis(it.icon, filled);
        const pk = seg(t, it.tFill, it.tFill + 0.35);
        tf(it.icon, { s: filled ? lerp(1.6, 1, ease.outBack(pk)) : 1 });
        const glowAll = Math.max(0, Math.sin(Math.PI * seg(t, allAt, allAt + 1.2)));
        it.ring.style.opacity = Math.max((1 - pk) * (filled ? 1 : 0), glowAll * 0.9).toFixed(3);
        const fk = seg(t, it.tFill - 0.6, it.tFill);
        const flyOn = playOn && fk > 0 && fk < 1;
        vis(it.fly, flyOn);
        if (flyOn) {
          const e = ease.inOut(fk);
          const sx = PHONE.sl + 196 * PHONE.s, sy = PHONE.st + 390 * PHONE.s;
          const mx = (sx + it.cx) / 2 - 40, my = Math.min(sy, it.cy) - 180;
          const x = (1 - e) * (1 - e) * sx + 2 * (1 - e) * e * mx + e * e * it.cx;
          const y = (1 - e) * (1 - e) * sy + 2 * (1 - e) * e * my + e * e * it.cy;
          tf(it.fly, { x: x - it.fly.w / 2, y: y - it.fly.h / 2, s: lerp(1, 0.45, e), r: lerp(0, -360, e) * 0, o: 1 });
        }
      }
    };
  }

  // ───────────────────────── 디졸브 · 페이드 ─────────────────────────
  let dissolveCv, dctx, fadeEl;
  const BAY8 = [0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23, 61, 29, 53, 21];
  const DIS = VIDEO.scenes.filter((s) => s.dissolveOut).map((s) => s.end);
  function buildOverlays() {
    dissolveCv = el("canvas", "abs px", stage, { width: px(W), height: px(H), zIndex: 80 });
    dissolveCv.width = 48; dissolveCv.height = 27;
    dctx = dissolveCv.getContext("2d");
    fadeEl = el("div", "fill", stage, { background: "#000", zIndex: 90 });
  }
  function updateOverlays(t) {
    dctx.clearRect(0, 0, 48, 27);
    for (const e of DIS) {
      const k = t < e ? seg(t, e - 0.42, e) : 1 - seg(t, e, e + 0.42);
      if (k <= 0) continue;
      const q = k * 64;
      dctx.fillStyle = "#0b0710";
      for (let y = 0; y < 27; y++) for (let x = 0; x < 48; x++) if (BAY8[(y % 8) * 8 + (x % 8)] < q) dctx.fillRect(x, y, 1, 1);
    }
    const fin = 1 - seg(t, 0, 0.7);
    const fout = seg(t, SC.party.start + SC.party.beats.fadeOut, VIDEO.duration - 0.05);
    fadeEl.style.opacity = Math.max(fin, fout).toFixed(3);
  }

  // ───────────────────────── 장면 관리 ─────────────────────────
  function buildAll() {
    VIDEO.scenes.forEach((sc, i) => {
      const root = el("div", "scene", stage, { zIndex: i + 1 });
      const fn = BUILD[sc.id];
      if (!fn) throw new Error("no builder for scene " + sc.id);
      const update = fn(root, sc);
      vis(root, false);
      scenes[sc.id] = { root, update, sc };
    });
    // 자막
    const subRoot = el("div", "fill", stage, { zIndex: 70, pointerEvents: "none" });
    VIDEO.scenes.forEach((sc) => (sc.subs || []).forEach((s) => {
      const holder = el("div", "subholder", subRoot);
      const box = el("div", "sub " + s.style, holder);
      box.style.textShadow = OL[s.style] || OL.wood;
      if (s.speaker) { const sp = el("div", "speaker", box); sp.textContent = s.speaker; sp.style.textShadow = OL.dark; }
      const tx = el("div", null, box);
      const spans = rich(tx, s.text);
      SUBS.push({ s, t0: sc.start + s.at[0], t1: sc.start + s.at[1], holder, box, spans });
    }));
    buildHud();
    buildOverlays();
  }
  const SUBS = [];
  function updateSubs(t) {
    for (const o of SUBS) {
      const on = t >= o.t0 && t < o.t1 + 0.24;
      vis(o.holder, on);
      if (!on) continue;
      const a = seg(t, o.t0, o.t0 + 0.3), b = seg(t, o.t1, o.t1 + 0.22);
      let x = 0, y = (1 - ease.out(a)) * 26 + ease.in(b) * 12, s = 1;
      if (o.s.slam) {
        s = lerp(1.4, 1, ease.outBack(seg(t, o.t0, o.t0 + 0.34)));
        const k = seg(t, o.t0 + 0.12, o.t0 + 0.6);
        x = k > 0 && k < 1 ? noise1(t * 40, 5) * 14 * (1 - k) : 0;
        y = ease.in(b) * 12;
      }
      tf(o.box, { x, y, s, o: ease.out(a) * (1 - b) });
      if (o.s.type) {
        const n = o.spans.length;
        const p = seg(t, o.t0 + 0.1, o.t0 + Math.min(1.3, (o.t1 - o.t0) * 0.55));
        const k = Math.floor(p * n + 1e-6);
        o.spans.forEach((sp, i) => (sp.style.visibility = i < k ? "visible" : "hidden"));
      }
    }
  }

  window.renderFrame = function (t) {
    const list = VIDEO.scenes;
    for (let i = 0; i < list.length; i++) {
      const sc = list[i], next = list[i + 1];
      const S = scenes[sc.id];
      const inside = t >= sc.start && t < sc.end;
      const tail = next && next.xfade && t >= sc.end && t < next.start + next.xfade; // 다음 장면 아래에서 계속 그림
      const on = inside || tail;
      vis(S.root, on);
      if (!on) continue;
      let o = 1;
      if (inside && sc.xfade && i > 0) o = ease.inOut(seg(t, sc.start, sc.start + sc.xfade));
      S.root.style.opacity = o.toFixed(3);
      S.update(t - sc.start);
    }
    updateSubs(t);
    hud(t);
    updateOverlays(t);
  };

  window.ready = (async () => {
    await preload();
    await document.fonts.load('700 48px "Galmuri11"');
    await document.fonts.load('400 24px "Galmuri11"');
    await document.fonts.ready;
    buildAll();
    window.renderFrame(0);
    // 미리보기: index.html?t=12 (그 시각 정지) · index.html?play 또는 ?play=40 (실시간 재생, 소리 없음)
    const q = new URLSearchParams(location.search);
    if (q.has("t")) window.renderFrame(Number(q.get("t")));
    if (q.has("play")) {
      const t0 = performance.now() - Number(q.get("play") || 0) * 1000;
      const loop = () => { window.renderFrame(((performance.now() - t0) / 1000) % VIDEO.duration); requestAnimationFrame(loop); };
      loop();
    }
    return true;
  })();
})();
