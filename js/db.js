const DB_NAME = "bookshelf-db";
const STORE_NAME = "books";
const DB_VERSION = 1;

function openDatabase() {

    return new Promise((resolve, reject) => {

        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {

            const db = event.target.result;

            if (!db.objectStoreNames.contains(STORE_NAME)) {

                db.createObjectStore(STORE_NAME, {
                    keyPath: "id"
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

        const tx = db.transaction(STORE_NAME, "readwrite");

        tx.objectStore(STORE_NAME).put(book);

        tx.oncomplete = () => resolve();

        tx.onerror = () => reject(tx.error);

    });

}

async function getBooks() {

    const db = await openDatabase();

    return new Promise((resolve, reject) => {

        const tx = db.transaction(STORE_NAME, "readonly");

        const request = tx.objectStore(STORE_NAME).getAll();

        request.onsuccess = () => resolve(request.result);

        request.onerror = () => reject(request.error);

    });

}

async function getBook(id) {

    const db = await openDatabase();

    return new Promise((resolve, reject) => {

        const tx = db.transaction(STORE_NAME, "readonly");

        const request = tx
            .objectStore(STORE_NAME)
            .get(id);

        request.onsuccess = () => resolve(request.result);

        request.onerror = () => reject(request.error);

    });

}

async function updateBook(book) {

    const db = await openDatabase();

    return new Promise((resolve, reject) => {

        const tx = db.transaction(STORE_NAME, "readwrite");

        tx.objectStore(STORE_NAME).put(book);

        tx.oncomplete = () => resolve();

        tx.onerror = () => reject(tx.error);

    });

}

async function deleteBook(id) {

    const db = await openDatabase();

    return new Promise((resolve, reject) => {

        const tx = db.transaction(STORE_NAME, "readwrite");

        tx.objectStore(STORE_NAME).delete(id);

        tx.oncomplete = () => resolve();

        tx.onerror = () => reject(tx.error);

    });

}