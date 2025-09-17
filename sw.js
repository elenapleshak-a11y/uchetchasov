const CACHE_NAME = 'task-payments-final';
const APP_URL = 'https://elenapleshak-a11y.github.io/uchetchasov/';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll([
          APP_URL,
          APP_URL + 'index.html',
          APP_URL + 'manifest.json',
          APP_URL + 'sw.js'
        ]);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
  );
});
