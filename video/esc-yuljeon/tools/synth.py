"""8비트 칩튠 BGM + 효과음 합성기.

build/timeline.json(tools/timeline.js 가 scenes.js 에서 만든 표)을 읽어
build/audio.wav (44.1kHz 스테레오)를 만든다. 외부 음원은 쓰지 않는다.
"""
import json
import wave
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parent.parent
SR = 44100
TL = json.loads((ROOT / "build" / "timeline.json").read_text())
N = int((TL["duration"] + 1.0) * SR)
MUS = np.zeros(N)
SFX = np.zeros(N)
RNG = np.random.default_rng(7)


# ───────────────────────── 기본 파형 ─────────────────────────
def midi(n):
    return 440.0 * 2 ** ((n - 69) / 12)


def tvec(dur):
    return np.arange(int(max(dur, 0) * SR)) / SR


def phase(freq, dur):
    """freq: 숫자 또는 길이 같은 배열(글리산도)."""
    n = int(dur * SR)
    f = np.full(n, float(freq)) if np.isscalar(freq) else np.asarray(freq, float)[:n]
    return np.cumsum(f) / SR


def sq(freq, dur, duty=0.5):
    p = phase(freq, dur) % 1.0
    return np.where(p < duty, 1.0, -1.0)


def tri(freq, dur):
    p = phase(freq, dur) % 1.0
    return 2 * np.abs(2 * p - 1) - 1


def sine(freq, dur):
    return np.sin(2 * np.pi * phase(freq, dur))


