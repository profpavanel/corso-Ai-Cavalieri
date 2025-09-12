self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('lezione-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/intro.mp3',
        '/tipologie.mp3',
        '/pieghevole.jpg'
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
