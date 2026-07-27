const API_KEY = 'AIzaSyD9etPxFIGVsh0l-PlBsh_2ECI1zczvgZ4';

function getAddDom() {
    const page = dom.addPage;

    return {
        title: page.querySelector('#title'),
        author: page.querySelector('#author'),
        isbn: page.querySelector('#isbn'),
        series: page.querySelector('#series'),
        seriesMessage: page.querySelector('#seriesMessage'),
        thumbnail: page.querySelector('#thumbnail'),
    };
}

async function loadBookInfo(isbn) {
    isbn = isbn.trim();
    if (!isbn) {return;}
    if (isbn === appState.lastFetchedIsbn) {return;}
    appState.lastFetchedIsbn = isbn;

    // 一度表示内容をクリア
    const addDom = getAddDom();
    addDom.title.value = '';
    addDom.author.value = '';
    addDom.thumbnail.removeAttribute('src');
    addDom.thumbnail.style.display = 'none';

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
        addDom.title.value = info.title ?? '';
        addDom.author.value = info.authors?.join(', ') ?? '';

        const candidate = guessSeriesName(info.title);
        addDom.series.value = candidate;
        if (!candidate) {
            addDom.seriesMessage.textContent = '';
            return;
        }
        const series = (await getSeries()).find(
            (s) => s.name === candidate,
        );
        if (series) {
            addDom.seriesMessage.textContent =
                '💡既存シリーズに追加されます';
        } else {
            addDom.seriesMessage.textContent =
                '💡新しいシリーズになります';
        }

        const thumbnail = info.imageLinks?.thumbnail;
        if (thumbnail) {
            addDom.thumbnail.src = thumbnail;
            addDom.thumbnail.style.display = 'block';
        }
    } catch (error) {
        appState.lastFetchedIsbn = '';
        console.error(error);
        alert('Google Books APIから本の情報を取得できませんでした。');
    }
}

window.loadBookInfo = loadBookInfo;