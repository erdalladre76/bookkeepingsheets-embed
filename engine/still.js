const { chromium } = require('playwright'); const path=require('path');
const [planF, outF] = process.argv.slice(2);
(async()=>{const plan=require(path.resolve(planF));const b=await chromium.launch();const pg=await b.newPage({viewport:{width:640,height:360}});
await pg.goto('file://'+path.join(__dirname,'scenes.html'));await pg.evaluate(([p,i,s])=>init(p,i,s),[plan,'file://'+path.join(__dirname,'..','img'),640/1920]);
const shots=[];for(const s of plan.scenes){const t=Math.min(s.t1-0.1,s.t0+Math.max(2.5,(s.t1-s.t0)*0.85));await pg.evaluate(t=>setT(t),t);shots.push(await pg.screenshot({type:'jpeg',quality:80}));}
const html='<body style="margin:0;display:flex;flex-wrap:wrap;width:1920px;background:#000">'+shots.map(x=>'<img src="data:image/jpeg;base64,'+x.toString('base64')+'">').join('')+'</body>';
const p2=await b.newPage({viewport:{width:1920,height:360*Math.ceil(shots.length/3)}});await p2.setContent(html);await p2.screenshot({path:outF,fullPage:true});await b.close();})();
