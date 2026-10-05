// Reusable visual components (map, calendar, card, checklist, gauge ...)
(function () {
  const { el, svg, box, set, clamp, lerp, ease, prog, icon } = M;

  // deterministic RNG
  function rng(seed) {
    let s = seed >>> 0;
    return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }

  // ------------------------------------------------------------------ MAP
  const THEMES = {
    dark: { land: "#1A1E28", border: "#2C3242", sea: "transparent", grat: "rgba(255,255,255,0.045)", dot: "#FFFFFF", label: "rgba(255,255,255,0.92)", arc: "rgba(255,255,255,0.85)", hi: "#2A35F0" },
    light: { land: "#E2DDD1", border: "#F3F0E9", sea: "transparent", grat: "rgba(10,12,17,0.05)", dot: "#0A0C11", label: "#0A0C11", arc: "#0A0C11", hi: "#0000DC" },
  };
  class MapView {
    constructor(parent, theme = "dark", rect = { x: 0, y: 0, w: 1920, h: 1080 }, opts = {}) {
      this.th = THEMES[theme]; this.rect = rect; this.theme = theme;
      this.root = box(parent, rect.x, rect.y, { cls: "mapview", style: { width: rect.w + "px", height: rect.h + "px", overflow: "hidden" } });
      if (opts.radius) this.root.style.borderRadius = opts.radius + "px";
      this.svg = svg("svg", { width: rect.w, height: rect.h, viewBox: `0 0 ${EUROPE.W} ${EUROPE.H}`, preserveAspectRatio: "xMidYMid slice" }, this.root);
      this.svg.style.position = "absolute"; this.svg.style.left = "0"; this.svg.style.top = "0";
      svg("path", { d: EUROPE.graticule, fill: "none", stroke: this.th.grat, "stroke-width": 1, "vector-effect": "non-scaling-stroke" }, this.svg);
      this.cg = svg("g", {}, this.svg);
      this.paths = {};
      for (const c of EUROPE.countries) {
        const p = svg("path", { d: c.d, fill: this.th.land, stroke: this.th.border, "stroke-width": 1, "vector-effect": "non-scaling-stroke" }, this.cg);
        this.paths[c.name] = p;
      }
      this.ov = svg("svg", { width: rect.w, height: rect.h, viewBox: `0 0 ${rect.w} ${rect.h}` }, this.root);
      this.ov.style.position = "absolute"; this.ov.style.left = "0"; this.ov.style.top = "0"; this.ov.style.overflow = "visible";
      this.labels = el("div", { style: { position: "absolute", left: "0", top: "0", width: rect.w + "px", height: rect.h + "px" } }, this.root);
      this.pins = {}; this.arcs = []; this.hiState = {};
      this.cam(EUROPE.W / 2, EUROPE.H / 2, 3000);
    }
    cam(cx, cy, w) {
      const h = w * this.rect.h / this.rect.w;
      this.c = { x: cx - w / 2, y: cy - h / 2, w, h };
      const vb = `${this.c.x.toFixed(1)} ${this.c.y.toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}`;
      if (this.svg.getAttribute("viewBox") !== vb) this.svg.setAttribute("viewBox", vb);
    }
    // interpolate between camera keys [{t, cx, cy, w}] with inOutCubic
    camKeys(t, keys) {
      let a = keys[0];
      for (let i = 1; i < keys.length; i++) {
        const k = keys[i];
        if (t < k.t) {
          const p = ease.inOutCubic(clamp((t - k.t) / k.d + 1));
          return this.cam(lerp(a.cx, k.cx, p), lerp(a.cy, k.cy, p), lerp(a.w, k.w, p));
        }
        a = k;
      }
      this.cam(a.cx, a.cy, a.w);
    }
    xy(p) {
      const q = typeof p === "string" ? EUROPE.cities[p] : p;
      return [(q[0] - this.c.x) * this.rect.w / this.c.w, (q[1] - this.c.y) * this.rect.h / this.c.h];
    }
    fill(name, color, alpha = 1) {
      const p = this.paths[name]; if (!p) return;
      const key = color + alpha;
      if (this.hiState[name] === key) return;
      this.hiState[name] = key;
      p.setAttribute("fill", alpha <= 0.001 ? this.th.land : mix(this.th.land, color, alpha));
    }
    pin(name, opts = {}) {
      const g = el("div", { cls: "pin " + (opts.cls || "") }, this.labels);
      g.style.position = "absolute"; g.style.left = "0"; g.style.top = "0";
      const dot = el("div", { cls: "pin-dot" }, g);
      const size = opts.size || 12;
      Object.assign(dot.style, { width: size + "px", height: size + "px", marginLeft: -size / 2 + "px", marginTop: -size / 2 + "px", background: opts.color || this.th.dot });
      let ring = null;
      if (opts.ring) { ring = el("div", { cls: "pin-ring" }, g); ring.style.borderColor = opts.ringColor || opts.color || this.th.dot; }
      let lab = null;
      if (opts.label !== false) {
        lab = el("div", { cls: "pin-label mono", html: opts.label || name.toUpperCase() }, g);
        lab.style.color = opts.labelColor || this.th.label;
        const side = opts.side || "r";
        if (side === "r") Object.assign(lab.style, { left: size / 2 + 10 + "px", top: "-11px" });
        if (side === "l") Object.assign(lab.style, { right: size / 2 + 10 + "px", top: "-11px", textAlign: "right" });
        if (side === "t") Object.assign(lab.style, { left: "0", top: -size / 2 - 34 + "px", transform: "translateX(-50%)", whiteSpace: "nowrap" });
        if (side === "b") Object.assign(lab.style, { left: "0", top: size / 2 + 10 + "px", transform: "translateX(-50%)", whiteSpace: "nowrap" });
      }
      const pin = { g, dot, ring, lab, name, at: opts.at || name };
      this.pins[name] = pin;
      return pin;
    }
    // place pin; o = opacity, s = dot scale, ringP = 0..1 pulse phase
    showPin(name, o, s = 1, ringP = null, labO = 1) {
      const p = this.pins[name]; const [x, y] = this.xy(p.at);
      set(p.g, o, x, y, 1);
      p.dot.style.transform = `scale(${s.toFixed(3)})`;
      if (p.lab) p.lab.style.opacity = String(labO);
      if (p.ring) {
        if (ringP == null) p.ring.style.opacity = "0";
        else { const r = ringP % 1; p.ring.style.opacity = String((1 - r) * 0.8); p.ring.style.transform = `translate(-50%,-50%) scale(${(0.6 + r * 2.6).toFixed(3)})`; }
      }
    }
    arc(a, b, opts = {}) {
      const p = svg("path", { fill: "none", stroke: opts.color || this.th.arc, "stroke-width": opts.width || 2, pathLength: 1, "stroke-linecap": "round" }, this.ov);
      if (opts.dash) p.setAttribute("stroke-dasharray", opts.dash);
      const arc = { p, a, b, bend: opts.bend == null ? 0.18 : opts.bend, dashed: !!opts.dash };
      this.arcs.push(arc);
      return arc;
    }
    showArc(arc, frac, o = 1) {
      const [x1, y1] = this.xy(arc.a), [x2, y2] = this.xy(arc.b);
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1;
      const cx = mx - dy * arc.bend, cy = my + dx * arc.bend;
      arc.p.setAttribute("d", `M${x1.toFixed(1)},${y1.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`);
      const f = clamp(frac);
      if (!arc.dashed) { arc.p.setAttribute("stroke-dasharray", "1 1"); arc.p.setAttribute("stroke-dashoffset", String(1 - f)); }
      else arc.p.style.clipPath = "";
      arc.p.style.opacity = String(f > 0.001 ? o : 0);
    }
  }
  function hex(c) { const n = parseInt(c.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
  function mix(a, b, p) {
    const A = hex(a), B = hex(b);
    return "#" + A.map((v, i) => Math.round(lerp(v, B[i], p)).toString(16).padStart(2, "0")).join("");
  }

  // ------------------------------------------------------------ CALENDAR
  // month strip starting at OCT 2026; rows of bars
  const MONTHS = ["OCT", "NOV", "DEC", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  class Calendar {
    constructor(parent, x, y, w, rows, opts = {}) {
      this.x = x; this.y = y; this.w = w; this.mw = w / MONTHS.length; this.opts = opts;
      this.root = box(parent, x, y, { cls: "cal" });
      const head = box(this.root, 0, 0, { cls: "cal-head" });
      this.years = [];
      [["2026", 0], ["2027", 3]].forEach(([yr, m]) => this.years.push(box(head, m * this.mw, -34, { cls: "mono cal-year", text: yr })));
      this.heads = MONTHS.map((m, i) => box(head, i * this.mw, 0, { cls: "mono cal-m", text: m, style: { width: this.mw + "px" } }));
      this.grid = MONTHS.map((m, i) => box(this.root, i * this.mw, 34, { cls: "cal-grid" + (i === 3 ? " yr" : ""), style: { height: (rows.length * 92 + 20) + "px" } }));
      this.rows = {};
      rows.forEach((r, i) => {
        const ry = 60 + i * 92;
        const lab = box(this.root, -230, ry + 6, { cls: "cal-label", html: r.label });
        const bar = box(this.root, 0, ry, { cls: "cal-bar " + (r.cls || "") });
        const txt = el("div", { cls: "cal-bar-text mono", html: r.text || "" }, bar);
        this.rows[r.id] = { lab, bar, txt, y: ry };
      });
      this.marks = {};
    }
    mx(m) { return m * this.mw; } // month index -> x (0 = OCT 2026)
    showRow(id, o, m0, m1, labO = o) {
      const r = this.rows[id];
      set(r.lab, labO, 0, 0, 1);
      if (m1 <= m0 + 0.001) { r.bar.style.visibility = "hidden"; return; }
      r.bar.style.visibility = o > 0.001 ? "visible" : "hidden";
      r.bar.style.opacity = String(o);
      r.bar.style.left = this.mx(m0) + "px";
      r.bar.style.width = (this.mx(m1) - this.mx(m0)) + "px";
    }
    mark(id, m, label, cls = "") {
      const g = box(this.root, this.mx(m), 20, { cls: "cal-mark " + cls });
      const hh = Object.keys(this.rows).length * 92 + 40;
      el("div", { cls: "cal-mark-line" }, g).style.height = hh + "px";
      el("div", { cls: "cal-mark-label mono", html: label }, g).style.top = hh + 8 + "px";
      this.marks[id] = g; return g;
    }
    band(id, m0, m1, cls, label) {
      const g = box(this.root, this.mx(m0), 34, { cls: "cal-band " + cls });
      g.style.width = (this.mx(m1) - this.mx(m0)) + "px";
      g.style.height = (Object.keys(this.rows).length * 92 + 20) + "px";
      if (label) el("div", { cls: "cal-band-label mono", html: label }, g);
      this.marks[id] = g; return g;
    }
    showHead(o) {
      this.heads.forEach((h, i) => set(h, clamp(o * 1.6 - i * 0.04), 0, (1 - clamp(o)) * 8));
      this.grid.forEach((g, i) => { g.style.opacity = String(clamp(o * 1.6 - i * 0.04) * 1); });
      this.years.forEach((y) => set(y, o));
    }
  }

  // --------------------------------------------------------------- CHECK
  // a row with a circular check/cross mark that draws in
  function checkRow(parent, x, y, label, sub, opts = {}) {
    const row = box(parent, x, y, { cls: "crow " + (opts.cls || "") });
    const mark = el("div", { cls: "cmark" }, row);
    const s = svg("svg", { viewBox: "0 0 24 24", width: 30, height: 30 }, mark);
    const circ = svg("circle", { cx: 12, cy: 12, r: 11, fill: "currentColor" }, s);
    const ok = svg("path", { d: M.ICON.check, fill: "none", stroke: "#fff", "stroke-width": 2.4, "stroke-linecap": "round", "stroke-linejoin": "round", pathLength: 1 }, s);
    const no = svg("path", { d: M.ICON.cross, fill: "none", stroke: "#fff", "stroke-width": 2.4, "stroke-linecap": "round", pathLength: 1 }, s);
    const lab = el("div", { cls: "clab", html: label }, row);
    const sb = sub ? el("div", { cls: "csub", html: sub }, row) : null;
    return { row, mark, circ, ok, no, lab, sb, kind: null };
  }
  // kind: 'ok' | 'no' | 'pending'
  function showCheck(r, o, p, kind, dx = 0) {
    set(r.row, o, dx * (1 - o), 0);
    const col = kind === "no" ? "#E0453E" : kind === "ok" ? "var(--muni)" : "rgba(10,12,17,0.18)";
    if (r.kind !== kind) { r.mark.style.color = col; r.kind = kind; }
    r.mark.style.transform = `scale(${(0.6 + 0.4 * ease.outBack(clamp(p))).toFixed(3)})`;
    M.draw(r.ok, kind === "ok" ? (p - 0.2) / 0.8 : 0);
    M.draw(r.no, kind === "no" ? (p - 0.2) / 0.8 : 0);
  }

  // --------------------------------------------------------------- GAUGE
  function gauge(parent, x, y, r, opts = {}) {
    const g = box(parent, x, y, { cls: "gauge" });
    const s = svg("svg", { width: r * 2 + 40, height: r + 60, viewBox: `${-r - 20} ${-r - 20} ${r * 2 + 40} ${r + 60}` }, g);
    const seg = (a0, a1, col, w = 18) => {
      const p0 = [Math.cos(Math.PI + a0 * Math.PI) * r, Math.sin(Math.PI + a0 * Math.PI) * r];
      const p1 = [Math.cos(Math.PI + a1 * Math.PI) * r, Math.sin(Math.PI + a1 * Math.PI) * r];
      return svg("path", { d: `M${p0[0]},${p0[1]} A${r},${r} 0 0 1 ${p1[0]},${p1[1]}`, fill: "none", stroke: col, "stroke-width": w, pathLength: 1 }, s);
    };
    const track = seg(0, 1, "rgba(10,12,17,0.08)");
    const zones = [seg(0.002, 0.33, "rgba(10,12,17,0.16)"), seg(0.335, 0.66, "rgba(0,0,220,0.35)"), seg(0.665, 0.998, "var(--muni)")];
    const needle = svg("line", { x1: 0, y1: 0, x2: -r + 34, y2: 0, stroke: opts.needle || "#0A0C11", "stroke-width": 5, "stroke-linecap": "round" }, s);
    svg("circle", { cx: 0, cy: 0, r: 11, fill: opts.needle || "#0A0C11" }, s);
    const labs = (opts.labels || ["LOW", "MID", "HIGH"]).map((t, i) => {
      const a = Math.PI + (i * 0.33 + 0.165) * Math.PI;
      return box(g, r + 20 + Math.cos(a) * (r + 46) - 40, r + 20 + Math.sin(a) * (r + 46) - 12, { cls: "mono gauge-lab", text: t, style: { width: "80px", textAlign: "center" } });
    });
    return { g, needle, zones, track, labs, r };
  }
  function showGauge(G, o, drawP, v) {
    set(G.g, o, 0, (1 - o) * 20);
    G.zones.forEach((z, i) => M.draw(z, clamp(drawP * 3 - i)));
    M.draw(G.track, 1);
    const a = 180 + v * 180;
    G.needle.setAttribute("transform", `rotate(${(v * 180).toFixed(2)})`);
    G.labs.forEach((l, i) => (l.style.opacity = String(clamp(drawP * 3 - i))));
  }

  // --------------------------------------------------------------- STAMP
  function stamp(parent, x, y, text, cls = "") {
    return box(parent, x, y, { cls: "stamp " + cls, html: text });
  }
  function showStamp(s, t, t0, rot = -8) {
    const p = clamp((t - t0) / 0.28);
    const sc = p <= 0 ? 1.6 : lerp(1.6, 1, ease.outCubic(p));
    set(s, p > 0 ? Math.min(1, p * 2) : 0, 0, 0, sc, ` rotate(${rot}deg)`);
  }

  window.C = { rng, MapView, Calendar, MONTHS, checkRow, showCheck, gauge, showGauge, stamp, showStamp, mix };
})();
