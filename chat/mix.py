import json, sys, numpy as np, soundfile as sf
d = sys.argv[1]
T = json.load(open(d + "/timeline.json"))
SR = 44100
n = int((T["total"] + 0.5) * SR)
a = np.zeros(n)
rng = np.random.default_rng(7)
def add(sig, t):
    i = int(t * SR); j = min(n, i + len(sig)); a[i:j] += sig[: j - i]
def env(L, att=0.005, rel=None):
    e = np.ones(L); k = int(att * SR); e[:k] = np.linspace(0, 1, k)
    r = np.exp(-np.linspace(0, 6, L)); return e * r
def ding(f1, f2):
    L = int(0.32 * SR); t = np.arange(L) / SR
    s = 0.5 * np.sin(2 * np.pi * f1 * t) * (t < 0.09) + 0.5 * np.sin(2 * np.pi * f2 * t) * (t >= 0.07)
    return 0.35 * s * env(L)
def tick():
    L = int(0.03 * SR); return 0.12 * rng.standard_normal(L) * np.exp(-np.linspace(0, 8, L))
def whoosh():
    L = int(0.6 * SR); x = rng.standard_normal(L)
    # crude bandpass via moving averages
    lo = np.convolve(x, np.ones(30) / 30, "same"); bp = lo - np.convolve(lo, np.ones(200) / 200, "same")
    e = np.sin(np.linspace(0, np.pi, L)) ** 2
    return 0.9 * bp * e
for e in T["events"]:
    if e["k"] == "ding_l": add(ding(880, 1320), e["t"])
    elif e["k"] == "ding_r": add(ding(1046, 1568), e["t"])
    elif e["k"] == "whoosh": add(whoosh(), max(0, e["t"] - 0.15))
    elif e["k"] == "typ":
        t = e["t"]
        while t < e["t"] + e["d"] - 0.05:
            add(tick(), t); t += 0.07 + rng.random() * 0.06
tt = np.arange(n) / SR
bed = 0.05 * (np.sin(2 * np.pi * 55 * tt) + 0.6 * np.sin(2 * np.pi * 82.4 * tt)) * (0.6 + 0.4 * np.sin(2 * np.pi * 0.5 * tt))
fade = np.minimum(1, np.minimum(tt / 0.5, (tt[-1] - tt) / 0.8))
a = (a + bed) * fade
a = a / max(1, np.abs(a).max() / 0.9)
sf.write(d + "/sfx.wav", a.astype(np.float32), SR)
print("ok", T["total"])
