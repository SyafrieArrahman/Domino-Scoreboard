// Naikkan angka versi ini setiap kali file aplikasi diubah, supaya HP mengambil versi baru.
const CACHE='domino-scoreboard-v1';
const FILES=['./','index.html','css/style.css','js/storage.js','js/timer.js','js/scoreboard.js','js/fx.js','js/app.js','manifest.webmanifest','assets/icons/icon-192.png','assets/icons/icon-512.png','assets/icons/apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==CACHE).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request)))});
