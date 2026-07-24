const CACHE_NAME = 'my-bookshelf-v1';

const FILES_TO_CACHE = [
    './',
    './index.html',
    './add.html',
    './detail.html',
    './manifest.json',
    './css/style.css',
    './js/add-form.js',
    './js/add.js',
    './js/app-elements.js',
    './js/app-state.js',
    './js/app.js',
    './js/book-api.js',
    './js/db.js',
    './js/detail.js',
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
});


self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        }),
    );
});