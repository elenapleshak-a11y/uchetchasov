const CACHE_NAME = 'task-payments-v4';
const APP_URL = 'https://elenapleshak-a11y.github.io/task-manager/';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll([
          APP_URL,
          APP_URL + 'index.html',
          APP_URL + 'manifest.json'
        ]);
      })
  );
});

self.addEventListener('fetch', function(event) {
  // Перенаправляем все запросы на правильный URL
  if (event.request.url === 'https://elenapleshak-a11y.github.io/') {
    event.respondWith(
      Response.redirect(APP_URL, 301)
    );
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
  );
});
