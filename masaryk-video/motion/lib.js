// Deterministic motion helpers. Every visual state is a pure function of time,
// so any frame can be rendered independently (seek(t) -> screenshot).
(function () {
  const W = 1920, H = 1080;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, p) => a + (b - a) * p;
  const ease = {
    lin: (p) => p,
    outCubic: (p) => 1 - Math.pow(1 - p, 3),
    outQuart: (p) => 1 - Math.pow(1 - p, 4),
    outQuint: (p) => 1 - Math.pow(1 - p, 5),
    outExpo: (p) => (p >= 1 ? 1 : 1 - Math.pow(2, -10 * p)),
    inCubic: (p) => p * p * p,
    inOutCubic: (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2),
    inOutSine: (p) => -(Math.cos(Math.PI * p) - 1) / 2,
    inOutQuart: (p) => (p < 0.5 ? 8 * p * p * p * p : 1 - Math.pow(-2 * p + 2, 4) / 2),
    outBack: (p) => { const c1 = 1.3, c3 = c1 + 1; return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2); },
  };
  // progress of an animation that starts at t0 and lasts d seconds
  const prog = (t, t0, d, ez = ease.outCubic) => ez(clamp((t - t0) / d));
  // in at t0 (dur din), out at t1 (dur dout) -> 0..1..0
  const inout = (t, t0, din, t1, dout, ezi = ease.outCubic, ezo = ease.inOutCubic) => {
    if (t1 == null || t < t1) return prog(t, t0, din, ezi);
    return prog(t, t0, din, ezi) * (1 - prog(t, t1, dout, ezo));
  };

  function el(tag, opts = {}, parent) {
    const e = document.createElement(tag);
    if (opts.cls) e.className = opts.cls;
    if (opts.html != null) e.innerHTML = opts.html;
    if (opts.text != null) e.textContent = opts.text;
    if (opts.style) Object.assign(e.style, opts.style);
    if (opts.attrs) for (const [k, v] of Object.entries(opts.attrs)) e.setAttribute(k, v);
    if (parent) parent.appendChild(e);
    return e;
  }
  const NS = "http://www.w3.org/2000/svg";
  function svg(tag, attrs = {}, parent) {
    const e = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
    if (parent) parent.appendChild(e);
    return e;
  }
  // absolutely positioned box
  function box(parent, x, y, opts = {}) {
    const e = el(opts.tag || "div", opts, parent);
    e.style.position = "absolute"; e.style.left = x + "px"; e.style.top = y + "px";
    return e;
  }
  // set opacity + transform in one go; skips work when nothing changed
  function set(e, o = 1, x = 0, y = 0, s = 1, extra = "") {
    const vis = o > 0.001;
    const st = e.style;
    const op = vis ? String(Math.round(o * 1000) / 1000) : "0";
    if (st.opacity !== op) st.opacity = op;
    const tr = `translate(${x.toFixed(2)}px,${y.toFixed(2)}px) scale(${s.toFixed(4)})${extra}`;
    if (st.transform !== tr) st.transform = tr;
    const v = vis ? "visible" : "hidden";
    if (st.visibility !== v) st.visibility = v;
  }
  // masked line reveal: wrapper with overflow hidden, child slides up
  function line(parent, x, y, html, cls, extra = {}) {
    const wrap = box(parent, x, y, { cls: "mask " + (extra.wrapCls || "") });
    const inner = el("div", { cls: cls, html }, wrap);
    if (extra.style) Object.assign(inner.style, extra.style);
    if (extra.wrapStyle) Object.assign(wrap.style, extra.wrapStyle);
    return { wrap, inner };
  }
  function reveal(ln, p, out = 0) {
    // p: 0..1 in, out: 0..1 out (slides up and away)
    const y = (1 - p) * 105 - out * 105;
    ln.inner.style.transform = `translateY(${y.toFixed(2)}%)`;
    ln.wrap.style.visibility = p > 0.001 && out < 0.999 ? "visible" : "hidden";
  }
  // count-up text
  function count(e, v, digits = 0) {
    const s = v.toFixed(digits);
    if (e.textContent !== s) e.textContent = s;
  }
  // stroke draw for svg paths using pathLength=1
  function draw(p, frac) {
    const f = clamp(frac);
    p.setAttribute("stroke-dasharray", "1 1");
    p.setAttribute("stroke-dashoffset", String(1 - f));
    p.style.visibility = f > 0.001 ? "visible" : "hidden";
  }

  // ----------------------------------------------------------------- icons
  // 24x24 line icons (stroke = currentColor)
  const ICON = {
    check: "M5 12.5l4.5 4.5L19 7.5",
    cross: "M6.5 6.5l11 11M17.5 6.5l-11 11",
    plane: "M10.5 20.5l1.6-6.6-6.1-2.7.1-1.7 6.8 1.1L15 4.5c.6-1 1.9-1.3 2.4-.8.5.5.2 1.8-.8 2.4l-5.5 2.9 1.1 6.8-1.7.1-2.7-6.1",
    train: "M7 3.5h10a2 2 0 0 1 2 2v9a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-9a2 2 0 0 1 2-2zM5 10.5h14M8.5 14.5h.01M15.5 14.5h.01M8 17.5l-2 3M16 17.5l2 3",
    doc: "M6.5 3.5h7l4 4v13h-11zM13.5 3.5v4h4M9 12h6M9 15h6M9 18h4",
    house: "M4 11l8-6.5 8 6.5M6 9.5v10h12v-10M10 19.5v-5h4v5",
    dorm: "M4.5 20.5v-15h9v15M13.5 9.5h6v11M3 20.5h18M7.5 8.5h1M10 8.5h1M7.5 11.5h1M10 11.5h1M7.5 14.5h1M10 14.5h1M16 12.5h1M16 15.5h1M8.5 20.5v-3h1.5v3",
    chat: "M4 6.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-4.5 3.5v-3.5H6a2 2 0 0 1-2-2z",
    mail: "M3.5 6.5h17v11h-17zM3.5 7l8.5 6.5L20.5 7",
    person: "M12 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM5 20.5c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5",
    seat: "M7 4.5v8a2 2 0 0 0 2 2h7M7 12.5h9.5a1.5 1.5 0 0 1 1.5 1.5v6M7 14.5v6M16 14.5v6",
    search: "M10.5 17.5a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM15.5 15.5l5 5",
    clock: "M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17zM12 7.5v5l3 2",
    cal: "M4.5 6h15v14.5h-15zM4.5 10h15M8.5 3.5v4M15.5 3.5v4",
    euro: "M17.5 6.5A6.5 6.5 0 1 0 17.5 17.5M4.5 10.5h9M4.5 13.5h9",
    pin: "M12 21s6.5-5.8 6.5-11a6.5 6.5 0 0 0-13 0C5.5 15.2 12 21 12 21zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
    grad: "M2.5 9L12 4.5 21.5 9 12 13.5zM6.5 11v5c1.5 1.6 3.5 2.5 5.5 2.5s4-.9 5.5-2.5v-5M21.5 9v5",
    phone: "M7.5 2.5h9a1.5 1.5 0 0 1 1.5 1.5v16a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 20V4a1.5 1.5 0 0 1 1.5-1.5zM10.5 18.5h3",
    globe: "M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17zM3.5 12h17M12 3.5c2.3 2.4 3.3 5.2 3.3 8.5s-1 6.1-3.3 8.5c-2.3-2.4-3.3-5.2-3.3-8.5s1-6.1 3.3-8.5z",
    star: "M12 4l2.4 5 5.4.6-4 3.7 1.1 5.3L12 15.9l-4.9 2.7 1.1-5.3-4-3.7 5.4-.6z",
    route: "M6 18.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 9.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM8 16.5h7.5a3 3 0 0 0 0-6h-7a3 3 0 0 1 0-6H16",
  };
  function icon(parent, name, size = 32, color = "currentColor", sw = 1.6) {
    const s = svg("svg", { viewBox: "0 0 24 24", width: size, height: size, fill: "none" }, parent);
    s.style.color = color;
    svg("path", { d: ICON[name], stroke: "currentColor", "stroke-width": sw, "stroke-linecap": "round", "stroke-linejoin": "round", pathLength: 1 }, s);
    return s;
  }

  window.M = { W, H, clamp, lerp, ease, prog, inout, el, svg, box, set, line, reveal, count, draw, icon, ICON };
})();
