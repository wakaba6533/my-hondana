async function openSeriesPage(seriesId) {
    const page = dom.seriesPage;
    page.innerHTML = `
        <header class="page-header">
            <button class="page-back-button">‹</button>
            <h1>シリーズ</h1>
        </header>
        <main>
            <div id="seriesBooks" class="book-grid"></div>
        </main>
    `;

    openPage(page);

    const books = await getBooks();
    const seriesBooks = books.filter(
        (book) => book.seriesId === seriesId
    );

    const list = page.querySelector('#seriesBooks');
    seriesBooks.forEach((book) => {
        list.appendChild(
            createBookCard(book)
        );
    });

    page
        .querySelector('.page-back-button')
        .addEventListener('click', () => {
            backPage();
        });
}

window.openSeriesPage = openSeriesPage;