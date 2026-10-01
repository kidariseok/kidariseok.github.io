// scenes.js 의 효과음·음악 구간을 절대 시간(초)으로 풀어 JSON으로 출력한다 (synth.py 입력).
const V = require("../scenes.js");

const sfx = [];
for (const sc of V.scenes) {
  for (const f of sc.sfx || []) {
    const at = typeof f.at === "number" ? f.at : (sc.beats || {})[f.at];
    if (at === undefined) throw new Error(`scene ${sc.id}: unknown beat ${f.at}`);
    sfx.push({ t: +(sc.start + at).toFixed(3), name: f.name, dur: f.dur });
  }
  // 타자 효과 자막에는 글자 수만큼 타자음
  for (const s of sc.subs || []) {
    if (!s.type) continue;
    const t0 = sc.start + s.at[0] + 0.1;
    const t1 = sc.start + s.at[0] + Math.min(1.3, (s.at[1] - s.at[0]) * 0.55);
    const n = Array.from(s.text.replace(/\{[gry]:/g, "").replace(/[}\n ]/g, "")).length;
    sfx.push({ t: +t0.toFixed(3), name: "typing", dur: +(t1 - t0).toFixed(3), n });
  }
}
sfx.sort((a, b) => a.t - b.t);
const dissolves = V.scenes.filter((s) => s.dissolveOut).map((s) => s.end);
process.stdout.write(JSON.stringify({ duration: V.duration, music: V.music, sfx, dissolves }, null, 1));
