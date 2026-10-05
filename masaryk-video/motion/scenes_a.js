// SCENE 01-04
window.SCENES = window.SCENES || {};
(function () {
  const { el, svg, box, set, clamp, lerp, ease, prog, inout, line, reveal, count, draw, icon } = M;
  const S = window.SCENES;
  const CITY = EUROPE.cities;
  const BR = CITY.Brno;

  // ================================================================ 01 OPENING
  S.s01 = {
    build(root, c) {
      const st = {};
      st.map = new C.MapView(root, "dark");
      const order = ["London", "Berlin", "Amsterdam", "Madrid", "Prague"];
      st.order = order;
      const side = { London: "l", Amsterdam: "l", Berlin: "r", Madrid: "r", Prague: "r" };
      order.forEach((n) => st.map.pin(n, { size: 11, side: side[n] }));
      st.arcs = [];
      const bends = [0.16, 0.42, -0.18, 0.2];
      for (let i = 0; i < order.length - 1; i++) st.arcs.push(st.map.arc(order[i], order[i + 1], { width: 1.6, color: "rgba(255,255,255,.55)", bend: bends[i] }));
      st.map.pin("Brno", { size: 16, color: "#5563FF", ring: true, ringColor: "#5563FF", label: false });
      st.brTag = box(st.map.labels, 0, 0, { style: { width: "620px" } });
      el("div", { cls: "mono", text: "Brno, Czech Republic", style: { fontSize: "17px", color: "rgba(255,255,255,.7)" } }, st.brTag);
      el("div", { cls: "serif", text: "Masaryk University", style: { fontSize: "56px", lineHeight: "1.1", marginTop: "6px" } }, st.brTag);

      // 218
      st.n218Lab = box(root, 0, 236, { cls: "mono center", text: "SKKU · exchange partner universities", style: { width: "1920px", fontSize: "20px", color: "rgba(255,255,255,.75)" } });
      st.n218 = box(root, 0, 262, { cls: "serif center", text: "0", style: { width: "1920px", fontSize: "330px", lineHeight: "1" } });
      st.yearTag = box(root, 1330, 430, { cls: "pill mono", html: "1 year +", style: { fontSize: "22px", color: "#fff" } });
      const ds = svg("svg", { width: 1920, height: 1080 }, root);
      ds.style.position = "absolute"; ds.style.left = "0"; ds.style.top = "0";
      st.dotsSvg = ds;
      const cols = 37, rows = 6, gap = 30, x0 = 960 - (cols - 1) * gap / 2, y0 = 690;
      st.dots = [];
      for (let k = 0; k < 218; k++) {
        const col = k % cols, row = Math.floor(k / cols);
        const cx = x0 + col * gap, cy = y0 + row * gap;
        st.dots.push({ e: svg("circle", { cx, cy, r: 5, fill: "#fff" }, ds), cx, cy, col });
      }
      const R = C.rng(218);
      st.links = [];
      for (let k = 0; k < 16; k++) {
        const a = st.dots[Math.floor(R() * 218)], b = st.dots[Math.floor(R() * 218)];
        st.links.push({ l: svg("line", { x1: a.cx, y1: a.cy, x2: b.cx, y2: b.cy, stroke: "#5563FF", "stroke-width": 2, pathLength: 1 }, ds), a, b, d: R() });
      }
      st.hi = new Set(); for (let k = 0; k < 18; k++) st.hi.add(Math.floor(R() * 218));

      // agenda
      st.ag = [
        ["01", "Criteria", "선택 기준"],
        ["02", "Why Masaryk", "최종 선택"],
        ["03", "Tips", "지원 팁"],
      ].map(([n, en, kr], i) => {
        const y = 300 + i * 170;
        const num = box(root, 300, y + 22, { cls: "mono", text: n, style: { fontSize: "22px", color: "#5563FF", fontWeight: "700" } });
        const t = line(root, 400, y, en, "serif", { style: { fontSize: "104px", lineHeight: "1.05" } });
        const k = line(root, 1320, y + 34, kr, "kr", { style: { fontSize: "38px", fontWeight: "500", color: "rgba(255,255,255,.6)" } });
        const rule = box(root, 300, y + 150, { style: { width: "1320px", height: "1px", background: "rgba(255,255,255,.16)", transformOrigin: "0 0" } });
        return { num, t, k, rule };
      });
      // title
      st.logo = box(root, 960 - 420, 360, { tag: "img", attrs: { src: "assets/muni-logo-white.svg" }, style: { width: "840px" } });
      st.logoMask = st.logo;
      st.rule = box(root, 960 - 160, 610, { style: { width: "320px", height: "2px", background: "#5563FF", transformOrigin: "50% 50%" } });
      st.place = box(root, 0, 646, { cls: "mono center", text: "Brno, Czech Republic", style: { width: "1920px", fontSize: "26px", letterSpacing: ".3em" } });
      return st;
    },
    update(t, st, c) {
      const q = c.q, L = c.L;
      const m = st.map;
      // camera
      const ov = { cx: 1560, cy: 1690, w: 2900 };
      m.camKeys(t, [
        { t: 0, cx: 1620, cy: 1720, w: 3300 },
        { t: q("czech") - 0.3, d: q("czech") - 0.3, cx: 1580, cy: 1700, w: 3000 },
        { t: q("czech") + 1.6, d: 1.9, cx: BR[0] - 60, cy: BR[1] - 10, w: 1500 },
        { t: q("pullback") + 1.5, d: 1.5, cx: ov.cx, cy: ov.cy, w: ov.w },
        { t: q("ag1"), d: q("ag1") - q("pullback") - 1.5, cx: 1600, cy: 1680, w: 2700 },
        { t: q("title") + 2.4, d: 2.4, cx: BR[0], cy: BR[1] + 40, w: 1250 },
      ]);
      const mapO = prog(t, 0.15, 2.2, ease.inOutSine) * (1 - 0.72 * prog(t, q("skku"), 0.8)) * (1 - 0.6 * prog(t, q("ag1") - 0.2, 0.6)) ;
      const mapO2 = t > q("title") ? lerp(mapO, 0.5, prog(t, q("title"), 1.2)) : mapO;
      m.root.style.opacity = String(mapO2);
      // brno + tag
      const brIn = prog(t, q("brno"), 0.5);
      const brOut = prog(t, q("pullback"), 0.5);
      const brTitle = prog(t, q("title"), 0.8);
      m.showPin("Brno", Math.max(brIn * (1 - brOut * 0.6), brTitle), 1, t > q("brno") ? (t - q("brno")) / 1.6 : null);
      const [bx, by] = m.xy("Brno");
      set(st.brTag, brIn * (1 - brOut), bx + 28, by - 54 + (1 - brIn) * 14);
      // cities (exploration), dimmed once the 218 count starts, gone for the title
      const cityK = (1 - 0.8 * prog(t, q("skku"), 0.6)) * (1 - prog(t, q("ag1") - 0.3, 0.5));
      st.order.forEach((n, i) => {
        const t0 = q("cities") + i * 0.36;
        const o = prog(t, t0, 0.4) * cityK;
        m.showPin(n, o, 0.4 + 0.6 * ease.outBack(clamp((t - t0) / 0.4)), null, 1);
        if (i > 0) m.showArc(st.arcs[i - 1], prog(t, t0 - 0.36, 0.5, ease.inOutCubic), cityK);
      });
      // 218
      const s0 = q("skku");
      set(st.n218Lab, prog(t, s0, 0.6) * (1 - prog(t, q("ag1") - 0.3, 0.4)), 0, (1 - prog(t, s0, 0.6)) * 10);
      const n0 = q("n218"), n1 = q("n218end");
      const cp = prog(t, n0 - 0.05, Math.max(0.5, n1 - n0 + 0.05), ease.outQuart);
      count(st.n218, Math.round(218 * cp));
      const outAll = 1 - prog(t, q("ag1") - 0.3, 0.45);
      set(st.n218, prog(t, n0 - 0.1, 0.3) * outAll, 0, 0, 1);
      const dotP = clamp((t - n0 + 0.05) / Math.max(0.5, n1 - n0));
      st.dots.forEach((d, k) => {
        const p = clamp(dotP * 1.4 - d.col / 37 * 0.4);
        const cmp = t > q("compare");
        let o = p;
        if (cmp) { const f = prog(t, q("compare"), 0.6); o = st.hi.has(k) ? 1 : lerp(1, 0.28, f); }
        d.e.setAttribute("opacity", (o * outAll).toFixed(3));
        d.e.setAttribute("r", (5 * (0.3 + 0.7 * ease.outBack(p))).toFixed(2));
      });
      st.links.forEach((L2, k) => {
        const t0 = q("compare") + 0.1 + L2.d * 1.4;
        const p = prog(t, t0, 0.35, ease.inOutCubic) * (1 - prog(t, t0 + 0.9, 0.4));
        draw(L2.l, p); L2.l.style.opacity = String(outAll);
      });
      set(st.yearTag, prog(t, q("year"), 0.5) * outAll, (1 - prog(t, q("year"), 0.5)) * 20, 0);
      // agenda
      const agOut = prog(t, q("title") - 0.05, 0.5, ease.inOutCubic);
      st.ag.forEach((a, i) => {
        const t0 = q(["ag1", "ag2", "ag3"][i]);
        const p = prog(t, t0, 0.7, ease.outQuart);
        reveal(a.t, p, agOut); reveal(a.k, prog(t, t0 + 0.12, 0.7, ease.outQuart), agOut);
        set(a.num, p * (1 - agOut));
        a.rule.style.transform = `scaleX(${(prog(t, t0, 0.9, ease.inOutCubic) * (1 - agOut)).toFixed(3)})`;
        a.rule.style.opacity = String(1 - agOut);
      });
      // title
      const tp = prog(t, q("title") + 0.25, 1.1, ease.outQuart);
      st.logo.style.clipPath = `inset(0 ${(100 - tp * 100).toFixed(2)}% 0 0)`;
      set(st.logo, tp > 0 ? 1 : 0, 0, (1 - tp) * 10);
      st.rule.style.transform = `scaleX(${prog(t, q("title") + 0.7, 0.8, ease.inOutCubic).toFixed(3)})`;
      set(st.place, prog(t, q("title") + 0.9, 0.8), 0, (1 - prog(t, q("title") + 0.9, 0.8)) * 12);
    },
  };

  // ================================================================ 02 MY SITUATION
  S.s02 = {
    build(root, c) {
      const st = {};
      const tl = (st.tl = box(root, 0, 0, { style: { width: "1920px", height: "1080px" } }));
      const AX = 560;
      st.AX = AX;
      const s = svg("svg", { width: 1920, height: 1080 }, tl);
      s.style.position = "absolute";
      st.axis = [
        svg("line", { x1: 160, y1: AX, x2: 520, y2: AX, stroke: "#0A0C11", "stroke-width": 3, pathLength: 1 }, s),
        svg("line", { x1: 520, y1: AX, x2: 820, y2: AX, stroke: "#0A0C11", "stroke-width": 3, pathLength: 1 }, s),
        svg("line", { x1: 820, y1: AX, x2: 1220, y2: AX, stroke: "#0A0C11", "stroke-width": 3, pathLength: 1 }, s),
      ];
      st.svc = box(tl, 820, AX - 22, { style: { width: "400px", height: "14px", background: "repeating-linear-gradient(135deg, rgba(10,12,17,.55) 0 3px, transparent 3px 9px)", transformOrigin: "0 0" } });
      st.dash = svg("line", { x1: 1220, y1: AX, x2: 1620, y2: AX, stroke: "#9A9DA5", "stroke-width": 3, "stroke-dasharray": "2 12", "stroke-linecap": "round" }, s);
      st.branch = svg("path", { d: `M1220,${AX} C1400,${AX} 1440,330 1620,330`, fill: "none", stroke: "#0000DC", "stroke-width": 4, pathLength: 1, "stroke-linecap": "round" }, s);
      const node = (x, y, col = "#0A0C11", r = 11) => svg("circle", { cx: x, cy: y, r, fill: col }, s);
      st.nodes = { y2024: node(220, AX), sem: node(520, AX), mil: node(820, AX), dis: node(1220, AX), back: node(1620, AX, "#9A9DA5", 9) };
      st.exRing = svg("circle", { cx: 1620, cy: 330, r: 30, fill: "none", stroke: "#0000DC", "stroke-width": 2 }, s);
      st.ripples = [0, 1, 2].map(() => svg("circle", { cx: 1620, cy: 330, r: 30, fill: "none", stroke: "#0000DC", "stroke-width": 1.5 }, s));
      st.exNode = node(1620, 330, "#0000DC", 15);
      const lab = (x, big, mono, kr, y = AX + 40, align = "center") => {
        const g = box(tl, x - 200, y, { style: { width: "400px", textAlign: align } });
        el("div", { cls: "serif", html: big, style: { fontSize: "64px", lineHeight: "1" } }, g);
        el("div", { cls: "mono", html: mono, style: { fontSize: "17px", marginTop: "14px" } }, g);
        el("div", { cls: "kr", html: kr, style: { fontSize: "24px", color: "var(--mid)", marginTop: "8px" } }, g);
        return g;
      };
      st.logo = box(tl, 220 - 46, AX - 140, { tag: "img", attrs: { src: "assets/skku.png" }, style: { width: "92px" } });
      st.L = {
        skku: lab(220, "2024", "SKKU · Entered", "성균관대 24학번"),
        sem: lab(520, "2 <span class='it'>Semesters</span>", "Year 1 complete", "1학년 수료"),
        mil: lab(820, "2025", "Military service", "군 입대"),
        dis: lab(1220, "2026.10", "Discharge", "전역 예정"),
        back: box(tl, 1620 - 200, AX + 40, { cls: "mono center", html: "Back to SKKU", style: { width: "400px", fontSize: "17px", color: "#9A9DA5" } }),
        ex: (() => { const g = box(tl, 1620 - 260, 120, { style: { width: "520px", textAlign: "center" } });
          el("div", { cls: "serif muni", text: "2027.01", style: { fontSize: "72px", lineHeight: "1" } }, g);
          el("div", { cls: "mono muni", text: "Exchange student", style: { fontSize: "18px", marginTop: "12px" } }, g); return g; })(),
      };
      // stats
      const stat = (x, labTxt, sub) => {
        const g = box(root, x, 250, { style: { width: "620px" } });
        const n = el("div", { cls: "serif", text: "0", style: { fontSize: "300px", lineHeight: "1", fontVariantNumeric: "tabular-nums" } }, g);
        const r = el("div", { style: { display: "flex", gap: "18px", alignItems: "baseline", marginTop: "18px" } }, g);
        el("div", { cls: "mono", text: labTxt, style: { fontSize: "26px", fontWeight: "700" } }, r);
        el("div", { cls: "mono dim", text: sub, style: { fontSize: "20px" } }, r);
        const rule = el("div", { style: { width: "560px", height: "2px", background: "var(--ink)", marginTop: "22px", transformOrigin: "0 0" } }, g);
        return { g, n, rule };
      };
      st.gpa = stat(330, "GPA", "/ 4.5");
      st.ielts = stat(1050, "IELTS", "Overall");
      st.where = line(root, 0, 330, "Where to?", "serif it center", { style: { fontSize: "250px", lineHeight: "1.05", width: "1920px" } });
      st.whereKr = box(root, 0, 650, { cls: "kr center", text: "어디로 갈 것인가?", style: { width: "1920px", fontSize: "44px", fontWeight: "500", color: "var(--mid)" } });
      return st;
    },
    update(t, st, c) {
      const q = c.q;
      draw(st.axis[0], prog(t, q("skku") - 0.2, 0.9, ease.inOutCubic) * 0.15 + prog(t, q("sem") - 0.2, 0.6, ease.inOutCubic) * 0.85);
      draw(st.axis[1], prog(t, q("mil") - 0.3, 0.5, ease.inOutCubic));
      draw(st.axis[2], prog(t, q("dis") - 0.4, 0.6, ease.inOutCubic));
      st.svc.style.transform = `scaleX(${prog(t, q("mil"), 1.2, ease.inOutCubic).toFixed(3)})`;
      const pn = (n, t0) => { const p = ease.outBack(clamp((t - t0) / 0.45)); n.setAttribute("opacity", String(clamp((t - t0) / 0.2))); n.setAttribute("transform", `translate(${n.getAttribute("cx")} ${n.getAttribute("cy")}) scale(${p}) translate(${-n.getAttribute("cx")} ${-n.getAttribute("cy")})`); };
      pn(st.nodes.y2024, q("skku")); pn(st.nodes.sem, q("sem")); pn(st.nodes.mil, q("mil")); pn(st.nodes.dis, q("dis"));
      const lab = (g, t0) => set(g, prog(t, t0, 0.6), 0, (1 - prog(t, t0, 0.6)) * 16);
      lab(st.L.skku, q("y2024")); lab(st.L.sem, q("sem")); lab(st.L.mil, q("mil")); lab(st.L.dis, q("dis"));
      set(st.logo, prog(t, q("skku"), 0.6), 0, (1 - prog(t, q("skku"), 0.6)) * 16);
      // default path vs branch
      const dP = prog(t, q("back"), 0.8);
      const ab = prog(t, q("abroad"), 0.6);
      st.dash.style.opacity = String(dP * (1 - 0.7 * ab));
      pn(st.nodes.back, q("back") + 0.4); st.nodes.back.style.opacity = String(clamp((t - q("back") - 0.4) / 0.3) * (1 - 0.7 * ab));
      set(st.L.back, dP * (1 - 0.7 * ab));
      draw(st.branch, prog(t, q("abroad"), 0.9, ease.inOutCubic));
      const exP = prog(t, q("abroad") + 0.6, 0.5);
      const grow = 1 + 0.35 * prog(t, q("grow"), 0.8, ease.outBack);
      st.exNode.setAttribute("r", (15 * exP * grow).toFixed(2));
      st.exRing.setAttribute("r", (30 * grow).toFixed(2));
      st.exRing.setAttribute("opacity", (exP * 0.6).toFixed(3));
      set(st.L.ex, exP, 0, (1 - exP) * 14);
      st.ripples.forEach((r, i) => {
        const t0 = q("wide") + i * 0.55;
        const ph = t > t0 ? ((t - t0) / 1.9) % 1 : -1;
        const on = t > t0 && t < q("stats") + 0.4;
        r.setAttribute("r", (30 + Math.max(ph, 0) * 260).toFixed(1));
        r.setAttribute("opacity", on ? ((1 - ph) * 0.5).toFixed(3) : "0");
      });
      // timeline recedes
      const rec = prog(t, q("stats"), 0.7, ease.inOutCubic);
      set(st.tl, 1 - rec, 0, -60 * rec);
      // stats
      const st1 = prog(t, q("stats") + 0.2, 0.6);
      const out1 = prog(t, q("one"), 0.6, ease.inOutCubic);
      const out2 = prog(t, q("where") - 0.2, 0.4);
      [["gpa", 4.33, 2], ["ielts", 8.0, 1]].forEach(([k, v, dg]) => {
        const s = st[k];
        const t0 = q(k);
        const p = prog(t, t0 - 0.05, 0.85, ease.outQuart);
        count(s.n, v * p, dg);
        s.n.style.opacity = String(prog(t, t0 - 0.1, 0.25));
        set(s.g, st1 * (1 - out2), 0, (1 - st1) * 20 - out1 * 30, 1 - 0.12 * out1);
        s.g.style.opacity = String(st1 * (1 - out2) * (1 - 0.65 * out1));
        s.rule.style.transform = `scaleX(${prog(t, q("stats") + 0.3, 0.8, ease.inOutCubic).toFixed(3)})`;
      });
      reveal(st.where, prog(t, q("where"), 0.8, ease.outQuart));
      set(st.whereKr, prog(t, q("where") + 0.35, 0.6), 0, (1 - prog(t, q("where") + 0.35, 0.6)) * 12);
    },
  };

  // ================================================================ 03 WHAT DO I WANT
  S.s03 = {
    build(root, c) {
      const st = {};
      st.map = new C.MapView(root, "light");
      st.net = [["London", "Paris"], ["Paris", "Barcelona"], ["Barcelona", "Rome"], ["Paris", "Amsterdam"], ["Amsterdam", "Berlin"], ["Berlin", "Prague"], ["Prague", "Vienna"], ["Vienna", "Budapest"], ["Munich", "Venice"], ["Venice", "Rome"], ["Berlin", "Copenhagen"], ["Prague", "Krakow"], ["Zurich", "Munich"], ["Paris", "Zurich"]]
        .map(([a, b]) => st.map.arc(a, b, { width: 2, color: "rgba(10,12,17,.55)", bend: 0.18 }));
      st.netCities = ["London", "Paris", "Barcelona", "Rome", "Amsterdam", "Berlin", "Prague", "Vienna", "Budapest", "Munich", "Venice", "Copenhagen", "Krakow", "Zurich"];
      st.netCities.forEach((n) => st.map.pin(n, { size: 9, label: false }));
      const W = [
        ["study", "Study", "공부", 520, 250], ["english", "English", "영어", 1400, 230], ["friends", "Friends", "친구", 380, 640],
        ["living", "Living abroad", "해외 생활", 980, 440], ["travel", "Travel", "여행", 1500, 650], ["culture", "Culture", "문화", 880, 790],
      ];
      st.words = {};
      W.forEach(([k, en, kr, x, y]) => {
        const g = box(root, 0, 0, { style: { width: "900px", textAlign: "center", transformOrigin: "50% 50%" } });
        el("div", { cls: "serif", text: en, style: { fontSize: "96px", lineHeight: "1" } }, g);
        el("div", { cls: "kr", text: kr, style: { fontSize: "26px", color: "var(--mid)", marginTop: "10px" } }, g);
        st.words[k] = { g, x, y };
      });
      st.plus = box(root, 0, 0, { cls: "serif", text: "+", style: { fontSize: "90px", width: "100px", textAlign: "center" } });
      st.ukus = box(root, 960 - 170, 840, { style: { width: "340px", textAlign: "center" } });
      const pill = el("div", { cls: "pill mono", html: "UK · US <span class='kr' style='letter-spacing:0;text-transform:none;font-size:22px'>영미권 대학</span>", style: { fontSize: "22px", color: "var(--mid)" } }, st.ukus);
      st.strike = box(st.ukus, 10, 24, { style: { width: "320px", height: "3px", background: "var(--red)", transformOrigin: "0 50%" } });
      st.qcard = box(root, 960 - 560, 760, { cls: "card", style: { width: "1120px", height: "190px", textAlign: "center", paddingTop: "34px" } });
      el("div", { cls: "serif it", text: "Which school fits me?", style: { fontSize: "84px", lineHeight: "1" } }, st.qcard);
      el("div", { cls: "kr", text: "어떤 학교가 나에게 가장 잘 맞을까?", style: { fontSize: "28px", color: "var(--mid)", marginTop: "14px" } }, st.qcard);
      return st;
    },
    update(t, st, c) {
      const q = c.q;
      const m = st.map;
      m.camKeys(t, [{ t: 0, cx: 1750, cy: 1700, w: 2600 }, { t: q("map") + 0.2, d: 0.2, cx: 1750, cy: 1700, w: 2600 }, { t: c.len, d: c.len - q("map") - 0.2, cx: 1780, cy: 1660, w: 2350 }]);
      const mp = prog(t, q("map"), 1.0, ease.inOutSine);
      m.root.style.opacity = String(mp * 0.85);
      st.netCities.forEach((n, i) => m.showPin(n, prog(t, q("map") + 0.2 + i * 0.05, 0.4), 1));
      st.net.forEach((a, i) => m.showArc(a, prog(t, q("map") + 0.3 + i * 0.09, 0.6, ease.inOutCubic)));
      const cloud = q("cloud");
      const toTop = prog(t, q("map"), 0.9, ease.inOutCubic);
      Object.entries(st.words).forEach(([k, w], i) => {
        let o = 0.2 * prog(t, cloud + i * 0.09, 0.6);
        let x = w.x, y = w.y, s = 1;
        if (k === "study") o = lerp(o, 1, prog(t, q("study"), 0.4)) ;
        if (k === "english") o = lerp(o, 1, prog(t, q("english"), 0.4));
        if (k === "study" || k === "english") o = lerp(o, 0.2, prog(t, q("dim"), 0.5));
        const fwd = k === "living" ? prog(t, q("living"), 0.9, ease.inOutCubic) : k === "travel" ? prog(t, q("travel"), 0.9, ease.inOutCubic) : 0;
        if (k === "living" || k === "travel") {
          o = lerp(o, 1, fwd);
          const tx = k === "living" ? 740 : 1280, ty = 380;
          x = lerp(x, tx, fwd); y = lerp(y, ty, fwd); s = lerp(1, 1.35, fwd);
          // move to top with the map
          x = lerp(x, k === "living" ? 700 : 1240, toTop); y = lerp(y, 110, toTop); s = lerp(s, 0.7, toTop);
        } else {
          o *= 1 - prog(t, q("living"), 0.5);
        }
        set(w.g, o, x - 450, y - 60, s);
      });
      const pl = prog(t, q("travel") + 0.3, 0.5) ;
      set(st.plus, pl, lerp(1010, 970, toTop) - 50, lerp(330, 92, toTop), lerp(1, 0.7, toTop));
      set(st.ukus, prog(t, q("ukus"), 0.5) * (1 - prog(t, q("map"), 0.5)), 0, (1 - prog(t, q("ukus"), 0.5)) * 14);
      st.strike.style.transform = `scaleX(${prog(t, q("strike"), 0.5, ease.inOutCubic).toFixed(3)})`;
      set(st.qcard, prog(t, q("q"), 0.6), 0, (1 - prog(t, q("q"), 0.6)) * 30);
    },
  };

  // ================================================================ 04 SIX CRITERIA
  const CRIT = [
    ["Location", "위치"], ["Academic quality", "학교 수준 · 명성"], ["Cost of living", "물가"],
    ["Academic calendar", "학사 일정"], ["Acceptance chance", "합격 가능성"], ["Dormitory", "기숙사"],
  ];
  window.CRIT = CRIT;
  S.s04 = {
    build(root, c) {
      const st = {};
      st.title = box(root, 0, 0, { style: { width: "1200px", transformOrigin: "0 0" } });
      el("div", { cls: "serif", html: "My <span class='muni'>6</span> criteria", style: { fontSize: "170px", lineHeight: "1" } }, st.title);
      st.rail = CRIT.map(([en, kr], i) => {
        const y = 250 + i * 112;
        const g = box(root, 96, y, { style: { width: "470px" } });
        const bar = box(g, -24, 4, { style: { width: "4px", height: "74px", background: "var(--muni)", transformOrigin: "50% 0" } });
        el("div", { cls: "mono", text: "0" + (i + 1), style: { fontSize: "17px", color: "var(--muni)", fontWeight: "700" } }, g);
        el("div", { cls: "kr", text: en, style: { fontSize: "33px", fontWeight: "650", marginTop: "6px", letterSpacing: "-0.01em" } }, g);
        el("div", { cls: "kr", text: kr, style: { fontSize: "20px", color: "var(--mid)", marginTop: "3px" } }, g);
        return { g, bar };
      });
      const PX = 620, PY = 150, PW = 1204, PH = 800;
      st.P = { PX, PY, PW, PH };
      st.panels = [];
      const panel = (frame = true) => { const p = box(root, PX, PY, { cls: frame ? "frame" : "", style: { width: PW + "px", height: PH + "px", background: frame ? "#fff" : "transparent" } }); st.panels.push(p); return p; };
      // -- P1 location
      const p1 = panel();
      st.map = new C.MapView(p1, "light", { x: 0, y: 0, w: PW, h: PH });
      st.travelArcs = [["Prague", "Paris"], ["Prague", "Rome"], ["Prague", "Amsterdam"], ["Prague", "Budapest"], ["Prague", "Copenhagen"], ["Prague", "Barcelona"]].map(([a, b]) => st.map.arc(a, b, { width: 2, color: "rgba(10,12,17,.5)", bend: 0.16 }));
      ["Paris", "Rome", "Amsterdam", "Budapest", "Copenhagen", "Barcelona", "Prague"].forEach((n) => st.map.pin(n, { size: 9, label: false }));
      st.rings = [0, 1, 2].map(() => svg("circle", { fill: "none", stroke: "var(--muni)", "stroke-width": 2, "stroke-dasharray": "4 8" }, st.map.ov));
      st.ringLab = box(st.map.labels, 0, 0, { cls: "mono muni", text: "Centre of Europe", style: { fontSize: "17px", fontWeight: "700" } });
      st.score = ["Germany", "Czechia"].map((n) => box(st.map.labels, 0, 0, { cls: "tag mono", html: (n === "Germany" ? "DE" : "CZ") + " &nbsp;+1", style: { background: "var(--muni)", color: "#fff", fontWeight: "700" } }));
      st.hub = box(p1, 40, PH - 230, { cls: "card", style: { width: "560px", height: "190px" } });
      st.hubRows = [["plane", "Airport"], ["train", "Main station"]].map(([ic, lab], i) => {
        const r = box(st.hub, 32, 34 + i * 70, { style: { display: "flex", alignItems: "center", gap: "16px", width: "500px" } });
        icon(r, ic, 34, "var(--ink)");
        el("div", { cls: "mono", text: lab, style: { fontSize: "19px", width: "200px" } }, r);
        el("div", { style: { flex: "1", height: "0", borderTop: "2px dotted rgba(10,12,17,.3)" } }, r);
        icon(r, "clock", 28, "var(--muni)");
        el("div", { cls: "mono muni", text: "? min", style: { fontSize: "19px", fontWeight: "700" } }, r);
        return r;
      });
      // -- P2 quality
      const p2 = panel(false);
      st.cv = box(p2, 0, 20, { cls: "card", style: { width: "500px", height: "740px", padding: "48px 44px" } });
      el("div", { cls: "serif", text: "Curriculum Vitae", style: { fontSize: "46px" } }, st.cv);
      el("div", { style: { height: "2px", background: "var(--ink)", margin: "18px 0 30px" } }, st.cv);
      el("div", { cls: "mono dim", text: "Education", style: { fontSize: "16px" } }, st.cv);
      const edu = el("div", { style: { marginTop: "18px" } }, st.cv);
      el("div", { cls: "kr", text: "Sungkyunkwan University", style: { fontSize: "25px", fontWeight: "700" } }, edu);
      el("div", { cls: "mono dim", text: "B.Ed. Computer Education · 2024–", style: { fontSize: "14px", marginTop: "6px" } }, edu);
      st.cvRow = el("div", { style: { marginTop: "28px", position: "relative" } }, st.cv);
      el("div", { cls: "kr", html: "Exchange Student — <span class='muni'>?</span>", style: { fontSize: "25px", fontWeight: "700" } }, st.cvRow);
      el("div", { cls: "mono dim", text: "2027 Spring semester", style: { fontSize: "14px", marginTop: "6px" } }, st.cvRow);
      st.cvLine = el("div", { style: { position: "absolute", left: "-14px", top: "-10px", width: "440px", height: "84px", border: "2.5px solid var(--muni)", borderRadius: "10px", transformOrigin: "0 50%" } }, st.cvRow);
      const sk = el("div", { style: { marginTop: "56px" } }, st.cv);
      el("div", { cls: "mono dim", text: "Experience", style: { fontSize: "16px", marginBottom: "22px" } }, sk);
      [380, 300, 340, 260, 320].forEach((w) => el("div", { cls: "skel", style: { position: "relative", width: w + "px", marginBottom: "18px" } }, sk));
      st.qs = box(p2, 580, 20, { cls: "card", style: { width: "624px", height: "740px", padding: "44px" } });
      el("div", { cls: "mono", text: "QS World University Rankings", style: { fontSize: "17px", fontWeight: "700" } }, st.qs);
      const tabs = el("div", { style: { display: "flex", gap: "12px", marginTop: "24px" } }, st.qs);
      st.tabs = ["Overall", "By subject"].map((tx) => el("div", { cls: "pill mono", text: tx, style: { fontSize: "16px", padding: "8px 16px" } }, tabs));
      st.bars = [];
      for (let i = 0; i < 7; i++) {
        const r = box(st.qs, 44, 200 + i * 72, { style: { width: "536px", height: "50px" } });
        el("div", { cls: "mono dim", text: "#" + (i + 1), style: { position: "absolute", left: "0", top: "14px", fontSize: "16px" } }, r);
        const lab = el("div", { cls: "skel", style: { left: "56px", top: "18px", width: "120px" } }, r);
        const b = el("div", { style: { position: "absolute", left: "200px", top: "12px", height: "26px", width: "330px", borderRadius: "6px", background: "var(--ink)", transformOrigin: "0 50%" } }, r);
        st.bars.push({ r, b });
      }
      // -- P3 cost
      const p3 = panel();
      st.spend = [["Travel", "€€€", 0.86, "var(--muni)"], ["Living", "€", 0.38, "var(--ink)"]].map(([lab, eur, v, col], i) => {
        const r = box(p3, 60, 70 + i * 104, { style: { width: "1080px" } });
        el("div", { cls: "mono", text: lab, style: { fontSize: "20px", fontWeight: "700" } }, r);
        const tr = el("div", { style: { position: "absolute", left: "200px", top: "-6px", width: "760px", height: "40px", borderRadius: "8px", background: "rgba(10,12,17,.06)" } }, r);
        const b = el("div", { style: { position: "absolute", left: "0", top: "0", height: "40px", width: "760px", borderRadius: "8px", background: col, transformOrigin: "0 50%" } }, tr);
        const e = el("div", { cls: "mono", text: eur, style: { position: "absolute", left: "990px", top: "0", fontSize: "26px", fontWeight: "700" } }, r);
        return { r, b, v, e };
      });
      st.costHead = box(p3, 60, 330, { cls: "mono dim", text: "Relative cost of living · illustrative", style: { fontSize: "16px" } });
      st.costLine = box(p3, 60, 312, { style: { width: "1084px", height: "1px", background: "var(--line-l)" } });
      st.costs = [["Netherlands", 0.95], ["United Kingdom", 0.93], ["Germany", 0.82], ["Spain", 0.68], ["Czechia", 0.6]].map(([n, v], i) => {
        const r = box(p3, 60, 390 + i * 74, { style: { width: "1080px" } });
        el("div", { cls: "kr", text: n, style: { fontSize: "26px", fontWeight: "600" } }, r);
        const b = el("div", { style: { position: "absolute", left: "300px", top: "4px", height: "26px", width: "760px", borderRadius: "6px", background: n === "Czechia" ? "var(--muni)" : "#B9B4A8", transformOrigin: "0 50%" } }, r);
        return { r, b, v };
      });
      // -- P4 calendar
      const p4 = panel();
      st.calHead = box(p4, 60, 50, { cls: "mono", html: "Academic calendar <span class='dim'>· 학사 일정</span>", style: { fontSize: "19px", fontWeight: "700" } });
      st.cal = new C.Calendar(p4, 290, 250, 740, [
        { id: "A", label: "School A<small>Jan start</small>", text: "JAN → JUN" },
        { id: "B", label: "School B<small>Apr start</small>", text: "APR → SEP", cls: "grey" },
        { id: "K", label: "SKKU<small>2027-2 복학</small>", text: "FALL SEMESTER", cls: "blue" },
      ]);
      st.cal.root.style.transform = "scale(1.2)"; st.cal.root.style.transformOrigin = "0 0";
      st.dis = st.cal.mark("dis", 0.5, "Discharge 2026.10");
      st.gap = st.cal.band("gap", 0.5, 6, "gap", "Gap");
      st.win = st.cal.band("win", 3, 5, "window", "Start window");
      st.clash = st.cal.band("clash", 11, 12, "clash", "Clash");
      st.okA = box(st.cal.root, st.cal.mx(9) + 16, st.cal.rows.A.y + 11, {});
      icon(st.okA, "check", 32, "var(--muni)", 2.6);
      st.noB = box(st.cal.root, st.cal.mx(12) + 16, st.cal.rows.B.y + 11, {});
      icon(st.noB, "cross", 32, "var(--red)", 2.6);
      st.gapB = box(st.cal.root, 0, 0, {});
      // -- P5 chance
      const p5 = panel();
      st.chat = [["Q.", "합격하신 분들 학점이 어느 정도였나요?", "right"], ["A.", "", "left"]].map(([h, txt, side], i) => {
        const b = box(p5, side === "right" ? 120 : 60, 70 + i * 120, { style: { width: "520px", padding: "22px 26px", borderRadius: "22px", background: side === "right" ? "var(--ink)" : "#F1EEE7", color: side === "right" ? "#fff" : "var(--ink)" } });
        if (txt) el("div", { cls: "kr", html: `<b style='margin-right:10px'>${h}</b>${txt}`, style: { fontSize: "23px", whiteSpace: "normal", lineHeight: "1.35" } }, b);
        else { el("div", { cls: "skel", style: { position: "relative", width: "380px", background: "#DDD8CD" } }, b); el("div", { cls: "skel", style: { position: "relative", width: "260px", marginTop: "12px", background: "#DDD8CD" } }, b); }
        return b;
      });
      st.chatTag = box(p5, 60, 34, { cls: "mono dim", text: "Everytime · 선배들에게 직접", style: { fontSize: "15px" } });
      st.report = box(p5, 60, 380, { cls: "card", style: { width: "520px", height: "330px", padding: "34px", boxShadow: "0 0 0 1px rgba(10,12,17,.1)" } });
      const rh = el("div", { style: { display: "flex", gap: "14px", alignItems: "center" } }, st.report);
      icon(rh, "doc", 34, "var(--ink)");
      el("div", { cls: "kr", html: "수학보고서 <span class='mono dim' style='font-size:14px'>Study report</span>", style: { fontSize: "26px", fontWeight: "700" } }, rh);
      [420, 380, 440, 300, 400].forEach((w) => el("div", { cls: "skel", style: { position: "relative", width: w + "px", marginTop: "22px" } }, st.report));
      st.g = C.gauge(p5, 660, 200, 210, { labels: ["Low", "Mid", "High"] });
      st.gLab = box(p5, 660, 520, { cls: "mono center", text: "My chance", style: { width: "460px", fontSize: "20px", fontWeight: "700" } });
      // -- P6 dorm
      const p6 = panel();
      st.house = box(p6, 90, 170, { style: { width: "430px", textAlign: "center", color: "#9A9DA5" } });
      const hr = el("div", { style: { display: "flex", justifyContent: "center", gap: "26px" } }, st.house);
      icon(hr, "house", 120, "#9A9DA5", 1.3); icon(hr, "doc", 120, "#9A9DA5", 1.3);
      el("div", { cls: "mono", text: "Find a flat · sign a lease", style: { fontSize: "18px", marginTop: "26px" } }, st.house);
      el("div", { cls: "serif", text: "? ? ?", style: { fontSize: "60px", marginTop: "8px" } }, st.house);
      st.vs = box(p6, 580, 300, { cls: "serif it dim", text: "vs", style: { fontSize: "56px" } });
      st.dorm = box(p6, 720, 110, { style: { width: "420px", textAlign: "center" } });
      const dc = el("div", { style: { width: "280px", height: "280px", borderRadius: "50%", background: "var(--muni)", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center" } }, st.dorm);
      icon(dc, "dorm", 160, "#fff", 1.2);
      el("div", { cls: "mono muni", text: "Dorm provided", style: { fontSize: "24px", fontWeight: "700", marginTop: "34px" } }, st.dorm);
      st.dormChk = box(p6, 880, 520, {});
      icon(st.dormChk, "check", 100, "var(--muni)", 2.2);
      // -- end lines
      st.best = line(root, 0, 250, "The best school", "serif center", { style: { fontSize: "150px", lineHeight: "1.1", width: "1920px" } });
      st.neq = box(root, 0, 420, { cls: "serif center dim", text: "≠", style: { width: "1920px", fontSize: "110px" } });
      st.forme = line(root, 0, 560, "The best school <span class='it muni'>for me</span>", "serif center", { style: { fontSize: "150px", lineHeight: "1.1", width: "1920px" } });
      return st;
    },
    update(t, st, c) {
      const q = c.q;
      const keys = ["c1", "c2", "c3", "c4", "c5", "c6"];
      const ts = keys.map(q);
      const endT = q("end");
      // title -> rail header
      const tIn = prog(t, 0.15, 0.9, ease.outQuart);
      const tMv = prog(t, ts[0] - 0.15, 0.9, ease.inOutCubic);
      const tx = lerp(960 - 600 + 60, 96, tMv), ty = lerp(380, 120, tMv), ts_ = lerp(1, 0.4, tMv);
      set(st.title, tIn * (1 - prog(t, endT, 0.5)), tx, ty + (1 - tIn) * 30, ts_);
      // which criterion is active
      let act = -1; ts.forEach((v, i) => { if (t >= v - 0.05) act = i; });
      const railOut = prog(t, endT, 0.5, ease.inOutCubic);
      st.rail.forEach((r, i) => {
        const shown = prog(t, ts[i] - 0.05, 0.5);
        const isAct = i === act;
        const actP = isAct ? prog(t, ts[i], 0.4) : (i < act ? 1 - prog(t, ts[i + 1], 0.4) : 0);
        const o = shown * (0.32 + 0.68 * actP) * (1 - railOut);
        set(r.g, o, (1 - shown) * -20, 0);
        r.bar.style.transform = `scaleY(${actP.toFixed(3)})`;
      });
      // panels: slide in at cue, out at next cue
      st.panels.forEach((p, i) => {
        const tin = ts[i], tout = i < 5 ? ts[i + 1] : endT;
        const pin = prog(t, tin - 0.1, 0.7, ease.outQuart);
        const pout = prog(t, tout - 0.2, 0.45, ease.inCubic);
        set(p, pin * (1 - pout), (1 - pin) * 80 - pout * 80, 0);
      });
      // P1
      if (t > ts[0] - 0.5 && t < ts[1] + 0.5) {
        const m = st.map;
        m.camKeys(t, [{ t: 0, cx: 1900, cy: 1680, w: 2500 }, { t: q("c1_center") + 1.2, d: 1.4, cx: 2000, cy: 1640, w: 2000 }]);
        st.travelArcs.forEach((a, i) => m.showArc(a, prog(t, q("c1_travel") + i * 0.12, 0.7, ease.inOutCubic), 1 - 0.6 * prog(t, q("c1_center"), 0.5)));
        ["Paris", "Rome", "Amsterdam", "Budapest", "Copenhagen", "Barcelona", "Prague"].forEach((n, i) => m.showPin(n, prog(t, q("c1_travel") + i * 0.1, 0.4) * (1 - 0.5 * prog(t, q("c1_center"), 0.5))));
        const [rx, ry] = m.xy([2060, 1600]);
        st.rings.forEach((r, i) => {
          const p = prog(t, q("c1_center") + i * 0.18, 0.8, ease.outCubic);
          r.setAttribute("cx", rx); r.setAttribute("cy", ry); r.setAttribute("r", ((110 + i * 120) * p).toFixed(1));
          r.setAttribute("opacity", (p * (0.9 - i * 0.2)).toFixed(3));
        });
        set(st.ringLab, prog(t, q("c1_center") + 0.4, 0.5), rx + 18, ry - 150);
        const hp = prog(t, q("c1_czde"), 0.6);
        m.fill("Czechia", "#0000DC", 0.42 * hp); m.fill("Germany", "#0000DC", 0.22 * hp);
        st.score.forEach((s, i) => {
          const at = i === 0 ? [1620, 1500] : [2160, 1640];
          const [sx, sy] = m.xy(at);
          const p = prog(t, q("c1_score") + i * 0.2, 0.45, ease.outBack);
          set(s, clamp(p), sx - 40, sy - 20, 0.6 + 0.4 * p);
        });
        set(st.hub, prog(t, q("c1_air"), 0.5), 0, (1 - prog(t, q("c1_air"), 0.5)) * 24);
        st.hubRows.forEach((r, i) => set(r, prog(t, q(i ? "c1_train" : "c1_air"), 0.4), (1 - prog(t, q(i ? "c1_train" : "c1_air"), 0.4)) * -12, 0));
      }
      // P2
      if (t > ts[1] - 0.5 && t < ts[2] + 0.5) {
        set(st.cv, prog(t, ts[1], 0.6), 0, (1 - prog(t, ts[1], 0.6)) * 20);
        const cvp = prog(t, q("c2_cv"), 0.6, ease.inOutCubic);
        st.cvLine.style.transform = `scaleX(${cvp.toFixed(3)})`; st.cvLine.style.opacity = String(cvp);
        set(st.qs, prog(t, q("c2_qs") - 0.1, 0.6), 0, (1 - prog(t, q("c2_qs") - 0.1, 0.6)) * 20);
        const subj = prog(t, q("c2_major"), 0.7, ease.inOutCubic);
        const ov = prog(t, q("c2_overall"), 0.3);
        st.tabs[0].style.background = ov > 0.5 && subj < 0.5 ? "var(--ink)" : "transparent";
        st.tabs[0].style.color = ov > 0.5 && subj < 0.5 ? "#fff" : "var(--ink)";
        st.tabs[1].style.background = subj >= 0.5 ? "var(--muni)" : "transparent";
        st.tabs[1].style.color = subj >= 0.5 ? "#fff" : "var(--ink)";
        st.tabs[1].style.borderColor = subj >= 0.5 ? "var(--muni)" : "var(--ink)";
        const A = [1, 0.93, 0.88, 0.8, 0.74, 0.69, 0.62], B = [0.97, 0.94, 0.86, 0.84, 0.78, 0.7, 0.66];
        st.bars.forEach((b, i) => {
          const p = prog(t, q("c2_qs") + 0.1 + i * 0.07, 0.6, ease.outQuart);
          const v = lerp(A[i], B[i], subj);
          b.b.style.transform = `scaleX(${(v * p).toFixed(3)})`;
          b.b.style.background = subj > 0.5 && i === 2 ? "var(--muni)" : "var(--ink)";
        });
      }
      // P3
      if (t > ts[2] - 0.5 && t < ts[3] + 0.5) {
        st.spend.forEach((s, i) => {
          const t0 = q(i ? "c3_living" : "c3_travel");
          const p = prog(t, t0, 1.0, ease.outQuart);
          set(s.r, prog(t, t0 - 0.1, 0.4));
          s.b.style.transform = `scaleX(${(s.v * p).toFixed(3)})`;
          s.e.style.opacity = String(prog(t, t0 + 0.6, 0.4));
        });
        const cp = prog(t, q("c3_country"), 0.5);
        set(st.costHead, cp); st.costLine.style.opacity = String(cp);
        st.costs.forEach((s, i) => {
          const p = prog(t, q("c3_country") + 0.1 + i * 0.1, 0.8, ease.outQuart);
          set(s.r, prog(t, q("c3_country") + i * 0.1, 0.4));
          s.b.style.transform = `scaleX(${(s.v * p).toFixed(3)})`;
        });
      }
      // P4
      if (t > ts[3] - 0.5 && t < ts[4] + 0.5) {
        const cal = st.cal;
        set(st.calHead, prog(t, q("c4_title"), 0.5));
        cal.showHead(prog(t, q("c4_title"), 0.8));
        const lab = prog(t, q("c4_diff"), 0.5);
        const aP = prog(t, q("c4_jan"), 0.9, ease.inOutCubic);
        cal.showRow("A", aP > 0 ? 1 : 0, 3, 3 + 6 * aP, lab);
        const bP = prog(t, q("c4_apr"), 0.5, ease.outCubic), bE = prog(t, q("c4_sep"), 0.8, ease.inOutCubic);
        cal.showRow("B", bP > 0 ? 1 : 0, 6, 6 + 0.6 * bP + 5.4 * bE, lab);
        const kP = prog(t, q("c4_skku"), 0.8, ease.inOutCubic);
        cal.showRow("K", kP > 0 ? 1 : 0, 11, 11 + 4 * kP, prog(t, q("c4_skku") - 0.1, 0.4) || lab * 0.0);
        cal.rows.K.lab.style.opacity = String(Math.max(lab * 0.35, prog(t, q("c4_skku") - 0.1, 0.4)));
        set(st.dis, prog(t, q("c4_dis"), 0.5), 0, (1 - prog(t, q("c4_dis"), 0.5)) * -10);
        const gp = prog(t, q("c4_gap"), 0.7, ease.inOutCubic);
        st.gap.style.opacity = String(gp * (1 - 0.6 * prog(t, q("c4_window"), 0.5))); st.gap.style.clipPath = `inset(0 ${(100 - gp * 100).toFixed(1)}% 0 0)`;
        const wp = prog(t, q("c4_window"), 0.5);
        set(st.win, wp, 0, 0, 1);
        const cl = prog(t, q("c4_clash"), 0.4);
        const flash = t > q("c4_clash") ? 0.75 + 0.25 * Math.cos((t - q("c4_clash")) * 7) : 1;
        st.clash.style.opacity = String(cl * flash);
        set(st.okA, prog(t, q("c4_clash") + 0.3, 0.4, ease.outBack));
        set(st.noB, prog(t, q("c4_clash") + 0.1, 0.4, ease.outBack));
      }
      // P5
      if (t > ts[4] - 0.5 && t < ts[5] + 0.5) {
        set(st.chatTag, prog(t, q("c5_chat"), 0.4));
        st.chat.forEach((b, i) => set(b, prog(t, q("c5_chat") + i * 0.45, 0.45), 0, (1 - prog(t, q("c5_chat") + i * 0.45, 0.45)) * 20));
        set(st.report, prog(t, q("c5_report"), 0.5), 0, (1 - prog(t, q("c5_report"), 0.5)) * 20);
        const gp = prog(t, q("c5_gauge") - 0.3, 0.6);
        const needle = prog(t, q("c5_gauge") + 0.1, 1.6, ease.outBack);
        C.showGauge(st.g, gp, prog(t, q("c5_gauge") - 0.3, 0.8), 0.08 + 0.64 * needle);
        set(st.gLab, gp);
      }
      // P6
      if (t > ts[5] - 0.5 && t < endT + 0.5) {
        const hp = prog(t, q("c6_house"), 0.5);
        const dp = prog(t, q("c6_dorm"), 0.6);
        set(st.house, hp * (1 - 0.55 * dp), 0, (1 - hp) * 20);
        set(st.vs, dp * 0.8);
        set(st.dorm, dp, 0, (1 - dp) * 24, 0.92 + 0.08 * dp);
        set(st.dormChk, prog(t, q("c6_dorm") + 0.5, 0.4, ease.outBack), 0, 0, 0.6 + 0.4 * prog(t, q("c6_dorm") + 0.5, 0.4, ease.outBack));
        draw(st.dormChk.querySelector("path"), prog(t, q("c6_dorm") + 0.55, 0.4));
      }
      // end
      reveal(st.best, prog(t, q("best"), 0.8, ease.outQuart));
      set(st.neq, prog(t, q("forme"), 0.4));
      reveal(st.forme, prog(t, q("forme") + 0.15, 0.8, ease.outQuart));
    },
  };
})();
