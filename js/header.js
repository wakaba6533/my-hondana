function setupHeaderEvents(page = document) {
    const sortButton = page.querySelector('#sortButton');
    const filterButton = page.querySelector('#filterButton');
    const menu = page.querySelector('#headerMenu');

    if (!sortButton || !filterButton || !menu) {
        return;
    }

    sortButton.addEventListener('click', () => {
        menu.innerHTML = `
            <button data-sort="title">タイトル順</button>
            <button data-sort="author">著者順</button>
            <button data-sort="createdAt">登録日順</button>
        `;
        menu.classList.toggle('show');
    });

    filterButton.addEventListener('click', () => {
        menu.innerHTML = `
            <button data-filter="all">📚 すべて</button>
            <button data-filter="owned">📗 所有中</button>
            <button data-filter="sold">📕 売却済</button>
        `;
        menu.classList.toggle('show');
    });

    menu.addEventListener('click', (event) => {
        const sort = event.target.dataset.sort;
        const filter = event.target.dataset.filter;

        if (sort) {
            appState.sortKey = sort;

            if (page === dom.topPage) {
                renderBooks();
            }
            if (page === dom.seriesPage) {
                renderSeriesBooks();
            }

            menu.classList.remove('show');
        }

        if (filter) {
            appState.statusFilter = filter;

            if (page === dom.topPage) {
                renderBooks();
            }
            if (page === dom.seriesPage) {
                renderSeriesBooks();
            }

            menu.classList.remove('show');
        }
    });
}