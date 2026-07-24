const params = new URLSearchParams(location.search);
const id = params.get('id');
const editButton = document.getElementById('editButton');
const deleteButton = document.getElementById('deleteButton');
const sellButton = document.getElementById('sellButton');
const backButton = document.getElementById('backButton');

load();

async function load() {
    const book = await getBook(id);

    document.getElementById('title').textContent = book.title;
    document.getElementById('author').textContent = book.author;
    document.getElementById('publisher').textContent = book.publisher ?? '';
    document.getElementById('isbn').textContent = book.isbn;

    if (book.thumbnail) {
        document.getElementById('thumbnail').src = book.thumbnail;
    }

    const soldInfo = document.getElementById('soldInfo');
    if (book.sold) {
        const date = new Date(book.soldAt);
        soldInfo.innerHTML = `
            <p class="sold-badge">
                📕 売却済み
            </p>
            <p>
                売却日：
                ${date.toLocaleDateString('ja-JP')}
            </p>
        `;
        sellButton.style.display = 'none';
    }
}

editButton.addEventListener('click', () => {
    location.href = `add.html?id=${id}`;
});

deleteButton.addEventListener('click', async () => {
    const ok = confirm('この本を削除しますか？');

    if (!ok) {
        return;
    }

    await deleteBook(id);

    location.href = 'index.html';
});

sellButton.addEventListener('click', async () => {
    if (!confirm('この本を売却済みにしますか？')) {
        return;
    }

    const book = await getBook(id);
    if (!book) {
        return;
    }

    book.sold = true;
    book.soldAt = Date.now();

    await updateBook(book);

    location.href = 'index.html';
});

backButton.addEventListener('click', () => {
    location.href = 'index.html';
});
