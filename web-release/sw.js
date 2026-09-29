const BASE="/";
const PREFIX="daylight-%2F-";
const CACHE="daylight-%2F-1790707442105";
const FILES=["/","/assets/index-BTaY0TRm.css","/assets/index-Cpc3lO0b.js","/fonts/dm-sans-400.ttf","/fonts/dm-sans-500.ttf","/fonts/dm-sans-600.ttf","/fonts/dm-sans-700.ttf","/fonts/manrope-400.ttf","/fonts/manrope-500.ttf","/fonts/manrope-600.ttf","/fonts/manrope-700.ttf","/fonts/manrope-800.ttf","/icon-192.png","/icon-512.png","/icon.svg","/images/architecture.jpg","/images/books.jpg","/images/coast.jpg","/images/daisies.jpg","/images/desk.jpg","/images/focus-sculpture.jpg","/images/forest.jpg","/images/mindful-morning.jpg","/images/onboard-momentum.jpg","/images/onboard-space.jpg","/images/slow-moments.jpg","/images/studio.jpg","/index.html","/manifest.webmanifest"];
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