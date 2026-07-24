const params = new URLSearchParams(location.search);
const isbnInput = document.getElementById('isbn');
const form = document.getElementById('bookForm');
const editId = params.get('id');
const cancelButton = document.getElementById('cancelButton');
const fetchButton = document.getElementById('fetchButton');
const API_KEY = 'AIzaSyD9etPxFIGVsh0l-PlBsh_2ECI1zczvgZ4';
let editingBook = null;
let lastFetchedIsbn = '';

if (editId) {
    document.querySelector('h1').textContent = '本を編集';
    document.getElementById('saveButton').textContent = '更新';
    loadBook(editId);
}

async function loadBook(id) {
    const book = await getBook(id);
    if (!book) {
        return;
    }

    editingBook = book;

    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('publisher').value = book.publisher;
    document.getElementById('isbn').value = book.isbn;
    if (book.thumbnail) {
        const img = document.getElementById('thumbnail');
        img.src = book.thumbnail;
        img.style.display = 'block';
    }
}

async function loadBookInfo(isbn) {
    isbn = isbn.trim();
    if (!isbn) {return;}
    if (isbn === lastFetchedIsbn) {return;}
    lastFetchedIsbn = isbn;

    // 一度表示内容をクリア
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('publisher').value = '';
    const img = document.getElementById('thumbnail');
    img.removeAttribute('src');
    img.style.display = 'none';

    try {
        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`,
            {
                headers: {
                    'x-goog-api-key': API_KEY,
                },
            },
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        if (!data.items || data.items.length === 0) {
            lastFetchedIsbn = '';
            alert('本の情報が見つかりませんでした。');
            return;
        }

        const info = data.items[0].volumeInfo;
        document.getElementById('title').value = info.title ?? '';
        document.getElementById('author').value =
            info.authors?.join(', ') ?? '';
        document.getElementById('publisher').value = info.publisher ?? '';

        const thumbnail = info.imageLinks?.thumbnail;
        if (thumbnail) {
            const img = document.getElementById('thumbnail');
            img.src = thumbnail;
            img.style.display = 'block';
        }
    } catch (error) {
        lastFetchedIsbn = '';
        console.error(error);
        alert('Google Books APIから本の情報を取得できませんでした。');
    }
}
window.loadBookInfo = loadBookInfo;

cancelButton.addEventListener('click', () => {
    location.href = 'index.html';
});

fetchButton.addEventListener('click', () => {
    const isbn = document.getElementById('isbn').value.trim();
    if (!isbn) {
        alert('ISBNを入力してから検索してください');
        return;
    }
    loadBookInfo(isbn);
});

isbnInput.addEventListener('blur', () => {
    const isbn = isbnInput.value.trim();
    if (isbn.length >= 10) {
        loadBookInfo(isbn);
    }
});

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const book = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        publisher: document.getElementById('publisher').value,
        isbn: document.getElementById('isbn').value,
        thumbnail:
            document.getElementById('thumbnail').getAttribute('src') || '',
    };

    if (editId) {
        book.id = editId;
        book.sold = editingBook.sold;
        book.soldAt = editingBook.soldAt;
        await updateBook(book);
    } else {
        book.id = crypto.randomUUID();
        book.createdAt = Date.now();
        book.sold = false;
        book.soldAt = null;
        await createBook(book);
    }

    location.href = 'index.html';
});

const scanButton = document.getElementById('scanButton');
scanButton.addEventListener('click', () => {
    startScanner();
    document
        .getElementById('closeScanner')
        .addEventListener('click', stopScanner);
});
