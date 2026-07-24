// 開発用
const DEV_ISBN = '9784300116012';
document.getElementById('devAddButton').addEventListener('click', () => {
    location.href = `add.html?isbn=${DEV_ISBN}`;
});
// 開発用ここまで

let books = [];
const scanButton = document.getElementById('scanButton');

scanButton.addEventListener('click', () => {
    startScanner();

    document
        .getElementById('closeScanner')
        .addEventListener('click', stopScanner);
});

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

    const sortType = document.getElementById('sortSelect').value;
    const statusType = document.getElementById('statusSelect').value;
    const sortedBooks = [...books];
    switch (sortType) {
        case 'newest':
            sortedBooks.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
            break;
        case 'oldest':
            sortedBooks.sort((a, b) => (a.createdAt ?? 0) - (b.createdAt ?? 0));
            break;
        case 'title':
            sortedBooks.sort((a, b) => a.title.localeCompare(b.title, 'ja'));
            break;
        case 'author':
            sortedBooks.sort((a, b) =>
                (a.author ?? '').localeCompare(b.author ?? '', 'ja'),
            );
            break;
    }

    if (books.length === 0) {
        list.innerHTML = `
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
            statusType === 'all' ||
            (statusType === 'owned' && !book.sold) ||
            (statusType === 'sold' && book.sold);
        return matchesKeyword && matchesStatus;
    });

    filteredBooks.forEach((book) => {
        const div = document.createElement('div');
        div.className = book.sold ? 'book-card sold' : 'book-card';
        div.dataset.id = book.id;
        div.innerHTML = `
            ${
                book.thumbnail
                    ? `<img src="${book.thumbnail}" class="thumb">`
                    : ''
            }
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            ${book.sold ? '<span class="sold-badge">📕 売却済み</span>' : ''}
            <small>${book.publisher ?? ''}</small>
        `;

        div.addEventListener('click', () => {
            location.href = `detail.html?id=${book.id}`;
        });

        list.appendChild(div);
    });
}

document.getElementById('searchInput').addEventListener('input', renderBooks);
document.getElementById('sortSelect').addEventListener('change', renderBooks);
document.getElementById('statusSelect').addEventListener('change', renderBooks);

loadBooks();
