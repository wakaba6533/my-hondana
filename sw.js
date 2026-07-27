const CACHE_NAME = 'my-bookshelf-v2';

const FILES_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './css/style.css',
    './js/add-form.js',
    './js/app-elements.js',
    './js/app-state.js',
    './js/app.js',
    './js/book-api.js',
    './js/db.js',
    './js/scanner.js',
    './icons/icon.png',
    './images/no_image.jpg',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FILES_TO_CACHE);
        }),
    );
    self.skipWaiting();
});


self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request)),
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        Promise.all([
            caches.keys().then((keys) =>
                Promise.all(
                    keys.map((key) => {
                        if (key !== CACHE_NAME) {
                            return caches.delete(key);
                        }
                    }),
                ),
            ),
            self.clients.claim(),
        ]),
    );
});