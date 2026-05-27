const CACHE = 'cromopro-v2';
const ASSETS = [
  '/panini-2026/pwa/',
  '/panini-2026/pwa/index.html',
  '/panini-2026/pwa/manifest.json',
  '/panini-2026/pwa/icon-72.png',
  '/panini-2026/pwa/icon-192.png',
  '/panini-2026/pwa/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
