const params = new URLSearchParams(location.search);
const isbn = params.get('isbn');
const form = document.getElementById('bookForm');
const cancelButton = document.getElementById('cancelButton');

if (isbn) {
    document.getElementById('isbn').value = isbn;
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
        isbn: document.getElementById('isbn').value,
    };

    await createBook(book);

    location.href = 'index.html';
});
