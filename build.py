#!/usr/bin/env python3
"""Build embeddable calculator pages for GitHub Pages from calcs.json.

calcs.json: {slug: {"title": str, "desc": str, "tools": [ids], "scr": [js...], "sty": [css...]}}
Each calculator gets /<slug>/index.html: the live calculator plus a credit link
back to the full page on bookkeepingsheets.com. The root index.html lists them
with copy-paste embed codes.
"""
import html, json, os, re

SITE = "https://bookkeepingsheets.com"
BASE = "https://erdalladre76.github.io/bookkeepingsheets-embed"
D = json.load(open("calcs.json", encoding="utf-8"))

HEAD_CSS = """@font-face{font-family:Manrope;src:url(../assets/manrope.woff2) format('woff2');font-weight:200 800;font-display:swap}
html,body{margin:0;padding:0;background:#fff}
body{font-family:Manrope,system-ui,-apple-system,'Segoe UI',Arial,sans-serif;color:#1b2733;font-size:16px;line-height:1.5;padding:4px 10px 0}
.bk2{margin:0!important}
.bse-credit{font-size:13px;color:#64748b;text-align:center;padding:10px 6px 14px}
.bse-credit a{color:#0f766e;font-weight:700;text-decoration:none}
.bse-credit a:hover{text-decoration:underline}"""

RESIZE = """(function(){function h(){try{parent.postMessage({bsEmbed:1,h:document.documentElement.scrollHeight},'*')}catch(e){}}
window.addEventListener('load',function(){h();setTimeout(h,600);setTimeout(h,2000)});
if(window.ResizeObserver)new ResizeObserver(h).observe(document.body);})();"""


def clean_title(t):
    t = re.sub(r"\s+", " ", t or "").strip()
    return t


def page(slug, c):
    url = f"{SITE}/{slug}/"
    title = clean_title(c["title"])
    tools = "".join(f'<div id="{html.escape(t)}" class="bs-tool"></div>' for t in c["tools"])
    styles = "".join(f"<style>{s}</style>" for s in c.get("sty", []))
    scripts = "".join(f"<script>{s.replace('</script', '<\\/script')}</script>" for s in c["scr"] if s.strip())
    return f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{html.escape(title)} – Bookkeeping Sheets</title>
<meta name="robots" content="noindex,follow">
<link rel="canonical" href="{url}">
<style>{HEAD_CSS}</style>{styles}
<script>window.BS_PAGE={json.dumps(url)};</script>
</head><body>
{tools}
<div class="bse-credit">Free calculator by <a href="{url}?utm_source=embed&utm_medium=iframe" target="_blank" rel="noopener">Bookkeeping Sheets</a></div>
{scripts}
<script src="../assets/kit.js"></script>
<script>{RESIZE}</script>
</body></html>
"""


AUTO = ("<script>addEventListener('message',function(e){if(e.origin==='https://erdalladre76.github.io'&&e.data&&e.data.bsEmbed){"
        "var f=document.querySelectorAll('iframe[data-bs-embed]');for(var i=0;i<f.length;i++)if(f[i].contentWindow===e.source)"
        "f[i].style.height=(e.data.h+4)+'px'}})</script>")


def embed_code(slug, c, h=900):
    url = f"{SITE}/{slug}/"
    t = html.escape(clean_title(c["title"]))
    return (f'<iframe data-bs-embed src="{BASE}/{slug}/" title="{t}" width="100%" height="{h}" '
            f'style="border:1px solid #e2e8f0;border-radius:12px;max-width:760px" loading="lazy"></iframe>\n'
            f'<p style="font-size:13px">Free <a href="{url}">{t}</a> by <a href="{SITE}/">Bookkeeping Sheets</a></p>\n'
            + AUTO)


def index():
    items = []
    for slug, c in sorted(D.items(), key=lambda kv: clean_title(kv[1]["title"])):
        code = html.escape(embed_code(slug, c))
        t = html.escape(clean_title(c["title"]))
        items.append(f"""<section class="it"><h2>{t}</h2>
<p><a href="{SITE}/{slug}/">Full page with formulas and examples</a> · <a href="{slug}/" target="_blank" rel="noopener">Preview</a></p>
<textarea readonly aria-label="Embed code for {t}">{code}</textarea>
<button type="button">Copy embed code</button></section>""")
    return f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Free Calculators to Embed – Bookkeeping Sheets</title>
<meta name="description" content="Free small business calculators you can embed on your website: sales tax, paycheck, self-employment tax, mileage and more. Copy the code, paste it into your page.">
<link rel="canonical" href="{SITE}/calculators/">
<style>
@font-face{{font-family:Manrope;src:url(assets/manrope.woff2) format('woff2');font-weight:200 800}}
:root{{--ink:#0f1e3a;--mut:#475569;--acc:#0f766e;--bg:#fbf7ef;--card:#fff;--line:#e2e8f0}}
@media (prefers-color-scheme:dark){{:root:not([data-theme=light]){{--ink:#e2e8f0;--mut:#94a3b8;--acc:#2dd4bf;--bg:#0b1220;--card:#111a2e;--line:#22304a}}}}
body{{margin:0;background:var(--bg);color:var(--ink);font-family:Manrope,system-ui,sans-serif}}
main{{max-width:880px;margin:0 auto;padding:28px 16px 60px}}
h1{{font-size:clamp(26px,5vw,40px);margin:.2em 0}} p.lead{{color:var(--mut);font-size:17px}}
.it{{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:16px;margin:14px 0}}
.it h2{{font-size:19px;margin:0 0 4px}} .it p{{margin:0 0 10px;font-size:14px}} a{{color:var(--acc)}}
textarea{{width:100%;box-sizing:border-box;height:96px;font:12px/1.4 ui-monospace,monospace;border:1px solid var(--line);border-radius:8px;padding:8px;background:transparent;color:var(--ink)}}
button{{margin-top:8px;background:var(--acc);color:#fff;border:0;border-radius:8px;padding:8px 14px;font-weight:700;cursor:pointer}}
</style></head><body><main>
<p><a href="{SITE}/">← bookkeepingsheets.com</a></p>
<h1>Free calculators for your website</h1>
<p class="lead">Add any of our small business calculators to your blog, client portal or resource page. Copy the code and paste it into an HTML block (WordPress, Squarespace, Wix, Webflow, Ghost). Free for any site — please keep the credit line.</p>
{''.join(items)}
<p style="color:var(--mut);font-size:13px">General information only, not tax, legal or financial advice. We update these calculators when IRS rates and limits change, so your embed stays current.</p>
</main>
<script>document.querySelectorAll('.it button').forEach(function(b){{b.onclick=function(){{var t=b.previousElementSibling;t.select();(navigator.clipboard?navigator.clipboard.writeText(t.value):Promise.reject()).catch(function(){{document.execCommand('copy')}});b.textContent='Copied ✓';setTimeout(function(){{b.textContent='Copy embed code'}},1800)}}}})</script>
</body></html>
"""


for slug, c in D.items():
    os.makedirs(slug, exist_ok=True)
    open(os.path.join(slug, "index.html"), "w", encoding="utf-8").write(page(slug, c))
open("index.html", "w", encoding="utf-8").write(index())
json.dump({s: embed_code(s, c) for s, c in D.items()}, open("embed-codes.json", "w", encoding="utf-8"), indent=1)
print(len(D), "calculators built")
