"""Soundtrack for the showreel, synthesised from scratch (numpy only).

128 BPM, 32 beats = 15.000 s, A minor → C major.  Every hit is placed on the
same beat numbers the picture uses in index.html, so cuts land on the music.

    python3 make_audio.py showreel.wav
"""
import sys
import wave
import numpy as np

SR = 48000
BPM = 128
SPB = 60 / BPM
DUR = 15.0
N = int(SR * DUR)
rng = np.random.default_rng(7)

L = np.zeros(N)
R = np.zeros(N)
VERB_L = np.zeros(N)   # reverb send
VERB_R = np.zeros(N)
DUCK = np.ones(N)      # sidechain from the kick


def at(b):
    return int(round(b * SPB * SR))


def add(sig, b, gain=1.0, pan=0.0, verb=0.0):
    """Place a mono one-shot at beat b. pan -1..1, verb = reverb send."""
    i = at(b)
    if i >= N:
        return
    sig = sig[: N - i] * gain
    gl, gr = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
    L[i:i + len(sig)] += sig * gl * 1.414
    R[i:i + len(sig)] += sig * gr * 1.414
    if verb:
        VERB_L[i:i + len(sig)] += sig * gl * verb
        VERB_R[i:i + len(sig)] += sig * gr * verb


def add_st(sl, sr_, b, gain=1.0, verb=0.0):
    i = at(b)
    n = min(len(sl), N - i)
    L[i:i + n] += sl[:n] * gain
    R[i:i + n] += sr_[:n] * gain
    if verb:
        VERB_L[i:i + n] += sl[:n] * gain * verb
        VERB_R[i:i + n] += sr_[:n] * gain * verb


def t_(sec):
    return np.arange(int(sec * SR)) / SR


