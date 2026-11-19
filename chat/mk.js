// node mk.js story.json outdir
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const [storyF, outD] = process.argv.slice(2);
const st = JSON.parse(fs.readFileSync(storyF, 'utf8'));
fs.mkdirSync(outD, { recursive: true });
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + path.join(__dirname, 'chat.html'));
  await p.evaluate(() => document.fonts.ready);
  const states = [], events = [];
  let t = 0, msgs = [];
  const push = async (S, dur, ev) => {
    const f = path.join(outD, `s${String(states.length).padStart(3, '0')}.png`);
    await p.evaluate(s => state(s), S);
    await p.waitForTimeout(60);
    await p.screenshot({ path: f });
    if (ev) events.push({ t, ...ev });
    states.push({ f, dur }); t += dur;
  };
  for (const e of st.events) {
    if (e.card) { await push({ title: '', card: e.card }, e.dur, { k: 'whoosh' }); continue; }
    if (e.typing) await push({ title: st.title, who: st.who, msgs, typing: e.s }, e.typing, { k: 'typ', d: e.typing });
    msgs = msgs.concat([{ s: e.s, t: e.t, c: e.c }]);
    await push({ title: st.title, who: st.who, msgs }, e.dur, { k: e.s === 'r' ? 'ding_r' : 'ding_l' });
  }
  fs.writeFileSync(path.join(outD, 'timeline.json'), JSON.stringify({ states, events, total: t }, null, 1));
  fs.writeFileSync(path.join(outD, 'list.txt'), states.map(s => `file '${s.f}'\nduration ${s.dur}`).join('\n') + `\nfile '${states[states.length - 1].f}'\n`);
  await b.close();
  console.log('states', states.length, 'total', t.toFixed(2));
})();
