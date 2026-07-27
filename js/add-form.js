async function handleAddSubmit(event) {
    event.preventDefault();
    const page = dom.addPage;
    const book = appState.editId
        ? {
            ...appState.editingBook,
            title: page.querySelector('#title').value,
            author: page.querySelector('#author').value,
            isbn: page.querySelector('#isbn').value,
            thumbnail:
                page.querySelector('#thumbnail')
                    .getAttribute('src') || '',
        }
        : {
            id: crypto.randomUUID(),
            createdAt: Date.now(),
            sold: false,
            soldAt: null,
            title: page.querySelector('#title').value,
            author: page.querySelector('#author').value,
            isbn: page.querySelector('#isbn').value,
            seriesId: null,
            thumbnail:
                page.querySelector('#thumbnail')
                    .getAttribute('src') || '',
        };

    const seriesName =
        page.querySelector('#series')
            .value
            .trim();

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
        appState.editId = null;
        appState.editingBook = null;
        openDetailPage(book.id);
    } else {
        await createBook(book);
        appState.editId = null;
        appState.editingBook = null;
        alert('登録しました');
        
        page.querySelector('#bookForm').reset();
        const thumbnail = page.querySelector('#thumbnail');
        thumbnail.removeAttribute('src');
        thumbnail.style.display = 'none';
        page.querySelector('#seriesMessage').textContent = '';
        appState.lastFetchedIsbn = '';
    }
}

window.handleAddSubmit = handleAddSubmit;