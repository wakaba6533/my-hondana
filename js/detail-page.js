async function openDetailPage(id) {
    const page = dom.detailPage;
    const book = await getBook(id);
    if (!book) {return;}

    page.innerHTML = `
        <header class="page-header">
            <button class="page-back-button">‹</button>
            <h1>詳細</h1>
        </header>
        <main class="detail-page">
            <div class="detail-card">
                <div class="detail-cover">
                    <img src="${book.thumbnail}">
                </div>
                <h2 class="detail-title">
                    ${book.title}
                </h2>
                <div class="detail-row">
                    <span class="label">著者</span>
                    <span>${book.author ?? ''}</span>
                </div>
                <div class="detail-row">
                    <span class="label">ISBN</span>
                    <span>${book.isbn ?? ''}</span>
                </div>
                <div class="detail-row">
                    <span class="label">状態</span>
                    <span>${book.sold ? '📕 売却済み' : '📗 所有中'}</span>
                </div>
                <div class="detail-row">
                    <span class="label">日付</span>
                    <span>
                        ${book.sold
                            ? `📕 ${new Date(book.soldAt).toLocaleDateString('ja-JP')}`
                            : `📚 ${new Date(book.createdAt).toLocaleDateString('ja-JP')}`
                        }
                    </span>
                </div>
            </div>
            <div class="detail-buttons">
                <button id="editButton">編集</button>
                <button id="sellButton">${book.sold ? '売却済み' : '売却'}</button>
                <button id="deleteButton">削除</button>
            </div>
        </main>
    `;

    openPage(page);

    const editButton = page.querySelector('#editButton');
    const sellButton = page.querySelector('#sellButton');
    const deleteButton = page.querySelector('#deleteButton');

    if (book.sold) {
        sellButton.disabled = true;
    }

    editButton.addEventListener('click', () => {
        location.href = `add.html?id=${book.id}`;
    });
    sellButton.addEventListener('click', async () => {
        if (book.sold) {return;}

        const result = confirm('この本を売却済みにしますか？');
        if (!result) {return;}

        book.sold = true;
        book.soldAt = Date.now();
        await updateBook(book);

        // 画面の左ずれの緊急対応
        page.querySelector('.detail-buttons').innerHTML = `
            <button id="editButton">編集</button>
            <button id="sellButton" disabled>売却済み</button>
            <button id="deleteButton">削除</button>
        `;
        const statusRow = page.querySelectorAll('.detail-row')[2];
        statusRow.innerHTML = `
            <span class="label">状態</span>
            <span>📕 売却済み</span>
        `;
        const dateRow = page.querySelectorAll('.detail-row')[3];
        dateRow.innerHTML = `
            <span class="label">日付</span>
            <span>📕 ${new Date(book.soldAt).toLocaleDateString('ja-JP')}</span>
        `;
    });
    deleteButton.addEventListener('click', async () => {
        if (!confirm('削除しますか？')) {return;}
        await deleteBook(book.id);
        backPage();
    });
    page.querySelector('.page-back-button').addEventListener('click', () => {
        backPage();
    });
}

window.openDetailPage = openDetailPage;