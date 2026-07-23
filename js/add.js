const params = new URLSearchParams(location.search);
const isbn = params.get('isbn');
const form = document.getElementById('bookForm');
const cancelButton = document.getElementById('cancelButton');

if (isbn) {
    document.getElementById('isbn').value = isbn;
    loadBookInfo(isbn);
}

async function loadBookInfo(isbn) {
    try {
        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`,
        );

        const data = await response.json();
        if (!data.items || data.items.length === 0) {
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
        alert('もう一回やり直してくれよな！');
    }
}

cancelButton.addEventListener('click', () => {
    location.href = 'index.html';
});

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const book = {
        id: crypto.randomUUID(),
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        publisher: document.getElementById('publisher').value,
        isbn: document.getElementById('isbn').value,
        thumbnail: document.getElementById('thumbnail').src,
    };

    await createBook(book);

    location.href = 'index.html';
});
