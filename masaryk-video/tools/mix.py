"""Final audio: narration master + ducked music bed -> audio/mix.wav (48 kHz stereo).

Music map (Lyria cues, same instrumentation / key / tempo):
  m1  s01-s03  curiosity            m2a s04    criteria
  m2b s05      the hunt             m3  s06-s08 resolution -> tension (out before "그리고...")
  (silence through the result pause)
  m4  from "합격." to the end, its closing chords aligned under "LET'S GO MASARYK!".
"""
import json, os
import numpy as np, soundfile as sf, pyloudnorm as pyln, subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SR = 48000
TL = json.loads(open(os.path.join(ROOT, "motion", "timeline.js")).read().removeprefix("window.TL=").rstrip(";\n"))
S = {s["id"]: s for s in TL["scenes"]}
T = TL["duration"]
N = int(round(T * SR))


def load_music(name):
    p = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", os.path.join(ROOT, "audio", "music", name + ".mp3"),
                        "-f", "f32le", "-ac", "2", "-ar", str(SR), "-"], capture_output=True, check=True)
    x = np.frombuffer(p.stdout, dtype="<f4").reshape(-1, 2).astype(np.float64)
    meter = pyln.Meter(SR)
    return x * 10 ** ((-23 - meter.integrated_loudness(x)) / 20)   # level-match cues


def fade(n, a, b):
    """gain ramp of n samples from a to b (equal-power-ish)"""
    p = np.linspace(0, 1, max(n, 1))
    return a + (b - a) * np.sin(p * np.pi / 2) ** 2


def place(bed, x, t0, t1, src_off=0.0, fin=1.5, fout=1.5):
    a, b = int(t0 * SR), min(int(t1 * SR), N)
    o = int(src_off * SR)
    seg = x[o:o + (b - a)]
    if len(seg) < b - a:  # loop with a 2 s crossfade if the cue is short
        xf = 2 * SR
        while len(seg) < b - a:
            nxt = x[: (b - a) - len(seg) + xf]
            g = np.linspace(0, 1, xf)[:, None]
            seg = np.concatenate([seg[:-xf], seg[-xf:] * (1 - g) + nxt[:xf] * g, nxt[xf:]])
        seg = seg[: b - a]
    g = np.ones(len(seg))
    ni, no = int(fin * SR), int(fout * SR)
    g[:ni] = fade(ni, 0, 1)[: len(g[:ni])]
    if no:
        g[-no:] = fade(no, 1, 0)
    bed[a:a + len(seg)] += seg * g[:, None]


def main():
    narr, sr = sf.read(os.path.join(ROOT, "audio", "narration.wav"), dtype="float64")
    assert sr == SR
    narr = np.pad(narr, (0, max(0, N - len(narr))))[:N]
    bed = np.zeros((N, 2))
    m = {k: load_music(k) for k in ("m1", "m2a", "m2b", "m3", "m4")}
    xf = 2.0
    place(bed, m["m1"], 0.0, S["s04"]["start"] + xf / 2, fin=2.5, fout=xf)
    place(bed, m["m2a"], S["s04"]["start"] - xf / 2, S["s05"]["start"] + xf / 2, fin=xf, fout=xf)
    place(bed, m["m2b"], S["s05"]["start"] - xf / 2, S["s06"]["start"] + xf / 2, fin=xf, fout=xf)
    s9 = S["s09"]
    tap = s9["start"] + s9["cues"]["tap"]
    place(bed, m["m3"], S["s06"]["start"] - xf / 2, tap - 0.2, fin=xf, fout=4.0)
    t_pass = s9["start"] + s9["cues"]["pass_"] + 0.35
    # m4's closing chords start ~127.5 s into the cue: land them under the final title
    t_go = S["s11"]["start"] + S["s11"]["cues"]["go"]
    off = 127.5 - (t_go - 0.25 - t_pass)
    if off >= 0:
        place(bed, m["m4"], t_pass, T, src_off=off, fin=3.0, fout=2.0)
    else:
        place(bed, m["m4"], t_pass - off, T, fin=3.0, fout=2.0)

    # ducking: speech envelope (attack 60 ms, release 450 ms)
    env = np.abs(narr)
    hop = 480
    fr = env[: len(env) // hop * hop].reshape(-1, hop).max(1)
    act = (fr > 10 ** (-40 / 20)).astype(float)
    sm = np.zeros_like(act); v = 0.0
    for i, a in enumerate(act):
        k = 0.35 if a > v else 0.045
        v += (a - v) * k; sm[i] = v
    duck_db = -6.0 * np.repeat(sm, hop)
    duck_db = np.pad(duck_db, (0, N - len(duck_db)), constant_values=0)
    music_gain_db = -6.0   # bed ~20 dB under the voice while speaking, ~14 dB under in pauses
    bed *= (10 ** ((music_gain_db + duck_db) / 20))[:, None]

    mix = bed + narr[:, None]
    meter = pyln.Meter(SR)
    lufs = meter.integrated_loudness(mix)
    mix *= 10 ** ((-16.0 - lufs) / 20)
    pk = np.max(np.abs(mix))
    if pk > 0.89:  # -1 dBFS ceiling
        mix *= 0.89 / pk
    sf.write(os.path.join(ROOT, "audio", "mix.wav"), mix, SR, subtype="PCM_16")
    print(f"mix: {T:.2f}s  integrated {meter.integrated_loudness(mix):.1f} LUFS  peak {20*np.log10(np.max(np.abs(mix))):.1f} dBFS"
          f"  music bed {meter.integrated_loudness(bed * 10 ** ((-16.0 - lufs) / 20)):.1f} LUFS")


if __name__ == "__main__":
    main()
