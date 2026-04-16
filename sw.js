// sw.js - Service Worker untuk Caching Gambar
const CACHE_NAME = 'himasi-image-cache-v1';

self.addEventListener('install', event => {
    self.skipWaiting(); // Memaksa SW baru untuk segera aktif
});

self.addEventListener('activate', event => {
    event.waitUntil(clients.claim()); // Langsung mengontrol klien setelah aktif
});

// Strategi Cache-First khusus untuk Gambar
self.addEventListener('fetch', event => {
    // Mengecek apakah request tersebut adalah request gambar (img, url background, dll)
    if (event.request.destination === 'image') {
        event.respondWith(
            caches.match(event.request).then(cachedResponse => {
                // Jika gambar ada di cache, gunakan cache
                if (cachedResponse) {
                    return cachedResponse;
                }
                
                // Jika tidak ada di cache, download dari internet lalu simpan ke cache
                return fetch(event.request).then(networkResponse => {
                    return caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            })
        );
    }
});