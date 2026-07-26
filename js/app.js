dom.addButton.addEventListener('click', () => {
    location.href = 'add.html';
});

async function loadBooks() {
    appState.books = await getBooks();
    appState.series = await getSeries();
    renderBooks();
}

function renderBooks() {
    dom.bookList.innerHTML = '';
    const keyword = dom.searchInput.value.trim().toLowerCase();

    const sortedBooks = [...appState.books];
    sortedBooks.sort((a, b) => {
        let result = 0;
        if (appState.sortKey === 'title') {
            result = (a.title ?? '').localeCompare(b.title ?? '', 'ja');
        }
        if (appState.sortKey === 'author') {
            result = (a.author ?? '').localeCompare(b.author ?? '', 'ja');
        }
        if (appState.sortKey === 'createdAt') {
            result = (a.createdAt ?? 0) - (b.createdAt ?? 0);
        }
        return appState.sortOrder === 'asc' ? result : -result;
    });

    if (appState.books.length === 0) {
        dom.bookList.innerHTML = `
            <p class="empty">
                まだ本はありません
            </p>
        `;
        return;
    }

    const filteredBooks = sortedBooks.filter((book) => {
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

    const displayItems = createDisplayItems(filteredBooks);
    displayItems.forEach((item) => {
        if (item.type === 'book') {
            dom.bookList.appendChild(
                createBookCard(item.book),
            );
        } else {
            dom.bookList.appendChild(
                createSeriesCard(item),
            );
        }
    });
}

function createSeriesCard(item) {
    const card = document.createElement('div');
    card.className = 'book-card series-card';

    // 最古巻
    const firstBook = [...item.books].sort((a, b) => {
        const aDate = a.createdAt ?? 0;
        const bDate = b.createdAt ?? 0;
        return aDate - bDate;
    })[0];

    const thumbnail =
        firstBook.thumbnail || 'images/no_image.jpg';

    const latestUpdate = [...item.books].sort((a, b) => {
        const aDate = a.sold ? a.soldAt : a.createdAt;
        const bDate = b.sold ? b.soldAt : b.createdAt;
        return bDate - aDate;
    })[0];

    const date = latestUpdate.sold
        ? latestUpdate.soldAt
        : latestUpdate.createdAt;

    const displayDate = date
        ? new Date(date).toLocaleDateString('ja-JP')
        : '';

    card.innerHTML = `
        <div class="series-badge">SERIES</div>
        <div class="book-thumbnail">
            <img src="${thumbnail}">
        </div>
        <div class="book-info">
            <div class="book-title">${item.series.name}</div>
            <div class="book-author">👤 ${firstBook.author ?? ''}</div>
            <div class="book-meta">
                <div class="book-status">📚 ${item.books.length}冊</div>
                <div class="book-date">📅 ${displayDate}</div>
            </div>
        </div>
    `;

    card.addEventListener('click', () => {
        openSeriesPage(item.series.id);
    });

    return card;
}

function createDisplayItems(books) {
    const items = [];

    const grouped = new Map();

    books.forEach((book) => {
        if (!book.seriesId) {
            items.push({
                type: 'book',
                book,
            });
            return;
        }

        if (!grouped.has(book.seriesId)) {
            grouped.set(book.seriesId, []);
        }

        grouped.get(book.seriesId).push(book);
    });

    grouped.forEach((books, seriesId) => {
        const series = appState.series.find(
            (s) => s.id === seriesId,
        );

        items.push({
            type: 'series',
            series,
            books,
        });
    });

    return items;
}

function getSeriesName(book) {
    if (!book.seriesId) {return '';}
    return (
        appState.series.find(
            (series) => series.id === book.seriesId,
        )?.name ?? ''
    );
}

dom.searchInput.addEventListener('input', renderBooks);
loadBooks();