def midi(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def band(x, lo, hi):
    """Brick-ish band filter via FFT with soft edges (for one-shots)."""
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    m = np.ones_like(f)
    if lo:
        m *= 1 / (1 + (lo / np.maximum(f, 1)) ** 4)
    if hi:
        m *= 1 / (1 + (f / hi) ** 4)
    return np.fft.irfft(X * m, len(x))


def onepole_sweep(x, f0, f1, curve=2.0):
    """Lowpass whose cutoff glides f0→f1 across the sound (risers, whooshes)."""
    n = len(x)
    fc = f0 + (f1 - f0) * np.linspace(0, 1, n) ** curve
    a = np.exp(-2 * np.pi * fc / SR)
    y = np.empty(n)
    s = 0.0
    for i in range(n):
        s = (1 - a[i]) * x[i] + a[i] * s
        y[i] = s
    return y


# ── instruments ────────────────────────────────────────────────

def kick(big=False):
    t = t_(0.9 if big else 0.42)
    f = 46 + 120 * np.exp(-t * 32)
    ph = 2 * np.pi * np.cumsum(f) / SR
    env = np.exp(-t * (3.2 if big else 7.5))
    body = np.sin(ph) * env
    click = band(rng.standard_normal(len(t)), 1500, 9000) * np.exp(-t * 300) * 0.35
    return np.tanh((body + click) * 1.6) * 0.9


def duck(b, depth=0.6, length=0.42):
    i = at(b)
    t = t_(length)
    env = 1 - depth * np.exp(-t * 9)
    n = min(len(t), N - i)
    DUCK[i:i + n] = np.minimum(DUCK[i:i + n], env[:n])


def hat(open_=False):
    t = t_(0.22 if open_ else 0.06)
    return band(rng.standard_normal(len(t)), 7000, 16000) * np.exp(-t * (18 if open_ else 70)) * 0.5


def clap():
    t = t_(0.35)
    n = band(rng.standard_normal(len(t)), 900, 5000)
    env = np.zeros(len(t))
    for k, d in enumerate((0, 0.011, 0.022)):
        i = int(d * SR)
        env[i:] += np.exp(-(t[: len(t) - i]) * (140 if k < 2 else 16))
    return n * env * 0.55


def tick(f=3200, d=0.025):
    t = t_(d)
    return np.sin(2 * np.pi * f * t) * np.exp(-t * 260) * 0.5 + band(rng.standard_normal(len(t)), 3000, 12000) * np.exp(-t * 500) * 0.25


def bell(m, d=1.4):
    t = t_(d)
    f = midi(m)
    s = (np.sin(2 * np.pi * f * t) + 0.35 * np.sin(2 * np.pi * f * 2.76 * t) * np.exp(-t * 6)
         + 0.18 * np.sin(2 * np.pi * f * 5.4 * t) * np.exp(-t * 12))
    return s * np.exp(-t * 3.2) * (1 - np.exp(-t * 900)) * 0.35


def pluck(m, d=0.35):
    t = t_(d)
    f = midi(m)
    s = sum((0.6 ** k) * np.sin(2 * np.pi * f * (k + 1) * t) * np.exp(-t * (9 + 6 * k)) for k in range(5))
    return s * (1 - np.exp(-t * 1200)) * 0.22


def bass(m, d):
    t = t_(d)
    f = midi(m)
    s = np.sin(2 * np.pi * f / 2 * t) * 0.8                      # sub
    s += sum((0.5 / (k + 1)) * np.sin(2 * np.pi * f * (k + 1) * t) for k in range(6)) * np.exp(-t * 7)
    env = (1 - np.exp(-t * 400)) * np.clip((d - t) / 0.02, 0, 1)
    return s * env * 0.42


def pad(notes, d, bright=1.0):
    """Detuned saw stack (additive, so it's band-limited), stereo, slow attack."""
    t = t_(d)
    sl = np.zeros(len(t))
    sr_ = np.zeros(len(t))
    for m in notes:
        for det, side in ((-0.09, 0), (0.0, 1), (0.1, 2)):
            f = midi(m + det)
            ph = rng.uniform(0, 2 * np.pi)
            v = sum(np.sin(2 * np.pi * f * (k + 1) * t + ph * (k + 1)) / (k + 1) ** (1.6 - 0.4 * bright) for k in range(9))
            if side == 0:
                sl += v
            elif side == 2:
                sr_ += v
            else:
                sl += v * 0.6
                sr_ += v * 0.6
    att = 1 - np.exp(-t * 3)
    rel = np.clip((d - t) / 0.25, 0, 1)
    g = 0.018
    return sl * att * rel * g, sr_ * att * rel * g


def noise_riser(d, f0=300, f1=9000, up=True):
    n = rng.standard_normal(int(d * SR))
    y = onepole_sweep(n, f0, f1, 2.2) if up else onepole_sweep(n, f1, f0, 0.5)
    t = np.linspace(0, 1, len(y))
    env = t ** 2.2 if up else (1 - t) ** 1.5
    return y * env * 0.5


def whoosh(d=0.5, peak=0.55):
    n = rng.standard_normal(int(d * SR))
    t = np.linspace(0, 1, len(n))
    env = np.where(t < peak, (t / peak) ** 2, ((1 - t) / (1 - peak)) ** 1.5)
    y = onepole_sweep(n, 400, 6000, 1.0)
    y = y - onepole_sweep(y, 200, 200)          # take the mud out
    return y * env * 0.9


def impact():
    t = t_(2.2)
    f = 30 + 60 * np.exp(-t * 6)
    boom = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 1.8) * 0.9
    crash = band(rng.standard_normal(len(t)), 3500, 15000) * np.exp(-t * 2.4) * 0.28
    return np.tanh(boom * 1.4) + crash


def blip(m=81):
    t = t_(0.5)
    f = midi(m) * (1 + 0.5 * np.exp(-t * 60))
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9) * 0.4


# ── arrangement ────────────────────────────────────────────────
# bars: Am F C G | Am F G C
CHORDS = [[57, 60, 64], [57, 60, 65], [55, 60, 64], [55, 59, 62],
          [57, 60, 64], [57, 60, 65], [55, 59, 62], [55, 60, 64, 67]]
ROOTS = [45, 41, 48, 43, 45, 41, 43, 48]

# pads, one per bar (the end chord rings to the last frame)
for bar, ch in enumerate(CHORDS):
    d = 4 * SPB + (0.3 if bar < 7 else 0)
    if bar == 1:      # the dive: pad thins out under the riser
        d = 2.6 * SPB
    sl, sr_ = pad(ch, d, bright=0.6 if bar in (0, 6) else 1.0)
    add_st(sl, sr_, bar * 4, gain=(0.55 if bar == 0 else 1.0) * (1.35 if bar == 7 else 1.0), verb=0.5)

