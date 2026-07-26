const pageStack = [];

function openPage(page) {
    const current = document.querySelector('.page.active');
    if (current) {
        current.classList.remove('active');
        current.classList.add('previous');
        pageStack.push(current);
    }
    page.classList.add('active');
}

function backPage() {
    const current = document.querySelector('.page.active');
    if (current) {current.classList.remove('previous');}

    const previous = pageStack.pop();
    if (!previous) {return;}

    // 前のページを表示
    previous.classList.add('active');

    // 少し待ってから現在ページを右へ送る
    requestAnimationFrame(() => {
        current.classList.add('leaving');
    });

    // アニメーション終了後
    current.addEventListener('transitionend', () => {
            current.classList.remove('active');
            current.classList.remove('leaving');
            current.classList.remove('previous');
        },
        {once: true}
    );
}

window.openPage = openPage;
window.backPage = backPage;