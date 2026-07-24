const API_KEY = 'AIzaSyD9etPxFIGVsh0l-PlBsh_2ECI1zczvgZ4';

async function loadBookInfo(isbn) {
    isbn = isbn.trim();
    if (!isbn) {return;}
    if (isbn === appState.lastFetchedIsbn) {return;}
    appState.lastFetchedIsbn = isbn;

    // 一度表示内容をクリア
    dom.title.value = '';
    dom.author.value = '';
    dom.thumbnail.removeAttribute('src');
    dom.thumbnail.style.display = 'none';

    try {
        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`,
            {
                headers: {
                    'x-goog-api-key': API_KEY,
                },
            },
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        if (!data.items || data.items.length === 0) {
            appState.lastFetchedIsbn = '';
            alert('本の情報が見つかりませんでした。');
            return;
        }

        const info = data.items[0].volumeInfo;
        dom.title.value = info.title ?? '';
        dom.author.value = info.authors?.join(', ') ?? '';

        const thumbnail = info.imageLinks?.thumbnail;
        if (thumbnail) {
            dom.thumbnail.src = thumbnail;
            dom.thumbnail.style.display = 'block';
        }
    } catch (error) {
        appState.lastFetchedIsbn = '';
        console.error(error);
        alert('Google Books APIから本の情報を取得できませんでした。');
    }
}

window.loadBookInfo = loadBookInfo;