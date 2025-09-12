const CACHE_NAME = 'grafica-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css', // Se usi un file CSS esterno
  '/manifest.json',
  '/sw.js',
  '/icon-192.png',
  '/icon-512.png',
  'https://cdn.tailwindcss.com', // Tailwind CSS
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap',
  'https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap',
  // Aggiungi qui gli URL di tutte le tue immagini e file audio
  '/intro.mp3',
  '/tipologie.mp3',
  '/pieghevole.jpg',
  '/diverse_tipologie.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aperta');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Se la risorsa è in cache, la serviamo
        if (response) {
          return response;
        }
        // Altrimenti, la recuperiamo dalla rete
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
