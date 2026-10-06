"""Measure -> align -> pause-edit -> loudness-match every scene narration.

usage: GEMINI_API_KEY=... python process_audio.py [s01 ...]
in : audio/raw/<id>.wav
out: audio/scenes/<id>.wav  (pause-normalised, -18 LUFS)
     audio/scenes/<id>.json (line + cue times on the edited audio, QC metrics)

Speech itself is never time-stretched: only the silences between breathing
units are lengthened or shortened into the S/M/L ranges of segments.py.

Unscripted sounds (spoken pause tags such as "미디엄 포즈", hesitations such
as "음") are DETECTED automatically but only REMOVED after the user approved
them: approved spans live in audio/cuts_approved.json. Anything detected but
not approved is printed as "ASK USER" and kept in the audio (qc.cuts_pending).
"""
import json, os, sys
import numpy as np, soundfile as sf, pyloudnorm as pyln, parselmouth
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from audiolib import SEG, ROOT, transcribe, norm, char_times, load, silences, syllables

PAUSES = SEG["pauses"]
TARGET_LUFS = -18.0
INTERNAL_MAX = 0.48     # longest comma breath kept inside a line
XF = 0.012              # crossfade when cutting silence


FILLERS = {"음", "어", "아", "흠", "음음", "으음", "어어", "엄"}
APPROVALS = os.path.join(ROOT, "audio", "cuts_approved.json")


def approver(name):
    """returns f(s, e) -> True when the user approved cutting an overlapping span"""
    ok = json.load(open(APPROVALS)).get(name, []) if os.path.exists(APPROVALS) else []
    return lambda s, e: any(a["start"] < e and s < a["end"] for a in ok)


def mute(x, sr, s, e):
    n0, n1 = int(s * sr), int(e * sr); f = int(0.008 * sr)
    x[n0:n0 + f] *= np.linspace(1, 0, f)
    x[n1 - f:n1] *= np.linspace(0, 1, f)
    x[n0 + f:n1 - f] = 0


def remove_fillers(x, sr, words, ok, pending):
    """Unscripted hesitation sounds (e.g. '음') the TTS sometimes adds between
    sentences: muted only if approved, otherwise reported. Breaths are never touched."""
    from audiolib import frames_db
    db, hop = frames_db(x, sr)
    real = [w for w in words if norm(w["w"]) not in FILLERS]
    out = []
    for w in words:
        if norm(w["w"]) not in FILLERS:
            continue
        a, b = int((w["s"] - 0.25) / hop), int((w["e"] + 0.25) / hop)
        a, b = max(a, 0), min(b, len(db))
        if b <= a:
            continue
        k = a + int(np.argmax(db[a:b])); thr = db[k] - 18
        i, j = k, k
        while i > a and db[i - 1] > thr: i -= 1
        while j < b - 1 and db[j + 1] > thr: j += 1
        s, e = i * hop - 0.01, (j + 1) * hop + 0.01
        if any(r["s"] + 0.05 < e and r["e"] - 0.05 > s for r in real):
            continue  # would touch a scripted word: leave it
        if not ok(s, e):
            pending.append((round(s, 2), round(e, 2), "filler: " + w["w"]))
            continue
        mute(x, sr, s, e)
        out.append((round(s, 2), round(e, 2), w["w"]))
    return out


# pause-tag words the TTS occasionally speaks out loud ("미디엄 포즈", "롱 포즈")
TAGS = {"미디엄", "포즈", "퍼즈", "포우즈", "롱", "쇼트", "미디엄포즈", "롱포즈", "쇼트포즈",
        "pause", "medium", "long", "short", "mediumpause", "longpause", "shortpause"}


