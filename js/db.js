const DB_NAME = 'bookshelf-db';
const STORE_NAME = 'books';
const SERIES_STORE_NAME = 'series';
const DB_VERSION = 2;

function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, {
                    keyPath: 'id',
                });
            }

            if (!db.objectStoreNames.contains(SERIES_STORE_NAME)) {
                db.createObjectStore(SERIES_STORE_NAME, {
                    keyPath: 'id',
                });
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function createBook(book) {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');

        tx.objectStore(STORE_NAME).put(book);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

async function getBooks() {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const request = tx.objectStore(STORE_NAME).getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function getBook(id) {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const request = store.get(id);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function updateBook(book) {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const request = store.put(book);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

async function deleteBook(id) {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');

        tx.objectStore(STORE_NAME).delete(id);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}


async function getSeries() {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const tx = db.transaction(SERIES_STORE_NAME, 'readonly');
        const request = tx.objectStore(SERIES_STORE_NAME).getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function getSeriesById(id) {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const tx = db.transaction(SERIES_STORE_NAME, 'readonly');
        const request = tx.objectStore(SERIES_STORE_NAME).get(id);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function getSeriesByName(name) {
    const seriesList = await getSeries();

    return seriesList.find((series) => series.name === name) ?? null;
}

async function createSeries(series) {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const tx = db.transaction(SERIES_STORE_NAME, 'readwrite');

        tx.objectStore(SERIES_STORE_NAME).put(series);

        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

async function updateSeries(series) {
    return createSeries(series);
}

async function deleteSeries(id) {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const tx = db.transaction(SERIES_STORE_NAME, 'readwrite');

        tx.objectStore(SERIES_STORE_NAME).delete(id);

        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}
