"""Generate one narration file per scene with an identical voice configuration.

usage: GEMINI_API_KEY=... python tts_generate.py [s01 s05 ...] [--seed N] [--tag NAME]
Writes audio/raw/<scene>.wav (or <scene>.<tag>.wav for takes).
"""
import base64, json, os, re, sys, time
import requests, soundfile as sf, numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SEG = json.load(open(os.path.join(ROOT, "script", "segments.json")))
KEY = os.environ["GEMINI_API_KEY"]
URL = "https://generativelanguage.googleapis.com/v1beta/models/{}:generateContent"


def synth(text, out, voice=SEG["voice"], seed=None):
    gc = {
        "responseModalities": ["AUDIO"],
        "temperature": voice["temperature"],
        "seed": voice["seed"] if seed is None else seed,
        "speechConfig": {
            "languageCode": voice["languageCode"],
            "voiceConfig": {"prebuiltVoiceConfig": {"voiceName": voice["voice"]}},
        },
    }
    body = {"contents": [{"role": "user", "parts": [{"text": text, "speechMetadata": {"style": voice["style"]}}]}],
            "generationConfig": gc}
    err = ""
    for attempt in range(10):
        try:
            r = requests.post(URL.format(voice["model"]), headers={"x-goog-api-key": KEY}, json=body, timeout=900)
            d = r.json()
            if "candidates" in d and "content" in d["candidates"][0]:
                break
            err = json.dumps(d)[:400]
        except Exception as e:  # network hiccup
            err = str(e)
        m = re.search(r"retry in ([0-9.]+)s", err)
        wait = float(m.group(1)) + 2 if m else 6 * (attempt + 1)
        print(f"  retry {attempt} in {wait:.0f}s: {err[:100]}", file=sys.stderr)
        time.sleep(wait)
    else:
        raise RuntimeError(err)
    p = d["candidates"][0]["content"]["parts"][0]["inlineData"]
    raw = base64.b64decode(p["data"])
    if raw[:4] == b"RIFF":
        open(out, "wb").write(raw)
    else:
        rate = int(p["mimeType"].split("rate=")[1].split(";")[0])
        sf.write(out, np.frombuffer(raw, "<i2"), rate)
    return sf.info(out).duration


if __name__ == "__main__":
    args = sys.argv[1:]
    seed = None; tag = None
    if "--seed" in args:
        i = args.index("--seed"); seed = int(args[i + 1]); del args[i:i + 2]
    if "--tag" in args:
        i = args.index("--tag"); tag = args[i + 1]; del args[i:i + 2]
    want = set(args)
    os.makedirs(os.path.join(ROOT, "audio", "raw"), exist_ok=True)
    for sc in SEG["scenes"]:
        if want and sc["id"] not in want:
            continue
        name = sc["id"] + (f".{tag}" if tag else "")
        out = os.path.join(ROOT, "audio", "raw", name + ".wav")
        dur = synth(sc["tts_text"], out, seed=seed)
        print(f"{name}: {dur:6.2f}s  ({len(sc['lines'])} lines)", flush=True)
