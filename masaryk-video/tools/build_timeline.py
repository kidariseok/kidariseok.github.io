"""Lay the measured scene narrations on one timeline.

The video length is derived from the real audio: every scene lasts
lead (visual breath before speech) + narration + tail (breath after).
Outputs
  motion/timeline.js     window.TL used by the motion graphics
  audio/narration.wav    48 kHz narration master placed on the timeline
  script/sync_sheet.md   SCENE / START / END / NARRATION / KEYWORD / VISUAL / TRANSITION
"""
import json, os
import numpy as np, soundfile as sf
from scipy.signal import resample_poly

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SEG = json.load(open(os.path.join(ROOT, "script", "segments.json")))
FPS = 30
SR = 48000
# transition into the NEXT scene (keyed by the outgoing scene)
TRANS = {"s01": "wipe", "s02": "push", "s03": "push", "s04": "push", "s05": "cont",
         "s06": "push", "s07": "push", "s08": "dissolve", "s09": "wipe", "s10": "dissolve"}


def fmt(t):
    m, s = divmod(t, 60)
    return f"{int(m)}:{s:05.2f}"


def main():
    t = 0.0
    scenes, mix_parts = [], []
    for sc in SEG["scenes"]:
        meta = json.load(open(os.path.join(ROOT, "audio", "scenes", sc["id"] + ".json")))
        start = round(t, 3)
        nar0 = start + sc["lead"]
        end = round(nar0 + meta["dur"] + sc["tail"], 3)
        cues = {c["id"]: round(sc["lead"] + c["t"], 3) for c in meta["cues"]}
        lines = [{"id": l["id"], "s": round(sc["lead"] + l["start"], 3), "e": round(sc["lead"] + l["end"], 3)}
                 for l in meta["lines"]]
        scenes.append({"id": sc["id"], "title": sc["title"], "theme": sc["theme"], "start": start, "end": end,
                       "lead": sc["lead"], "narr": round(meta["dur"], 3), "cues": cues, "lines": lines,
                       "trans": TRANS.get(sc["id"])})
        wav = os.path.join(ROOT, "audio", "scenes", sc["id"] + ".wav")
        mix_parts.append((nar0, wav if os.path.exists(wav) else wav[:-4] + ".flac"))
        t = end
    total = round(t, 3)
    tl = {"fps": FPS, "duration": total, "scenes": scenes}
    open(os.path.join(ROOT, "motion", "timeline.js"), "w").write("window.TL=" + json.dumps(tl, ensure_ascii=False) + ";\n")

    # narration master
    buf = np.zeros(int((total + 0.5) * SR))
    for t0, path in mix_parts:
        x, sr = sf.read(path, dtype="float64")
        y = resample_poly(x, SR, sr) if sr != SR else x
        a = int(round(t0 * SR)); buf[a:a + len(y)] += y
    sf.write(os.path.join(ROOT, "audio", "narration.wav"), buf, SR, subtype="PCM_16")

    # sync sheet
    out = ["# Sync sheet", "", f"Total runtime **{fmt(total)}** ({total:.2f}s) — derived from the measured narration.", "",
           "| SCENE | START | END | NARRATION START | NARRATION END | TRANSITION OUT |", "|---|---|---|---|---|---|"]
    for s in scenes:
        out.append(f"| {s['id'].upper()} {s['title']} | {fmt(s['start'])} | {fmt(s['end'])} | "
                   f"{fmt(s['start'] + s['lead'])} | {fmt(s['start'] + s['lead'] + s['narr'])} | {s['trans'] or 'end'} |")
    for sc, s in zip(SEG["scenes"], scenes):
        meta = json.load(open(os.path.join(ROOT, "audio", "scenes", sc["id"] + ".json")))
        out += ["", f"## {s['id'].upper()} · {s['title']}  ({fmt(s['start'])} – {fmt(s['end'])})", "",
                "| TIME | KEYWORD (spoken) | VISUAL EVENT |", "|---|---|---|"]
        for c in sorted(meta["cues"], key=lambda c: c["t"]):
            out.append(f"| {fmt(s['start'] + s['lead'] + c['t'])} | {c['anchor']}{' (end)' if c['edge']=='end' else ''} | {c['visual']} |")
    open(os.path.join(ROOT, "script", "sync_sheet.md"), "w").write("\n".join(out) + "\n")
    print("total", fmt(total), total)
    for s in scenes:
        print(f"  {s['id']} {fmt(s['start'])} -> {fmt(s['end'])}  narr {s['narr']:.2f}s  {s['trans']}")


if __name__ == "__main__":
    main()