def mute_islands(x, sr, spans, real, ok, pending):
    """Mute every sound island (energy above -50 dB, dips <= 60 ms bridged)
    that overlaps one of the spans, without ever crossing a scripted word --
    only when approved; unapproved islands are reported in `pending`."""
    from audiolib import frames_db
    db, hop = frames_db(x, sr)
    on = db > -50
    T = len(x) / sr
    out = []
    for s, e, txt in spans:
        prev_e = max([r["e"] for r in real if r["e"] <= s + 0.05], default=0.0)
        next_s = min([r["s"] for r in real if r["s"] >= e - 0.05], default=T)
        lo, hi = prev_e + 0.08, next_s - 0.08
        L, H = int(lo / hop), int(hi / hop)
        hit = [k for k in range(max(int((s - 0.15) / hop), L), min(int((e + 0.15) / hop), H)) if on[k]]
        if not hit:
            continue
        i, j = hit[0], hit[-1]
        while i > L and on[max(L, i - 12):i].any(): i -= 1
        while j < H - 1 and on[j + 1:min(H, j + 13)].any(): j += 1
        t0, t1 = max(lo, i * hop - 0.01), min(hi, (j + 1) * hop + 0.01)
        if (out and t0 <= out[-1][1]) or (pending and t0 <= pending[-1][1]):
            continue  # adjacent tag words share one island
        if not ok(t0, t1):
            pending.append((round(t0, 2), round(t1, 2), "pause tag: " + txt))
            continue
        mute(x, sr, t0, t1)
        out.append((round(t0, 2), round(t1, 2), txt))
    return out


def untranscribed(x, sr, words, est):
    """Voiced sound islands sitting between two lines that no transcribed word
    explains (a spoken pause tag the recogniser skipped)."""
    from audiolib import frames_db
    db, hop = frames_db(x, sr)
    on = db > -50
    pitch = parselmouth.Sound(x, sampling_frequency=sr).to_pitch(time_step=0.01, pitch_floor=60, pitch_ceiling=400)
    pv, px = pitch.selected_array["frequency"], pitch.xs()
    spans, i, F = [], 0, len(on)
    while i < F:
        if not on[i]:
            i += 1; continue
        j = i
        while j < F and on[j:j + 12].any(): j += 1
        a, b = i * hop, j * hop
        i = j
        if b - a < 0.15:
            continue
        if sum(max(0, min(b, w["e"] + 0.1) - max(a, w["s"] - 0.1)) for w in words) >= 0.3 * (b - a):
            continue
        m = (px >= a) & (px <= b)
        if not m.any() or (pv[m] > 0).mean() <= 0.3:
            continue  # unvoiced = a breath, keep it
        if any(est[k][1] + 0.1 < a and b < est[k + 1][0] - 0.1 for k in range(len(est) - 1)):
            spans.append((a, b, "(untranscribed)"))
    return spans


def locate(scene):
    """normalised reference + char ranges for lines and cues"""
    ref, lines = "", []
    for ln in scene["lines"]:
        a = len(ref); ref += norm(ln["tts"]); lines.append((a, len(ref)))
    cues = []
    for (a, b), ln in zip(lines, scene["lines"]):
        for cid, (anchor, visual) in ln["cues"].items():
            text, _, edge = anchor.partition("|")
            pos = ln["tts"].index(text)
            s = a + len(norm(ln["tts"][:pos])); e = s + len(norm(text))
            cues.append({"id": cid, "line": ln["id"], "s": s, "e": e, "edge": edge or "start",
                         "anchor": text, "visual": visual, "line_start": pos == 0})
    return ref, lines, cues