# opening: the dot
add(blip(81), 0, 0.9, verb=0.6)
for k, b in enumerate((0.75, 1.5)):
    add(blip(81), b, 0.35 / (k + 1), pan=(-0.5 if k == 0 else 0.5), verb=0.6)
add(noise_riser(1.9 * SPB, 400, 7000), 0.1, 0.35)
add(whoosh(0.8 * SPB, 0.7), 0.6, 0.5)                   # dot stretches into the line

# drums
for b in np.arange(2, 24, 1.0):
    if 6.5 <= b < 8:                 # drop the kick for the dive
        continue
    add(kick(), b, 0.95)
    duck(b)
for b in np.arange(2.5, 23.5, 1.0):
    if 6.5 <= b < 8:
        continue
    add(hat(open_=True), b, 0.38, pan=0.25)
for b in np.arange(8, 23.75, 0.25):
    if b % 1 in (0.25, 0.75):
        add(hat(), b, 0.30 + 0.08 * ((b * 4) % 2), pan=-0.3)
for b in (9, 11, 13, 15, 17, 19, 21, 23):
    add(clap(), b, 0.75, verb=0.25)

# the dive into the P: snare roll speeds up, riser, then the hit
roll = [6.5 + 1.45 * (1 - (1 - k / 28) ** 1.8) for k in range(28)]   # accelerating
for k, b in enumerate(roll):
    if b < 7.98:
        add(clap(), b, 0.12 + 0.5 * k / 28, pan=(k % 2) * 0.4 - 0.2)
add(noise_riser(1.6 * SPB, 500, 12000), 6.4, 0.55)
add(impact(), 8, 0.95, verb=0.25)
duck(8, 0.8, 0.8)

# word changes: ticks
for b in (2, 3, 4, 5):
    add(tick(2600 + 300 * (b - 2)), b - 0.02, 0.6, pan=0.3)

# bass: off-beat 8ths, out during intro and dive, long notes in the vision bar
for bar in range(8):
    root = ROOTS[bar]
    for k in range(4):
        b = bar * 4 + k + 0.5
        if b < 2 or 6.4 <= b < 8 or b >= 24:
            continue
        m = root + (12 if (k == 3 and bar % 2) else 0)
        add(bass(m, 0.42 * SPB), b, 0.9)
add(bass(43, 3.6 * SPB), 24, 0.6)
add(bass(36, 4.0 * SPB), 28, 0.9)

# 02 WORK: plucked arp, whooshes on camera moves, pops as cards land
ARP = [0, 1, 2, 1, 3, 2, 1, 2]
for bar in (2, 3):
    ch = CHORDS[bar] + [CHORDS[bar][0] + 12]
    for k in range(16):
        b = bar * 4 + k * 0.25
        add(pluck(ch[ARP[k % 8]] + 12), b, 0.55 + 0.25 * (k % 4 == 0), pan=0.45 if k % 2 else -0.45, verb=0.35)
for b in (9.6, 11.6, 13.5, 14.7):
    add(whoosh(0.85 * SPB), b - 0.1, 0.45, pan=0.2)
for b, m in ((10, 76), (12, 79), (14, 83)):
    add(bell(m, 1.0), b, 0.5, verb=0.5)
for b, m in ((9.1, 71), (11.3, 74), (11.65, 76), (13.4, 74), (14.75, 79), (15.1, 81)):
    add(bell(m, 0.6), b, 0.22, pan=0.5, verb=0.4)
add(noise_riser(0.9 * SPB, 600, 10000), 15.1, 0.45)       # blue wipe
add(whoosh(0.6 * SPB, 0.85), 15.45, 0.5)

# 03 RECORD: four rising pings on the 8ths, odometer ratchets
for k, (b, m) in enumerate(((16, 69), (16.5, 72), (17, 76), (17.5, 81))):
    add(bell(m, 1.2), b, 0.75, pan=-0.45 + 0.3 * k, verb=0.45)
    for j in range(9):
        add(tick(4200 - j * 150, 0.012), b - 0.1 + j * 0.06 * (1 + j * 0.15), 0.18 * (1 - j / 10), pan=-0.45 + 0.3 * k)
