const Store={key:'dominoScoreboard.v1',
 load(){try{return JSON.parse(localStorage.getItem(this.key))}catch(e){return null}},
 save(s){try{localStorage.setItem(this.key,JSON.stringify(s))}catch(e){}},
 clear(){try{localStorage.removeItem(this.key)}catch(e){}}};
