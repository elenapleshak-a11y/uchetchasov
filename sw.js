const CACHE_NAME = 'paytracker-cache-v1';
const TO_CACHE = ['/', '/index.html', '/manifest.json'];

self.addEventListener('install', event=>{
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(TO_CACHE)).then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate', event=>{
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event=>{
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request).catch(()=>caches.match('/index.html')))
  );
});

