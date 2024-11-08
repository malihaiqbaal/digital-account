const cacheName = 'digital-khata-cache-v1';
const assetsToCache = [
    './',                  // Cache the root to make the HTML load offline
    './index.html',        // Main HTML file
    './style.css',         // CSS file path (replace with actual CSS path if different)
    './main.js',         // JavaScript file path (replace with actual JS path if different)
    './offline.html',      // Offline fallback page (optional, if you want an offline fallback page)
    'https://cdn.jsdelivr.net/npm/chart.js'  // External library (Chart.js)
];

// Install Service Worker and cache files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(assetsToCache);
        })
    );
    self.skipWaiting();
});

// Activate Service Worker and clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(name => name !== cacheName).map(name => caches.delete(name))
            );
        })
    );
    self.clients.claim();
});

// Fetch event handler to serve cached assets if offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            // Serve the cached asset if found, otherwise fetch from network
            return response || fetch(event.request).catch(() => {
                // If offline and asset not cached, serve offline fallback (optional)
                return caches.match('./offline.html');
            });
        })
    );
});
