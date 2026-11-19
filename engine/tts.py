import sys, json, re, os
import numpy as np, soundfile as sf
sys.path.insert(0, os.path.dirname(__file__))
from norm import norm
from kokoro_onnx import Kokoro

d = sys.argv[1]
voice = sys.argv[2] if len(sys.argv) > 2 else "am_michael"
speed = float(sys.argv[3]) if len(sys.argv) > 3 else 1.0
P = json.load(open(os.path.join(d, "plan_src.json")))
k = Kokoro("/home/claude/tts/kokoro.onnx", "/home/claude/tts/voices.bin")
SR = 24000
GS, GP, LEAD = 0.30, 0.75, 0.5
chunks = [np.zeros(int(LEAD * SR), dtype=np.float32)]
t = LEAD
timing = []
for pi, p in enumerate(P):
    sents = re.split(r'(?<=[.!?])\s+', p["text"])
    st = []
    for si, s in enumerate(sents):
        a, sr = k.create(norm(s), voice=voice, speed=speed, lang="en-us")
        a = a.astype(np.float32)
        st.append(round(t, 3))
        chunks.append(a); t += len(a) / SR
        gap = GS if si < len(sents) - 1 else GP
        chunks.append(np.zeros(int(gap * SR), dtype=np.float32)); t += gap
    timing.append({"start": st, "end": round(t, 3)})
    print(pi, round(t, 1), flush=True)
chunks.append(np.zeros(int(1.5 * SR), dtype=np.float32)); t += 1.5
sf.write(os.path.join(d, "narration.wav"), np.concatenate(chunks), SR)
json.dump({"timing": timing, "total": round(t, 3)}, open(os.path.join(d, "timing.json"), "w"))
print("total", t)
