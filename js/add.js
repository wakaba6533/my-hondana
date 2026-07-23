const params = new URLSearchParams(location.search);
const isbn = params.get('isbn');
const form = document.getElementById('bookForm');
const editId = params.get('id');
const cancelButton = document.getElementById('cancelButton');
const API_KEY = 'AIzaSyD9etPxFIGVsh0l-PlBsh_2ECI1zczvgZ4';

if (editId) {
    document.querySelector('h1').textContent = '本を編集';
    document.getElementById('saveButton').textContent = '更新';

    loadBook(editId);
}

if (isbn) {
    document.getElementById('isbn').value = isbn;
    loadBookInfo(isbn);
}

async function loadBook(id) {
    const book = await getBook(id);
    if (!book) {
        return;
    }

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
        console.error(error);
        alert('Google Books APIから本の情報を取得できませんでした。');
    }
}

cancelButton.addEventListener('click', () => {
    location.href = 'index.html';
});

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const book = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        publisher: document.getElementById('publisher').value,
        isbn: document.getElementById('isbn').value,
        thumbnail: document.getElementById('thumbnail').src,
    };

    if (editId) {
        book.id = editId;
        await updateBook(book);
    } else {
        book.id = crypto.randomUUID();
        await createBook(book);
    }

    location.href = 'index.html';
});
