const CACHE = 'panini-2026-v1';
const ASSETS = [
  '/panini-2026/pwa/',
  '/panini-2026/pwa/index.html',
  '/panini-2026/pwa/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
