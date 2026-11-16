// Berbasis timestamp (Date.now), bukan hitungan interval, sehingga akurat saat tab berpindah.
const Timer={
 fmt(ms){const t=Math.floor(ms/1000),m=Math.floor(t/60),s=t%60;return String(m).padStart(2,'0')+':'+String(s).padStart(2,'0')},
 elapsed(t){return t.base+(t.running?Date.now()-t.startedAt:0)},
 start(t){if(!t.running){t.running=true;t.startedAt=Date.now()}},
 pause(t){if(t.running){t.base+=Date.now()-t.startedAt;t.running=false;t.startedAt=0}},
 reset(t,min){t.running=false;t.startedAt=0;t.base=min*60000}};
