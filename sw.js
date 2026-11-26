const CACHE_NAME = 'dunia-kecil-v5';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './data.js',
  './audio.js',
  './app.js',
  './manifest.json',
  './icon.svg',
  './sounds/list.json',
  './sounds/airplane.mp3',
  './sounds/bicycle.ogg',
  './sounds/bus.ogg',
  './sounds/car.ogg',
  './sounds/cat.mp3',
  './sounds/cow.mp3',
  './sounds/crunch.ogg',
  './sounds/dog.mp3',
  './sounds/duck.mp3',
  './sounds/elephant.ogg',
  './sounds/frog.mp3',
  './sounds/lion.mp3',
  './sounds/sheep.ogg',
  './sounds/train.ogg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => caches.match('./index.html'));
    })
  );
});
