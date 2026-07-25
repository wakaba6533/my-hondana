function createBookCard(book) {
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

window.createBookCard = createBookCard;