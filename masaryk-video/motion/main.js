// Orchestrates scenes on the global timeline, transitions and chrome.
(function () {
  const { el, box, set, clamp, ease, prog } = M;
  const stage = document.getElementById("stage");
  const REG = window.SCENES;
  const byId = {};
  TL.scenes.forEach((s) => (byId[s.id] = s));

  const runs = [];
  TL.scenes.forEach((sc, i) => {
    const impl = REG[sc.id];
    if (impl.mergedInto) return; // rendered by a previous scene (continuity)
    const root = el("div", { cls: "scene " + sc.theme }, stage);
    const next = impl.mergeNext ? TL.scenes[i + 1] : null;
    const ctx = {
      sc, L: sc.lead, len: (next ? next.end : sc.end) - sc.start,
      q: (id) => { const v = sc.cues[id]; if (v == null) throw new Error(sc.id + " missing cue " + id); return v; },
      // cues of the merged next scene, in this scene's local time
      q2: (id) => { const v = next.cues[id]; if (v == null) throw new Error(next.id + " missing cue " + id); return next.start - sc.start + v; },
      next, nextStart: next ? next.start - sc.start : null,
      line: (k) => sc.lines[k],
    };
    const st = impl.build(root, ctx);
    runs.push({ sc, root, ctx, impl, st, start: sc.start, end: next ? next.end : sc.end, trans: next ? next.trans : sc.trans });
  });

  // chrome: chapter label
  const chrome = el("div", { attrs: { id: "chrome" }, style: { zIndex: "50" } }, stage);
  const chap = el("div", { cls: "chap mono" }, chrome);
  const chapN = el("span", { cls: "n" }, chap);
  el("span", { cls: "bar" }, chap);
  const chapT = el("span", {}, chap);
  const wipe = el("div", { attrs: { id: "wipe" }, style: { zIndex: "60" } }, stage);
  const CHAPTER_SCENES = new Set(["s02", "s03", "s04", "s05", "s06", "s07", "s08", "s10"]);

  function seek(T) {
    // which runs are visible and how
    const vis = runs.map(() => ({ on: false, x: 0, o: 1 }));
    runs.forEach((r, i) => {
      if (T >= r.start && T < r.end) vis[i].on = true;
    });
    let wipeX = null;
    for (let i = 0; i < runs.length - 1; i++) {
      const B = runs[i].end, type = runs[i].trans;
      if (type === "push") {
        const d = 0.8, p = ease.inOutCubic(clamp((T - (B - d / 2)) / d));
        if (p > 0 && p < 1) { vis[i].on = vis[i + 1].on = true; vis[i].x = -1920 * p; vis[i + 1].x = 1920 * (1 - p); }
      } else if (type === "wipe") {
        const d = 0.55;
        if (T > B - d && T < B + d) {
          wipeX = T < B ? 1920 * (1 - ease.inOutCubic((T - (B - d)) / d)) : -1920 * ease.inOutCubic((T - B) / d);
        }
      } else if (type === "dissolve") {
        const d = 1.1, p = ease.inOutSine(clamp((T - (B - d / 2)) / d));
        if (p > 0 && p < 1) { vis[i].on = vis[i + 1].on = true; vis[i + 1].o = p; }
      }
    }
    runs.forEach((r, i) => {
      const v = vis[i];
      if (!v.on) { if (r.root.style.visibility !== "hidden") r.root.style.visibility = "hidden"; return; }
      r.root.style.visibility = "visible";
      r.root.style.transform = v.x ? `translateX(${v.x.toFixed(1)}px)` : "";
      r.root.style.opacity = String(v.o);
      r.root.style.zIndex = String(i);
      r.impl.update(T - r.start, r.st, r.ctx);
    });
    if (wipeX == null) wipe.style.visibility = "hidden";
    else { wipe.style.visibility = "visible"; wipe.style.transform = `translateX(${wipeX.toFixed(1)}px)`; }

    // chapter label of the scene under the playhead
    let cur = TL.scenes.find((s) => T >= s.start && T < s.end) || TL.scenes[TL.scenes.length - 1];
    if (CHAPTER_SCENES.has(cur.id)) {
      const k = TL.scenes.indexOf(cur) + 1;
      const n = String(k).padStart(2, "0");
      if (chapN.textContent !== n) { chapN.textContent = n; chapT.textContent = cur.title; }
      const tl = T - cur.start, len = cur.end - cur.start;
      const contIn = cur.id === "s06"; // continuity: no slide, just swap
      const o = (contIn ? 1 : prog(tl, 0.5, 0.6)) * (1 - prog(tl, len - 0.7, 0.4));
      set(chap, o * 0.85, (1 - (contIn ? 1 : prog(tl, 0.5, 0.6))) * -20, 0);
      chap.style.color = cur.theme === "dark" ? "#fff" : "var(--ink)";
    } else set(chap, 0);
  }

  window.seek = seek;
  const imgs = Array.from(document.images);
  Promise.all([document.fonts.ready, ...imgs.map((im) => (im.complete ? 1 : new Promise((r) => { im.onload = im.onerror = r; })))]).then(() => {
    seek(0); window.READY = true;
  });
  // preview mode: index.html?t=12.5 or ?play
  const qs = new URLSearchParams(location.search);
  if (qs.has("t")) setTimeout(() => seek(parseFloat(qs.get("t"))), 300);
})();