add(impact(), 16, 0.35)
add(whoosh(0.9 * SPB, 0.5), 19.4, 0.55, pan=-0.3)              # shutters
add(whoosh(0.9 * SPB, 0.5), 19.55, 0.4, pan=0.3)

# 04 ARCHIVE: tiles light up as an arpeggio, a thud under each word
for j, m in enumerate((69, 72, 76, 79, 81, 84)):
    add(bell(m, 0.9), 20.25 + j * 0.42, 0.42, pan=(j % 2) * 0.6 - 0.3, verb=0.5)
for b in (20.5, 21.5, 22.5):
    add(kick(big=True), b, 0.35)
ch = CHORDS[5] + [CHORDS[5][0] + 12]
for k in range(12):
    add(pluck(ch[ARP[k % 8]] + 12), 20 + k * 0.25, 0.4, pan=0.45 if k % 2 else -0.45, verb=0.35)
rev = noise_riser(1.0 * SPB, 300, 11000)                  # everything collapses into the dot
add(rev, 23.0, 0.6)

# 05 VISION: the dot again (callback to the opening), soft half-time
add(blip(81), 24, 0.9, verb=0.7)
add(blip(76), 24.35, 0.35, pan=-0.6, verb=0.7)
add(blip(84), 24.55, 0.3, pan=0.6, verb=0.7)
for b in (24, 26):
    add(kick(), b, 0.55)
    duck(b, 0.35)
for b in (25, 27):
    add(clap(), b, 0.35, verb=0.5)
for b, m in zip((25.5, 26.0, 26.5, 26.75, 27.0), (72, 74, 76, 79, 81)):
    add(pluck(m, 0.6), b, 0.45, verb=0.6)
add(noise_riser(1.0 * SPB, 500, 12000), 27.0, 0.5)

# 06 CONTACT: the hit, the name, the typing
add(impact(), 28, 1.0, verb=0.35)
add(kick(big=True), 28, 0.8)
duck(28, 0.5, 1.0)
for i in range(10):
    add(tick(3800 - i * 120, 0.015), 28.0 + i * 0.045, 0.22, pan=-0.6 + i * 0.13)
for i in range(20):
    add(tick(5200 + 400 * rng.random(), 0.01), 29.75 + i / 20, 0.22, pan=0.1)
add(bell(84, 2.0), 29.0, 0.35, verb=0.7)
add(bell(79, 2.0), 30.75, 0.3, verb=0.7)
add(bell(88, 1.5), 31.0, 0.2, verb=0.7)

# ── mix ───────────────────────────────────────────────────────
# reverb: decaying stereo noise impulse responses, FFT convolution
ir_t = t_(1.8)
irl = rng.standard_normal(len(ir_t)) * np.exp(-ir_t * 3.2)
irr = rng.standard_normal(len(ir_t)) * np.exp(-ir_t * 3.2)
irl = band(irl, 300, 9000)
irr = band(irr, 300, 9000)
irl /= np.sqrt((irl ** 2).sum())
irr /= np.sqrt((irr ** 2).sum())


def conv(x, h):
    n = 1 << int(np.ceil(np.log2(len(x) + len(h))))
    return np.fft.irfft(np.fft.rfft(x, n) * np.fft.rfft(h, n), n)[: len(x)]


wl, wr = conv(VERB_L, irl), conv(VERB_R, irr)

# duck everything but the kick-bearing transients a little (gives the groove its pump)
L = L * (0.55 + 0.45 * DUCK) + wl * 0.5
R = R * (0.55 + 0.45 * DUCK) + wr * 0.5

mix = np.stack([L, R])
mix -= mix.mean(axis=1, keepdims=True)
mix = np.tanh(mix / np.abs(mix).max() * 1.3)  # gentle saturation / limiting
mix /= np.abs(mix).max()
mix *= 10 ** (-1.0 / 20)                        # -1 dBFS peak
fade = np.ones(N)
fade[-int(0.12 * SR):] = np.linspace(1, 0, int(0.12 * SR))
fade[: int(0.004 * SR)] = np.linspace(0, 1, int(0.004 * SR))
mix *= fade

out = sys.argv[1] if len(sys.argv) > 1 else 'showreel.wav'
pcm = (mix.T * 32767).astype('<i2')
with wave.open(out, 'wb') as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print('wrote', out, f'{N / SR:.3f}s')
