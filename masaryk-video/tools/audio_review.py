"""Listening QC of the selected narration with a Gemini audio model.

usage: GEMINI_API_KEY=... python audio_review.py [s01 ...]   -> audio/review.json
Checks per scene: Korean nativeness, mispronunciations (with timestamps),
proper-noun consistency, rushed or dragging sentences, unnatural pauses.
"""
import base64, json, os, re, sys, time, requests

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SEG = json.load(open(os.path.join(ROOT, "script", "segments.json")))
KEY = os.environ["GEMINI_API_KEY"]
MODEL = "gemini-3.1-pro-preview"

PROMPT = """You are a strict Korean dialogue editor reviewing TTS narration for a polished documentary-style video.
Speaker should be: a native Korean man (late 20s–early 30s), calm, warm, natural, conversational, consistent pace.
The intended script (Hangul spellings are pronunciation hints; 마사릭 유니버시티 = Masaryk University) is:
---
{script}
---
Listen to the audio and reply ONLY with JSON:
{{"native_korean": 1-10, "naturalness": 1-10, "pace_consistency": 1-10,
  "issues": [{{"t": "mm:ss", "type": "mispronunciation|wrong_word|missing_word|rushed|dragging|unnatural_pause|robotic|filler|noise", "text": "the words involved", "detail": "short explanation"}}],
  "proper_nouns_ok": true/false, "summary": "one sentence in Korean"}}
Only list real, audible problems. Do not list stylistic preferences."""


def review(sid):
    sid, _, take = sid.partition(":")
    sc = next(s for s in SEG["scenes"] if s["id"] == sid)
    wav = os.path.join(ROOT, "audio", "takes", f"{sid}.{take}.wav") if take else os.path.join(ROOT, "audio", "scenes", sid + ".wav")
    body = {"contents": [{"role": "user", "parts": [
        {"inlineData": {"mimeType": "audio/wav", "data": base64.b64encode(open(wav, "rb").read()).decode()}},
        {"text": PROMPT.format(script="\n".join(l["tts"] for l in sc["lines"]))}]}],
        "generationConfig": {"temperature": 0.2, "responseMimeType": "application/json"}}
    for a in range(8):
        try:
            d = requests.post(f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent",
                              headers={"x-goog-api-key": KEY}, json=body, timeout=900).json()
        except Exception as e:  # transient network error
            d = {"error": str(e)}
        if "candidates" in d:
            txt = "".join(p.get("text", "") for p in d["candidates"][0]["content"]["parts"] if not p.get("thought"))
            return json.loads(txt)
        err = json.dumps(d)[:300]; m = re.search(r"retry in ([0-9.]+)s", err)
        print("  retry", err[:120], file=sys.stderr); time.sleep(float(m.group(1)) + 2 if m else 10)
    raise RuntimeError(err)


if __name__ == "__main__":
    ids = sys.argv[1:] or [s["id"] for s in SEG["scenes"]]
    path = os.path.join(ROOT, "audio", "review.json")
    out = json.load(open(path)) if os.path.exists(path) else {}
    for sid in ids:
        r = review(sid)
        out[sid] = r
        json.dump(out, open(path, "w"), ensure_ascii=False, indent=1)
        print(sid, r.get("native_korean"), r.get("naturalness"), r.get("pace_consistency"), r.get("summary"))
        for i in r.get("issues", []):
            print("    ", i)
