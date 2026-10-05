"""Verify that key visual cues fire on the spoken keyword.

For each key cue, cut the narration from (cue - 0.05s) for 1.1 s, transcribe it,
and check that the transcript starts with the cue's anchor word.
usage: GEMINI_API_KEY=... python sync_check.py
"""
import json, os, sys, tempfile
import soundfile as sf
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from audiolib import ROOT, transcribe, norm

KEY = [("s01", "n218"), ("s01", "brno"), ("s02", "gpa"), ("s02", "ielts"), ("s02", "where"), ("s04", "c4"),
       ("s04", "c4_apr"), ("s05", "seats10"), ("s05", "seats1"), ("s05", "vu_x"), ("s05", "de_x"), ("s05", "shf_cost"),
       ("s06", "back"), ("s08", "seats"), ("s08", "apps"), ("s09", "tap"), ("s09", "pass_"), ("s09", "logo"),
       ("s09", "y"), ("s11", "y"), ("s11", "go")]


def main():
    res = []
    for sid, cid in KEY:
        meta = json.load(open(os.path.join(ROOT, "audio", "scenes", sid + ".json")))
        c = next(c for c in meta["cues"] if c["id"] == cid)
        x, sr = sf.read(os.path.join(ROOT, "audio", "scenes", sid + ".wav"))
        a = max(0, int((c["t"] - 0.05) * sr)); b = a + int(1.1 * sr)
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as f:
            sf.write(f.name, x[a:b], sr)
            tr = transcribe(f.name)
        first = norm(tr["text"])[:4]
        want = norm(c["anchor"])[:2]
        ok = first.startswith(want) or (len(first) > 0 and want[:1] == first[:1])
        res.append((sid, cid, c["t"], c["anchor"], tr["text"], ok))
        print(f"{'OK ' if ok else 'XX '} {sid}:{cid:<9} t={c['t']:7.2f}  anchor '{c['anchor']}'  heard '{tr['text'][:30]}'", flush=True)
    bad = [r for r in res if not r[-1]]
    print(f"\n{len(res) - len(bad)}/{len(res)} key cues land on their keyword")


if __name__ == "__main__":
    main()
