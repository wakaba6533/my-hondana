const params = new URLSearchParams(location.search);
const id = params.get('id');

load();

async function load() {
    sellButton.disabled = false;
    sellButton.textContent = '📕 売却';
    const book = await getBook(id);

    dom.detailTitle.textContent = book.title;
    dom.detailAuthor.textContent = book.author;
    dom.detailIsbn.textContent = book.isbn;

    if (book.thumbnail) {
        dom.thumbnail.src = book.thumbnail;
    } else {
        dom.thumbnail.src = 'images/no_image.jpg';
    }

    if (book.sold) {
        const date = new Date(book.soldAt);
        dom.soldInfo.innerHTML = `
            <div class="detail-row">
                <span class="label">📕売却済</span>
                <small>売却日：${date.toLocaleDateString('ja-JP')}</small>
            </div>
        `;
        sellButton.textContent = '💰 売却済';
        sellButton.disabled = true;
    } else {
        dom.soldInfo.innerHTML = `
            <div class="detail-row">
                <span class="label">📗所有中</span>
            </div>
        `;
    }
}

editButton.addEventListener('click', () => {
    location.href = `add.html?id=${id}`;
});

deleteButton.addEventListener('click', async () => {
    const ok = confirm('この本を削除しますか？');

    if (!ok) {return;}

    await deleteBook(id);

    location.href = 'index.html';
});

sellButton.addEventListener('click', async () => {
    if (!confirm('この本を売却済みにしますか？')) {
        return;
    }

    const book = await getBook(id);
    if (!book) {
        return;
    }

    book.sold = true;
    book.soldAt = Date.now();

    await updateBook(book);

    load();
});

backButton.addEventListener('click', () => {
    location.href = 'index.html';
});
