// SCENE 09-11
window.SCENES = window.SCENES || {};
(function () {
  const { el, svg, box, set, clamp, lerp, ease, prog, line, reveal, draw, icon } = M;
  const S = window.SCENES;
  const CITY = EUROPE.cities;
  const BR = CITY.Brno;

  // =========================================================== 09 RESULT
  S.s09 = {
    build(root, c) {
      const st = {};
      st.day = box(root, 0, 96, { cls: "mono center", html: "Result day <span style='opacity:.5'>·</span> 합격 발표", style: { width: "1920px", fontSize: "20px", color: "rgba(255,255,255,.7)" } });
      const PW = 430, PH = 880;
      st.phone = box(root, 960 - PW / 2, 150, { style: { width: PW + "px", height: PH + "px", borderRadius: "64px", background: "#1B1F29", boxShadow: "0 0 0 2px #2A3040, 0 60px 120px -40px rgba(0,0,0,.8)" } });
      st.screen = box(st.phone, 14, 14, { style: { width: (PW - 28) + "px", height: (PH - 28) + "px", borderRadius: "52px", background: "#0E1118", overflow: "hidden" } });
      st.ui = box(st.screen, 0, 0, { style: { width: (PW - 28) + "px", height: (PH - 28) + "px", padding: "110px 36px 0" } });
      el("div", { cls: "mono", text: "SKKU · 교환학생 선발", style: { fontSize: "14px", color: "rgba(255,255,255,.55)", letterSpacing: ".08em" } }, st.ui);
      el("div", { cls: "serif", text: "Exchange Result", style: { fontSize: "54px", color: "#fff", marginTop: "14px", lineHeight: "1" } }, st.ui);
      [260, 200, 240].forEach((w) => el("div", { style: { width: w + "px", height: "12px", borderRadius: "6px", background: "rgba(255,255,255,.08)", marginTop: "22px" } }, st.ui));
      st.btn = box(st.ui, 36, 560, { cls: "kr", text: "결과 확인", style: { width: (PW - 28 - 72) + "px", height: "76px", borderRadius: "38px", background: "#fff", color: "var(--ink)", fontSize: "26px", fontWeight: "700", textAlign: "center", paddingTop: "22px" } });
      st.ripple = box(st.ui, 0, 0, { style: { width: "40px", height: "40px", borderRadius: "50%", background: "rgba(0,0,220,.35)" } });
      st.res = box(st.screen, 0, 0, { style: { width: (PW - 28) + "px", height: (PH - 28) + "px", background: "var(--muni)", textAlign: "center", paddingTop: "300px", color: "#fff" } });
      el("div", { cls: "kr", text: "1지망", style: { fontSize: "40px", fontWeight: "600", opacity: ".85" } }, st.res);
      el("div", { cls: "kr", text: "합격", style: { fontSize: "150px", fontWeight: "800", lineHeight: "1.05", letterSpacing: "-0.02em" } }, st.res);
      el("div", { cls: "mono", text: "Masaryk University", style: { fontSize: "16px", marginTop: "18px", opacity: ".85" } }, st.res);
      st.notch = box(st.phone, PW / 2 - 60, 30, { style: { width: "120px", height: "32px", borderRadius: "16px", background: "#000" } });
      // logo moment
      st.logo = box(root, 960 - 460, 330, { tag: "img", attrs: { src: "assets/muni-logo-white.svg" }, style: { width: "920px" } });
      st.acc = box(root, 0, 622, { cls: "mono center", html: "1st choice <span style='opacity:.5'>·</span> Accepted", style: { width: "1920px", fontSize: "24px", color: "#7C88FF", fontWeight: "700", letterSpacing: ".3em" } });
      st.year = box(root, 0, 700, { cls: "serif center", text: "2027-1", style: { width: "1920px", fontSize: "150px", lineHeight: "1" } });
      st.place = box(root, 0, 880, { cls: "mono center", text: "Brno, Czech Republic", style: { width: "1920px", fontSize: "22px", letterSpacing: ".3em", color: "rgba(255,255,255,.75)" } });
      return st;
    },
    update(t, st, c) {
      const q = c.q;
      set(st.day, prog(t, q("day"), 0.6) * (1 - prog(t, q("tap"), 0.5)), 0, (1 - prog(t, q("day"), 0.6)) * 10);
      const ph = prog(t, q("phone") - 0.2, 1.0, ease.outQuart);
      const lo = prog(t, q("logo") - 0.1, 0.9, ease.inOutCubic);
      set(st.phone, ph * (1 - lo), 0, (1 - ph) * 700 + lo * 40, 1 - 0.08 * lo);
      const on = prog(t, q("phone") + 0.4, 0.5);
      st.screen.style.background = on > 0 ? `rgb(${Math.round(lerp(14, 22, on))},${Math.round(lerp(17, 26, on))},${Math.round(lerp(24, 36, on))})` : "#0E1118";
      set(st.ui, prog(t, q("check"), 0.5));
      // tap ripple then stillness
      const tp = prog(t, q("tap") + 0.15, 0.6, ease.outCubic);
      const bx = 36 + (430 - 28 - 72) / 2 - 20, by = 560 + 38 - 20;
      set(st.ripple, t > q("tap") + 0.15 ? (1 - tp) * 0.9 : 0, bx, by, 1 + tp * 7);
      st.btn.style.transform = t > q("tap") + 0.1 && t < q("tap") + 0.3 ? "scale(.97)" : "scale(1)";
      // result: plain, quick, no flourish
      const rp = prog(t, q("pass_") - 0.04, 0.22, ease.outCubic);
      set(st.res, rp);
      // logo
      const lg = prog(t, q("logo") + 0.3, 1.1, ease.outQuart);
      st.logo.style.clipPath = `inset(0 ${(100 - 100 * lg).toFixed(1)}% 0 0)`; set(st.logo, lg > 0 ? 1 : 0, 0, (1 - lg) * 10);
      set(st.acc, prog(t, q("final"), 0.6), 0, (1 - prog(t, q("final"), 0.6)) * 10);
      set(st.year, prog(t, q("y"), 0.7), 0, (1 - prog(t, q("y"), 0.7)) * 20);
      set(st.place, prog(t, q("brno"), 0.7), 0, (1 - prog(t, q("brno"), 0.7)) * 12);
    },
  };

  // =========================================================== 10 TIPS
  S.s10 = {
    build(root, c) {
      const st = {};
      st.two = box(root, 0, 250, { style: { width: "1920px", textAlign: "center" } });
      el("div", { cls: "serif", html: "2 <span class='it'>tips</span>", style: { fontSize: "300px", lineHeight: "1" } }, st.two);
      el("div", { cls: "kr dim", text: "직접 느낀 팁 두 가지", style: { fontSize: "36px", marginTop: "20px" } }, st.two);
      // tip 1
      st.t1 = box(root, 0, 0, { style: { width: "1920px", height: "1080px" } });
      st.t1n = box(st.t1, 96, 190, { cls: "mono muni", text: "Tip 01", style: { fontSize: "22px", fontWeight: "700" } });
      st.t1h = line(st.t1, 90, 220, "Ask.", "serif", { style: { fontSize: "260px", lineHeight: "1.05" } });
      st.t1u = box(st.t1, 100, 500, { style: { width: "420px", height: "6px", background: "var(--muni)", transformOrigin: "0 50%" } });
      st.t1s = box(st.t1, 96, 540, { cls: "kr", text: "정말 가고 싶다면, 직접 문의하기", style: { fontSize: "44px", fontWeight: "600" } });
      st.fra = box(st.t1, 1000, 170, { cls: "card", style: { width: "824px", height: "560px", padding: "40px 46px" } });
      el("div", { cls: "mono dim", text: "DE · Frankfurt", style: { fontSize: "16px" } }, st.fra);
      el("div", { cls: "serif", text: "Frankfurt University of Applied Sciences", style: { fontSize: "50px", lineHeight: "1.05", marginTop: "10px", whiteSpace: "normal", width: "720px" } }, st.fra);
      const row = (y, lab, val, kr) => { const g = box(st.fra, 46, y, { style: { width: "730px", display: "flex", alignItems: "baseline", gap: "20px", paddingBottom: "16px", borderBottom: "1px solid var(--line-l)" } }); el("div", { cls: "mono", text: lab, style: { fontSize: "17px", width: "150px", fontWeight: "700" } }, g); el("div", { cls: "serif", html: val, style: { fontSize: "54px", lineHeight: "1" } }, g); el("div", { cls: "kr dim", text: kr, style: { fontSize: "22px" } }, g); return g; };
      st.req = row(230, "Required", "3+ semesters", "3개 학기 이상 수료");
      st.me = row(330, "Me", "2 semesters", "2개 학기 수료");
      st.meX = box(st.fra, 720, 330, {}); icon(st.meX, "cross", 54, "var(--red)", 2.6);
      st.mail = box(st.t1, 1000, 770, { cls: "pill mono", style: { fontSize: "18px", background: "#fff", borderColor: "rgba(10,12,17,.2)" } });
      icon(st.mail, "mail", 28, "var(--ink)", 1.7); el("span", { text: "Email sent" }, st.mail);
      st.reply = box(st.t1, 1280, 770, { cls: "pill", style: { fontSize: "22px", background: "var(--muni)", color: "#fff", borderColor: "var(--muni)" } });
      icon(st.reply, "check", 28, "#fff", 2.4); el("span", { cls: "kr", html: "<b>Reply</b> · 지원 가능", style: { fontWeight: "500" } }, st.reply);
      st.noap = box(st.fra, 46, 450, { cls: "mono dim", html: "→ Not applied · academic calendar", style: { fontSize: "16px" } });
      st.lesson = box(st.t1, 1000, 330, { style: { width: "824px" } });
      el("div", { cls: "mono muni", text: "What I learned", style: { fontSize: "18px", fontWeight: "700" } }, st.lesson);
      el("div", { cls: "kr", html: "홈페이지 기준만 보고<br>미리 포기할 필요는 없다.", style: { fontSize: "58px", fontWeight: "700", lineHeight: "1.3", marginTop: "18px" } }, st.lesson);
      st.caveat = box(st.t1, 1000, 590, { cls: "kr dim", text: "* 모든 학교가 예외를 인정하지는 않습니다.", style: { fontSize: "24px" } });
      // tip 2
      st.t2 = box(root, 0, 0, { style: { width: "1920px", height: "1080px" } });
      st.t2n = box(st.t2, 96, 170, { cls: "mono muni", text: "Tip 02", style: { fontSize: "22px", fontWeight: "700" } });
      st.t2h = line(st.t2, 90, 200, "Check the <span class='it'>calendar</span>.", "serif", { style: { fontSize: "170px", lineHeight: "1.05" } });
      st.t2s = box(st.t2, 96, 400, { cls: "kr", text: "Academic Calendar는 반드시 확인하기", style: { fontSize: "40px", fontWeight: "600" } });
      st.names = ["학교 이름", "도시"].map((n, i) => { const g = box(st.t2, 1300 + i * 230, 410, { cls: "pill kr", text: n, style: { fontSize: "26px", color: "var(--mid)", borderColor: "rgba(10,12,17,.25)" } }); const sk = box(g, -6, 26, { style: { width: "calc(100% + 12px)", height: "3px", background: "var(--red)", transformOrigin: "0 50%" } }); return { g, sk }; });
      st.cal = new C.Calendar(st.t2, 400, 640, 1200, [
        { id: "X", label: "Exchange<small>교환학기</small>", text: "SPRING SEMESTER ABROAD", cls: "blue" },
        { id: "K", label: "SKKU<small>다음 학기</small>", text: "NEXT SEMESTER" },
      ]);
      st.ret = svg("svg", { width: 300, height: 140, viewBox: "0 0 300 140" }, st.cal.root);
      st.ret.style.position = "absolute"; st.ret.style.left = (st.cal.mx(9) - 40) + "px"; st.ret.style.top = "90px"; st.ret.style.overflow = "visible";
      st.retP = svg("path", { d: "M10,25 C 120,25 140,110 250,110", fill: "none", stroke: "var(--ink)", "stroke-width": 3, pathLength: 1, "marker-end": "" }, st.ret);
      st.retLab = box(st.cal.root, st.cal.mx(9) + 30, 135, { cls: "mono", text: "Return", style: { fontSize: "15px", fontWeight: "700" } });
      st.ok = box(st.cal.root, st.cal.mx(15) + 20, st.cal.rows.K.y + 4, {});
      icon(st.ok, "check", 48, "var(--muni)", 2.6);
      st.okLab = box(st.cal.root, st.cal.mx(11), st.cal.rows.K.y + 66, { cls: "mono muni", text: "No clash", style: { fontSize: "16px", fontWeight: "700" } });
      return st;
    },
    update(t, st, c) {
      const q = c.q;
      const twoIn = prog(t, q("tips") - 0.1, 0.7, ease.outQuart), twoOut = prog(t, q("t1") - 0.35, 0.4, ease.inCubic);
      set(st.two, twoIn * (1 - twoOut), 0, (1 - twoIn) * 30 - twoOut * 40);
      // tip1 group in/out
      const t1In = prog(t, q("t1"), 0.5);
      const t1Out = prog(t, q("t2") - 0.15, 0.6, ease.inOutCubic);
      set(st.t1, t1In > 0 ? 1 - t1Out : 0, -1920 * 0.18 * t1Out, 0);
      st.t1.style.opacity = String(1 - t1Out);
      set(st.t1n, t1In);
      reveal(st.t1h, prog(t, q("t1"), 0.7, ease.outQuart));
      st.t1u.style.transform = `scaleX(${prog(t, q("ask"), 0.6, ease.inOutCubic).toFixed(3)})`;
      set(st.t1s, prog(t, q("t1_sub"), 0.6), 0, (1 - prog(t, q("t1_sub"), 0.6)) * 14);
      const story = 1 - prog(t, q("lesson") - 0.3, 0.5, ease.inOutCubic);
      set(st.fra, prog(t, q("fra"), 0.6) * story, (1 - prog(t, q("fra"), 0.6)) * 60, 0);
      set(st.req, prog(t, q("req"), 0.5), (1 - prog(t, q("req"), 0.5)) * 20, 0);
      set(st.me, prog(t, q("me"), 0.5), (1 - prog(t, q("me"), 0.5)) * 20, 0);
      set(st.meX, prog(t, q("me") + 0.6, 0.35, ease.outBack));
      const mp = prog(t, q("mail"), 0.6);
      set(st.mail, mp * story, (1 - mp) * -30 + prog(t, q("mail") + 0.6, 0.5, ease.inCubic) * 0, 0);
      set(st.reply, prog(t, q("reply"), 0.5, ease.outBack) * story, 0, (1 - prog(t, q("reply"), 0.5)) * 14);
      set(st.noap, prog(t, q("noapply"), 0.5));
      set(st.lesson, prog(t, q("lesson") - 0.1, 0.6), 0, (1 - prog(t, q("lesson") - 0.1, 0.6)) * 24);
      set(st.caveat, prog(t, q("caveat"), 0.5));
      // tip2
      const t2In = prog(t, q("t2") - 0.15, 0.6, ease.inOutCubic);
      set(st.t2, t2In, 1920 * 0.18 * (1 - t2In), 0);
      reveal(st.t2h, prog(t, q("t2"), 0.7, ease.outQuart));
      set(st.t2n, prog(t, q("t2"), 0.4));
      set(st.t2s, prog(t, q("t2_sub"), 0.6), 0, (1 - prog(t, q("t2_sub"), 0.6)) * 14);
      st.names.forEach((n, i) => { set(n.g, prog(t, q("names") + i * 0.25, 0.4) * (1 - 0.5 * prog(t, q("ex"), 0.5))); n.sk.style.transform = `scaleX(${prog(t, q("names") + 0.9 + i * 0.2, 0.4, ease.inOutCubic).toFixed(3)})`; });
      const cal = st.cal;
      cal.showHead(prog(t, q("names") + 0.6, 0.8));
      const xp = prog(t, q("ex"), 0.9, ease.inOutCubic);
      cal.showRow("X", xp > 0 ? 1 : 0, 4, 4 + 5 * xp, prog(t, q("names") + 0.8, 0.5));
      draw(st.retP, prog(t, q("ret"), 0.6, ease.inOutCubic));
      set(st.retLab, prog(t, q("ret") + 0.3, 0.4));
      const kp = prog(t, q("next"), 0.8, ease.inOutCubic);
      cal.showRow("K", kp > 0 ? 1 : 0, 11, 11 + 4 * kp, prog(t, q("names") + 0.8, 0.5));
      set(st.ok, prog(t, q("ok"), 0.4, ease.outBack), 0, 0, 0.6 + 0.4 * prog(t, q("ok"), 0.4, ease.outBack));
      draw(st.ok.querySelector("path"), prog(t, q("ok") + 0.05, 0.4));
      set(st.okLab, prog(t, q("ok") + 0.2, 0.4));
    },
  };

  // =========================================================== 11 CLOSING
  S.s11 = {
    build(root, c) {
      const st = {};
      st.map = new C.MapView(root, "dark");
      st.map.pin("Brno", { size: 18, color: "#5563FF", ring: true, ringColor: "#5563FF", label: false });
      st.dest = ["Prague", "Vienna", "Budapest", "Berlin", "Krakow", "Venice", "Munich", "Salzburg", "Bratislava"];
      st.routes = st.dest.map((n, i) => st.map.arc("Brno", n, { width: 1.8, color: "rgba(255,255,255,.6)", bend: i % 2 ? 0.16 : -0.16 }));
      st.dest.forEach((n) => st.map.pin(n, { size: 8, label: false }));
      st.say1 = box(root, 0, 150, { cls: "kr center", text: "좋은 학교보다,", style: { width: "1920px", fontSize: "48px", color: "rgba(255,255,255,.5)" } });
      st.say2 = box(root, 0, 220, { cls: "kr center", html: "나에게 <span style='color:#7C88FF'>맞는</span> 학교.", style: { width: "1920px", fontSize: "84px", fontWeight: "700" } });
      st.tagSvg = svg("svg", { width: 1920, height: 1080 }, root); st.tagSvg.style.position = "absolute"; st.tagSvg.style.left = "0"; st.tagSvg.style.top = "0";
      const T = [["Travel", "유럽 여행"], ["Cost", "생활비"], ["Location", "위치"], ["Calendar", "학사 일정"], ["Quality", "학교 수준"], ["Dorm", "기숙사"], ["Chance", "합격 가능성"]];
      st.tags = T.map(([en, kr], i) => {
        const g = box(root, 0, 0, { style: { whiteSpace: "nowrap" } });
        const inner = el("div", { cls: "pill", style: { color: "#fff", borderColor: "rgba(255,255,255,.35)", background: "rgba(10,12,17,.6)", fontSize: "22px" } }, g);
        el("span", { cls: "mono", text: en, style: { fontSize: "18px", fontWeight: "700" } }, inner);
        el("span", { cls: "kr", text: kr, style: { color: "rgba(255,255,255,.6)" } }, inner);
        const ln = svg("line", { stroke: "rgba(255,255,255,.28)", "stroke-width": 1.5 }, st.tagSvg);
        const ang = -Math.PI / 2 + (i - 3) * 0.62 + (i >= 4 ? 0 : 0);
        return { g, ln, ang };
      });
      st.muSmall = box(root, 0, 0, { tag: "img", attrs: { src: "assets/muni-logo-white.svg" }, style: { width: "380px" } });
      st.year = box(root, 0, 250, { cls: "serif center", text: "2027-1", style: { width: "1920px", fontSize: "260px", lineHeight: "1" } });
      st.logo = box(root, 960 - 330, 560, { tag: "img", attrs: { src: "assets/muni-logo-white.svg" }, style: { width: "660px" } });
      st.place = box(root, 0, 770, { cls: "mono center", text: "Brno, Czech Republic", style: { width: "1920px", fontSize: "22px", letterSpacing: ".3em", color: "rgba(255,255,255,.75)" } });
      st.go = line(root, 0, 430, "LET'S GO <span style='color:#7C88FF'>MASARYK!</span>", "kr center", { style: { width: "1920px", fontSize: "150px", fontWeight: "800", letterSpacing: "-0.01em", lineHeight: "1.1" } });
      st.black = box(root, 0, 0, { style: { width: "1920px", height: "1080px", background: "#000" } });
      return st;
    },
    update(t, st, c) {
      const q = c.q;
      const m = st.map;
      m.camKeys(t, [
        { t: 0, cx: 1700, cy: 1700, w: 3000 },
        { t: q("k1") + 0.4, d: q("k1") + 0.4, cx: BR[0] - 40, cy: BR[1] + 30, w: 2100 },
        { t: q("mu") + 1.4, d: 1.8, cx: BR[0], cy: BR[1] + 60, w: 1300 },
        { t: c.len, d: c.len - q("mu") - 1.4, cx: BR[0], cy: BR[1] + 60, w: 1150 },
      ]);
      const mapO = prog(t, 0.1, 1.6, ease.inOutSine) * (1 - 0.82 * prog(t, q("last"), 1.0, ease.inOutSine)) * (1 - prog(t, q("go") - 0.1, 0.4));
      m.root.style.opacity = String(mapO);
      m.showPin("Brno", 1, 1 + 0.3 * prog(t, q("converge") + 0.4, 0.4, ease.outBack) * (1 - prog(t, q("converge") + 0.8, 0.6)), (t / 1.6) % 1);
      st.routes.forEach((r, i) => m.showArc(r, prog(t, q("k1") + 0.1 + i * 0.09, 0.8, ease.inOutCubic), 0.85));
      st.dest.forEach((n, i) => m.showPin(n, prog(t, q("k1") + 0.4 + i * 0.09, 0.4) * 0.8));
      const s1 = prog(t, q("good"), 0.6), s2 = prog(t, q("fit"), 0.7);
      const sOut = prog(t, q("list"), 0.5, ease.inOutCubic);
      set(st.say1, s1 * (1 - sOut), 0, (1 - s1) * 12);
      set(st.say2, s2 * (1 - sOut), 0, (1 - s2) * 16);
      const [bx, by] = m.xy("Brno");
      const conv = prog(t, q("converge"), 1.0, ease.inOutCubic);
      const keys = ["k1", "k2", "k3", "k4", "k5", "k6", "k7"];
      st.tags.forEach((tg, i) => {
        const p = prog(t, q(keys[i]), 0.45, ease.outQuart);
        const R = lerp(420, 0, conv) * (0.92 + 0.08 * p);
        const ax = Math.cos(tg.ang) * R * 1.35, ay = Math.sin(tg.ang) * R * 0.75 + 40;
        const w = tg.g.offsetWidth || 260;
        set(tg.g, p * (1 - conv), bx + ax - w / 2, by + ay - 24, 1 - 0.5 * conv);
        tg.ln.setAttribute("x1", bx); tg.ln.setAttribute("y1", by); tg.ln.setAttribute("x2", bx + ax); tg.ln.setAttribute("y2", by + ay);
        tg.ln.setAttribute("opacity", String(p * (1 - conv)));
      });
      const mu = prog(t, q("mu"), 0.9, ease.outQuart);
      st.muSmall.style.clipPath = `inset(0 ${(100 - 100 * mu).toFixed(1)}% 0 0)`;
      set(st.muSmall, mu > 0 ? 1 - prog(t, q("last"), 0.6) : 0, bx - 190, by - 160);
      const yv = prog(t, q("y"), 0.8, ease.outQuart);
      const goT = q("go");
      const lockOut = prog(t, goT - 0.25, 0.35, ease.inCubic);
      set(st.year, yv * (1 - lockOut), 0, (1 - yv) * 30);
      const lk = prog(t, q("lockup"), 1.0, ease.outQuart);
      st.logo.style.clipPath = `inset(0 ${(100 - 100 * lk).toFixed(1)}% 0 0)`; set(st.logo, lk > 0 ? 1 - lockOut : 0);
      set(st.place, prog(t, q("lockup") + 0.5, 0.7) * (1 - lockOut));
      reveal(st.go, prog(t, goT + 0.02, 0.6, ease.outQuart));
      const bk = prog(t, c.len - 1.3, 1.1, ease.inOutSine);
      st.black.style.opacity = String(bk); st.black.style.visibility = bk > 0 ? "visible" : "hidden";
    },
  };
})();
