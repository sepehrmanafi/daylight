import fs from 'node:fs';
import path from 'node:path';
const rawBase = process.env.DAYLIGHT_BASE_PATH || '/';
const BASE = '/' + rawBase.split('/').filter(Boolean).join('/') + (rawBase === '/' ? '' : '/');
const list = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? list(path.join(dir,e.name)) : [path.join(dir,e.name)]);
const files = list('dist').filter(f=>!f.endsWith('sw.js')).map(f=>BASE+f.replaceAll('\\','/').replace(/^dist\//,''));
const prefix = 'daylight-'+encodeURIComponent(BASE)+'-';
const cache = prefix + Date.now();
fs.writeFileSync('dist/sw.js', `const BASE=${JSON.stringify(BASE)};
const PREFIX=${JSON.stringify(prefix)};
const CACHE=${JSON.stringify(cache)};
const FILES=${JSON.stringify([BASE,...files])};
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
});`);
const destination = process.env.DAYLIGHT_BUILD_TARGET === 'pages' ? 'docs' : 'web-release';
fs.rmSync(destination, {recursive:true,force:true});
fs.cpSync('dist',destination,{recursive:true});
if(destination==='docs') fs.writeFileSync('docs/.nojekyll','');
console.log(`Offline app shell generated for ${BASE}; ${files.length} assets copied to ${destination}/.`);
