"""Shared audio helpers: transcription with word timestamps, Korean text
normalisation, script<->audio character alignment and silence detection."""
import base64, difflib, json, os, re, sys, time
import numpy as np, requests, soundfile as sf

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SEG = json.load(open(os.path.join(ROOT, "script", "segments.json")))


# ---------------------------------------------------------------- transcription
def transcribe(wav, cache=None, model="gemini-3.5-transcribe"):
    if cache and os.path.exists(cache) and os.path.getmtime(cache) > os.path.getmtime(wav):
        return json.load(open(cache))
    key = os.environ["GEMINI_API_KEY"]
    body = {"contents": [{"parts": [{"inlineData": {"mimeType": "audio/wav",
                                                    "data": base64.b64encode(open(wav, "rb").read()).decode()}}]}],
            "generationConfig": {"audioTranscriptionConfig": {"wordTimestamp": True, "languageCodes": ["ko-KR"]}}}
    for attempt in range(8):
        d = requests.post(f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",
                          headers={"x-goog-api-key": key}, json=body, timeout=900).json()
        if "candidates" in d:
            break
        err = json.dumps(d)[:300]; m = re.search(r"retry in ([0-9.]+)s", err)
        print("  transcribe retry", err[:100], file=sys.stderr)
        time.sleep(float(m.group(1)) + 2 if m else 8)
    words, text = [], ""
    for p in d["candidates"][0]["content"]["parts"]:
        t = p.get("audioTranscription", {})
        text += t.get("text", "")
        for w in t.get("words", []):
            words.append({"w": w["word"], "s": float(w.get("startOffset", "0s")[:-1]),
                          "e": float(w.get("endOffset", "0s")[:-1])})
    out = {"text": text, "words": words}
    if cache:
        json.dump(out, open(cache, "w"), ensure_ascii=False, indent=0)
    return out


# ---------------------------------------------------------------- normalisation
DIG = "영일이삼사오육칠팔구"
def sino(n):
    n = int(n)
    if n == 0:
        return "영"
    out = ""
    for val, name in ((10000, "만"), (1000, "천"), (100, "백"), (10, "십")):
        q, n = divmod(n, val)
        if q:
            out += ("" if q == 1 else DIG[q]) + name
    return out + (DIG[n] if n else "")

def read_numbers(s):
    s = re.sub(r"(\d+)\.(\d+)", lambda m: sino(m.group(1)) + "점" + "".join(DIG[int(c)] for c in m.group(2)), s)
    return re.sub(r"\d+", lambda m: sino(m.group(0)), s)

def norm(s):
    s = read_numbers(s.lower())
    return re.sub(r"[^0-9a-z가-힣]", "", s)

def norm_map(s):
    """normalised string + index map back into s (per kept char)."""
    out, idx = [], []
    for i, ch in enumerate(s):
        n = norm(ch) if not ch.isdigit() else ch  # digits never occur in tts text
        for c in n:
            out.append(c); idx.append(i)
    return "".join(out), idx


# ---------------------------------------------------------------- alignment
def char_times(ref, words):
    """For every char of normalised ref -> (start, end) seconds."""
    hyp, hs, he = [], [], []
    for w in words:
        n = norm(w["w"])
        if not n:
            continue
        dur = max(w["e"] - w["s"], 0.02)
        for k, c in enumerate(n):
            hyp.append(c)
            hs.append(w["s"] + dur * k / len(n)); he.append(w["s"] + dur * (k + 1) / len(n))
    hyp = "".join(hyp)
    sm = difflib.SequenceMatcher(None, ref, hyp, autojunk=False)
    st = [None] * len(ref); en = [None] * len(ref)
    for a, b, size in sm.get_matching_blocks():
        for k in range(size):
            st[a + k] = hs[b + k]; en[a + k] = he[b + k]
    # interpolate gaps
    known = [i for i, v in enumerate(st) if v is not None]
    if not known:
        raise RuntimeError("alignment failed")
    for i in range(len(ref)):
        if st[i] is None:
            prev = max([k for k in known if k < i], default=None)
            nxt = min([k for k in known if k > i], default=None)
            if prev is None:
                st[i] = st[nxt]; en[i] = st[nxt]
            elif nxt is None:
                st[i] = en[prev]; en[i] = en[prev]
            else:
                f = (i - prev) / (nxt - prev)
                st[i] = en[prev] + (st[nxt] - en[prev]) * f
                en[i] = st[i]
    ratio = sum(s for _, _, s in sm.get_matching_blocks()) / max(len(ref), 1)
    return st, en, ratio, hyp


# ---------------------------------------------------------------- silence
def load(path):
    x, sr = sf.read(path, dtype="float64")
    if x.ndim > 1:
        x = x.mean(1)
    return x, sr

def frames_db(x, sr, hop=0.005):
    n = int(sr * hop); f = len(x) // n
    rms = np.sqrt(np.mean(x[: f * n].reshape(f, n) ** 2, axis=1) + 1e-12)
    return 20 * np.log10(rms + 1e-9), hop

def silences(x, sr, min_gap=0.09, rel_db=-34, abs_db=-50):
    db, hop = frames_db(x, sr)
    ref = np.percentile(db[db > -70], 90) if np.any(db > -70) else -20
    thr = max(abs_db, ref + rel_db)
    sp = db > thr
    # close tiny speech blips (<25ms) inside silence
    gaps, i, F = [], 0, len(sp)
    while i < F:
        if not sp[i]:
            j = i
            while j < F and not sp[j]:
                j += 1
            if (j - i) * hop >= min_gap:
                gaps.append([i * hop, j * hop])
            i = j
        else:
            i += 1
    merged = []
    for g in gaps:
        if merged and g[0] - merged[-1][1] < 0.025:
            merged[-1][1] = g[1]
        else:
            merged.append(g)
    return merged, thr


def syllables(text):
    hangul = len(re.findall(r"[가-힣]", text))
    latin = re.findall(r"[A-Za-z]+", text)
    return hangul + sum(max(1, len(re.findall(r"[aeiouy]+", w.lower()))) for w in latin)
