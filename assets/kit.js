(function(){
if(window.BSKit)return;
var XLSX_URL='https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function num(v){v=parseFloat(String(v==null?'':v).replace(/[$,%\s]/g,''));return isFinite(v)?v:NaN}
function money(v,d){if(!isFinite(v))return '-';d=d==null?2:d;return (v<0?'-':'')+'$'+Math.abs(v).toLocaleString('en-US',{minimumFractionDigits:d,maximumFractionDigits:d})}
function pct(v,d){if(!isFinite(v))return '-';return (Math.round(v*Math.pow(10,d==null?2:d))/Math.pow(10,d==null?2:d)).toLocaleString('en-US',{maximumFractionDigits:d==null?2:d})+'%'}
function int(v){return isFinite(v)?Math.round(v).toLocaleString('en-US'):'-'}
function txt(h){var d=document.createElement('div');d.innerHTML=h;return (d.textContent||'').trim()}
function b64e(s){return btoa(unescape(encodeURIComponent(s))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')}
function b64d(s){s=s.replace(/-/g,'+').replace(/_/g,'/');while(s.length%4)s+='=';return decodeURIComponent(escape(atob(s)))}
var css='.bk2{--n:#12355B;--g:#1D7A4F;--m:#E8F3EC;--b:#d5dde6;font-family:inherit;margin:2rem 0;color:#1b2733}.bk2 *{box-sizing:border-box}'+
'.bk2-card{border:1px solid var(--b);border-radius:14px;background:#fff;padding:20px;box-shadow:0 2px 10px rgba(18,53,91,.06)}'+
'.bk2-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px;margin-bottom:14px}'+
'.bk2 label{display:block;font-size:.8rem;font-weight:600;color:#4a5a6a;margin-bottom:4px}'+
'.bk2 input,.bk2 select{width:100%;padding:9px 10px;border:1px solid var(--b);border-radius:8px;font:inherit;font-size:.95rem;background:#fffdf3;color:#1b2733}'+
'.bk2 input:focus,.bk2 select:focus{outline:2px solid var(--g);border-color:var(--g)}'+
'.bk2-kpi{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin-bottom:16px}.bk2-kpi div{background:#f3f6f9;border-radius:10px;padding:12px}.bk2-kpi div.g{background:var(--m)}.bk2-kpi div.w{background:#fff1dc}.bk2-kpi div.d{background:#fde4e4}'+
'.bk2-kpi b{display:block;font-size:1.25rem;color:var(--n)}.bk2-kpi span{display:block;font-size:.72rem;color:#4a5a6a;font-weight:600;text-transform:uppercase;letter-spacing:.03em;line-height:1.3}'+
'.bk2 h4{margin:14px 0 8px;font-size:.92rem;color:var(--n)}.bk2-scroll{overflow-x:auto;max-height:520px;overflow-y:auto}'+
'.bk2 table{width:100%;border-collapse:collapse;font-size:.88rem}.bk2 th{background:var(--n);color:#fff;padding:8px;font-weight:600;text-align:left;position:sticky;top:0;white-space:nowrap}.bk2 td{padding:7px 8px;border-bottom:1px solid #edf1f5}.bk2 .r{text-align:right;white-space:nowrap}'+
'.bk2 tfoot td{font-weight:700;border-top:2px solid var(--n);background:#f6f9fb}.bk2 tr.hl td{background:var(--m);font-weight:700}'+
'.bk2-note,.bk2-hint{font-size:.85rem;color:#5b6876;margin:12px 0 0}.bk2-err{color:#a12626;font-weight:600}'+
'.bk2-btn{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--n);background:#fff;color:var(--n);border-radius:9px;padding:8px 13px;font:inherit;font-size:.84rem;font-weight:600;cursor:pointer;margin:6px 6px 0 0;text-decoration:none}'+
'.bk2-btn.pr{background:var(--g);border-color:var(--g);color:#fff}.bk2-btn:hover{filter:brightness(.95)}'+
'.bk2-x{margin-top:16px;padding-top:12px;border-top:1px dashed #d5dde6}.bk2-x p{margin:0 0 4px;font-size:.72rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#1D7A4F}.bk2-msg{font-size:.82rem;color:#1D7A4F;font-weight:600;min-height:1.2em;margin-top:6px}'+
'.bk2-rep{display:none}.bk2-btn.wa{background:#25D366;border-color:#25D366;color:#fff}.bk2-wa{display:inline-flex;align-items:center;gap:7px;background:#25D366;color:#fff!important;text-decoration:none!important;font-weight:700;font-size:.86rem;line-height:1;padding:9px 14px;border-radius:99px;margin:10px 8px 4px 0}.bk2-wa svg{width:16px;height:16px;fill:#fff}'+
'@media(max-width:600px){.bk2-card{padding:14px}.bk2-grid{grid-template-columns:1fr 1fr;gap:10px}.bk2 label{font-size:.74rem;line-height:1.25;min-height:2.5em;display:flex;align-items:flex-end}.bk2-kpi{grid-template-columns:1fr 1fr;gap:8px}.bk2-kpi div{padding:10px}.bk2-kpi b{font-size:1.05rem}.bk2-kpi span{font-size:.64rem}.bk2 table{font-size:.8rem}.bk2 th,.bk2 td{padding:6px 5px}.bk2-btn{padding:8px 10px;font-size:.8rem}}'+
'@media print{html.bk2-printing body *{visibility:hidden!important}html.bk2-printing .bk2-rep,html.bk2-printing .bk2-rep *{visibility:visible!important}html.bk2-printing .bk2-rep{display:block!important;position:absolute;left:0;top:0;width:100%;padding:0 8px;font-family:Arial,sans-serif;color:#000}'+
'.bk2-rep h1{font-size:18pt;color:#12355B;margin:0 0 4pt}.bk2-rep .sub{color:#555;font-size:9pt;margin:0 0 12pt}.bk2-rep table{width:100%;border-collapse:collapse;margin:0 0 12pt;font-size:9.5pt}.bk2-rep th{background:#12355B!important;color:#fff!important;-webkit-print-color-adjust:exact;print-color-adjust:exact;text-align:left;padding:4pt}.bk2-rep td{border-bottom:1px solid #ccc;padding:3pt 4pt}.bk2-rep .r{text-align:right}.bk2-rep h2{font-size:11pt;color:#12355B;margin:10pt 0 4pt}.bsn,.bsk,.bsc-fab{display:none!important}}';
/* ---------- business details (shared by every tool, kept in this browser) ---------- */
var BRK='bs-brand-v1';
function brGet(){try{return JSON.parse(localStorage.getItem(BRK)||'{}')||{}}catch(e){return {}}}
function brSet(o){try{localStorage.setItem(BRK,JSON.stringify(o))}catch(e){}}
function today(){return new Date().toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'})}
function fmtD(s){if(!s)return today();var d=new Date(s+'T12:00:00');return isNaN(d)?s:d.toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'})}
function wide(R){var m=0;(R.tables||[]).forEach(function(T){m=Math.max(m,T.head?T.head.length:0,(T.rows[0]||[]).length)});return m>6}
function brMeta(B){var a=[];if(B.by)a.push(['Prepared by',B.by]);if(B.fr)a.push([B.frl||'Prepared for',B.fr]);if(B.ref)a.push(['Reference',B.ref]);a.push(['Date',fmtD(B.dt)]);return a}
function brSigs(B){if(!B.sig)return [];return [B.s1||'Prepared by',B.s2||'Approved by'].filter(function(s){return s})}
css+='.bk2-br{margin:4px 0 10px;border:1px solid #d5dde6;border-radius:10px;background:#f8fafc}.bk2-br summary{cursor:pointer;padding:10px 12px;font-size:.84rem;font-weight:700;color:#12355B;list-style:none}.bk2-br summary::-webkit-details-marker{display:none}.bk2-br summary:before{content:"+ ";color:#1D7A4F}.bk2-br[open] summary:before{content:"\\2212  "}'+
'.bk2-br .bk2-grid{padding:0 12px;margin:0}.bk2-br .bk2-bx{padding:8px 12px 12px;font-size:.8rem;color:#4a5a6a}.bk2-br .bk2-bx label{display:inline-flex!important;align-items:center!important;gap:6px;font-size:.8rem;margin:0 12px 6px 0;min-height:0!important;line-height:1.3}.bk2-br input[type=checkbox]{width:auto}.bk2-br input[type=file]{padding:6px;background:#fff;font-size:.8rem}.bk2-lg{display:flex;align-items:center;gap:10px}.bk2-lg img{max-height:42px;max-width:140px;border:1px solid #e3e8ee;border-radius:6px;background:#fff;padding:2px}.bk2-lg button{margin:0!important}'+
'@media print{@page{margin:12mm}html.bk2-printing .bk2-rep{box-sizing:border-box;right:0;width:auto!important;padding:0!important}html.bk2-printing .bk2-rep table{page-break-inside:auto}html.bk2-printing .bk2-rep tr{page-break-inside:avoid}html.bk2-printing .bk2-rep thead{display:table-header-group}.bk2-rep .hd{display:flex;justify-content:space-between;align-items:flex-start;gap:16pt;border-bottom:2pt solid #12355B;padding-bottom:8pt;margin-bottom:10pt}.bk2-rep .hd img{max-height:52pt;max-width:170pt;display:block;margin-bottom:4pt}.bk2-rep .co{font-size:13pt;font-weight:700;color:#12355B}.bk2-rep .ad{font-size:8.5pt;color:#444;white-space:pre-line}.bk2-rep .hr{text-align:right}.bk2-rep .hr h1{margin:0 0 4pt}.bk2-rep .meta{font-size:9pt;color:#222;border-collapse:collapse;margin-left:auto}.bk2-rep .meta td{border:0;padding:1pt 0 1pt 10pt}.bk2-rep .meta td:first-child{color:#666}'+
'.bk2-rep .nt{font-size:9pt;border:1px solid #ccc;padding:6pt;margin:8pt 0;white-space:pre-line}.bk2-rep .sg{display:flex;gap:28pt;margin-top:26pt;page-break-inside:avoid}.bk2-rep .sg div{flex:1;font-size:8.5pt;color:#333}.bk2-rep .sg i{display:block;border-bottom:1px solid #000;height:30pt;margin-bottom:3pt}.bk2-rep .ft{margin-top:14pt;font-size:7.5pt;color:#888;border-top:1px solid #ddd;padding-top:4pt}.bk2-rep.w table{font-size:8.5pt}}';
function brForm(){var B=brGet();
 var f=function(id,l,ph,t){return '<div><label>'+esc(l)+'</label><input data-b="'+id+'" type="'+(t||'text')+'" placeholder="'+esc(ph||'')+'" value="'+esc(B[id]||'')+'"></div>'};
 return '<details class="bk2-br"'+(B.co||B.logo?' open':'')+'><summary>Add your business name, logo and signature lines to the printout (optional)</summary><div class="bk2-grid">'+
  f('co','Business name','Your Company LLC')+f('ad','Address, phone or email','123 Main St, Austin, TX · (512) 555-0100')+
  '<div><label>Logo (PNG or JPG)</label><div class="bk2-lg">'+(B.logo?'<img alt="Logo" src="'+B.logo+'"><button type="button" class="bk2-btn" data-b-rm="1">Remove</button>':'<input type="file" accept="image/png,image/jpeg" data-b-logo="1">')+'</div></div>'+
  f('by','Prepared by','Name')+'<div><label>Second name field</label><select data-b="frl">'+['Prepared for','Client','Employee','Customer','Project','Vendor'].map(function(o){return '<option'+((B.frl||'Prepared for')===o?' selected':'')+'>'+o+'</option>'}).join('')+'</select></div>'+f('fr','Name for that field','Client, employee or project')+
  f('ref','Reference / invoice / job #','INV-1042')+f('dt','Report date','','date')+f('nt','Notes for the printout','Payment due in 30 days')+
  '</div><div class="bk2-bx"><label><input type="checkbox" data-b="sig"'+(B.sig?' checked':'')+'> Add signature lines</label><label>Line 1 <input data-b="s1" type="text" style="width:130px" value="'+esc(B.s1||'Prepared by')+'"></label><label>Line 2 <input data-b="s2" type="text" style="width:130px" value="'+esc(B.s2||'Approved by')+'"></label><div style="margin-top:6px">Saved in this browser only and reused on every calculator. Nothing is uploaded.</div></div></details>'}
function brWire(x){x.addEventListener('input',function(e){var k=e.target.getAttribute('data-b');if(!k)return;var B=brGet();B[k]=e.target.type==='checkbox'?e.target.checked:e.target.value;brSet(B)});
 x.addEventListener('change',function(e){var k=e.target.getAttribute('data-b');if(k){var B=brGet();B[k]=e.target.type==='checkbox'?e.target.checked:e.target.value;brSet(B)}
  if(e.target.hasAttribute('data-b-logo')){var fl=e.target.files&&e.target.files[0];if(!fl)return;var rd=new FileReader();rd.onload=function(){var im=new Image();im.onload=function(){var s=Math.min(1,600/im.width,240/im.height),c=document.createElement('canvas');c.width=Math.round(im.width*s);c.height=Math.round(im.height*s);var g=c.getContext('2d');g.drawImage(im,0,0,c.width,c.height);var B=brGet();B.logo=c.toDataURL('image/png');B.lw=c.width;B.lh=c.height;brSet(B);redraw(x)};im.src=rd.result};rd.readAsDataURL(fl)}});
 x.addEventListener('click',function(e){if(e.target.hasAttribute('data-b-rm')){var B=brGet();delete B.logo;delete B.lw;delete B.lh;brSet(B);redraw(x)}})}
function redraw(x){var d=x.querySelector('.bk2-br');if(!d)return;var t=document.createElement('div');t.innerHTML=brForm();var n=t.firstChild;n.open=true;d.parentNode.replaceChild(n,d)}
function brTop(R,B){var meta=brMeta(B),L='';if(B.logo)L+='<img src="'+B.logo+'" alt="">';if(B.co)L+='<div class="co">'+esc(B.co)+'</div>';if(B.ad)L+='<div class="ad">'+esc(B.ad)+'</div>';
 return '<div class="hd"><div>'+(L||'&nbsp;')+'</div><div class="hr"><h1>'+esc(R.title)+'</h1><table class="meta">'+meta.map(function(m){return '<tr><td>'+esc(m[0])+'</td><td><b>'+esc(m[1])+'</b></td></tr>'}).join('')+'</table></div></div>'}
function brEnd(B){var h='';if(B.nt)h+='<div class="nt">'+esc(B.nt)+'</div>';var s=brSigs(B);if(s.length)h+='<div class="sg">'+s.map(function(l){return '<div><i></i>'+esc(l)+' &nbsp;·&nbsp; Name / signature / date</div>'}).join('')+'</div>';
 return h+'<div class="ft">Created '+today()+' with the free calculator at bookkeepingsheets.com</div>'}

/* ---------- Excel writer (styled .xlsx, fits the page when printed) ---------- */
function xlsx(R){var B=brGet(),W=wide(R),rows=[],merges=[],XF=[[0,0,0,0,0]],xfi={},maxc=2;
 function xf(font,fill,fmt,bd,al){var k=[font,fill,fmt,bd,al].join(',');if(xfi[k]==null){xfi[k]=XF.length;XF.push([font,fill,fmt,bd,al])}return xfi[k]}
 function sv(v){var s=String(v==null?'':v).trim(),m=s.match(/^(-?)\$?(-?)([\d,]+)(\.\d+)?(%?)$/);if(!m||s==='')return null;var n=parseFloat((m[1]||m[2]?'-':'')+m[3].replace(/,/g,'')+(m[4]||''));if(!isFinite(n))return null;
  var pc=m[5]==='%',d=m[4]?m[4].length-1:0;if(pc)return [n/100,d?166:169];if(s.indexOf('$')>=0)return [n,d?164:165];return [n,d?167:168]}
 function add(cells,ht){rows.push({c:cells,h:ht});maxc=Math.max(maxc,cells.length);return rows.length}
 var c0=B.logo?1:0;
 if(B.logo||B.co){var r1=[];if(B.logo)r1.push(['',0]);r1.push([B.co||'',xf(3,0,0,0,0)]);add(r1,B.logo?Math.max(30,Math.min(60,(B.lh||60)*0.75*Math.min(1,150/(B.lw||150)))):22)}
 if(B.ad){var r2=[];if(c0)r2.push(['',0]);r2.push([B.ad,xf(4,0,0,0,0)]);add(r2)}
 add([[R.title,xf(5,0,0,0,0)]],24);
 brMeta(B).forEach(function(m){add([[m[0],xf(4,0,0,0,0)],[m[1],xf(1,0,0,0,0)]])});add([]);
 function sec(t){if(t)add([[t,xf(6,0,0,2,0)]],18)}
 function line(r,o){o=o||{};return r.map(function(v,i){var n=sv(v);if(o.h)return [v,xf(2,2,0,0,i?2:0)];if(n)return [n[0],xf(o.b?1:0,o.b?3:0,n[1],o.b?1:0,2)];return [v,xf(o.b?1:0,o.b?3:0,0,o.b?1:0,0)]})}
 if(R.inputs&&R.inputs.length){sec('Inputs');R.inputs.forEach(function(r){add(line(r))});add([])}
 if(R.kpis&&R.kpis.length){sec('Results');R.kpis.forEach(function(r){add(line(r))});add([])}
 (R.tables||[]).forEach(function(T){sec(T.title||'');if(T.head)add(line(T.head,{h:1}),30);T.rows.forEach(function(r){add(line(r))});if(T.foot)add(line(T.foot,{b:1}));add([])});
 if(R.note)add([[R.note,xf(4,0,0,0,3)]],48);
 if(B.nt){add([['Notes',xf(1,0,0,0,0)]]);add([[B.nt,xf(0,0,0,0,3)]],36)}
 var sg=brSigs(B);if(sg.length){add([]);add([]);var a=[],b=[];sg.forEach(function(l,i){if(i)a.push(['',0]),b.push(['',0]);a.push(['',xf(0,0,0,1,0)],['',xf(0,0,0,1,0)]);b.push([l+' (name, signature, date)',xf(4,0,0,0,0)],['',0])});add(a,30);add(b)}
 add([]);add([['Created '+today()+' with the free calculator at bookkeepingsheets.com',xf(4,0,0,0,0)]]);
 function col(i){var s='';i++;while(i){var m=(i-1)%26;s=String.fromCharCode(65+m)+s;i=(i-m-1)/26}return s}
 function x(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
 if(R.note)merges.push('A'+rows.length);
 var sd='';rows.forEach(function(r,ri){var n=ri+1;sd+='<row r="'+n+'"'+(r.h?' ht="'+r.h+'" customHeight="1"':'')+'>';r.c.forEach(function(c,ci){var v=c[0],s=c[1],ref=col(ci)+n;if(v===''||v==null){if(s)sd+='<c r="'+ref+'" s="'+s+'"/>';return}
   if(typeof v==='number')sd+='<c r="'+ref+'" s="'+s+'"><v>'+v+'</v></c>';else sd+='<c r="'+ref+'" s="'+s+'" t="inlineStr"><is><t xml:space="preserve">'+x(v)+'</t></is></c>'});sd+='</row>'});
 var mc=[];rows.forEach(function(r,ri){if(r.c.length===1&&r.c[0][1]&&XF[r.c[0][1]][4]===3)mc.push('A'+(ri+1)+':'+col(Math.max(maxc,4)-1)+(ri+1))});
 var cw=[];for(var i=0;i<maxc;i++)cw.push(i===0?38:(maxc>6?14:18));if(maxc<3)cw[1]=40;
 var ws='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheetPr><pageSetUpPr fitToPage="1"/></sheetPr><sheetViews><sheetView workbookViewId="0" showGridLines="0"/></sheetViews><sheetFormatPr defaultRowHeight="15"/><cols>'+cw.map(function(w,i){return '<col min="'+(i+1)+'" max="'+(i+1)+'" width="'+w+'" customWidth="1"/>'}).join('')+'</cols><sheetData>'+sd+'</sheetData>'+(mc.length?'<mergeCells count="'+mc.length+'">'+mc.map(function(m){return '<mergeCell ref="'+m+'"/>'}).join('')+'</mergeCells>':'')+
  '<printOptions horizontalCentered="1"/><pageMargins left="0.5" right="0.5" top="0.6" bottom="0.6" header="0.3" footer="0.3"/><pageSetup paperSize="1" orientation="'+(W?'landscape':'portrait')+'" fitToWidth="1" fitToHeight="0"/><headerFooter><oddFooter>&amp;L&amp;8'+x(B.co||'bookkeepingsheets.com')+'&amp;R&amp;8Page &amp;P of &amp;N</oddFooter></headerFooter>'+(B.logo?'<drawing r:id="rId1"/>':'')+'</worksheet>';
 var fonts=['<font><sz val="10"/><name val="Arial"/></font>','<font><b/><sz val="10"/><name val="Arial"/></font>','<font><b/><sz val="10"/><color rgb="FFFFFFFF"/><name val="Arial"/></font>','<font><b/><sz val="14"/><color rgb="FF12355B"/><name val="Arial"/></font>','<font><sz val="9"/><color rgb="FF5B6876"/><name val="Arial"/></font>','<font><b/><sz val="16"/><color rgb="FF12355B"/><name val="Arial"/></font>','<font><b/><sz val="11"/><color rgb="FF12355B"/><name val="Arial"/></font>'];
 var fills=['<fill><patternFill patternType="none"/></fill>','<fill><patternFill patternType="gray125"/></fill>','<fill><patternFill patternType="solid"><fgColor rgb="FF12355B"/></patternFill></fill>','<fill><patternFill patternType="solid"><fgColor rgb="FFF2F5F8"/></patternFill></fill>'];
 var borders=['<border><left/><right/><top/><bottom/><diagonal/></border>','<border><left/><right/><top style="thin"><color rgb="FF12355B"/></top><bottom style="thin"><color rgb="FF000000"/></bottom><diagonal/></border>','<border><left/><right/><top/><bottom style="medium"><color rgb="FF1D7A4F"/></bottom><diagonal/></border>'];
 var al=['','<alignment vertical="center"/>','<alignment horizontal="right" vertical="center"/>','<alignment wrapText="1" vertical="top"/>'];
 var st='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><numFmts count="6"><numFmt numFmtId="164" formatCode="&quot;$&quot;#,##0.00;-&quot;$&quot;#,##0.00"/><numFmt numFmtId="165" formatCode="&quot;$&quot;#,##0;-&quot;$&quot;#,##0"/><numFmt numFmtId="166" formatCode="0.0%"/><numFmt numFmtId="167" formatCode="#,##0.00"/><numFmt numFmtId="168" formatCode="#,##0"/><numFmt numFmtId="169" formatCode="0%"/></numFmts><fonts count="'+fonts.length+'">'+fonts.join('')+'</fonts><fills count="4">'+fills.join('')+'</fills><borders count="3">'+borders.join('')+'</borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="'+XF.length+'">'+
  XF.map(function(f){return '<xf numFmtId="'+f[2]+'" fontId="'+f[0]+'" fillId="'+f[1]+'" borderId="'+f[3]+'" xfId="0"'+(f[2]?' applyNumberFormat="1"':'')+(f[0]?' applyFont="1"':'')+(f[1]?' applyFill="1"':'')+(f[3]?' applyBorder="1"':'')+(f[4]?' applyAlignment="1">'+al[f[4]]+'</xf>':'/>')}).join('')+'</cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>';
 var z=new JSZip(),sn=(R.title||'Report').replace(/[\\\/\?\*\[\]:]/g,'').slice(0,31)||'Report';
 z.file('[Content_Types].xml','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>'+(B.logo?'<Override PartName="/xl/drawings/drawing1.xml" ContentType="application/vnd.openxmlformats-officedocument.drawing+xml"/>':'')+'</Types>');
 z.file('_rels/.rels','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>');
 z.file('xl/workbook.xml','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="'+x(sn)+'" sheetId="1" r:id="rId1"/></sheets></workbook>');
 z.file('xl/_rels/workbook.xml.rels','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>');
 z.file('xl/styles.xml',st);z.file('xl/worksheets/sheet1.xml',ws);
 if(B.logo){var ew=Math.round((B.lw||150)*Math.min(1,150/(B.lw||150))*9525),eh=Math.round((B.lh||60)*Math.min(1,150/(B.lw||150))*9525);
  if(eh>60*12700){var k=60*12700/eh;eh=Math.round(eh*k);ew=Math.round(ew*k)}
  z.file('xl/worksheets/_rels/sheet1.xml.rels','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing" Target="../drawings/drawing1.xml"/></Relationships>');
  z.file('xl/drawings/_rels/drawing1.xml.rels','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/logo.png"/></Relationships>');
  z.file('xl/drawings/drawing1.xml','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><xdr:wsDr xmlns:xdr="http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><xdr:oneCellAnchor><xdr:from><xdr:col>0</xdr:col><xdr:colOff>38100</xdr:colOff><xdr:row>0</xdr:row><xdr:rowOff>38100</xdr:rowOff></xdr:from><xdr:ext cx="'+ew+'" cy="'+eh+'"/><xdr:pic><xdr:nvPicPr><xdr:cNvPr id="2" name="Logo"/><xdr:cNvPicPr><a:picLocks noChangeAspect="1"/></xdr:cNvPicPr></xdr:nvPicPr><xdr:blipFill><a:blip r:embed="rId1"/><a:stretch><a:fillRect/></a:stretch></xdr:blipFill><xdr:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="'+ew+'" cy="'+eh+'"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></xdr:spPr></xdr:pic><xdr:clientData/></xdr:oneCellAnchor></xdr:wsDr>');
  z.file('xl/media/logo.png',B.logo.split(',')[1],{base64:true})}
 return z.generateAsync({type:'blob',compression:'DEFLATE',mimeType:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})}

/* ---------- business details for the template tools that have their own export buttons ---------- */
css+='@media print{.bk2-br{display:none!important}}';
function extTools(){return [].slice.call(document.querySelectorAll('.bs-tool')).filter(function(el){return !el.classList.contains('bk2')&&el.querySelector('[id$="-xlsx"]')})}
function extForm(){extTools().forEach(function(el){if(el.querySelector('.bk2-br'))return;var b=el.querySelector('[id$="-xlsx"]'),row=b.parentNode;var w=document.createElement('div');w.className='bk2 bk2-ext';w.style.margin='10px 0 4px';w.innerHTML=brForm();row.parentNode.insertBefore(w,row);brWire(w)})}
function sty(o){return Object.keys(o).map(function(k){return k+':'+o[k]}).join(';')}
function extHead(B){var meta=brMeta(B),L='';if(!B.co&&!B.logo&&!B.by&&!B.fr&&!B.ref&&!B.ad)return '';
 if(B.logo)L+='<img src="'+B.logo+'" alt="" style="max-height:50pt;max-width:170pt;display:block;margin-bottom:4pt">';if(B.co)L+='<div style="font-size:13pt;font-weight:700;color:#12355B">'+esc(B.co)+'</div>';if(B.ad)L+='<div style="font-size:8.5pt;color:#444;white-space:pre-line">'+esc(B.ad)+'</div>';
 return '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:16pt;border-bottom:2pt solid #12355B;padding-bottom:6pt;margin:0 0 10pt;font-family:Arial,sans-serif"><div>'+L+'</div><table style="font-size:9pt;border-collapse:collapse;width:auto">'+meta.map(function(m){return '<tr><td style="border:0;padding:1pt 8pt 1pt 0;color:#666;background:none">'+esc(m[0])+'</td><td style="border:0;padding:1pt 0;background:none"><b>'+esc(m[1])+'</b></td></tr>'}).join('')+'</table></div>'}
function extFoot(B){var h='';if(B.nt)h+='<div style="font-size:9pt;border:1px solid #ccc;padding:6pt;margin:8pt 0;white-space:pre-line">'+esc(B.nt)+'</div>';var s=brSigs(B);
 if(s.length)h+='<div style="display:flex;gap:28pt;margin-top:26pt;page-break-inside:avoid;font-family:Arial,sans-serif">'+s.map(function(l){return '<div style="flex:1;font-size:8.5pt;color:#333"><div style="border-bottom:1px solid #000;height:30pt;margin-bottom:3pt"></div>'+esc(l)+' &nbsp;·&nbsp; Name / signature / date</div>'}).join('')+'</div>';return h}
window.addEventListener('beforeprint',function(){if(document.documentElement.classList.contains('bk2-printing'))return;var B=brGet(),hd=extHead(B),ft=extFoot(B);if(!hd&&!ft)return;
 extTools().forEach(function(el){var b=el.querySelector('[id$="-xlsx"]'),rp=b.closest('[class*="report"]')||el.querySelector('[class*="-report"]');if(!rp||rp.querySelector('.bk2-pa'))return;
  if(hd){var a=document.createElement('div');a.className='bk2-pa';a.innerHTML=hd;rp.insertBefore(a,rp.firstChild)}if(ft){var z=document.createElement('div');z.className='bk2-pa';z.innerHTML=ft;rp.appendChild(z)}})});
window.addEventListener('afterprint',function(){[].forEach.call(document.querySelectorAll('.bk2-pa'),function(n){n.remove()})});
/* Word (.doc) files built as HTML: add the business block and signature lines */
(function(){var OB=window.Blob;if(!OB||OB.__bk2)return;function NB(parts,opts){try{if(opts&&/msword/.test(opts.type||'')&&parts&&parts.length===1&&typeof parts[0]==='string'&&parts[0].indexOf('<body')>=0){var B=brGet(),meta=brMeta(B),h='';
  if(B.co||B.by||B.fr||B.ref||B.ad){h='<table style="width:100%;border-collapse:collapse;border-bottom:2pt solid #12355B;margin-bottom:10pt"><tr><td style="border:0;vertical-align:top">'+(B.co?'<p style="font-size:14pt;font-weight:bold;color:#12355B;margin:0">'+esc(B.co)+'</p>':'')+(B.ad?'<p style="font-size:9pt;color:#555;margin:0">'+esc(B.ad)+'</p>':'')+'</td><td style="border:0;text-align:right;vertical-align:top;font-size:9pt">'+meta.map(function(m){return '<span style="color:#666">'+esc(m[0])+':</span> <b>'+esc(m[1])+'</b>'}).join('<br>')+'</td></tr></table>'}
  var f='';if(B.nt)f+='<p style="border:1px solid #ccc;padding:6pt;font-size:9.5pt">'+esc(B.nt)+'</p>';var s=brSigs(B);if(s.length)f+='<br><br><table style="width:100%;border-collapse:collapse"><tr>'+s.map(function(l){return '<td style="border:0;width:'+Math.floor(100/s.length)+'%;padding-right:24pt;vertical-align:bottom"><br><br><p style="border-bottom:1px solid #000;margin:0">&nbsp;</p><p style="font-size:8.5pt;color:#444;margin:2pt 0 0">'+esc(l)+' · Name / signature / date</p></td>'}).join('')+'</tr></table>';
  var t=parts[0];if(h)t=t.replace(/(<body[^>]*>)/,'$1'+h);if(f)t=t.replace(/<\/body>/,f+'</body>');parts=[t]}}catch(e){}return new OB(parts,opts)}
 NB.prototype=OB.prototype;NB.__bk2=1;window.Blob=NB})();
/* Excel files made with SheetJS: signature rows, page header with the business name, fit to page width */
function xlWrap(X){if(!X||!X.writeFile||X.__bk2)return;X.__bk2=1;var WF=X.writeFile;
 X.writeFile=function(wb,name,o){if(!window.JSZip&&!o)return loadZ(function(){X.writeFile(wb,name,{__z:1})},function(){WF.call(X,wb,name)});var B=brGet();try{var sh=wb.Sheets[wb.SheetNames[0]],sg=brSigs(B),add=[];
   if(B.by||B.fr||B.ref){add.push([]);brMeta(B).forEach(function(m){add.push([m[0],m[1]])})}if(B.nt){add.push([]);add.push(['Notes',B.nt])}
   if(sg.length){add.push([],[],[]);add.push(sg.reduce(function(a,l,i){if(i)a.push('','');a.push('______________________________');return a},[]));add.push(sg.reduce(function(a,l,i){if(i)a.push('','');a.push(l+' (name, signature, date)');return a},[]))}
   if(sh&&add.length)X.utils.sheet_add_aoa(sh,add,{origin:-1})}catch(e){}
  try{var buf=X.write(wb,{bookType:'xlsx',type:'array'});JSZip.loadAsync(buf).then(function(z){var ps=[];
    z.forEach(function(p,f){if(!/^xl\/worksheets\/sheet\d+\.xml$/.test(p))return;ps.push(f.async('string').then(function(s){
     var m=s.match(/<dimension ref="[A-Z]+\d+:([A-Z]+)\d+"/),wide=m&&m[1].length===1?m[1].charCodeAt(0)-64>7:!!m;
     function xe(t){return String(t).replace(/&/g,'&amp;&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
     if(s.indexOf('<sheetPr')<0)s=s.replace(/(<worksheet[^>]*>)/,'$1<sheetPr><pageSetUpPr fitToPage="1"/></sheetPr>');
     s=s.replace(/<pageMargins[^>]*\/>/,'').replace(/<pageSetup[^>]*\/>/,'').replace(/<headerFooter[\s\S]*?<\/headerFooter>/,'');
     var tail='<pageMargins left="0.5" right="0.5" top="0.75" bottom="0.6" header="0.3" footer="0.3"/><pageSetup paperSize="1" orientation="'+(wide?'landscape':'portrait')+'" fitToWidth="1" fitToHeight="0"/><headerFooter>'+(B.co?'<oddHeader>&amp;L&amp;B'+xe(B.co)+(B.ad?'&amp;B&#10;'+xe(B.ad):'&amp;B')+'&amp;R'+xe(fmtD(B.dt))+'</oddHeader>':'')+'<oddFooter>&amp;L&amp;8bookkeepingsheets.com&amp;R&amp;8Page &amp;P of &amp;N</oddFooter></headerFooter>';
     var at=s.search(/<(rowBreaks|colBreaks|customProperties|cellWatches|ignoredErrors|smartTags|drawing|legacyDrawing|picture|oleObjects|controls|webPublishItems|tableParts|extLst)[ >\/]/);s=at>0?s.slice(0,at)+tail+s.slice(at):s.replace('</worksheet>',tail+'</worksheet>');z.file(p,s)}))});
    return Promise.all(ps).then(function(){return z.generateAsync({type:'blob',compression:'DEFLATE',mimeType:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})})}).then(function(b){file(name,b)},function(){WF.call(X,wb,name)})}catch(e){WF.call(X,wb,name)}}}
(function(){if(window.XLSX){xlWrap(window.XLSX);return}var v;try{Object.defineProperty(window,'XLSX',{configurable:true,enumerable:true,get:function(){try{if(v&&v.writeFile)xlWrap(v)}catch(e){}return v},set:function(x){v=x}})}catch(e){}})();

var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
var F={num:num,money:money,pct:pct,int:int,esc:esc};

/* ---------- report model: {title, inputs:[[label,value]], kpis:[[label,value]], tables:[{title,head:[],rows:[[]],foot:[]}], note} ---------- */
function repHTML(R,forWord){var B=brGet();
 function tbl(head,rows,foot){var t='<table>';if(head)t+='<thead><tr>'+head.map(function(c,i){return '<th'+(i?' class="r"':'')+'>'+esc(c)+'</th>'}).join('')+'</tr></thead>';t+='<tbody>'+rows.map(function(r){return '<tr>'+r.map(function(c,i){return '<td'+(i?' class="r"':'')+'>'+esc(c)+'</td>'}).join('')+'</tr>'}).join('')+'</tbody>';if(foot)t+='<tfoot><tr>'+foot.map(function(c,i){return '<td'+(i?' class="r"':'')+'><b>'+esc(c)+'</b></td>'}).join('')+'</tr></tfoot>';return t+'</table>'}
 if(R.html)return (B.logo?'<img src="'+B.logo+'" alt="" style="max-height:52pt;max-width:170pt;display:block;margin:0 0 8pt">':'')+R.html+brEnd(B);
 var h=brTop(R,B);{
 if(R.inputs&&R.inputs.length)h+='<h2>Inputs</h2>'+tbl(null,R.inputs);
 if(R.kpis&&R.kpis.length)h+='<h2>Results</h2>'+tbl(null,R.kpis);
 (R.tables||[]).forEach(function(T){h+='<h2>'+esc(T.title||'')+'</h2>'+tbl(T.head,T.rows,T.foot)});
 if(R.note)h+='<p class="sub">'+esc(R.note)+'</p>';}
 return h+brEnd(B)}
function aoa(R){var a=[[R.title],[]];if(R.inputs&&R.inputs.length){a.push(['Inputs']);R.inputs.forEach(function(r){a.push(r)});a.push([])}
 if(R.kpis&&R.kpis.length){a.push(['Results']);R.kpis.forEach(function(r){a.push(r)});a.push([])}
 (R.tables||[]).forEach(function(T){a.push([T.title||'']);if(T.head)a.push(T.head);T.rows.forEach(function(r){a.push(r)});if(T.foot)a.push(T.foot);a.push([])});return a}
function cellv(v){if(typeof v==='number')return v;var s=String(v==null?'':v);if(/^-?\$?-?[\d,]+(\.\d+)?%?$/.test(s.trim())){var n=parseFloat(s.replace(/[$,%]/g,''));if(isFinite(n))return /%$/.test(s.trim())?n/100:n}return s}
function fname(R){return (R.title||'report').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,60)}
function file(name,data,type){var b=data instanceof Blob?data:new Blob([data],{type:type}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},800)}
function loadX(cb,fail){if(window.XLSX)return cb();var s=document.createElement('script');s.src=XLSX_URL;s.onload=cb;s.onerror=fail;document.head.appendChild(s)}
var ZIP_URL='https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
function loadZ(cb,fail){if(window.JSZip)return cb();var s=document.createElement('script');s.src=ZIP_URL;s.onload=cb;s.onerror=fail;document.head.appendChild(s)}
function docx(R){
 function x(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
 function run(t,o){o=o||{};return '<w:r><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/>'+(o.b?'<w:b/>':'')+(o.c?'<w:color w:val="'+o.c+'"/>':'')+'<w:sz w:val="'+(o.sz||20)+'"/></w:rPr><w:t xml:space="preserve">'+x(t)+'</w:t></w:r>'}
 function p(t,o){o=o||{};return '<w:p><w:pPr><w:spacing w:before="'+(o.bf||0)+'" w:after="'+(o.af==null?120:o.af)+'"/>'+(o.r?'<w:jc w:val="right"/>':'')+'</w:pPr>'+run(t,o)+'</w:p>'}
 function cell(t,w,o){o=o||{};return '<w:tc><w:tcPr><w:tcW w:w="'+w+'" w:type="dxa"/>'+(o.fill?'<w:shd w:val="clear" w:color="auto" w:fill="'+o.fill+'"/>':'')+'</w:tcPr>'+p(t,{b:o.b,c:o.c,sz:18,af:0,r:o.r})+'</w:tc>'}
 var B=brGet(),WD=wide(R),W=WD?12960:9360;
 function tbl(head,rows,foot){var n=Math.max(head?head.length:0,rows.reduce(function(m,r){return Math.max(m,r.length)},0),foot?foot.length:0)||1,w0=n>1?Math.round(W*(n>2?0.34:0.6)):W,wr=n>1?Math.floor((W-w0)/(n-1)):0;
  function row(r,o){var h='<w:tr>'+(o.h?'<w:trPr><w:tblHeader/></w:trPr>':'');for(var i=0;i<n;i++)h+=cell(r[i]==null?'':r[i],i?wr:w0,{b:o.b,c:o.c,fill:o.fill,r:i>0});return h+'</w:tr>'}
  var b='<w:tblBorders>'+['top','bottom','insideH'].map(function(s){return '<w:'+s+' w:val="single" w:sz="4" w:space="0" w:color="CCCCCC"/>'}).join('')+'</w:tblBorders>';
  var t='<w:tbl><w:tblPr><w:tblW w:w="'+W+'" w:type="dxa"/>'+b+'<w:tblCellMar><w:top w:w="50" w:type="dxa"/><w:left w:w="80" w:type="dxa"/><w:bottom w:w="50" w:type="dxa"/><w:right w:w="80" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid>';
  for(var i=0;i<n;i++)t+='<w:gridCol w:w="'+(i?wr:w0)+'"/>';t+='</w:tblGrid>';
  if(head)t+=row(head,{h:1,b:1,c:'FFFFFF',fill:'12355B'});rows.forEach(function(r){t+=row(r,{})});if(foot)t+=row(foot,{b:1,fill:'F2F5F8'});return t+'</w:tbl>'+p('',{af:80})}
 var d=new Date().toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'});
 var body='',img='';
 if(B.logo){var sc=Math.min(1,150/(B.lw||150)),ex=Math.round((B.lw||150)*sc*9525),ey=Math.round((B.lh||60)*sc*9525);if(ey>762000){var k=762000/ey;ey=762000;ex=Math.round(ex*k)}
  img='<w:p><w:pPr><w:spacing w:after="60"/></w:pPr><w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="'+ex+'" cy="'+ey+'"/><wp:docPr id="1" name="Logo"/><a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:nvPicPr><pic:cNvPr id="1" name="logo.png"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="rIdLogo"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="'+ex+'" cy="'+ey+'"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>'}
 var left=img+(B.co?p(B.co,{b:1,sz:26,c:'12355B',af:20}):'')+(B.ad?p(B.ad,{sz:16,c:'555555',af:0}):'')||p('',{af:0});
 var right=p(R.title,{b:1,sz:30,c:'12355B',af:60,r:1})+brMeta(B).map(function(m){return '<w:p><w:pPr><w:spacing w:after="0"/><w:jc w:val="right"/></w:pPr>'+run(m[0]+':  ',{sz:17,c:'666666'})+run(m[1],{sz:17,b:1})+'</w:p>'}).join('');
 var hw=Math.round(W*0.45);
 body+='<w:tbl><w:tblPr><w:tblW w:w="'+W+'" w:type="dxa"/><w:tblBorders><w:bottom w:val="single" w:sz="12" w:space="0" w:color="12355B"/></w:tblBorders><w:tblLayout w:type="fixed"/></w:tblPr><w:tblGrid><w:gridCol w:w="'+hw+'"/><w:gridCol w:w="'+(W-hw)+'"/></w:tblGrid><w:tr><w:tc><w:tcPr><w:tcW w:w="'+hw+'" w:type="dxa"/></w:tcPr>'+left+'</w:tc><w:tc><w:tcPr><w:tcW w:w="'+(W-hw)+'" w:type="dxa"/></w:tcPr>'+right+'</w:tc></w:tr></w:tbl>'+p('',{af:120});
 function h2(t){return p(t,{b:1,sz:24,c:'12355B',bf:160,af:80})}
 if(R.inputs&&R.inputs.length)body+=h2('Inputs')+tbl(null,R.inputs);
 if(R.kpis&&R.kpis.length)body+=h2('Results')+tbl(null,R.kpis);
 (R.tables||[]).forEach(function(T){body+=h2(T.title||'Table')+tbl(T.head,T.rows,T.foot)});
 if(R.note)body+=p(R.note,{sz:18,c:'666666',bf:120});
 if(B.nt)body+=h2('Notes')+p(B.nt,{sz:19});
 var sg=brSigs(B);if(sg.length){var sw=Math.floor(W/sg.length);body+=p('',{af:480})+'<w:tbl><w:tblPr><w:tblW w:w="'+W+'" w:type="dxa"/><w:tblLayout w:type="fixed"/></w:tblPr><w:tblGrid>'+sg.map(function(){return '<w:gridCol w:w="'+sw+'"/>'}).join('')+'</w:tblGrid><w:tr><w:trPr><w:cantSplit/></w:trPr>'+sg.map(function(l){return '<w:tc><w:tcPr><w:tcW w:w="'+sw+'" w:type="dxa"/><w:tcMar><w:right w:w="400" w:type="dxa"/></w:tcMar></w:tcPr><w:p><w:pPr><w:pBdr><w:bottom w:val="single" w:sz="6" w:space="1" w:color="000000"/></w:pBdr><w:spacing w:before="600" w:after="40"/></w:pPr></w:p>'+p(l+'  ·  Name / signature / date',{sz:16,c:'444444',af:0})+'</w:tc>'}).join('')+'</w:tr></w:tbl>'}
 body+=p('Created '+d+' with the free calculator at bookkeepingsheets.com',{sz:14,c:'999999',bf:360});
 var doc='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"><w:body>'+body+'<w:sectPr>'+(WD?'<w:pgSz w:w="15840" w:h="12240" w:orient="landscape"/>':'<w:pgSz w:w="12240" w:h="15840"/>')+'<w:pgMar w:top="1080" w:right="1440" w:bottom="1080" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/></w:sectPr></w:body></w:document>';
 var z=new JSZip();
 z.file('[Content_Types].xml','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>');
 z.file('_rels/.rels','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>');
 z.file('word/document.xml',doc);if(B.logo){z.file('word/_rels/document.xml.rels','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rIdLogo" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/logo.png"/></Relationships>');z.file('word/media/logo.png',B.logo.split(',')[1],{base64:true})}
 return z.generateAsync({type:'blob',compression:'DEFLATE',mimeType:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'})}
function bar(root,getR,getLink){
 var x=document.createElement('div');x.className='bk2-x';x.innerHTML=brForm()+'<p>Save or share this result</p>'+
 '<button type="button" class="bk2-btn pr" data-x="print">Print / Save as PDF</button><button type="button" class="bk2-btn" data-x="xlsx">Excel</button><button type="button" class="bk2-btn" data-x="doc">Word</button><button type="button" class="bk2-btn" data-x="csv">CSV</button><button type="button" class="bk2-btn" data-x="link">Copy link</button><button type="button" class="bk2-btn" data-x="mail">Email</button><button type="button" class="bk2-btn wa" data-x="wa">WhatsApp</button><div class="bk2-msg" aria-live="polite"></div>';
 brWire(x);var msg=function(t){var m=x.querySelector('.bk2-msg');m.textContent=t;setTimeout(function(){m.textContent=''},4000)};
 x.addEventListener('click',function(e){var b=e.target.closest('[data-x]');if(!b)return;var R=getR();if(!R){msg('Enter your numbers first.');return}var k=b.getAttribute('data-x');
  if(k==='print'){var rp=document.querySelector('.bk2-rep');if(!rp){rp=document.createElement('div');rp.className='bk2-rep';document.body.appendChild(rp)}rp.innerHTML=repHTML(R);rp.className='bk2-rep'+(wide(R)?' w':'');var ps=document.getElementById('bk2-pg');if(!ps){ps=document.createElement('style');ps.id='bk2-pg';document.head.appendChild(ps)}ps.textContent='@media print{@page{size:letter '+(wide(R)?'landscape':'portrait')+';margin:12mm}}';document.documentElement.classList.add('bk2-printing');setTimeout(function(){window.print();setTimeout(function(){document.documentElement.classList.remove('bk2-printing')},500)},50)}
  else if(k==='xlsx'){msg('Preparing Excel file…');loadZ(function(){xlsx(R).then(function(b){file(fname(R)+'.xlsx',b);msg('Excel file downloaded.')})},function(){msg('Could not load Excel export. Try CSV.')})}
  else if(k==='doc'){msg('Preparing Word file...');loadZ(function(){docx(R).then(function(b){file(fname(R)+'.docx',b);msg('Word file downloaded.')})},function(){msg('Could not load Word export. Try Print / PDF.')})}
  else if(k==='csv'){var c=aoa(R).map(function(r){return r.map(function(v){v=String(v==null?'':v);return /[",\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v}).join(',')}).join('\r\n');file(fname(R)+'.csv','\uFEFF'+c,'text/csv;charset=utf-8');msg('CSV downloaded.')}
  else if(k==='link'){var l=getLink();var ok=function(){msg('Link copied. Anyone with it sees the same numbers.')};if(navigator.clipboard)navigator.clipboard.writeText(l).then(ok,function(){window.prompt('Copy this link:',l)});else window.prompt('Copy this link:',l)}
  else if(k==='wa'){var lw=getLink(),tw=R.title+'\n'+(R.kpis||[]).map(function(r){return r[0]+': '+r[1]}).join('\n')+'\n\n'+lw;window.open('https://wa.me/?text='+encodeURIComponent(tw),'_blank')}
  else if(k==='mail'){var l2=getLink(),body=R.title+'\n\n'+(R.kpis||[]).map(function(r){return r[0]+': '+r[1]}).join('\n')+'\n\nOpen it here:\n'+l2;if(navigator.share&&/Mobi|Android/i.test(navigator.userAgent)){navigator.share({title:R.title,text:body}).catch(function(){});return}location.href='mailto:?subject='+encodeURIComponent(R.title)+'&body='+encodeURIComponent(body)}
 });
 root.appendChild(x);return x}

/* ---------- mount a config ---------- */
function mount(cfg){var el=document.getElementById(cfg.id);if(!el||el.dataset.init)return;el.dataset.init=1;el.classList.add('bk2');
 var key='bs-'+cfg.key+'-v1';
 var g='<div class="bk2-card"><div class="bk2-grid">'+cfg.inputs.map(function(f){var id=cfg.id+'-'+f.id,l='<div'+(f.wide?' style="grid-column:1/-1"':'')+'><label for="'+id+'">'+esc(f.label)+'</label>';
  if(f.type==='select')return l+'<select id="'+id+'">'+f.opts.map(function(o){return '<option value="'+esc(o[0])+'"'+(o[0]===f.def?' selected':'')+'>'+esc(o[1])+'</option>'}).join('')+'</select></div>';
  return l+'<input id="'+id+'" type="'+(f.type||'number')+'"'+(f.type==='date'||f.type==='text'||f.type==='time'?'':' step="'+(f.step||'any')+'" inputmode="decimal"')+(f.ph?' placeholder="'+esc(f.ph)+'"':'')+(f.def!=null&&f.def!==''?' value="'+esc(f.def)+'"':'')+'></div>'}).join('')+'</div><div class="bk2-out" aria-live="polite"></div>'+
  '<button type="button" class="bk2-btn" data-a="demo">Load example</button><button type="button" class="bk2-btn" data-a="reset">Reset</button><p class="bk2-hint">Your numbers stay in your browser.</p></div>';
 el.innerHTML=g;var card=el.querySelector('.bk2-card'),out=el.querySelector('.bk2-out'),last=null;
 function $(f){return document.getElementById(cfg.id+'-'+f)}
 function vals(){var v={};cfg.inputs.forEach(function(f){var x=$(f.id).value;v[f.id]=(f.type==='select'||f.type==='date'||f.type==='text'||f.type==='time')?x:num(x)});return v}
 function raw(){var o={};cfg.inputs.forEach(function(f){o[f.id]=$(f.id).value});return o}
 function set(o){cfg.inputs.forEach(function(f){if(o&&o[f.id]!=null)$(f.id).value=o[f.id]})}
 function run(){var v=vals(),r;try{r=cfg.calc(v,F)}catch(e){r={error:'Check your numbers.'}}
  if(!r||r.hint){out.innerHTML='<p class="bk2-hint">'+esc(r&&r.hint||'Enter your numbers above to see the result.')+'</p>';last=null;return}
  if(r.error){out.innerHTML='<p class="bk2-err">'+esc(r.error)+'</p>';last=null;return}
  var h='';if(r.kpis)h+='<div class="bk2-kpi">'+r.kpis.map(function(k){return '<div class="'+(k[2]||'')+'"><span>'+esc(k[0])+'</span><b>'+esc(k[1])+'</b></div>'}).join('')+'</div>';
  (r.tables||[]).forEach(function(T){h+='<h4>'+esc(T.title||'')+'</h4><div class="bk2-scroll"><table>'+(T.head?'<thead><tr>'+T.head.map(function(c,i){return '<th'+(i?' class="r"':'')+'>'+esc(c)+'</th>'}).join('')+'</tr></thead>':'')+'<tbody>'+T.rows.map(function(row,ri){return '<tr'+(T.hl===ri?' class="hl"':'')+'>'+row.map(function(c,i){return '<td'+(i?' class="r"':'')+'>'+esc(c)+'</td>'}).join('')+'</tr>'}).join('')+'</tbody>'+(T.foot?'<tfoot><tr>'+T.foot.map(function(c,i){return '<td'+(i?' class="r"':'')+'>'+esc(c)+'</td>'}).join('')+'</tr></tfoot>':'')+'</table></div>'});
  if(r.note)h+='<p class="bk2-note">'+esc(r.note)+'</p>';
  out.innerHTML=h;
  last={title:cfg.title,inputs:cfg.inputs.map(function(f){var x=$(f.id);var val=f.type==='select'?x.options[x.selectedIndex].text:x.value;return [f.label,val]}),kpis:(r.kpis||[]).map(function(k){return [k[0],k[1]]}),tables:r.tables||[],note:r.note};
  try{localStorage.setItem(key,JSON.stringify(raw()))}catch(e){}}
 card.addEventListener('input',run);card.addEventListener('change',run);
 card.addEventListener('click',function(e){var b=e.target.closest('[data-a]');if(!b)return;if(b.getAttribute('data-a')==='demo'){set(cfg.demo);run()}else{cfg.inputs.forEach(function(f){if(f.type!=='select')$(f.id).value=f.def!=null?f.def:''});run()}});
 var hm=location.hash.match(new RegExp('[#&]'+cfg.key+'=([^&]+)')),o=null;if(hm){try{o=JSON.parse(b64d(hm[1]))}catch(e){}}
 if(!o){try{o=JSON.parse(localStorage.getItem(key)||'null')}catch(e){}}
 if(o)set(o);run();
 bar(card,function(){return last},function(){return (window.BS_PAGE||location.origin+location.pathname)+'#'+cfg.key+'='+b64e(JSON.stringify(raw()))});
 if(hm)setTimeout(function(){el.scrollIntoView({behavior:'smooth'})},300)}

/* ---------- add exports to older simple tools ---------- */
function enhance(el){if(el.dataset.bkx||el.querySelector('.bk2-x')||el.querySelector('[id$="-xlsx"],[id$="-csv"]'))return;var card=el.querySelector('[class$="-card"]')||el;if(!card.querySelector('input'))return;el.dataset.bkx=1;
 var ins=[].slice.call(card.querySelectorAll('input,select')).filter(function(i){return i.id&&i.type!=='hidden'});
 function getR(){var kp=[].slice.call(el.querySelectorAll('[class$="-kpi"] > div')).map(function(d){var s=d.querySelector('span'),b=d.querySelector('b');return [s?s.textContent.trim():'',b?b.textContent.trim():'']});if(!kp.length)return null;
  var tabs=[].slice.call(el.querySelectorAll('table')).filter(function(t){return !t.querySelector('input')}).map(function(t){var hd=t.querySelector('thead tr');var prev=t.closest('[class$="-scroll"]');prev=prev?prev.previousElementSibling:null;return {title:prev&&/^H\d$/.test(prev.tagName)?prev.textContent.trim():'',head:hd?[].map.call(hd.children,function(c){return c.textContent.trim()}):null,rows:[].slice.call(t.querySelectorAll('tbody tr')).map(function(r){return [].map.call(r.children,function(c){return c.textContent.trim()})})}});
  var t=document.querySelector('h1');return {title:(t?t.textContent.trim():document.title).split(':')[0],inputs:ins.map(function(i){var l=card.querySelector('label[for="'+i.id+'"]');var v=i.tagName==='SELECT'?i.options[i.selectedIndex].text:i.value;return [l?l.textContent.trim():i.id,v]}).filter(function(r){return r[1]!==''&&r[0]!==''}),kpis:kp,tables:tabs}}
 function link(){var o={};ins.forEach(function(i){o[i.id]=i.value});return (window.BS_PAGE||location.origin+location.pathname)+'#bsv='+b64e(JSON.stringify(o))}
 var x=bar(card,getR,link);var ref=card.querySelector('p:last-child');if(ref&&ref.parentNode===card)card.insertBefore(x,ref);
 var hm=location.hash.match(/[#&]bsv=([^&]+)/);if(hm){try{var o=JSON.parse(b64d(hm[1]));ins.forEach(function(i){if(o[i.id]!=null){i.value=o[i.id]}});ins.forEach(function(i){i.dispatchEvent(new Event('change',{bubbles:true}));i.dispatchEvent(new Event('input',{bubbles:true}))});setTimeout(function(){el.scrollIntoView({behavior:'smooth'})},300)}catch(e){}}}

window.BSKit={mount:mount,enhance:enhance,F:F,bar:bar,b64e:b64e,b64d:b64d};
function share(){if(document.querySelector('.bk2-wa'))return;var h=document.querySelector('h1.wp-block-post-title');if(!h)return;var a=document.createElement('a');a.className='bk2-wa';a.target='_blank';a.rel='noopener';a.href='https://wa.me/?text='+encodeURIComponent(document.title.split(' - ')[0]+'\n'+(window.BS_PAGE||location.origin+location.pathname));a.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"/></svg>Share on WhatsApp';var jb=document.querySelector('.bsj');(jb&&jb.parentNode===h.parentNode?jb:h).insertAdjacentElement('afterend',a)}
function boot(){try{share()}catch(e){}try{extForm()}catch(e){}var q=window.BSKQ||[];q.forEach(mount);window.BSKQ={push:mount};
 [].forEach.call(document.querySelectorAll('.bs-tool'),function(el){if(!el.classList.contains('bk2'))enhance(el)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
