const CACHE='plannote-shell-v100rc24';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
const SHELL=new Set(['/', '/index.html', '/manifest.webmanifest', '/icon-192.png', '/icon-512.png']);
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));
 self.skipWaiting();
});
self.addEventListener('activate',event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('plannote-shell-')&&key!==CACHE).map(key=>caches.delete(key)))));
 self.clients.claim();
});
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET')return;
 const url=new URL(request.url);
 if(url.origin!==self.location.origin)return;
 // Only cache the app shell. Never store query-string variants or arbitrary same-origin requests.
 const scopePath=new URL(self.registration.scope).pathname;
 if(!url.pathname.startsWith(scopePath))return;
 const relative='/'+url.pathname.slice(scopePath.length);
 if(!SHELL.has(relative))return;
 const cacheUrl=new URL(relative.slice(1)||'./',self.registration.scope).href;
 const key=new Request(cacheUrl,{method:'GET'});
 event.respondWith(fetch(request).then(response=>{
  if(response.ok&&response.type==='basic'){
   const copy=response.clone();
   event.waitUntil(caches.open(CACHE).then(cache=>cache.put(key,copy)));
  }
  return response;
 }).catch(async()=>{
  const cached=await caches.match(key);
  if(cached)return cached;
  if(request.mode==='navigate')return caches.match(new URL('index.html',self.registration.scope).href);
  return Response.error();
 }));
});
