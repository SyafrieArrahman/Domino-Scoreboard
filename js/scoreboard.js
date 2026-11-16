const Board={s:null,
 def(){return{a:{name:'Team A',score:0},b:{name:'Team B',score:0},set:1,round:1,target:100,initMin:0,
  timer:{running:false,startedAt:0,base:0},history:[],sets:[],dismissed:false}},
 init(){this.s=Object.assign(this.def(),Store.load()||{})},
 save(){Store.save(this.s)},
 winner(){const{a,b,target}=this.s;if(a.score<target&&b.score<target||a.score===b.score)return null;return a.score>b.score?'a':'b'},
 add(t,n){const s=this.s;if(n<0&&s[t].score<=0)return false;
  s.history.push({a:s.a.score,b:s.b.score,round:s.round});if(s.history.length>100)s.history.shift();
  s[t].score=Math.max(0,s[t].score+n);s.round++;s.dismissed=false;this.save();return true},
 undo(){const s=this.s,h=s.history.pop();if(!h)return false;s.a.score=h.a;s.b.score=h.b;s.round=h.round;s.dismissed=false;this.save();return true},
 round(n){this.s.round=Math.max(1,this.s.round+n);this.save()},
 nextSet(){const s=this.s;s.sets.push({set:s.set,a:s.a.score,b:s.b.score});s.set++;s.a.score=s.b.score=0;s.round=1;
  s.history=[];s.dismissed=false;this.save()},
 settings(na,nb,target,min){const s=this.s,old=s.initMin;s.a.name=na||'Team A';s.b.name=nb||'Team B';
  s.target=Math.min(999,Math.max(1,target||100));s.initMin=Math.min(180,Math.max(0,min||0));
  if(!s.timer.running&&s.timer.base===old*60000)s.timer.base=s.initMin*60000;this.save()},
 reset(){this.s=this.def();this.save()}};
