const params = new URLSearchParams(location.search);
appState.editId = params.get('id');

if (appState.editId) {
    document.querySelector('h1').textContent = '本を編集';
    dom.saveButton.textContent = '更新';
    loadBook(appState.editId);
}

async function loadBook(id) {
    const book = await getBook(id);
    if (!book) {
        return;
    }

    appState.editingBook = book;

    dom.title.value = book.title;
    dom.author.value = book.author;
    dom.isbn.value = book.isbn;
    dom.series.value = book.series ?? '';
    if (book.thumbnail) {
        const img = dom.thumbnail;
        img.src = book.thumbnail;
        img.style.display = 'block';
    }
}

dom.cancelButton.addEventListener('click', () => {
    location.href = 'index.html';
});

dom.fetchButton.addEventListener('click', () => {
    const isbn = dom.isbn.value.trim();
    if (!isbn) {
        alert('ISBNを入力してから検索してください');
        return;
    }
    loadBookInfo(isbn);
});

dom.isbn.addEventListener('blur', () => {
    const isbn = dom.isbn.value.trim();
    if (isbn.length >= 10) {
        loadBookInfo(isbn);
    }
});

dom.scanButton.addEventListener('click', () => {
    startScanner();
    dom.closeScanner.addEventListener('click', stopScanner);
});
