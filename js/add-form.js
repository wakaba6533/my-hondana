dom.form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const book = {
        title: dom.title.value,
        author: dom.author.value,
        publisher: dom.publisher.value,
        isbn: dom.isbn.value,
        thumbnail: dom.thumbnail.getAttribute('src') || '',
    };

    if (appState.editId) {
        book.id = appState.editId;
        book.sold = appState.editingBook.sold;
        book.soldAt = appState.editingBook.soldAt;

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
