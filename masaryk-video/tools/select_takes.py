"""Choose one take per scene so the whole film sounds like one continuous speaker.

Score per take (lower is better):
  pitch     |median F0 - film reference| in semitones
  pace      |articulation rate - film reference| in %
  rush      any sentence >25% faster than the film pace
  key lines emphasis lines that must NOT be fast (탈락 / 합격 / 그리고 결국 ...)
  fillers   unscripted hesitations that had to be muted
  align     transcript mismatch (possible mispronunciation)
  review    listening-review scores of the take (audio_review.py), when available
plus a smoothness term between adjacent scenes (pitch jump at the cut).
Then copies the chosen take to audio/scenes/<id>.wav|json.
"""
import glob, json, math, os, shutil, statistics as stt

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KEY_LINES = {  # (scene, line index 1-based)
    ("s02", 12), ("s05", 11), ("s05", 13), ("s05", 21), ("s05", 24), ("s06", 1), ("s06", 12),
    ("s09", 3), ("s09", 4), ("s09", 5), ("s11", 15), ("s11", 16),
}


def load():
    takes = {}
    for f in sorted(glob.glob(os.path.join(ROOT, "audio", "takes", "s??.*.json"))):
        m = json.load(open(f))
        takes.setdefault(m["id"], []).append(m)
    return takes


def main():
    takes = load()
    allm = [m for v in takes.values() for m in v]
    rp = os.path.join(ROOT, "audio", "review.json")
    reviews = json.load(open(rp)) if os.path.exists(rp) else {}
    F = stt.median(m["qc"]["f0_median"] for m in allm)
    R = stt.median(m["qc"]["artic_rate"] for m in allm)

    def st(f):
        return 12 * math.log2(f / F)

    def score(m):
        q = m["qc"]
        s = abs(st(q["f0_median"])) / 0.8 + abs(q["artic_rate"] / R - 1) * 100 / 4
        for i, l in enumerate(m["lines"], 1):
            if len(l["tts"]) >= 8:
                s += max(0, l["rate"] / R - 1.25) * 10
            if (m["id"], i) in KEY_LINES:
                s += max(0, l["rate"] / R - 1.05) * 15
        s += 0.3 * len(q["fillers_removed"]) + (1.0 if q["align_ratio"] < 0.97 else 0)
        r = reviews.get(f"{m['id']}:{m['take']}")  # listening review of this exact take, if any
        if r:
            s += 0.6 * (30 - r["native_korean"] - r["naturalness"] - r["pace_consistency"])
        return s

    ids = sorted(takes)
    # dynamic programming over scenes with an adjacent pitch-jump penalty
    best = {}
    for k, sid in enumerate(ids):
        nb = {}
        for m in takes[sid]:
            own = score(m)
            if k == 0:
                nb[m["take"]] = (own, [m])
            else:
                cand = []
                for tk, (cost, path) in best.items():
                    jump = abs(st(m["qc"]["f0_median"]) - st(path[-1]["qc"]["f0_median"]))
                    cand.append((cost + own + 0.7 * max(0, jump - 0.8), path + [m]))
                nb[m["take"]] = min(cand, key=lambda c: c[0])
        best = nb
    cost, path = min(best.values(), key=lambda c: c[0])
    print(f"film reference: F0 {F:.1f} Hz, articulation {R:.2f} syl/s")
    sel = {}
    for m in path:
        q = m["qc"]
        print(f"  {m['id']} <- {m['take']:>4}  score {score(m):5.2f}  F0 {q['f0_median']:6.1f} ({st(q['f0_median']):+.2f} st)"
              f"  rate {q['artic_rate']:.2f} ({(q['artic_rate']/R-1)*100:+.1f}%)  dur {m['dur']:.1f}s")
        sel[m["id"]] = m["take"]
        for ext in ("wav", "json"):
            shutil.copy(os.path.join(ROOT, "audio", "takes", f"{m['id']}.{m['take']}.{ext}"),
                        os.path.join(ROOT, "audio", "scenes", f"{m['id']}.{ext}"))
    json.dump({"reference": {"f0": F, "rate": R}, "selected": sel}, open(os.path.join(ROOT, "audio", "selection.json"), "w"), indent=1)


if __name__ == "__main__":
    main()
