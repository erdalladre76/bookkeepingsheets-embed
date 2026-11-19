// node render.js plan.json out.mp4 from to width [fps]
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
const [planF, out, from, to, width, fpsA] = process.argv.slice(2);
const fps = +(fpsA || 24), W = +width, H = Math.round(W * 1080 / 1920);
(async () => {
  const plan = require(path.resolve(planF));
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: W, height: H } });
  await pg.goto('file://' + path.join(__dirname, 'scenes.html'));
  await pg.evaluate(([p, i, s]) => init(p, i, s), [plan, 'file://' + path.join(__dirname, '..', 'img'), W / 1920]);
  const ff = spawn('ffmpeg', ['-loglevel', 'error', '-y', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-pix_fmt', 'yuv420p', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const n0 = Math.round(+from * fps), n1 = Math.round(+to * fps);
  for (let n = n0; n < n1; n++) {
    await pg.evaluate(t => setT(t), n / fps);
    const buf = await pg.screenshot({ type: 'jpeg', quality: 90 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (n % 480 === 0) console.log(out, n, '/', n1);
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  await b.close();
  console.log('done', out);
})();
