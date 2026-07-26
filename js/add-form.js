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
            seriesId: null,
            thumbnail: dom.thumbnail.getAttribute('src') || '',
        };
    
    const seriesName = dom.series.value.trim();
    if (seriesName) {
        let series = await getSeriesByName(seriesName);
        if (!series) {
            series = {
                id: crypto.randomUUID(),
                name: seriesName,
                createdAt: Date.now(),
            };

            await createSeries(series);
        }
        book.seriesId = series.id;
    } else {
        book.seriesId = null;
    }

    if (appState.editId) {
        await updateBook(book);
        openDetailPage(book.id);
    } else {
        await createBook(book);
        location.href = 'index.html';
    }
});
