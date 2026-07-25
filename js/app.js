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

    filteredBooks.forEach((book) => {
        dom.bookList.appendChild(createBookRow(book));
    });
}

function createBookRow(book) {
    const card = document.createElement('div');
    card.className = `book-card ${book.sold ? 'sold' : ''}`;
    const date = book.sold ? book.soldAt : book.createdAt;
    const dateIcon = book.sold ? '💰' : '📅';
    const displayDate = date ? formatDate(date) : '';
    
    card.innerHTML = `
        <div class="book-thumbnail">
            <img
                src="${book.thumbnail || 'images/no_image.jpg'}"
                alt="${book.title ?? ''}"
            >
        </div>
        <div class="book-info">
            <div class="book-title">${book.title ?? ''}</div>
            <div class="book-author">👤 ${book.author ?? ''}</div>
            <div class="book-meta">
                <div class="book-status ${book.sold ? 'sold' : 'owned'}">
                    ${book.sold ? '📕 売却済' : '📗 所有中'}
                </div>
                <div class="book-date">${dateIcon} ${displayDate}</div>
            </div>
        </div>
    `;

    card.addEventListener('click', () => {
        location.href = `detail.html?id=${book.id}`;
    });

    return card;
}

function formatDate(timestamp) {
    return new Date(timestamp).toLocaleDateString('ja-JP');
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
