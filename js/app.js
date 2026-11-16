(function(){
const $=q=>document.querySelector(q),$$=q=>[...document.querySelectorAll(q)],S=()=>Board.s;
Board.init();
const PLAY='<svg viewBox="0 0 24 24"><path d="M7 4.5v15l12-7.5z"/></svg>',PAUSE='<svg viewBox="0 0 24 24"><path d="M6 4.5h4.5v15H6zM13.5 4.5H18v15h-4.5z"/></svg>';
const buzz=()=>navigator.vibrate&&navigator.vibrate(10);
function render(){
 const s=S(),w=Board.winner();
 ['a','b'].forEach(t=>{
  $(`[data-n="${t}"]`).textContent=s[t].name;
  const sc=$(`[data-s="${t}"]`);sc.textContent=s[t].score;sc.classList.toggle('win',w===t);
  $(`[data-b="${t}"]`).style.width=Math.min(100,s[t].score/s.target*100)+'%';
  $(`[data-sp="${t}"]`).hidden=s[t].score<s.target;
 });
 const wa=s.sets.filter(x=>x.a>x.b).length,wb=s.sets.filter(x=>x.b>x.a).length;
 $('#setLbl').textContent='SET '+s.set;$('#wins').textContent=`${wa}–${wb}`;$('#tgt').textContent='TARGET '+s.target;
 $('#rd').textContent=String(s.round).padStart(2,'0');
 $('#tT').innerHTML=s.timer.running?PAUSE:PLAY;
 $('#win').hidden=!(w&&!s.dismissed);
 if(w)$('#wt').textContent=`${s[w].name} MENANG SET ${s.set}`;
 tick();
}
function tick(){$('#clk').textContent=Timer.fmt(Timer.elapsed(S().timer))}
function bump(t){const sc=$(`[data-s="${t}"]`);sc.classList.remove('bump');void sc.offsetWidth;sc.classList.add('bump')}
$$('.score').forEach(el=>el.addEventListener('animationend',e=>{if(e.animationName==='bump')el.classList.remove('bump')}));
function ask(msg,ok){return new Promise(res=>{$('#cfMsg').textContent=msg;$('#cfOk').textContent=ok||'Ya';const d=$('#dCf');
 const done=v=>{d.close();$('#cfOk').onclick=$('#cfNo').onclick=null;res(v)};$('#cfOk').onclick=()=>done(true);$('#cfNo').onclick=()=>done(false);d.showModal()})}
const last=new WeakMap();
const guard=el=>{const n=Date.now();if(n-(last.get(el)||0)<180)return false;last.set(el,n);return true};
$$('button[data-d]').forEach(b=>b.addEventListener('click',()=>{
 if(!guard(b))return;const t=b.dataset.t;
 const d=+b.dataset.d;if(Board.add(t,d)){render();bump(t);if(d>=2)FX.celebrate(t,d);else buzz()}}));
$('#un').onclick=()=>{if(Board.undo()){buzz();render()}};
$('#tT').onclick=()=>{const t=S().timer;t.running?Timer.pause(t):Timer.start(t);Board.save();render()};
$('#tR').onclick=()=>{Timer.reset(S().timer,S().initMin);Board.save();render()};
async function next(){if(!Board.winner()&&!await ask('Belum ada tim yang menang set ini. Lanjut ke set berikutnya? Skor akan di-reset (timer tetap berjalan).','Next set'))return;Board.nextSet();render()}
$('#ns').onclick=next;$('#wn').onclick=next;
$('#wx').onclick=()=>{S().dismissed=true;Board.save();render()};
$('#bSet').onclick=()=>{const s=S();$('#fA').value=s.a.name;$('#fB').value=s.b.name;$('#fT').value=s.target;$('#fM').value=s.initMin;$('#dSet').showModal()};
$('#fCancel').onclick=()=>$('#dSet').close();
$('#fSave').onclick=()=>{Board.settings($('#fA').value.trim(),$('#fB').value.trim(),parseInt($('#fT').value,10),parseInt($('#fM').value,10));$('#dSet').close();render()};
$('#fReset').onclick=async()=>{if(await ask('Reset seluruh pertandingan? Skor, set, round, dan timer kembali ke awal.','Reset')){Board.reset();$('#dSet').close();render()}};
const root=document.documentElement,rf=root.requestFullscreen||root.webkitRequestFullscreen;
if(!rf)$('#bFs').hidden=true;
$('#bFs').onclick=()=>{if(document.fullscreenElement||document.webkitFullscreenElement){(document.exitFullscreen||document.webkitExitFullscreen).call(document);return}
 const p=rf.call(root);const lock=()=>screen.orientation&&screen.orientation.lock&&screen.orientation.lock('landscape').catch(()=>{});
 p&&p.then?p.then(lock).catch(()=>{}):lock()};
let wl=null;const keepAwake=async()=>{try{if(navigator.wakeLock&&document.visibilityState==='visible')wl=await navigator.wakeLock.request('screen')}catch(e){}};
document.addEventListener('visibilitychange',()=>{tick();keepAwake()});keepAwake();
setInterval(tick,250);render();
})();
