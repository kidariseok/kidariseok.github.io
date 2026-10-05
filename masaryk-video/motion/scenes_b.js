// SCENE 05 (+06 continuity), 07, 08
window.SCENES = window.SCENES || {};
(function () {
  const { el, svg, box, set, clamp, lerp, ease, prog, inout, line, reveal, count, draw, icon } = M;
  const S = window.SCENES;
  const CITY = EUROPE.cities;
  const KM = EUROPE.kmFromBrno;

  // school card --------------------------------------------------------
  function card(parent, x, y, w, h, o) {
    const g = box(parent, x, y, { cls: "card", style: { width: w + "px", height: h + "px", padding: "40px 46px" } });
    el("div", { cls: "mono dim", html: o.place, style: { fontSize: "17px" } }, g);
    if (o.logo) el("img", { attrs: { src: "assets/muni-logo-blue.svg" }, style: { width: "360px", display: "block", marginTop: "18px" } }, g);
    else el("div", { cls: "serif", html: o.name, style: { fontSize: (o.size || 64) + "px", lineHeight: "1.02", marginTop: "12px", whiteSpace: "normal", width: (w - 92) + "px" } }, g);
    if (o.sub) el("div", { cls: "mono dim", html: o.sub, style: { fontSize: "15px", marginTop: "10px" } }, g);
    const rows = (o.rows || []).map(([kind, lab, sub], i) => {
      const r = C.checkRow(g, 46, (o.rowY || 214) + i * (o.rowGap || 60), lab, sub);
      r.want = kind; return r;
    });
    return { g, rows, x, y, w, h };
  }

  // =========================================================== 05 + 06
  S.s05 = {
    mergeNext: true,
    build(root, c) {
      const st = {};
      const q = c.q, q2 = c.q2;
      // filter chips
      st.chips = CRIT.map(([en], i) => {
        const g = box(root, 96 + i * 288, 130, { cls: "pill mono", html: `<span class='muni' style='font-weight:700'>0${i + 1}</span>${en.replace("Academic quality", "Quality").replace("Cost of living", "Cost").replace("Academic calendar", "Calendar").replace("Acceptance chance", "Chance")}`, style: { fontSize: "17px", width: "272px", justifyContent: "flex-start", borderColor: "rgba(10,12,17,.25)", background: "#fff" } });
        return g;
      });
      st.funnel = box(root, 96, 104, { cls: "mono dim", text: "Filter · 6 criteria", style: { fontSize: "14px" } });
      // search bar
      st.search = box(root, 96, 228, { cls: "card", style: { width: "780px", height: "76px", borderRadius: "38px", display: "flex", alignItems: "center", gap: "18px", padding: "0 30px" } });
      icon(st.search, "search", 30, "var(--ink)", 2);
      st.searchTxt = el("div", { cls: "kr", text: "", style: { fontSize: "26px", fontWeight: "500" } }, st.search);
      st.caret = el("div", { style: { width: "2px", height: "32px", background: "var(--muni)" } }, st.search);
      // map frame
      st.mapFrame = box(root, 940, 228, { cls: "frame", style: { width: "884px", height: "712px", background: "#fff" } });
      st.map = new C.MapView(st.mapFrame, "light", { x: 0, y: 0, w: 884, h: 712 });
      const pins = { Brno: "Brno", Madrid: "Madrid", Amsterdam: "Amsterdam", Munich: "Munich", Frankfurt: "Frankfurt", Berlin: "Berlin", Sheffield: "Sheffield" };
      Object.keys(pins).forEach((n) => st.map.pin(n, { size: 14, ring: true, ringColor: "#0000DC", side: n === "Sheffield" ? "l" : "r" }));
      st.nlPings = ["Rotterdam", "Utrecht", "Leiden", "Groningen", "Maastricht", "Eindhoven"].map((n) => { st.map.pin(n, { size: 8, label: false, ring: true, ringColor: "#0A0C11" }); return n; });
      st.channel = st.map.arc("Sheffield", "Prague", { width: 2.5, color: "#E0453E", bend: -0.12, dash: "6 9" });
      st.routes = ["Prague", "Vienna", "Bratislava", "Budapest", "Krakow", "Berlin"].map((n) => ({ n, a: st.map.arc("Brno", n, { width: 2.5, color: "#0000DC", bend: 0.1 }) }));
      const SIDE = { Prague: "l", Vienna: "l", Bratislava: "b", Budapest: "r", Krakow: "r", Berlin: "r" };
      ["Prague", "Vienna", "Bratislava", "Budapest", "Krakow", "Berlin"].forEach((n) => st.map.pin("r_" + n, { at: n, size: 9, label: `${n.toUpperCase()} <span style='color:var(--muni);font-weight:700'>${KM[n]} km</span>`, side: SIDE[n] }));
      // cards
      const CX = 96, CY = 350, CW = 780, CH = 560;
      st.mu = card(root, CX, CY, CW, CH, { place: "CZ · Brno", name: "Masaryk University", rows: [["ok", "Location", "위치"], ["ok", "Calendar", "학사 일정"]] });
      st.muHold = C.stamp(st.mu.g, 430, 400, "ON HOLD · 보류", "hold");
      st.ie = card(root, CX, CY, CW, CH, { place: "ES · Madrid", name: "IE University", rows: [["ok", "Madrid", "위치"], ["ok", "Reputation", "학교 명성"], ["no", "Major fit", "경영대학 중심"]] });
      st.vu = card(root, CX, CY, CW, CH, { place: "NL · Amsterdam", name: "Vrije Universiteit Amsterdam", size: 54, rows: [["ok", "Location", "위치"], ["ok", "Quality", "학교 수준"]], rowY: 226 });
      st.vuSeats = box(st.vu.g, 46, 380, { style: { width: "690px", height: "120px" } });
      el("div", { cls: "mono dim", text: "Seats · 선발 인원", style: { fontSize: "16px" } }, st.vuSeats);
      st.seatDots = [];
      for (let i = 0; i < 10; i++) st.seatDots.push(box(st.vuSeats, i * 44, 50, { style: { width: "30px", height: "30px", borderRadius: "8px", background: "var(--ink)" } }));
      st.seatNum = box(st.vuSeats, 500, 0, { cls: "serif", text: "10", style: { fontSize: "120px", lineHeight: "1", width: "190px", textAlign: "right" } });
      st.vuX = C.stamp(st.vu.g, 440, 214, "탈락"); st.vuX.style.fontSize = "72px"; st.vuX.style.padding = "4px 26px";
      // germany trio
      st.de = [["Munich", "LMU Munich", "DE · Munich"], ["Frankfurt", "Frankfurt UAS", "DE · Frankfurt"], ["Berlin", "FU Berlin", "DE · Berlin"]].map(([city, name, place], i) => {
        const g = box(root, CX + i * 266, CY, { cls: "card", style: { width: "248px", height: "250px", padding: "28px 26px" } });
        el("div", { cls: "mono dim", text: place, style: { fontSize: "14px" } }, g);
        el("div", { cls: "serif", text: name, style: { fontSize: "40px", lineHeight: "1.05", marginTop: "10px", whiteSpace: "normal" } }, g);
        const r = C.checkRow(g, 26, 180, "Quality", "");
        const x = C.stamp(g, 70, 90, "✕", "");
        x.style.fontSize = "54px"; x.style.padding = "0 18px";
        return { g, r, x, city };
      });
      st.deCal = box(root, CX, CY + 290, { cls: "card", style: { width: "780px", height: "270px", padding: "26px 30px" } });
      el("div", { cls: "mono", html: "Academic calendar <span class='dim'>· 학사 일정</span>", style: { fontSize: "15px", fontWeight: "700" } }, st.deCal);
      const MM = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      const mw = 600 / 12, cx0 = 150;
      MM.forEach((m, i) => { box(st.deCal, cx0 + i * mw, 60, { cls: "mono dim center", text: m, style: { fontSize: "12px", width: mw + "px" } }); box(st.deCal, cx0 + i * mw, 84, { style: { width: "1px", height: "160px", background: "var(--line-l)" } }); });
      box(st.deCal, 0, 104, { cls: "kr", text: "Germany", style: { fontSize: "19px", fontWeight: "600", width: "130px", textAlign: "right" } });
      box(st.deCal, 0, 176, { cls: "kr", text: "SKKU 2학기", style: { fontSize: "19px", fontWeight: "600", width: "130px", textAlign: "right" } });
      st.deBar = box(st.deCal, cx0 + 3 * mw, 96, { style: { height: "44px", width: 6 * mw + "px", background: "#8E8A80", borderRadius: "8px", transformOrigin: "0 50%" } });
      st.deBarTxt = el("div", { cls: "mono", text: "APR → SEP", style: { color: "#fff", fontSize: "13px", position: "absolute", left: "12px", top: "14px" } }, st.deBar);
      st.kBar = box(st.deCal, cx0 + 8 * mw, 168, { style: { height: "44px", width: 4 * mw + "px", background: "var(--muni)", borderRadius: "8px", transformOrigin: "0 50%" } });
      el("div", { cls: "mono", text: "FALL", style: { color: "#fff", fontSize: "13px", position: "absolute", left: "12px", top: "14px" } }, st.kBar);
      st.deClash = box(st.deCal, cx0 + 8 * mw - 4, 88, { style: { width: (mw + 8) + "px", height: "132px", borderRadius: "8px", boxShadow: "inset 0 0 0 3px var(--red)", background: "rgba(224,69,62,.15)" } });
      st.sh = card(root, CX, CY, CW, CH, { place: "UK · Sheffield", name: "University of Sheffield", rows: [["ok", "Academic quality", "학교 수준"], ["no", "Cost · £££", "비용"], ["no", "Travel route", "여행 동선"]] });
      // shelf
      st.shelfLab = box(root, 96, 952, { cls: "mono dim", text: "Checked", style: { fontSize: "14px" } });
      const shelf = [["mu", "Masaryk", "보류"], ["ie", "IE Univ.", "✕"], ["vu", "VU Amsterdam", "✕"], ["lmu", "LMU", "✕"], ["fra", "Frankfurt UAS", "✕"], ["fub", "FU Berlin", "✕"], ["sh", "Sheffield", "✕"]];
      st.shelf = {};
      shelf.forEach(([k, n, s], i) => {
        st.shelf[k] = box(root, 96 + i * 250, 982, { cls: "pill mono", html: `${n} <span style='color:${s === "✕" ? "var(--red)" : "var(--ink)"};font-weight:700'>${s}</span>`, style: { fontSize: "15px", padding: "8px 14px", background: "#fff", borderColor: "rgba(10,12,17,.2)" } });
      });
      // 06: final Masaryk card
      st.mf = card(root, CX, 228, CW, 712, { place: "CZ · Brno · est. 1919", logo: true, rows: CRIT.map(([en, kr]) => ["ok", en, kr]), rowY: 236, rowGap: 72 });
      st.mf.g.style.boxShadow = "0 0 0 3px var(--muni), 0 30px 60px -30px rgba(0,0,220,.45)";
      st.six = box(st.mf.g, 560, 40, { style: { width: "150px", height: "150px", borderRadius: "50%", background: "var(--muni)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" } });
      el("div", { cls: "serif", text: "6/6", style: { fontSize: "62px", lineHeight: "1" } }, st.six);
      el("div", { cls: "mono", text: "match", style: { fontSize: "13px", marginTop: "4px" } }, st.six);
      // closing statement
      st.best = line(root, 0, 250, "The best school", "serif center dim", { style: { fontSize: "130px", lineHeight: "1.1", width: "1920px" } });
      st.bestStrike = box(root, 960 - 450, 345, { style: { width: "900px", height: "4px", background: "var(--mid)", transformOrigin: "0 50%" } });
      st.forme = line(root, 0, 430, "The best school <span class='it muni'>for me</span>", "serif center", { style: { fontSize: "150px", lineHeight: "1.1", width: "1920px" } });
      st.eqLogo = box(root, 960 - 300, 690, { tag: "img", attrs: { src: "assets/muni-logo-blue.svg" }, style: { width: "600px" } });
      return st;
    },
    update(t, st, c) {
      const q = c.q, q2 = c.q2, N0 = c.nextStart;
      const m = st.map;
      const B = EUROPE.cities;
      const in06 = t >= N0;
      // ---- camera
      m.camKeys(t, [
        { t: 0, cx: 1650, cy: 1720, w: 3000 },
        { t: q("mu_map") + 0.9, d: 1.1, cx: B.Brno[0], cy: B.Brno[1], w: 1500 },
        { t: q("ie_map") + 1.0, d: 1.2, cx: B.Madrid[0] + 80, cy: B.Madrid[1] - 60, w: 1700 },
        { t: q("nl_map") + 1.1, d: 1.2, cx: B.Amsterdam[0] + 40, cy: B.Amsterdam[1] + 60, w: 1100 },
        { t: q("de_map") + 1.0, d: 1.1, cx: 1900, cy: 1470, w: 1650 },
        { t: q("uk_map") + 1.0, d: 1.1, cx: 1700, cy: 1420, w: 2300 },
        { t: N0 + 1.2, d: 1.4, cx: 1750, cy: 1600, w: 2900 },
        { t: q2("center") + 1.2, d: 1.4, cx: 2270, cy: 1540, w: 900 },
      ]);
      const fade06 = 1 - prog(t, q2("dim"), 0.6);
      // ---- chips / search
      st.chips.forEach((g, i) => set(g, prog(t, q("filter") + i * 0.08, 0.45) * (in06 ? fade06 : 1), 0, (1 - prog(t, q("filter") + i * 0.08, 0.45)) * 14));
      set(st.funnel, prog(t, q("filter"), 0.5) * fade06);
      const sIn = prog(t, q("search"), 0.5), sOut = prog(t, q("mu") - 0.1, 0.4);
      set(st.search, sIn * (1 - 0.0 * sOut), 0, (1 - sIn) * 16);
      const txt = "Exchange universities · Europe";
      const n = Math.floor(clamp((t - q("search") - 0.3) / 1.0) * txt.length);
      if (st.searchTxt.textContent !== txt.slice(0, n)) st.searchTxt.textContent = txt.slice(0, n);
      st.caret.style.opacity = String(Math.floor(t * 2.2) % 2 ? 1 : 0.15);
      set(st.search, sIn * (1 - prog(t, N0 + 0.2, 0.5)));
      // ---- map frame
      set(st.mapFrame, prog(t, q("filter") + 0.3, 0.7) * (1 - prog(t, q2("dim"), 0.6)), 0, (1 - prog(t, q("filter") + 0.3, 0.7)) * 24);
      const pinState = (name, t0, t1) => { // on at t0, dim at t1
        const o = prog(t, t0, 0.5);
        const d = t1 != null ? prog(t, t1, 0.5) : 0;
        const ring = t > t0 && (t1 == null || t < t1) ? (t - t0) / 1.4 : null;
        m.showPin(name, o * (1 - 0.65 * d), 1, ring, 1);
      };
      const out06 = prog(t, N0 + 0.1, 0.6);
      pinState("Brno", q("mu_map") + 0.6, in06 ? null : q("ie_map"));
      if (!in06) m.showPin("Brno", prog(t, q("mu_map") + 0.6, 0.5) * (1 - 0.65 * prog(t, q("ie_map"), 0.5)), 1, t > q("mu_map") + 0.6 && t < q("ie_map") ? (t - q("mu_map")) / 1.4 : null);
      else m.showPin("Brno", 1, 1.15, (t - N0) / 1.4);
      pinState("Madrid", q("ie_map") + 0.6, q("nl_map"));
      pinState("Amsterdam", q("nl_map") + 0.7, q("de_map"));
      pinState("Munich", q("lmu"), q("uk_map"));
      pinState("Frankfurt", q("fra"), q("uk_map"));
      pinState("Berlin", q("fub"), q("uk_map"));
      pinState("Sheffield", q("uk_map") + 0.7, null);
      ["Madrid", "Amsterdam", "Munich", "Frankfurt", "Berlin", "Sheffield"].forEach((p) => { if (in06) m.showPin(p, (1 - out06) * 0.35, 1); });
      st.nlPings.forEach((p, i) => {
        const t0 = q("nl_more") + i * 0.22;
        m.showPin(p, prog(t, t0, 0.3) * (1 - prog(t, q("de_map"), 0.5)), 1, t > t0 && t < q("de_map") ? (t - t0) / 1.1 : null);
      });
      m.showArc(st.channel, prog(t, q("shf_loc") + 0.2, 1.2, ease.inOutCubic), 1 - out06);
      // ---- cards
      const enter = (g, t0) => prog(t, t0, 0.6, ease.outQuart);
      const showCard = (cd, t0, tOut, shelfKey) => {
        const pi = enter(cd.g, t0);
        const po = tOut != null ? prog(t, tOut, 0.55, ease.inOutCubic) : 0;
        // fly to shelf: shrink toward shelf chip
        const sk = st.shelf[shelfKey];
        const tx = sk ? parseFloat(sk.style.left) - cd.x : 0, ty = sk ? parseFloat(sk.style.top) - cd.y : 0;
        set(cd.g, pi * (1 - po), (1 - pi) * 70 + tx * po, ty * po, 1 - 0.8 * po);
        cd.g.style.transformOrigin = "0 0";
        return pi;
      };
      // Masaryk (on hold)
      showCard(st.mu, q("mu"), q("mu_hold") + 0.5, "mu");
      st.mu.rows.forEach((r, i) => C.showCheck(r, prog(t, q("mu_ok") + i * 0.3, 0.4), prog(t, q("mu_ok") + i * 0.3, 0.5), "ok", 10));
      C.showStamp(st.muHold, t, q("mu_hold"), -6);
      // IE
      showCard(st.ie, q("ie"), q("ie_out"), "ie");
      [q("ie_mad"), q("ie_rep"), q("ie_x")].forEach((t0, i) => C.showCheck(st.ie.rows[i], prog(t, t0, 0.4), prog(t, t0, 0.5), st.ie.rows[i].want, 10));
      // VU
      showCard(st.vu, q("vu"), q("vu_out"), "vu");
      st.vu.rows.forEach((r, i) => C.showCheck(r, prog(t, q("vu_ok") + i * 0.25, 0.4), prog(t, q("vu_ok") + i * 0.25, 0.5), "ok", 10));
      set(st.vuSeats, prog(t, q("seats10") - 0.1, 0.4));
      const cut = prog(t, q("seats1"), 0.5, ease.inOutCubic);
      st.seatDots.forEach((d, i) => { const k = i === 0 ? 0 : prog(t, q("seats1") + (9 - i) * 0.03, 0.35); set(d, prog(t, q("seats10") + i * 0.04, 0.3) * (1 - 0.88 * k), 0, 0, 1 - 0.2 * k); d.style.background = i === 0 && cut > 0.5 ? "var(--red)" : "var(--ink)"; });
      st.seatNum.textContent = t < q("seats1") + 0.05 ? "10" : "1";
      st.seatNum.style.color = t < q("seats1") + 0.05 ? "var(--ink)" : "var(--red)";
      const roll = prog(t, q("seats1") - 0.05, 0.3);
      st.seatNum.style.transform = t < q("seats1") + 0.05 ? `translateY(${(-roll * 40).toFixed(1)}px)` : `translateY(${((1 - prog(t, q("seats1") + 0.05, 0.25)) * 40).toFixed(1)}px)`;
      C.showStamp(st.vuX, t, q("vu_x"), -8);
      // Germany trio
      const deOut = prog(t, q("de_out"), 0.55, ease.inOutCubic);
      st.de.forEach((d, i) => {
        const t0 = q(["lmu", "fra", "fub"][i]);
        const pi = prog(t, t0, 0.55, ease.outQuart);
        const shelfK = ["lmu", "fra", "fub"][i];
        const sk = st.shelf[shelfK];
        const tx = parseFloat(sk.style.left) - parseFloat(d.g.style.left), ty = parseFloat(sk.style.top) - parseFloat(d.g.style.top);
        d.g.style.transformOrigin = "0 0";
        set(d.g, pi * (1 - deOut) * (1 - 0.35 * prog(t, q("de_prob"), 0.4) * (1 - prog(t, q("de_x"), 0.3))), (1 - pi) * 60 + tx * deOut, ty * deOut, 1 - 0.8 * deOut);
        C.showCheck(d.r, prog(t, t0 + 0.3, 0.4), prog(t, t0 + 0.3, 0.5), "ok");
        C.showStamp(d.x, t, q("de_x") + i * 0.12, -10);
      });
      const dc = prog(t, q("de_cal") - 0.1, 0.5);
      set(st.deCal, dc * (1 - deOut), 0, (1 - dc) * 30);
      const a1 = prog(t, q("de_apr"), 0.4), a2 = prog(t, q("de_sep"), 0.7, ease.inOutCubic);
      st.deBar.style.transform = `scaleX(${(0.15 * a1 + 0.85 * a2).toFixed(3)})`; st.deBar.style.opacity = String(a1);
      st.kBar.style.transform = `scaleX(${prog(t, q("de_skku"), 0.6, ease.inOutCubic).toFixed(3)})`;
      st.kBar.style.opacity = String(prog(t, q("de_skku"), 0.2));
      st.deClash.style.opacity = String(prog(t, q("de_overlap"), 0.3) * (t > q("de_overlap") ? 0.75 + 0.25 * Math.cos((t - q("de_overlap")) * 7) : 1));
      // Sheffield
      showCard(st.sh, q("shf"), N0 - 0.2, "sh");
      [q("shf_ok"), q("shf_cost"), q("shf_loc")].forEach((t0, i) => C.showCheck(st.sh.rows[i], prog(t, t0, 0.4), prog(t, t0, 0.5), st.sh.rows[i].want, 10));
      // shelf chips: appear when a card lands; in 06 rejected ones leave
      const land = { mu: q("mu_hold") + 0.9, ie: q("ie_out") + 0.45, vu: q("vu_out") + 0.45, lmu: q("de_out") + 0.45, fra: q("de_out") + 0.5, fub: q("de_out") + 0.55, sh: N0 + 0.3 };
      set(st.shelfLab, prog(t, land.mu - 0.2, 0.4) * (1 - prog(t, N0 + 0.4, 0.4)));
      Object.entries(st.shelf).forEach(([k, g], i) => {
        const pin_ = prog(t, land[k], 0.3);
        let o = pin_, y = 0;
        if (k !== "mu") { const gone = prog(t, N0 + 0.3 + i * 0.12, 0.4, ease.inCubic); o *= 1 - gone; y = 20 * gone; }
        else { const fly = prog(t, q2("back") - 0.1, 0.5, ease.inOutCubic); o *= 1 - fly; y = -40 * fly; }
        set(g, o, 0, y);
      });
      // ---- 06: final card
      const mfIn = prog(t, q2("back"), 0.7, ease.outQuart);
      set(st.mf.g, mfIn * fade06, (1 - mfIn) * 0, (1 - mfIn) * 90, 0.94 + 0.06 * mfIn);
      const rowCues = ["center", "quality", "cost", "cal", "chance", "dorm"];
      st.mf.rows.forEach((r, i) => {
        const t0 = q2(rowCues[i]);
        const shown = prog(t, q2("back") + 0.3 + i * 0.06, 0.4);
        const k = t >= t0 ? "ok" : "pending";
        C.showCheck(r, shown, t >= t0 ? prog(t, t0, 0.5) : 1, k);
        r.lab.style.color = t >= t0 ? "var(--ink)" : "rgba(10,12,17,.35)";
        if (i === 0 && t > q2("trav")) { const pl = Math.max(0, Math.sin(clamp((t - q2("trav")) / 0.9) * Math.PI)); r.mark.style.transform = `scale(${(1 + 0.25 * pl).toFixed(3)})`; }
      });
      set(st.six, prog(t, q2("all6"), 0.5, ease.outBack), 0, 0, 0.5 + 0.5 * prog(t, q2("all6"), 0.5, ease.outBack));
      // routes from Brno
      st.routes.forEach((r, i) => {
        const t0 = q2("center") + 0.4 + i * 0.16;
        const base = prog(t, t0, 0.7, ease.inOutCubic);
        const pulse = t > q2("trav") ? 0.55 + 0.45 * Math.cos((t - q2("trav")) * 6 + i) : 1;
        m.showArc(r.a, base, (t > q2("trav") && t < q2("trav") + 1.6 ? pulse : 1) * fade06);
        m.showPin("r_" + r.n, prog(t, t0 + 0.4, 0.4) * fade06, 1);
      });
      // closing lines
      reveal(st.best, prog(t, q2("best"), 0.7, ease.outQuart));
      st.bestStrike.style.transform = `scaleX(${prog(t, q2("forme") - 0.1, 0.5, ease.inOutCubic).toFixed(3)})`;
      reveal(st.forme, prog(t, q2("forme") + 0.1, 0.8, ease.outQuart));
      const lg = prog(t, q2("forme") + 1.2, 0.9, ease.outQuart);
      st.eqLogo.style.clipPath = `inset(0 ${(100 - 100 * lg).toFixed(1)}% 0 0)`; set(st.eqLogo, lg > 0 ? 1 : 0);
    },
  };
  S.s06 = { mergedInto: "s05" };

  // =========================================================== 07 DEEP DIVE
  S.s07 = {
    build(root, c) {
      const st = {};
      const BX = 96, BY = 170, BW = 1180, BH = 790;
      st.b = box(root, BX, BY, { cls: "browser", style: { width: BW + "px", height: BH + "px" } });
      const top = box(st.b, 0, 0, { style: { width: BW + "px", height: "62px", background: "#F1EEE7" } });
      ["#D2CCBF", "#D2CCBF", "#D2CCBF"].forEach((cl, i) => box(top, 24 + i * 24, 24, { style: { width: "13px", height: "13px", borderRadius: "50%", background: cl } }));
      st.tabs = ["Masaryk University", "IE University", "VU Amsterdam", "LMU Munich", "Frankfurt UAS", "FU Berlin", "Sheffield"].map((n, i) => {
        const w = i === 0 ? 230 : 136;
        const x = i === 0 ? 110 : 110 + 238 + (i - 1) * 142;
        return box(top, x, 12, { cls: "kr", text: n, style: { width: w + "px", height: "50px", borderRadius: "12px 12px 0 0", background: i === 0 ? "#fff" : "transparent", padding: "15px 16px", fontSize: "16px", fontWeight: i === 0 ? "600" : "400", color: i === 0 ? "var(--ink)" : "var(--mid)", overflow: "hidden", textOverflow: "ellipsis" } });
      });
      const url = box(st.b, 24, 74, { style: { width: (BW - 48) + "px", height: "46px", borderRadius: "23px", background: "#F4F2ED", display: "flex", alignItems: "center", padding: "0 20px", gap: "12px" } });
      icon(url, "globe", 20, "var(--mid)", 1.8);
      st.urlTxt = el("div", { cls: "mono", text: "", style: { fontSize: "17px", letterSpacing: ".04em", textTransform: "none", color: "var(--ink)" } }, url);
      const VP = box(st.b, 0, 136, { style: { width: BW + "px", height: (BH - 136) + "px", overflow: "hidden" } });
      st.pages = [];
      st.home = box(VP, 0, 0, { style: { width: BW + "px", height: (BH - 136) + "px" } });
      const sb = box(st.home, BW / 2 - 330, 230, { style: { width: "660px", height: "66px", borderRadius: "33px", boxShadow: "0 0 0 1.5px rgba(10,12,17,.15)", display: "flex", alignItems: "center", gap: "16px", padding: "0 26px" } });
      icon(sb, "search", 26, "var(--mid)", 2);
      el("div", { cls: "kr dim", text: "교환학생 · 학교 홈페이지", style: { fontSize: "22px" } }, sb);
      [0, 1, 2, 3].forEach((i) => box(st.home, BW / 2 - 330 + i * 172, 340, { style: { width: "144px", height: "100px", borderRadius: "14px", background: "#F4F2ED" } }));
      st.muHome = box(VP, 0, 0, { style: { width: BW + "px", height: (BH - 136) + "px", padding: "60px 56px" } });
      el("img", { attrs: { src: "assets/muni-logo-blue.svg" }, style: { width: "330px" } }, st.muHome);
      const nav = el("div", { style: { display: "flex", gap: "28px", marginTop: "40px" } }, st.muHome);
      ["Study", "Research", "Exchange", "Accommodation", "Brno"].forEach((n) => el("div", { cls: "mono", text: n, style: { fontSize: "15px" } }, nav));
      box(st.muHome, 56, 300, { style: { width: "1068px", height: "300px", borderRadius: "16px", background: "linear-gradient(120deg,#0000DC,#3442FF)" } });
      const page = (title, kr) => {
        const p = box(VP, 0, 0, { style: { width: BW + "px", height: (BH - 136) + "px", padding: "44px 56px" } });
        el("div", { cls: "mono muni", text: "muni.cz", style: { fontSize: "15px", fontWeight: "700" } }, p);
        el("div", { cls: "serif", text: title, style: { fontSize: "66px", lineHeight: "1", marginTop: "12px" } }, p);
        el("div", { cls: "kr dim", text: kr, style: { fontSize: "22px", marginTop: "10px" } }, p);
        st.pages.push(p); return p;
      };
      // calendar page
      const pc = page("Academic Calendar", "학사 일정");
      const MM = ["SEP", "OCT", "NOV", "DEC", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG"];
      MM.forEach((mm, i) => { box(pc, 56 + i * 88, 250, { cls: "mono dim", text: mm, style: { fontSize: "13px" } }); box(pc, 56 + i * 88, 280, { style: { width: "80px", height: "200px", borderRadius: "8px", background: "#F4F2ED" } }); });
      box(pc, 56 + 5 * 88, 300, { cls: "mono", text: "Spring semester", style: { width: (5 * 88 - 8) + "px", height: "56px", borderRadius: "10px", background: "var(--muni)", color: "#fff", padding: "19px 16px", fontSize: "14px" } });
      box(pc, 56, 380, { style: { width: (4 * 88 - 8) + "px", height: "56px", borderRadius: "10px", background: "#D7D2C6" } });
      // dorm page
      const pd = page("Accommodation", "기숙사");
      [0, 1, 2].forEach((i) => { const cdd = box(pd, 56 + i * 360, 230, { style: { width: "330px", height: "330px", borderRadius: "14px", background: "#F4F2ED" } }); icon(cdd, "dorm", 90, "#C9C3B6", 1.2).style.margin = "60px 0 0 120px"; box(cdd, 24, 250, { cls: "skel", style: { width: "200px", background: "#E2DDD1" } }); box(cdd, 24, 280, { cls: "skel", style: { width: "140px", background: "#E2DDD1" } }); });
      // courses page
      const pk = page("Courses for Exchange Students", "수업");
      for (let i = 0; i < 6; i++) { const r = box(pk, 56, 230 + i * 62, { style: { width: "1060px", height: "48px", borderBottom: "1px solid var(--line-l)" } }); box(r, 0, 12, { cls: "mono", text: ["PV", "IB", "MA", "BPE", "MPV", "PB"][i] + (100 + i * 37), style: { fontSize: "16px", width: "120px" } }); box(r, 140, 16, { cls: "skel", style: { width: (380 + (i * 71) % 260) + "px" } }); box(r, 940, 12, { cls: "mono dim", text: (i % 2 ? 5 : 6) + " ECTS", style: { fontSize: "15px" } }); }
      // location page
      const pl = page("Brno", "위치");
      st.miniMap = new C.MapView(pl, "light", { x: 56, y: 220, w: 1068, h: 380 }, { radius: 14 });
      st.miniMap.pin("Brno", { size: 14, color: "#0000DC", ring: true, ringColor: "#0000DC", label: "BRNO" });
      ["Prague", "Vienna", "Budapest", "Bratislava"].forEach((n) => st.miniMap.pin(n, { size: 9 }));
      st.miniMap.cam(CITY.Brno[0] + 30, CITY.Brno[1], 1200);
      // exchange page
      const pe = page("Exchange Students", "교환학생 정보");
      ["Application", "Erasmus+ & bilateral", "Arrival guide", "Buddy programme"].forEach((h, i) => { const b2 = box(pe, 56 + (i % 2) * 540, 230 + Math.floor(i / 2) * 170, { style: { width: "510px", height: "150px", borderRadius: "14px", background: "#F4F2ED", padding: "24px" } }); el("div", { cls: "kr", text: h, style: { fontSize: "24px", fontWeight: "700" } }, b2); el("div", { cls: "skel", style: { position: "relative", width: "380px", marginTop: "22px", background: "#E2DDD1" } }, b2); el("div", { cls: "skel", style: { position: "relative", width: "260px", marginTop: "14px", background: "#E2DDD1" } }, b2); });
      // side checklist
      st.side = box(root, 1360, 300, { style: { width: "470px" } });
      st.sideHead = el("div", { cls: "mono", text: "Checked myself · 직접 확인", style: { fontSize: "16px", fontWeight: "700" } }, st.side);
      st.rows = [["Academic calendar", "학사 일정"], ["Dormitory", "기숙사"], ["Courses", "수업"], ["Location", "위치"], ["Exchange info", "교환학생 정보"]].map(([en, kr], i) => C.checkRow(st.side, 0, 60 + i * 74, en, kr));
      st.tags = [["clock", "Time"], ["euro", "Cost"]].map(([ic, lab], i) => { const g = box(root, 1360 + i * 190, 200, { cls: "pill mono", style: { fontSize: "18px", background: "#fff", borderColor: "rgba(10,12,17,.2)" } }); icon(g, ic, 24, "var(--ink)", 1.8); el("span", { text: lab }, g); return g; });
      // quote
      st.qmark = box(root, 960 - 60, 170, { cls: "serif muni", text: "“", style: { fontSize: "240px", lineHeight: "1", width: "120px", textAlign: "center" } });
      st.q1 = line(root, 0, 410, "그래도 그때의 최선은", "kr center", { style: { fontSize: "76px", fontWeight: "600", width: "1920px", lineHeight: "1.2" } });
      st.q2 = line(root, 0, 520, "<span class='serif it muni' style='font-size:128px;letter-spacing:-0.01em'>Masaryk University</span><span style='font-size:76px;font-weight:600'>였다.</span>", "kr center", { style: { width: "1920px", lineHeight: "1.15" } });
      return st;
    },
    update(t, st, c) {
      const q = c.q;
      const bin = prog(t, q("browser") - 0.6, 0.8, ease.outQuart);
      const bout = prog(t, q("out"), 0.7, ease.inOutCubic);
      set(st.b, bin * (1 - bout), 0, (1 - bin) * 60 - bout * 30, 1 - 0.04 * bout);
      st.tabs.forEach((tb, i) => set(tb, i === 0 ? 1 : prog(t, q("tabs") + i * 0.1, 0.35)));
      const u = "muni.cz";
      const n = Math.floor(clamp((t - q("tabs") - 0.1) / 0.5) * u.length);
      if (st.urlTxt.textContent !== u.slice(0, n)) st.urlTxt.textContent = u.slice(0, n);
      const cues = ["p_cal", "p_dorm", "p_course", "p_loc", "p_ex"];
      set(st.home, 1 - prog(t, q("tabs") + 0.5, 0.3));
      set(st.muHome, prog(t, q("tabs") + 0.55, 0.35) * (1 - prog(t, q("p_cal") - 0.08, 0.3)), 0, (1 - prog(t, q("tabs") + 0.55, 0.35)) * 40);
      st.pages.forEach((p, i) => {
        const tin = q(cues[i]) - 0.08, tout = i < 4 ? q(cues[i + 1]) - 0.08 : 1e9;
        const pi = prog(t, tin, 0.4, ease.outQuart), po = prog(t, tout, 0.35, ease.inCubic);
        set(p, pi * (1 - po), 0, (1 - pi) * 80 - po * 60);
      });
      if (t > q("p_loc") - 0.3 && t < q("out") + 1) st.miniMap.showPin("Brno", 1, 1, (t - q("p_loc")) / 1.3), ["Prague", "Vienna", "Budapest", "Bratislava"].forEach((nn) => st.miniMap.showPin(nn, prog(t, q("p_loc"), 0.4)));
      set(st.side, prog(t, q("tabs"), 0.5) * (1 - bout), 0, 0);
      st.rows.forEach((r, i) => { const t0 = q(cues[i]); C.showCheck(r, prog(t, t0, 0.35), prog(t, t0 + 0.1, 0.45), "ok", 12); });
      const done = prog(t, q("done"), 0.5);
      st.sideHead.style.color = done > 0.5 ? "var(--muni)" : "var(--ink)";
      st.tags.forEach((g, i) => set(g, prog(t, q("time") + i * 0.2, 0.4) * (1 - prog(t, q("tabs"), 0.4)), 0, (1 - prog(t, q("time") + i * 0.2, 0.4)) * 12));
      set(st.qmark, prog(t, q("q1") - 0.2, 0.6), 0, (1 - prog(t, q("q1") - 0.2, 0.6)) * 20);
      reveal(st.q1, prog(t, q("q1"), 0.7, ease.outQuart));
      reveal(st.q2, prog(t, q("q2"), 0.8, ease.outQuart));
    },
  };

  // =========================================================== 08 APPLICATION
  S.s08 = {
    build(root, c) {
      const st = {};
      const s = svg("svg", { width: 1920, height: 1080 }, root); s.style.position = "absolute";
      st.flowSvg = s;
      const NX = [300, 760, 1220], NY = 330;
      st.links = [svg("line", { x1: 330, y1: NY, x2: 730, y2: NY, stroke: "#0A0C11", "stroke-width": 3, pathLength: 1 }, s), svg("line", { x1: 790, y1: NY, x2: 1190, y2: NY, stroke: "#0A0C11", "stroke-width": 3, pathLength: 1 }, s)];
      st.toMu = svg("path", { d: `M760,${NY - 30} C 900,140 1300,140 1480,200`, fill: "none", stroke: "#0000DC", "stroke-width": 3, pathLength: 1, "stroke-dasharray": "1 1" }, s);
      st.nodes = [["Application", "지원"], ["1st round", "1차 선발"], ["2nd round", "2차 선발"]].map(([en, kr], i) => {
        const g = box(root, NX[i] - 150, NY - 28, { style: { width: "300px", textAlign: "center" } });
        el("div", { style: { width: "56px", height: "56px", borderRadius: "50%", background: "var(--ink)", margin: "0 auto", border: "6px solid var(--paper)", boxShadow: "0 0 0 2px var(--ink)" } }, g);
        el("div", { cls: "mono", text: en, style: { fontSize: "19px", marginTop: "20px", fontWeight: "700" } }, g);
        el("div", { cls: "kr dim", text: kr, style: { fontSize: "22px", marginTop: "6px" } }, g);
        return g;
      });
      st.muBox = box(root, 1480, 150, { cls: "card", style: { width: "340px", height: "110px", padding: "26px 28px" } });
      el("img", { attrs: { src: "assets/muni-logo-blue.svg" }, style: { width: "250px" } }, st.muBox);
      st.ask = [["Alumni", "다녀온 지인"], ["Seniors", "에브리타임 선배들"]].map(([en, kr], i) => {
        const g = box(root, 300 + i * 420, 560, { style: { display: "flex", alignItems: "center", gap: "18px" } });
        const ic = el("div", { style: { width: "86px", height: "86px", borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 1px rgba(10,12,17,.1)" } }, g);
        icon(ic, i ? "chat" : "person", 44, "var(--ink)", 1.6);
        const tx = el("div", {}, g);
        el("div", { cls: "mono", text: en, style: { fontSize: "18px", fontWeight: "700" } }, tx);
        el("div", { cls: "kr dim", text: kr, style: { fontSize: "22px", marginTop: "6px" } }, tx);
        return g;
      });
      st.g = C.gauge(root, 1260, 500, 170, { labels: ["Risky", "Okay", "Safe"] });
      st.gLab = box(root, 1260, 760, { cls: "mono center", text: "My estimate", style: { width: "380px", fontSize: "18px", fontWeight: "700" } });
      // numbers
      st.seats = box(root, 230, 230, { style: { width: "640px" } });
      st.seatsN = el("div", { cls: "serif muni", text: "2", style: { fontSize: "380px", lineHeight: ".9" } }, st.seats);
      el("div", { cls: "mono", html: "Seats <span class='kr dim' style='letter-spacing:0;font-size:24px;text-transform:none'>선발 인원</span>", style: { fontSize: "24px", fontWeight: "700", marginTop: "10px" } }, st.seats);
      st.seatIc = [0, 1].map((i) => { const g = box(root, 230 + i * 100, 760, {}); icon(g, "seat", 80, "var(--muni)", 1.6); return g; });
      st.vs = box(root, 900, 380, { cls: "serif it dim", text: "vs", style: { fontSize: "90px" } });
      st.apps = box(root, 1100, 230, { style: { width: "700px" } });
      el("div", { cls: "serif", html: "<span style='font-size:200px'>~</span>6", style: { fontSize: "380px", lineHeight: ".9" } }, st.apps);
      el("div", { cls: "mono", html: "Applicants <span class='kr dim' style='letter-spacing:0;font-size:24px;text-transform:none'>지원자</span>", style: { fontSize: "24px", fontWeight: "700", marginTop: "10px" } }, st.apps);
      st.ppl = [0, 1, 2, 3, 4, 5].map((i) => { const g = box(root, 1100 + i * 100, 760, {}); icon(g, "person", 80, "var(--ink)", 1.5); return g; });
      st.dark = box(root, 0, 0, { style: { width: "1920px", height: "1080px", background: "var(--ink)" } });
      return st;
    },
    update(t, st, c) {
      const q = c.q;
      const out = prog(t, q("but"), 0.6, ease.inOutCubic);
      const k = 1 - out;
      st.nodes.forEach((g, i) => { const t0 = q(["app", "r1", "r2"][i]); const p = prog(t, t0, 0.5); set(g, p * k * (i === 2 ? 1 - 0.7 * prog(t, q("r1f"), 0.5) : 1), 0, (1 - p) * 16 - out * 40); });
      draw(st.links[0], prog(t, q("r1") - 0.3, 0.4) ); st.links[0].style.opacity = String(k);
      draw(st.links[1], prog(t, q("r2") - 0.3, 0.4)); st.links[1].style.opacity = String(k * (1 - 0.7 * prog(t, q("r1f"), 0.5)));
      const mp = prog(t, q("mu"), 0.8, ease.inOutCubic);
      st.toMu.setAttribute("stroke-dashoffset", String(1 - mp)); st.toMu.style.opacity = String(mp > 0 ? k : 0);
      set(st.muBox, prog(t, q("mu") + 0.5, 0.5) * k, 0, (1 - prog(t, q("mu") + 0.5, 0.5)) * 14 - out * 40);
      st.ask.forEach((g, i) => set(g, prog(t, q("ask") + i * 0.5, 0.5) * k, 0, (1 - prog(t, q("ask") + i * 0.5, 0.5)) * 16 - out * 40));
      const gp = prog(t, q("safe") - 0.2, 0.5);
      C.showGauge(st.g, gp * k, prog(t, q("safe") - 0.2, 0.7), 0.1 + 0.68 * prog(t, q("safe") + 0.1, 1.4, ease.outBack));
      set(st.gLab, gp * k);
      const sp = prog(t, q("seats"), 0.6, ease.outQuart);
      set(st.seats, sp, 0, (1 - sp) * 30);
      st.seatIc.forEach((g, i) => set(g, prog(t, q("seats") + 0.2 + i * 0.12, 0.4), 0, 0, 0.7 + 0.3 * prog(t, q("seats") + 0.2 + i * 0.12, 0.4, ease.outBack)));
      set(st.vs, prog(t, q("apps") - 0.2, 0.5));
      const ap = prog(t, q("apps"), 0.6, ease.outQuart);
      set(st.apps, ap, 0, (1 - ap) * 30);
      const tense = t > q("tense") ? Math.max(0, Math.sin((t - q("tense")) * 4.2)) : 0;
      st.ppl.forEach((g, i) => set(g, prog(t, q("apps") + 0.15 + i * 0.08, 0.35), 0, -tense * 4 * ((i % 2) * 2 - 1) * 0, 1 + 0.04 * tense));
      st.dark.style.opacity = String(0.55 * prog(t, q("tense"), c.len - q("tense"), ease.inOutSine));
      st.dark.style.visibility = t > q("tense") ? "visible" : "hidden";
    },
  };
})();
