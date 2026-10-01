// scenes.js 의 효과음·음악 구간을 절대 시간(초)으로 풀어 JSON으로 출력한다 (synth.py 입력).
const V = require("../scenes.js");

const SC = Object.fromEntries(V.scenes.map((s) => [s.id, s]));
// 숫자 → 그대로, "id" → 장면 시작, "id.end" → 장면 끝, "id.beat" → 장면 시작 + beat
function T(ref) {
  if (typeof ref === "number") return ref;
  const [id, part] = ref.split(".");
  const sc = SC[id];
  if (!sc) throw new Error("unknown scene " + id);
  if (!part) return sc.start;
  if (part === "end") return sc.end;
  const b = (sc.beats || {})[part];
  if (b === undefined) throw new Error(`scene ${id}: unknown beat ${part}`);
  return sc.start + b;
}

const sfx = [];
for (const sc of V.scenes) {
  for (const f of sc.sfx || []) {
    const at = typeof f.at === "number" ? f.at : (sc.beats || {})[f.at];
    if (at === undefined) throw new Error(`scene ${sc.id}: unknown beat ${f.at}`);
    sfx.push({ t: +(sc.start + at).toFixed(3), name: f.name, dur: f.dur });
  }
  // 타자 효과 자막에는 글자 수만큼 타자음 (renderer.js 의 타자 속도와 같은 식)
  for (const s of sc.subs || []) {
    if (!s.type) continue;
    const t0 = sc.start + s.at[0] + 0.08;
    const t1 = sc.start + s.at[0] + Math.min(1.0, (s.at[1] - s.at[0]) * 0.5);
    const n = Array.from(s.text.replace(/\{[gry]:/g, "").replace(/[}\n ]/g, "")).length;
    sfx.push({ t: +t0.toFixed(3), name: "typing", dur: +(t1 - t0).toFixed(3), n });
  }
}
sfx.sort((a, b) => a.t - b.t);
const music = V.music.map((m) => ({ cue: m.cue, from: +T(m.from).toFixed(3), to: +T(m.to).toFixed(3), split: m.split ? +T(m.split).toFixed(3) : undefined }));
const dissolves = V.scenes.filter((s) => s.dissolveOut).map((s) => s.end);
process.stdout.write(JSON.stringify({ duration: V.duration, music, sfx, dissolves }, null, 1));
