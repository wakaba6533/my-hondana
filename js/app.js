// 開発用
const DEV_ISBN = '9784300116012';
document.getElementById('devAddButton').addEventListener('click', () => {
    location.href = `add.html?isbn=${DEV_ISBN}`;
});
// 開発用ここまで

const scanButton = document.getElementById('scanButton');

scanButton.addEventListener('click', () => {
    startScanner();

    document
        .getElementById('closeScanner')
        .addEventListener('click', stopScanner);
});

async function loadBooks() {
    const books = await getBooks();
    const list = document.getElementById('bookList');
    list.innerHTML = '';

    if (books.length === 0) {
        list.innerHTML = `
            <p class="empty">
                まだ本はありません
            </p>
        `;
        return;
    }

    books.forEach((book) => {
        const div = document.createElement('div');
        div.className = 'book-card';
        div.dataset.id = book.id;
        div.innerHTML = `
            ${
                book.thumbnail
                    ? `<img src="${book.thumbnail}" class="thumb">`
                    : ''
            }
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <small>${book.publisher ?? ''}</small>
        `;

        div.addEventListener('click', () => {
            location.href = `detail.html?id=${book.id}`;
        });

        list.appendChild(div);
    });
}

loadBooks();
