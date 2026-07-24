dom.addButton.addEventListener('click', () => {
    location.href = 'add.html';
});

async function loadBooks() {
    appState.books = await getBooks();
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
    const row = document.createElement('div');

    row.className = book.sold ? 'book-row sold' : 'book-row';
    row.dataset.id = book.id;

    const displayDate = book.sold
        ? formatDate(book.soldAt)
        : formatDate(book.createdAt);

    row.innerHTML = `
        <div class="status">${book.sold ? '📕' : '📗'}</div>
        <div class="title">${book.title ?? ''}</div>
        <div class="author">${book.author ?? ''}</div>
        <div class="created-date">${displayDate}</div>
    `;

    row.addEventListener('click', () => {
        location.href = `detail.html?id=${book.id}`;
    });

    return row;
}

function formatDate(timestamp) {
    const date = new Date(timestamp);
    return `${date.getFullYear() % 100}/${date.getMonth() + 1}/${date.getDate()}`;
}

function updateSortIndicators() {
    dom.sortableHeaders.forEach((header) => {
        const key = header.dataset.sort;
        const text = header.textContent.replace(/[▲▼]/g, '');
        if (key === appState.sortKey) {
            header.textContent = text + (appState.sortOrder === 'asc' ? ' ▲' : ' ▼');
        } else {
            header.textContent = text;
        }
    });
}

function updateStatusIndicator() {
    switch (appState.statusFilter) {
        case 'owned':
            dom.statusHeader.textContent = '📗';
            break;
        case 'sold':
            dom.statusHeader.textContent = '📕';
            break;
        case 'all':
            dom.statusHeader.textContent = '📚';
            break;
    }
}

dom.statusHeader.addEventListener('click', () => {
    switch (appState.statusFilter) {
        case 'owned':
            appState.statusFilter = 'sold';
            break;
        case 'sold':
            appState.statusFilter = 'all';
            break;
        default:
            appState.statusFilter = 'owned';
    }
    updateStatusIndicator();
    renderBooks();
});

dom.searchInput.addEventListener('input', renderBooks);
dom.sortableHeaders.forEach((header) => {
    header.addEventListener('click', () => {
        const key = header.dataset.sort;
        if (appState.sortKey === key) {
            appState.sortOrder = appState.sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
            appState.sortKey = key;
            appState.sortOrder = 'asc';
        }
        updateSortIndicators();
        renderBooks();
    });
});

updateSortIndicators();
updateStatusIndicator();
loadBooks();