def noise(dur, seed=None):
    r = RNG if seed is None else np.random.default_rng(seed)
    # NES 풍: 샘플을 몇 개씩 붙잡아 거친 노이즈
    n = int(dur * SR)
    hold = 2
    v = r.uniform(-1, 1, n // hold + 1)
    return np.repeat(v, hold)[:n]


def adsr(n_total, a, d, s, r, hold):
    t = np.arange(n_total) / SR
    e = np.ones(n_total)
    e = np.where(t < a, t / max(a, 1e-4), e)
    dd = (t >= a) & (t < a + d)
    e = np.where(dd, 1 - (1 - s) * (t - a) / max(d, 1e-4), e)
    e = np.where((t >= a + d) & (t < hold), s, e)
    rel = t >= hold
    e = np.where(rel, s * np.clip(1 - (t - hold) / max(r, 1e-4), 0, 1), e)
    return e


def smooth(x, k=3):
    if k <= 1:
        return x
    return np.convolve(x, np.ones(k) / k, mode="same")


def add(buf, t, sig, gain=1.0):
    i = int(round(t * SR))
    if i >= len(buf) or len(sig) == 0:
        return
    if i < 0:
        sig = sig[-i:]
        i = 0
    j = min(len(buf), i + len(sig))
    buf[i:j] += sig[: j - i] * gain


def note(t, n, dur, wave="sq", gain=0.1, duty=0.5, a=0.004, d=0.06, s=0.7, r=0.06, vib=0.0, buf=None):
    buf = MUS if buf is None else buf
    total = dur + r
    f = midi(n)
    if vib:
        tt = tvec(total)
        f = f * (1 + vib * np.sin(2 * np.pi * 5.5 * tt) * np.clip(tt / 0.15, 0, 1))
    if wave == "sq":
        sig = sq(f, total, duty)
    elif wave == "tri":
        sig = tri(f, total)
    else:
        sig = sine(f, total)
    sig = smooth(sig, 3 if wave == "sq" else 1)
    add(buf, t, sig * adsr(len(sig), a, d, s, r, dur), gain)


def kick(t, g=0.5, buf=None):
    d = 0.22
    tt = tvec(d)
    f = 45 + 110 * np.exp(-tt / 0.025)
    add(MUS if buf is None else buf, t, sine(f, d) * np.exp(-tt / 0.07), g)


def snare(t, g=0.25, buf=None):
    d = 0.18
    tt = tvec(d)
    s = noise(d) * np.exp(-tt / 0.05) * 0.8 + sine(190, d) * np.exp(-tt / 0.03) * 0.4
    add(MUS if buf is None else buf, t, s, g)


def hat(t, g=0.07, buf=None, open_=False):
    d = 0.12 if open_ else 0.04
    tt = tvec(d)
    s = np.diff(noise(d + 1 / SR), prepend=0)[: len(tt)] * np.exp(-tt / (0.04 if open_ else 0.012))
    add(MUS if buf is None else buf, t, s, g)


# ───────────────────────── 음악 테마 ─────────────────────────
def grid(t0, t1, step):
    k = 0
    while t0 + k * step < t1 - 1e-6:
        yield k, t0 + k * step
        k += 1


def fade_seg(t0, t1, fin=0.05, fout=0.25):
    i0, i1 = int(t0 * SR), int(t1 * SR)
    n = i1 - i0
    e = np.ones(n)
    a, b = int(fin * SR), int(fout * SR)
    if a:
        e[:a] = np.linspace(0, 1, a)
    if b:
        e[-b:] = np.minimum(e[-b:], np.linspace(1, 0, b))
    return i0, i1, e


def theme_peace(t0, t1):
    e8 = 0.25
    mel = [72, 76, 79, 76, 77, 81, 79, 76, 74, 77, 76, 72, 74, 71, 72, None]
    for k, t in grid(t0, t1, e8):
        n = mel[k % 16]
        if n:
            note(t, n, e8 * 0.8, "sq", 0.075, duty=0.25, s=0.5, r=0.05)
        if k % 2 == 1:
            hat(t, 0.04)
    bass = [48, 48, 45, 45, 41, 41, 43, 43]
    for k, t in grid(t0, t1, 0.5):
        note(t, bass[k % 8], 0.42, "tri", 0.2, s=0.8)


def theme_creep(t0, t1):
    beat = 60 / 72
    chords = [(57, 60, 64), (53, 57, 60), (50, 53, 57), (52, 56, 59)]
    roots = [45, 41, 38, 40]
    for k, t in grid(t0, t1, beat * 2):
        c = chords[k % 4]
        for i, n in enumerate(c):
            note(t, n - 12, beat * 2 - 0.05, "sq", 0.022, duty=0.125, a=0.35, d=0.2, s=0.8, r=0.3, vib=0.004 * (i + 1))
        note(t, roots[k % 4] - 12, beat * 2 - 0.1, "tri", 0.2, a=0.05, s=0.9, r=0.2)
    for k, t in grid(t0, t1, beat):
        kick(t, 0.16)
        kick(t + 0.18, 0.1)
        if k % 4 == 3:
            note(t + beat * 0.5, [81, 88, 84, 86][(k // 4) % 4], 0.05, "sine", 0.05, a=0.002, d=0.6, s=0.0, r=0.6)


def theme_alarm(t0, t1):
    e8 = 60 / 150 / 2
    for k, t in grid(t0, t1, e8):
        note(t, 45 + (12 if k % 2 else 0), e8 * 0.7, "sq", 0.05, duty=0.5, s=0.6)
        if k % 2 == 0:
            kick(t, 0.25)


def theme_hero(t0, t1, split=None):
    beat = 60 / 132
    e8, e16 = beat / 2, beat / 4
    split = split or t0 + 3.0
    for k, t in grid(t0, split, e16):
        prog = (t - t0) / max(split - t0, 0.1)
        n = [60, 64, 67, 72][k % 4] + (12 if prog > 0.5 else 0)
        note(t, n, e16 * 0.8, "sq", 0.045 + 0.04 * prog, duty=0.25, s=0.5, r=0.02)
    for k, t in grid(t0, split, beat):
        note(t, 36, beat * 0.9, "tri", 0.2)
    # 스네어 롤 크레셴도
    roll = t0 + (split - t0) * 0.55
    for k, t in grid(roll, split, e16):
        snare(t, 0.06 + 0.16 * (t - roll) / (split - roll))
    mel = [67, 72, 76, 79, 77, 76, 74, 72, 74, 76, 77, 79, 84, None, None, None]
    for k, t in grid(split, t1, e8):
        n = mel[k % 16]
        if n:
            note(t, n, e8 * 0.85, "sq", 0.085, duty=0.5, s=0.6, vib=0.006)
        if k % 2 == 1:
            hat(t, 0.045)
    bass = [36, 43, 41, 43]
    for k, t in grid(split, t1, beat):
        note(t, bass[(k // 2) % 4], beat * 0.85, "tri", 0.22)
        kick(t, 0.35) if k % 2 == 0 else snare(t, 0.2)


def theme_mystery(t0, t1):
    e8 = 0.3
    mel = [62, 65, 69, 65, 64, 67, 70, 67, 62, 65, 69, 72, 70, 69, 67, 64]
    for k, t in grid(t0, t1, e8):
        note(t, mel[k % 16], 0.12, "sq", 0.07, duty=0.125, s=0.0, d=0.12, r=0.05)
        if k % 2 == 0:
            hat(t, 0.03)
    for k, t in grid(t0, t1, e8 * 4):
        note(t, [38, 40, 38, 36][k % 4], e8 * 3.6, "tri", 0.18, s=0.8)


def theme_drone(t0, t1):
    end = t1 - 0.35
    d = end - t0
    tt = tvec(d)
    s = smooth(sq(midi(33), d, 0.5), 9) * (0.6 + 0.4 * np.sin(2 * np.pi * 1.5 * tt))
    nz = smooth(noise(d), 25) * np.clip(tt / d, 0, 1) ** 2
    e = np.clip(tt / 0.4, 0, 1)
    add(MUS, t0, (s * 0.06 + nz * 0.25) * e)


THEME_BAR = 60 / 140 * 4


def drums_basic(t0, t1, beat, hats=True, g=1.0):
    for k, t in grid(t0, t1, beat):
        if k % 2 == 0:
            kick(t, 0.32 * g)
        else:
            snare(t, 0.17 * g)
        if hats:
            hat(t + beat / 2, 0.045 * g)


def theme_theme(t0, t1):
    beat = 60 / 140
    e8 = beat / 2
    roots = [45, 43, 41, 40]
    for k, t in grid(t0, t1, e8):
        r = roots[(k // 8) % 4]
        note(t, r + (12 if k % 4 == 2 else 0), e8 * 0.75, "tri", 0.22, s=0.8, r=0.03)
    drums_basic(t0, t1, beat, g=0.9)
    lead = [69, 72, 76, 72, 74, 72, 69, 67, 67, 71, 74, 71, 72, 71, 67, 64,
            65, 69, 72, 69, 71, 69, 65, 64, 64, 68, 71, 74, 76, None, 74, 71]
    start = t0 + THEME_BAR * 2
    for k, t in grid(start, t1, e8):
        n = lead[k % 32]
        phrase = (k // 32) % 2
        if n:
            note(t, n + (12 if phrase == 1 else 0), e8 * 0.8, "sq", 0.06 if phrase else 0.075, duty=0.25 if phrase else 0.5, s=0.6, vib=0.005)
    # 낮은 화음 패드
    chords = [(57, 60, 64), (55, 59, 62), (53, 57, 60), (52, 56, 59)]
    for k, t in grid(t0, t1, THEME_BAR):
        for n in chords[k % 4]:
            note(t, n, THEME_BAR - 0.05, "sq", 0.012, duty=0.125, a=0.1, s=0.8, r=0.1)


def theme_play(t0, t1):
    beat = 60 / 140
    e8, e16 = beat / 2, beat / 4
    roots = [48, 45, 41, 43]
    for k, t in grid(t0, t1, beat):
        r = roots[(k // 4) % 4]
        note(t, r if k % 2 == 0 else r + 7, beat * 0.6, "tri", 0.21, s=0.7, r=0.03)
    drums_basic(t0, t1, beat, g=0.85)
    lead = [72, None, 76, 79, 76, None, 72, 74, 76, None, 72, 69, 72, None, None, None,
            77, None, 76, 74, 72, None, 74, 76, 79, None, 77, 76, 74, None, None, None]
    for k, t in grid(t0, t1, e8):
        n = lead[k % 32]
        block = (k // 64) % 3
        if n:
            note(t, n + (12 if block == 1 else 0), e8 * 0.8, "sq", 0.055 if block == 1 else 0.065, duty=0.25 if block != 2 else 0.5, s=0.55)
    arp = [0, 4, 7, 12]
    for k, t in grid(t0, t1, e16):
        if (k // 128) % 2 == 1:
            r = roots[(k // 16) % 4] + 24
            note(t, r + arp[k % 4], e16 * 0.6, "sq", 0.02, duty=0.125, s=0.4, r=0.01)


def theme_boss(t0, t1, clear_at):
    beat = 60 / 160
    e8, e16 = beat / 2, beat / 4
    stop = clear_at
    roots = [40, 40, 38, 36, 40, 40, 43, 42]
    for k, t in grid(t0, stop, e8):
        r = roots[(k // 8) % 8]
        note(t, r + (12 if k % 2 else 0), e8 * 0.7, "sq", 0.04, duty=0.5, s=0.6, r=0.02)
        note(t, r, e8 * 0.8, "tri", 0.2, s=0.8, r=0.02)
    for k, t in grid(t0, stop, beat):
        kick(t, 0.33) if k % 2 == 0 else snare(t, 0.2)
    for k, t in grid(t0, stop, e16):
        hat(t, 0.03)
        if k >= 16:
            r = roots[(k // 16) % 8] + 24
            note(t, r + [0, 3, 7, 12][k % 4], e16 * 0.7, "sq", 0.05, duty=0.25, s=0.5, r=0.01)
    # 클리어 뒤 승리 화음
    for n in (60, 64, 67, 72):
        note(clear_at + 1.0, n, t1 - clear_at - 1.3, "sq", 0.02, duty=0.25, a=0.4, s=0.8, r=0.5)
    note(clear_at + 1.0, 36, t1 - clear_at - 1.3, "tri", 0.15, a=0.3, s=0.8, r=0.5)


def theme_ending(t0, t1):
    e8 = 0.25
    end_chord = t1 - 1.6
    mel = [72, 76, 79, 76, 77, 81, 79, 76, 74, 77, 76, 72, 74, 71, 72, None,
           76, 79, 84, 79, 81, 79, 77, 76, 74, 76, 77, 79, 76, 74, 72, None]
    for k, t in grid(t0 + 0.6, end_chord, e8):
        n = mel[k % 32]
        if n:
            note(t, n, e8 * 0.8, "sq", 0.07, duty=0.25 if (k // 32) % 2 == 0 else 0.5, s=0.5, r=0.05, vib=0.004)
        if k % 2 == 1:
            hat(t, 0.035)
    bass = [48, 48, 43, 43, 45, 45, 41, 41]
    for k, t in grid(t0 + 0.6, end_chord, 0.5):
        note(t, bass[k % 8], 0.42, "tri", 0.2, s=0.8)
        if k % 2 == 0:
            kick(t, 0.2)
    # 마지막 화음(아르페지오 후 지속)
    for i, n in enumerate((60, 64, 67, 72, 76, 79, 84)):
        note(end_chord + i * 0.06, n, 1.2, "sq", 0.035, duty=0.25, a=0.01, d=0.3, s=0.6, r=0.4)
    note(end_chord, 36, 1.3, "tri", 0.22, s=0.8, r=0.3)


# ───────────────────────── 효과음 ─────────────────────────
def S(t, sig, g=1.0):
    add(SFX, t, sig, g)


def env_exp(d, tau):
    return np.exp(-tvec(d) / tau)


def blip_seq(t, notes, step, dur, g, duty=0.25):
    for i, n in enumerate(notes):
        d = dur
        sig = smooth(sq(midi(n), d, duty), 3) * adsr(int(d * SR), 0.002, 0.03, 0.6, 0.03, d * 0.7)
        S(t + i * step, sig, g)


def sfx_sting(t, **_):
    d = 0.7
    tt = tvec(d)
    f = 880 * np.exp(-tt / 0.25) + 110
    S(t, smooth(sq(f, d, 0.5), 3) * env_exp(d, 0.35), 0.16)
    S(t, noise(0.25) * env_exp(0.25, 0.08), 0.18)


def sfx_thud(t, **_):
    d = 0.4
    tt = tvec(d)
    S(t, sine(40 + 60 * np.exp(-tt / 0.04), d) * env_exp(d, 0.12), 0.42)
    S(t, smooth(noise(0.05), 4) * env_exp(0.05, 0.015), 0.35)


def sfx_scratch(t, dur=1.5, **_):
    tt = tvec(dur)
    am = (np.sin(2 * np.pi * 11 * tt) > 0.2).astype(float) * (0.6 + 0.4 * np.sin(2 * np.pi * 3 * tt))
    sig = np.diff(noise(dur + 1 / SR), prepend=0)[: len(tt)] * am
    sig *= np.clip(tt / 0.1, 0, 1) * np.clip((dur - tt) / 0.2, 0, 1)
    S(t, smooth(sig, 2), 0.09)


def sfx_dialog(t, **_):
    blip_seq(t, [84, 88, 91], 0.045, 0.05, 0.07)


def sfx_siren(t, dur=2.8, **_):
    tt = tvec(dur)
    f = 700 + 250 * np.sign(np.sin(2 * np.pi * 1.6 * tt)) * 0 + 250 * np.sin(2 * np.pi * 1.6 * tt)
    sig = smooth(sq(f, dur, 0.5), 5) * np.clip(tt / 0.2, 0, 1) * np.clip((dur - tt) / 0.3, 0, 1)
    S(t, sig, 0.07)


def sfx_rise(t, **_):
    d = 0.7
    tt = tvec(d)
    f = midi(60) * 2 ** (tt / d * 2.2)
    S(t, smooth(sq(f, d, 0.25), 3) * np.clip(1 - tt / d, 0, 1) ** 0.5, 0.09)


def sfx_jump(t, **_):
    d = 0.16
    tt = tvec(d)
    S(t, smooth(sq(300 + 900 * tt / d, d, 0.5), 3) * env_exp(d, 0.1), 0.09)


def sfx_land(t, **_):
    d = 0.18
    tt = tvec(d)
    S(t, sine(90 * np.exp(-tt / 0.08) + 40, d) * env_exp(d, 0.06), 0.3)


def sfx_whoosh(t, **_):
    d = 0.45
    tt = tvec(d)
    e = np.sin(np.pi * tt / d) ** 2
    S(t, smooth(noise(d), 6) * e, 0.14)


def sfx_click(t, **_):
    S(t, smooth(sq(1200, 0.035, 0.5), 2) * env_exp(0.035, 0.012), 0.12)


def sfx_glitch(t, **_):
    d = 0.5
    sig = noise(d)
    hold = np.repeat(RNG.uniform(-1, 1, int(d * 60) + 1), int(SR / 60) + 1)[: len(sig)]
    gate = (np.repeat(RNG.random(int(d * 25) + 1), int(SR / 25) + 1)[: len(sig)] > 0.4)
    S(t, (sig * 0.5 + hold * 0.6) * gate * env_exp(d, 0.3), 0.12)


def sfx_boom(t, **_):
    d = 1.6
    tt = tvec(d)
    S(t, sine(30 + 50 * np.exp(-tt / 0.12), d) * env_exp(d, 0.45), 0.45)
    S(t, smooth(noise(d), 12) * env_exp(d, 0.35), 0.3)


def sfx_blip(t, **_):
    S(t, smooth(sq(1500, 0.06, 0.25), 2) * env_exp(0.06, 0.025), 0.08)


def sfx_select(t, **_):
    blip_seq(t, [76, 83], 0.06, 0.07, 0.08)


def sfx_swipe(t, **_):
    d = 0.22
    tt = tvec(d)
    S(t, np.diff(noise(d + 1 / SR), prepend=0)[: len(tt)] * np.sin(np.pi * tt / d), 0.06)


def sfx_sparkle(t, **_):
    blip_seq(t, [96, 100, 103, 108, 103], 0.05, 0.06, 0.045, duty=0.125)


def sfx_flip(t, **_):
    sfx_click(t)
    blip_seq(t + 0.02, [79, 86], 0.04, 0.05, 0.05)


def sfx_typing(t, dur=0.6, n=None, **_):
    count = int(n or max(3, dur * 14))
    step = dur / max(count, 1)
    for i in range(count):
        f = 900 + RNG.random() * 500
        S(t + i * step, smooth(sq(f, 0.03, 0.5), 2) * env_exp(0.03, 0.008), 0.05)


def sfx_tap(t, **_):
    d = 0.06
    S(t, sine(900 * np.exp(-tvec(d) / 0.05), d) * env_exp(d, 0.02), 0.22)


def sfx_scan(t, **_):
    for k in range(2):
        S(t + k * 0.13, smooth(sq(1800, 0.1, 0.5), 2) * env_exp(0.1, 0.06), 0.07)


def sfx_coin(t, **_):
    S(t, smooth(sq(midi(83), 0.08, 0.5), 2), 0.07)
    S(t + 0.08, smooth(sq(midi(88), 0.4, 0.5), 2) * env_exp(0.4, 0.15), 0.07)


def sfx_wrong(t, **_):
    d = 0.4
    tt = tvec(d)
    S(t, smooth(sq(140 * (1 + 0.04 * np.sin(2 * np.pi * 18 * tt)), d, 0.5), 4) * np.clip((d - tt) / 0.1, 0, 1), 0.1)


def sfx_correct(t, **_):
    blip_seq(t, [84, 88, 91, 96], 0.06, 0.09, 0.07)


def sfx_itemget(t, **_):
    blip_seq(t, [79, 84, 88], 0.08, 0.1, 0.07)
    note(t + 0.24, 91, 0.45, "sq", 0.07, duty=0.25, s=0.7, r=0.25, vib=0.01, buf=SFX)


def sfx_slot(t, **_):
    d = 0.08
    S(t, sine(700 * np.exp(-tvec(d) / 0.04) + 200, d) * env_exp(d, 0.03), 0.25)
    blip_seq(t + 0.03, [91], 0.0, 0.05, 0.05)


def sfx_equip(t, **_):
    d = 0.7
    tt = tvec(d)
    f = (400 + 900 * tt / d) * (1 + 0.08 * np.sin(2 * np.pi * 22 * tt))
    S(t, smooth(sq(f, d, 0.25), 3) * np.clip((d - tt) / 0.15, 0, 1), 0.06)


def sfx_message(t, **_):
    blip_seq(t, [88, 93], 0.07, 0.07, 0.07)


def sfx_fanfare_small(t, **_):
    blip_seq(t, [72, 76, 79, 84], 0.09, 0.1, 0.07)
    note(t + 0.36, 88, 0.5, "sq", 0.07, duty=0.25, s=0.7, r=0.3, buf=SFX)


def sfx_slash(t, **_):
    d = 0.18
    tt = tvec(d)
    S(t, np.diff(noise(d + 1 / SR), prepend=0)[: len(tt)] * env_exp(d, 0.05), 0.22)
    S(t, smooth(sq(1400 * np.exp(-tt / 0.06) + 200, d, 0.5), 2) * env_exp(d, 0.05), 0.05)


def sfx_fanfare(t, **_):
    seq = [(72, 0.0), (72, 0.12), (72, 0.24), (76, 0.36), (79, 0.6), (84, 0.84)]
    for n, dt in seq:
        note(t + dt, n, 0.1 if dt < 0.84 else 0.9, "sq", 0.08, duty=0.5, s=0.7, r=0.2, vib=0.006 if dt >= 0.84 else 0, buf=SFX)
    for n in (60, 64, 67):
        note(t + 0.84, n, 0.9, "sq", 0.035, duty=0.25, s=0.7, r=0.3, buf=SFX)
    for k in range(4):
        kick(t + k * 0.12, 0.25, buf=SFX)


def sfx_brighten(t, **_):
    for i, n in enumerate((60, 64, 67, 72, 76, 79, 84, 88)):
        note(t + i * 0.12, n, 0.6, "sq", 0.03, duty=0.125, a=0.05, s=0.6, r=0.4, buf=SFX)


def sfx_firework(t, **_):
    d = 0.45
    tt = tvec(d)
    S(t, sine(500 + 1400 * tt / d, d) * (tt / d), 0.05)
    d2 = 0.7
    tt2 = tvec(d2)
    crackle = noise(d2) * (RNG.random(len(tt2)) > 0.9) * np.exp(-tt2 / 0.25)
    S(t + d, crackle + smooth(noise(d2), 6) * np.exp(-tt2 / 0.1) * 0.6, 0.22)


SFX_FN = {k[4:]: v for k, v in globals().items() if k.startswith("sfx_")}


def main():
    clear_at = None
    for f in TL["sfx"]:
        if f["name"] == "fanfare":
            clear_at = f["t"]
    for seg in TL["music"]:
        t0, t1, cue = seg["from"], seg["to"], seg["cue"]
        before = MUS.copy()
        if cue == "boss":
            theme_boss(t0, t1, clear_at or t1)
        elif cue == "hero":
            theme_hero(t0, t1, seg.get("split"))
        else:
            globals()["theme_" + cue](t0, t1)
        # 구간 경계에서 잘리는 음은 짧게 페이드
        delta = MUS - before
        i0, i1, e = fade_seg(t0, min(t1 + 0.0, TL["duration"]), fin=0.01, fout=0.12 if cue != "drone" else 0.02)
        MUS[i0:i1] = before[i0:i1] + delta[i0:i1] * e
        MUS[i1:] = before[i1:]
    for f in TL["sfx"]:
        fn = SFX_FN.get(f["name"])
        if fn is None:
            raise SystemExit(f"unknown sfx {f['name']}")
        kw = {k: v for k, v in f.items() if k in ("dur", "n") and v is not None}
        fn(f["t"], **kw)

    mix = MUS * 0.8 + SFX * 1.0
    # 마지막 페이드아웃(영상 페이드와 같게)
    end = TL["duration"]
    i = int((end - 1.2) * SR)
    mix[i:] *= np.clip(np.linspace(1, 0, len(mix) - i) * 1.6, 0, 1)
    mix = np.tanh(mix * 1.1) / np.tanh(1.1)
    peak = np.max(np.abs(mix)) or 1
    mix = mix / peak * 0.89
    mix = mix[: int(end * SR)]
    # 아주 약한 스테레오 폭: 오른쪽을 0.6ms 지연
    d = int(0.0006 * SR)
    left, right = mix, np.concatenate([np.zeros(d), mix[:-d]])
    st = np.stack([left, right], axis=1)
    out = ROOT / "build" / "audio.wav"
    with wave.open(str(out), "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((st * 32767).astype(np.int16).tobytes())
    rms = np.sqrt(np.mean(mix ** 2))
    print(f"audio: {out} {len(mix) / SR:.2f}s rms={20 * np.log10(rms):.1f}dBFS peak={20 * np.log10(np.max(np.abs(mix))):.1f}dBFS")


if __name__ == "__main__":
    main()
