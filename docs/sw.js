const BASE="/daylight/";
const PREFIX="daylight-%2Fdaylight%2F-";
const CACHE="daylight-%2Fdaylight%2F-1789915025043";
const FILES=["/daylight/","/daylight/assets/index-CfDZax6r.js","/daylight/assets/index-XP1ckwjh.css","/daylight/fonts/dm-sans-400.ttf","/daylight/fonts/dm-sans-500.ttf","/daylight/fonts/dm-sans-600.ttf","/daylight/fonts/dm-sans-700.ttf","/daylight/fonts/manrope-400.ttf","/daylight/fonts/manrope-500.ttf","/daylight/fonts/manrope-600.ttf","/daylight/fonts/manrope-700.ttf","/daylight/fonts/manrope-800.ttf","/daylight/icon-192.png","/daylight/icon-512.png","/daylight/icon.svg","/daylight/images/architecture.jpg","/daylight/images/books.jpg","/daylight/images/coast.jpg","/daylight/images/daisies.jpg","/daylight/images/desk.jpg","/daylight/images/forest.jpg","/daylight/images/studio.jpg","/daylight/index.html","/daylight/manifest.webmanifest"];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch', event => {
  const url=new URL(event.request.url);
  if(event.request.method!=='GET'||url.origin!==self.location.origin||!url.pathname.startsWith(BASE)) return;
  if(event.request.mode==='navigate') {
    event.respondWith(fetch(event.request).then(response=>{
      if(response.ok) { const copy=response.clone(); caches.open(CACHE).then(cache=>cache.put(BASE,copy)); }
      return response;
    }).catch(()=>caches.match(BASE)));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{
    if(response.ok) { const copy=response.clone(); caches.open(CACHE).then(cache=>cache.put(event.request,copy)); }
    return response;
  })));
});