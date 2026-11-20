// Perayaan: +2 = confetti emas, +3 = ledakan besar + flash + guncangan layar.
const FX=(()=>{
 const cv=document.getElementById('fx'),c=cv.getContext('2d'),still=matchMedia('(prefers-reduced-motion:reduce)').matches;
 const gold=['#d8ae4e','#f4ecd6','#ffd36b','#e8c46a'],rainbow=gold.concat(['#fff','#ff5a5f','#4cc9f0','#7bd88f']);
 let ps=[],run=false;
 const size=()=>{cv.width=innerWidth;cv.height=innerHeight};addEventListener('resize',size);size();
 function spawn(x,y,n,pw,cs,spread){for(let i=0;i<n;i++){const a=-Math.PI/2+(Math.random()-.5)*spread,v=pw*(.4+Math.random()*.7);
  ps.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,w:5+Math.random()*6,h:3+Math.random()*4,r:Math.random()*6,vr:(Math.random()-.5)*.4,life:1,c:cs[i%cs.length]})}}
 function loop(){c.clearRect(0,0,cv.width,cv.height);
  for(const p of ps){p.vy+=.32;p.x+=p.vx;p.y+=p.vy;p.vx*=.99;p.r+=p.vr;p.life-=.011;
   c.save();c.globalAlpha=Math.max(0,Math.min(1,p.life*1.6));c.translate(p.x,p.y);c.rotate(p.r);c.fillStyle=p.c;c.fillRect(-p.w/2,-p.h/2,p.w,p.h);c.restore()}
  ps=ps.filter(p=>p.life>0&&p.y<cv.height+30);
  if(ps.length)requestAnimationFrame(loop);else{run=false;c.clearRect(0,0,cv.width,cv.height)}}
 const go=()=>{if(!run){run=true;requestAnimationFrame(loop)}};
 function temp(el,ms){document.body.appendChild(el);setTimeout(()=>el.remove(),ms)}
 function celebrate(t,n){
  const r=document.querySelector(`[data-s="${t}"]`).getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2;
  const pop=document.createElement('div');pop.className='pop p'+n;pop.style.left=x+'px';pop.style.top=y+'px';
  pop.innerHTML=n===3?'+3<small>MANTAP!</small>':'+2<small>NICE!</small>';temp(pop,1100);
  if(navigator.vibrate)navigator.vibrate(n===3?[30,40,30,40,80]:[25,30,25]);
  if(n===3){const f=document.createElement('div');f.className='flash';temp(f,650);
   const a=document.getElementById('app');a.classList.remove('shake');void a.offsetWidth;a.classList.add('shake');setTimeout(()=>a.classList.remove('shake'),520)}
  if(still)return;
  if(n===3){spawn(x,y,90,15,rainbow,Math.PI*1.6);spawn(0,innerHeight,60,20,rainbow,1.1);spawn(innerWidth,innerHeight,60,20,rainbow,1.1);
   setTimeout(()=>{spawn(x,y,60,12,rainbow,Math.PI*1.8);go()},250)}
  else spawn(x,y,45,11,gold,Math.PI*1.2);
  go()}
 return{celebrate}})();
