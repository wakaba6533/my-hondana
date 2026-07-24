dom.form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const book = appState.editId
        ? {
            ...appState.editingBook,
            title: dom.title.value,
            author: dom.author.value,
            isbn: dom.isbn.value,
            thumbnail: dom.thumbnail.getAttribute('src') || '',
        }
        : {
            id: crypto.randomUUID(),
            createdAt: Date.now(),
            sold: false,
            soldAt: null,
            title: dom.title.value,
            author: dom.author.value,
            isbn: dom.isbn.value,
            thumbnail: dom.thumbnail.getAttribute('src') || '',
        };

    if (appState.editId) {
        await updateBook(book);
        location.href = `detail.html?id=${book.id}`;
    } else {
        await createBook(book);
        location.href = 'index.html';
    }
});
