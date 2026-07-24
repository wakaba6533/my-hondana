// 開発用
const DEV_ISBN = '9784300116012';
document.getElementById('devAddButton').addEventListener('click', () => {
    location.href = `add.html?isbn=${DEV_ISBN}`;
});
// 開発用ここまで

const manualAddButton = document.getElementById('manualAddButton');
manualAddButton.addEventListener('click', () => {
    location.href = 'add.html';
});

let books = [];
const scanButton = document.getElementById('scanButton');

scanButton.addEventListener('click', () => {
    startScanner();

    document
        .getElementById('closeScanner')
        .addEventListener('click', stopScanner);
});

let sortKey = 'createdAt';
let sortOrder = 'desc';

async function loadBooks() {
    books = await getBooks();
    renderBooks();
}

function renderBooks() {
    const list = document.getElementById('bookList');
    list.innerHTML = '';
    const keyword = document
        .getElementById('searchInput')
        .value.trim()
        .toLowerCase();

    const sortedBooks = [...books];
    sortedBooks.sort((a, b) => {
        let result = 0;
        if (sortKey === 'title') {
            result = (a.title ?? '').localeCompare(b.title ?? '', 'ja');
        }
        if (sortKey === 'author') {
            result = (a.author ?? '').localeCompare(b.author ?? '', 'ja');
        }
        if (sortKey === 'createdAt') {
            result = (a.createdAt ?? 0) - (b.createdAt ?? 0);
        }
        return sortOrder === 'asc' ? result : -result;
    });

    if (books.length === 0) {
        list.innerHTML = `
            <p class="empty">
                まだ本はありません
            </p>
        `;
        return;
    }

    const statusType = document.getElementById('statusSelect').value;
    const filteredBooks = sortedBooks.filter((book) => {
        const matchesKeyword =
            book.title?.toLowerCase().includes(keyword) ||
            book.author?.toLowerCase().includes(keyword) ||
            book.isbn?.includes(keyword);
        const matchesStatus =
            statusType === 'all' ||
            (statusType === 'owned' && !book.sold) ||
            (statusType === 'sold' && book.sold);
        return matchesKeyword && matchesStatus;
    });

    filteredBooks.forEach((book) => {
        const div = document.createElement('div');
        div.className = book.sold ? 'book-row sold' : 'book-row';
        div.dataset.id = book.id;
        const createdDate = book.createdAt
            ? new Date(book.createdAt).toLocaleDateString('ja-JP')
            : '';

        div.innerHTML = `
            <div class="thumbnail">
                ${
                    book.thumbnail
                        ? `<img src="${book.thumbnail}" class="thumb">`
                        : `<img src="images/no_image.jpg" class="thumb">`
                }
            </div>
            <div class="title">
                ${book.title ?? ''}
            </div>
            <div class="author">
                ${book.author ?? ''}
            </div>
            <div class="status">
                ${book.sold ? '📕 売却済み' : '📗 所有中'}
            </div>
            <div class="created-date">
                ${createdDate}
            </div>
        `;

        div.addEventListener('click', () => {
            location.href = `detail.html?id=${book.id}`;
        });

        list.appendChild(div);
    });
}

function updateSortIndicators() {
    document.querySelectorAll('.sortable').forEach((header) => {
        const key = header.dataset.sort;
        const text = header.textContent.replace(/[▲▼]/g, '');
        if (key === sortKey) {
            header.textContent = text + (sortOrder === 'asc' ? ' ▲' : ' ▼');
        } else {
            header.textContent = text;
        }
    });
}

document.getElementById('searchInput').addEventListener('input', renderBooks);
document.getElementById('statusSelect').addEventListener('change', renderBooks);
document.querySelectorAll('.sortable').forEach((header) => {
    header.addEventListener('click', () => {
        const key = header.dataset.sort;
        if (sortKey === key) {
            sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
            sortKey = key;
            sortOrder = 'asc';
        }
        updateSortIndicators();
        renderBooks();
    });
});

loadBooks();