def process(scene, take=None):
    sid = scene["id"]
    name = sid + (f".{take}" if take else "")
    raw = os.path.join(ROOT, "audio", "raw", name + ".wav")
    x, sr = load(raw)
    tr = transcribe(raw, cache=os.path.join(ROOT, "audio", "raw", name + ".words.json"))
    ref, lines, cues = locate(scene)
    ok, pending = approver(name), []
    removed = remove_fillers(x, sr, tr["words"], ok, pending)
    words = [w for w in tr["words"] if norm(w["w"]) not in FILLERS | TAGS]
    st, en, ratio, hyp = char_times(ref, words)
    # ---- speech-bounded estimates per line
    est = [(st[a], en[b - 1]) for a, b in lines]
    # ---- spoken pause tags: transcribed ones + voiced islands nobody transcribed
    tag_spans = [(w["s"], w["e"], w["w"]) for w in tr["words"] if norm(w["w"]) in TAGS]
    tags = mute_islands(x, sr, sorted(tag_spans + untranscribed(x, sr, words, est)), words, ok, pending)
    for s0, s1, what in pending:
        ctx = " ".join(w["w"] for w in words if s0 - 2.0 < w["e"] and w["s"] < s1 + 2.0)
        print(f"  ASK USER  {name} {s0:.2f}-{s1:.2f}s  {what}  near: {ctx}", flush=True)
    gaps, thr = silences(x, sr)

    # ---- choose the boundary gap for every line break
    edits = []   # (gap_start, gap_end, new_len, kind)
    used = set()
    boundary = []
    for i in range(len(lines) - 1):
        e_i, s_n = est[i][1], est[i + 1][0]
        lo, hi = min(e_i, s_n) - 0.35, max(e_i, s_n) + 0.35
        cand = [(g, k) for k, g in enumerate(gaps) if g[1] > lo and g[0] < hi and k not in used]
        if cand:
            mid = (e_i + s_n) / 2
            g, k = max(cand, key=lambda gk: (gk[0][1] - gk[0][0]) - 0.5 * abs((gk[0][0] + gk[0][1]) / 2 - mid))
            used.add(k)
            boundary.append(list(g))
        else:
            t = (e_i + s_n) / 2
            boundary.append([t, t])
    for i, g in enumerate(boundary):
        cls = scene["lines"][i]["pause"]
        mn, tg, mx = PAUSES[cls]
        cur = g[1] - g[0]
        new = min(max(cur, mn), mx)
        edits.append((g[0], g[1], new, "B" + cls))
    # ---- long breaths inside a line
    bset = {tuple(b) for b in boundary}
    for k, g in enumerate(gaps):
        if k in used or tuple(g) in bset:
            continue
        if g[0] < 0.01 or g[1] > len(x) / sr - 0.01:
            continue
        if g[1] - g[0] > INTERNAL_MAX:
            edits.append((g[0], g[1], INTERNAL_MAX, "I"))
    # ---- head / tail trim
    head = gaps[0] if gaps and gaps[0][0] < 0.01 else None
    tail = gaps[-1] if gaps and gaps[-1][1] > len(x) / sr - 0.01 else None
    if head:
        edits.append((0.0, head[1], 0.04, "head"))
    if tail:
        edits.append((tail[0], len(x) / sr, 0.08, "tail"))
    edits.sort()

    # ---- apply edits, keep piecewise-linear time map
    out, tmap, cursor, t_out = [], [(0.0, 0.0)], 0.0, 0.0
    xf = int(XF * sr)
    for g0, g1, new, kind in edits:
        a, b = int(cursor * sr), int(g0 * sr)
        out.append(x[a:b]); t_out += (b - a) / sr
        tmap.append((g0, t_out))
        cur = g1 - g0
        if new >= cur:
            seg = x[int(g0 * sr):int(g1 * sr)]
            pad = np.zeros(int((new - cur) * sr))
            half = len(seg) // 2
            out.append(np.concatenate([seg[:half], pad, seg[half:]]))
        else:
            keep = int(new * sr)
            left = x[int(g0 * sr): int(g0 * sr) + keep // 2 + xf]
            right = x[int(g1 * sr) - (keep - keep // 2) - xf: int(g1 * sr)]
            if len(left) > xf and len(right) > xf:
                fade = np.linspace(1, 0, xf)
                mid = left[-xf:] * fade + right[:xf] * (1 - fade)
                out.append(np.concatenate([left[:-xf], mid, right[xf:]]))
            else:
                out.append(np.zeros(keep))
        t_out = sum(len(o) for o in out) / sr
        tmap.append((g1, t_out))
        cursor = g1
    out.append(x[int(cursor * sr):]); t_out = sum(len(o) for o in out) / sr
    tmap.append((len(x) / sr, t_out))
    y = np.concatenate(out)
    T0 = np.array([p[0] for p in tmap]); T1 = np.array([p[1] for p in tmap])
    remap = lambda t: float(np.interp(t, T0, T1))

    # ---- loudness
    meter = pyln.Meter(sr)
    lufs_in = meter.integrated_loudness(y)
    y = y * 10 ** ((TARGET_LUFS - lufs_in) / 20)
    peak = np.max(np.abs(y))
    if peak > 0.95:
        y *= 0.95 / peak

    # ---- final line + cue times (onsets from the edited signal)
    gaps2, _ = silences(y, sr)
    def snap_onset(t, tol):
        best = None
        for g in gaps2:
            if abs(g[1] - t) <= tol and (best is None or abs(g[1] - t) < abs(best - t)):
                best = g[1]
        return best if best is not None else t
    def snap_offset(t, tol):
        best = None
        for g in gaps2:
            if abs(g[0] - t) <= tol and (best is None or abs(g[0] - t) < abs(best - t)):
                best = g[0]
        return best if best is not None else t
    line_out = []
    for i, ((a, b), ln) in enumerate(zip(lines, scene["lines"])):
        s = 0.04 if i == 0 else remap(boundary[i - 1][1])
        e = remap(boundary[i][0]) if i < len(boundary) else len(y) / sr - 0.08
        line_out.append({"id": ln["id"], "tts": ln["tts"], "pause": ln["pause"],
                         "start": round(s, 3), "end": round(e, 3)})
    line_by_id = {l["id"]: l for l in line_out}
    cue_out = []
    for c in cues:
        ln = line_by_id[c["line"]]
        if c["edge"] == "end":
            t = snap_offset(remap(en[c["e"] - 1]), 0.15)
        elif c["line_start"]:
            t = ln["start"]
        else:
            t = snap_onset(remap(st[c["s"]]), 0.12)
        t = min(max(t, ln["start"]), ln["end"] + 0.05)
        cue_out.append({"id": c["id"], "t": round(t, 3), "line": c["line"], "anchor": c["anchor"],
                        "edge": c["edge"], "visual": c["visual"]})

    # ---- QC metrics
    pause_total = sum(g[1] - g[0] for g in gaps2)
    speech = len(y) / sr - pause_total
    syl = sum(syllables(l["tts"]) for l in scene["lines"])
    snd = parselmouth.Sound(y, sampling_frequency=sr)
    f0 = snd.to_pitch(pitch_floor=60, pitch_ceiling=350).selected_array["frequency"]; f0 = f0[f0 > 0]
    qc = {"raw_dur": round(len(x) / sr, 2), "dur": round(len(y) / sr, 2), "align_ratio": round(ratio, 3),
          "syll": syl, "speech_s": round(speech, 2), "artic_rate": round(syl / speech, 2),
          "f0_median": round(float(np.median(f0)), 1), "f0_sd_st": round(float(np.std(12 * np.log2(f0 / np.median(f0)))), 2),
          "lufs_raw": round(lufs_in, 1), "transcript": tr["text"], "fillers_removed": removed, "tags_removed": tags, "cuts_pending": pending,
          "boundaries": [{"after": scene["lines"][i]["id"], "cls": scene["lines"][i]["pause"],
                          "raw": round(g[1] - g[0], 2), "new": round(remap(g[1]) - remap(g[0]), 2)}
                         for i, g in enumerate(boundary)]}
    # per-line articulation rate (to catch a single sentence that rushes)
    for l in line_out:
        inner = [g for g in gaps2 if g[0] >= l["start"] and g[1] <= l["end"]]
        sp = (l["end"] - l["start"]) - sum(g[1] - g[0] for g in inner)
        l["rate"] = round(syllables(l["tts"]) / max(sp, 0.05), 2)
    outdir = os.path.join(ROOT, "audio", "scenes" if not take else "takes")
    os.makedirs(outdir, exist_ok=True)
    sf.write(os.path.join(outdir, name + ".wav"), y, sr, subtype="PCM_16")
    meta = {"id": sid, "dur": round(len(y) / sr, 3), "sr": sr, "lines": line_out, "cues": cue_out, "qc": qc}
    meta["take"] = take
    json.dump(meta, open(os.path.join(outdir, name + ".json"), "w"), ensure_ascii=False, indent=1)
    return meta


if __name__ == "__main__":
    jobs = [a.split(":") for a in sys.argv[1:]] or [[s["id"]] for s in SEG["scenes"]]
    byid = {s["id"]: s for s in SEG["scenes"]}
    for job in jobs:
        sc, take = byid[job[0]], (job[1] if len(job) > 1 else None)
        m = process(sc, take); q = m["qc"]
        print(f"{sc['id']}{':' + take if take else ''}: raw {q['raw_dur']:6.2f}s -> {q['dur']:6.2f}s | align {q['align_ratio']:.2f} | "
              f"artic {q['artic_rate']:.2f} syl/s | F0 {q['f0_median']}Hz sd {q['f0_sd_st']} | LUFS {q['lufs_raw']}", flush=True)
