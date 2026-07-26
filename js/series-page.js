let currentSeriesId = null;

async function openSeriesPage(seriesId) {
    const page = dom.seriesPage;
    currentSeriesId = seriesId;

    page.innerHTML = `
        <main>
            <div id="seriesBooks" class="book-grid"></div>
        </main>
    `;

    page.insertAdjacentHTML(
        'afterbegin',
        createHeader({
            back:true,
            search:true,
            sort:true,
            filter:true
        })
    );

    openPage(page);

    setupHeaderEvents(page);

    page
        .querySelector('.header-back-button')
        .addEventListener('click', () => {
            backPage();
        });

    page
        .querySelector('#searchInput')
        .addEventListener(
            'input',
            renderSeriesBooks
        );

    page
        .querySelector('#searchInput')
        .addEventListener(
            'input',
            renderSeriesBooks
        );

    renderSeriesBooks();
}

async function renderSeriesBooks() {
    const books = await getBooks();

    let seriesBooks = books.filter(
        (book) => book.seriesId === currentSeriesId
    );

    seriesBooks.sort((a, b) => {
        let result = 0;

        if (appState.sortKey === 'title') {
            result = (a.title ?? '').localeCompare(
                b.title ?? '',
                'ja'
            );
        }

        if (appState.sortKey === 'author') {
            result = (a.author ?? '').localeCompare(
                b.author ?? '',
                'ja'
            );
        }

        if (appState.sortKey === 'createdAt') {
            result =
                (a.createdAt ?? 0) -
                (b.createdAt ?? 0);
        }

        return appState.sortOrder === 'asc'
            ? result
            : -result;
    });

    const keyword =
        dom.seriesPage
            .querySelector('#searchInput')
            .value
            .trim()
            .toLowerCase();

    const filteredBooks = seriesBooks.filter((book) => {
        const matchesKeyword =
            book.title?.toLowerCase().includes(keyword) ||
            book.author?.toLowerCase().includes(keyword) ||
            book.isbn?.includes(keyword);

        const matchesStatus =
            appState.statusFilter === 'all' ||
            (appState.statusFilter === 'owned' && !book.sold) ||
            (appState.statusFilter === 'sold' && book.sold);

        return matchesKeyword && matchesStatus;
    });

    const list =
        dom.seriesPage.querySelector('#seriesBooks');

    list.innerHTML = '';

    filteredBooks.forEach((book) => {
        list.appendChild(
            createBookCard(book)
        );
    });
}

window.openSeriesPage = openSeriesPage;
window.renderSeriesBooks = renderSeriesBooks;