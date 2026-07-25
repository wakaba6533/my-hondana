const params = new URLSearchParams(location.search);
const seriesId = params.get('id');

load();

async function load() {
    const series = await getSeriesById(seriesId);

    if (!series) {
        return;
    }

    dom.seriesTitle.textContent = series.name;

    const books = await getBooks();

    const seriesBooks = books.filter(
        (book) => book.seriesId === seriesId,
    );

    seriesBooks.forEach((book) => {
        dom.seriesBooks.appendChild(
            createBookCard(book)
        );
    });
}

dom.backButton.addEventListener('click', () => {
    history.back();
});