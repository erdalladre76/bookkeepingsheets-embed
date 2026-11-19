// node ov.js out.png "TOP TITLE with <em>x</em>" "Free … calculator"
const { chromium } = require('playwright');
const [out, title, calc] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  const fs=require('fs');fs.writeFileSync('/home/claude/yt/sh/_ov.html',`<html><head><style>
@font-face{font-family:M;font-weight:800;src:url(file:///home/claude/yt/node_modules/@fontsource/manrope/files/manrope-latin-800-normal.woff2)}
*{margin:0}body{width:1080px;height:1920px;background:transparent;font-family:M;color:#fff;position:relative}
.t{position:absolute;left:50px;right:50px;top:230px;text-align:center;font-weight:800;font-size:84px;line-height:1.05;text-shadow:0 4px 18px rgba(0,0,0,.6)}
.t em{font-style:normal;color:#f5b731}
.b{position:absolute;left:0;right:0;bottom:250px;text-align:center}
.c{display:inline-block;background:#f5b731;color:#0b1d3a;font-weight:800;font-size:44px;padding:14px 30px;border-radius:14px}
.u{margin-top:22px;font-weight:800;font-size:52px;text-shadow:0 3px 12px rgba(0,0,0,.6)}.u span{color:#3ccf86}
</style></head><body><div class="t">${title}</div><div class="b"><div class="c">${calc}</div><div class="u">bookkeeping<span>sheets</span>.com</div></div></body></html>`);await p.goto('file:///home/claude/yt/sh/_ov.html');
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: out, omitBackground: true });
  await b.close();
})();
