let previousAddPage = null;

async function openAddPage(id = null) {
    previousAddPage = document.querySelector('.page.active');
    const page = dom.addPage;
    appState.editId = id;

    page.innerHTML = `
        <main class="add-page">
            <form id="bookForm">
                <label>タイトル<input type="text" id="title" required/></label>
                <label>著者<input type="text" id="author"/></label>
                <label>
                    ISBN
                    <div class="isbn-row">
                        <input type="text" id="isbn"/>
                        <button type="button" id="scanButton">📷</button>
                        <button type="button" id="fetchButton">🔍</button>
                    </div>
                </label>
                <label>シリーズ<input id="series"></label>
                <small id="seriesMessage"></small>
                <div id="seriesSection" class="series-section hidden">
                    <div class="series-title">シリーズ候補</div>
                    <div id="seriesCandidate"></div>
                </div>
                <img
                    id="thumbnail"
                    src=""
                    alt="表紙"
                    style="display:none; width:160px; margin:16px auto;"
                />
                <button id="saveButton" type="submit">登録</button>
            </form>
        </main>
    `;

    page.insertAdjacentHTML(
        'afterbegin',
        createHeader({
            back:true
        })
    );

    page.insertAdjacentHTML(
        'beforeend',
        `
        <div id="scannerModal" class="hidden">
            <div class="scanner-container">
                <div id="reader"></div>
                <button type="button" id="closeScanner">閉じる</button>
            </div>
        </div>
        `
    );

    if (previousAddPage) {
        previousAddPage.classList.remove('active');
    }

    page.classList.add('instant');
    page.classList.add('active');

    if (id) {
        const book = await getBook(id);
        if (book) {
            appState.editingBook = book;
            page.querySelector('#title').value = book.title ?? '';
            page.querySelector('#author').value = book.author ?? '';
            page.querySelector('#isbn').value = book.isbn ?? '';
            page.querySelector('#series').value = getSeriesName(book);

            if (book.thumbnail) {
                const thumbnail = page.querySelector('#thumbnail');
                thumbnail.src = book.thumbnail;
                thumbnail.style.display = 'block';
            }
            page.querySelector('#saveButton').textContent = '更新';
        }
    }

    page
        .querySelector('.header-back-button')
        .addEventListener('click', () => {
            backFromAddPage();
        });
    
    page
        .querySelector('#fetchButton')
        .addEventListener('click', () => {
            const isbn =
                page.querySelector('#isbn')
                    .value
                    .trim();

            if (!isbn) {
                alert('ISBNを入力してから検索してください');
                return;
            }

            loadBookInfo(isbn);
        });
    
    page
        .querySelector('#scanButton')
        .addEventListener('click', () => {
            startScanner();
        });

    page
        .querySelector('#closeScanner')
        .addEventListener('click', () => {
            stopScanner();
        });

    page
        .querySelector('#isbn')
        .addEventListener('blur', () => {
            const isbn =
                page.querySelector('#isbn')
                    .value
                    .trim();

            if (isbn.length >= 10) {
                loadBookInfo(isbn);
            }
        });
    
    page
        .querySelector('#bookForm')
        .addEventListener(
            'submit',
            handleAddSubmit
        );
}

function backFromAddPage() {
    const page = dom.addPage;

    page.classList.remove('active');
    page.classList.remove('instant');

    if (previousAddPage) {
        previousAddPage.classList.add('active');
    }
}

window.openAddPage = openAddPage;