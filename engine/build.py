import sys, json, re, os
d = sys.argv[1]
P = json.load(open(os.path.join(d, "plan_src.json")))
T = json.load(open(os.path.join(d, "timing.json")))
scenes, caps = [], []
for p, tm in zip(P, T["timing"]):
    sents = re.split(r'(?<=[.!?])\s+', p["text"])
    st = tm["start"]
    for s in p["scenes"]:
        s = dict(s); s["t0"] = st[s["at"]]; scenes.append(s)
    for i, s in enumerate(sents):
        t0 = st[i]; t1 = st[i + 1] - 0.25 if i + 1 < len(sents) else tm["end"] - 0.6
        words = s.split()
        groups, g = [], []
        for w in words:
            if g and (len(" ".join(g + [w])) > 40 or len(g) >= 7):
                groups.append(g); g = []
            g.append(w)
        if g: groups.append(g)
        # merge a dangling single short word into previous group
        if len(groups) > 1 and len(groups[-1]) == 1 and len(" ".join(groups[-2] + groups[-1])) <= 48:
            last = groups.pop(); groups[-1] += last
        tot = sum(len(" ".join(x)) for x in groups)
        t = t0
        for x in groups:
            dur = (t1 - t0) * len(" ".join(x)) / tot
            caps.append({"t0": round(t, 3), "t1": round(t + dur, 3), "text": " ".join(x)})
            t += dur
scenes[0]["t0"] = 0
for i, s in enumerate(scenes):
    s["t1"] = scenes[i + 1]["t0"] if i + 1 < len(scenes) else T["total"]
json.dump({"scenes": scenes, "caps": caps, "total": T["total"]}, open(os.path.join(d, "plan.json"), "w"), indent=1)
print(len(scenes), "scenes", len(caps), "caps", T["total"], "s")
ph = [s for s in scenes if s["type"] == "photo"]
print("photos", len(ph), [round(s["t0"]) for s in ph])
