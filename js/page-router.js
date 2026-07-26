const pageStack = [];

function openPage(page) {
    const current = document.querySelector('.page.active');

    if (current && current !== page) {
        current.classList.remove('active');
        current.classList.add('previous');
        pageStack.push(current);
    }

    page.classList.add('active');
}

function backPage() {
    const current = document.querySelector('.page.active');
    const previous = pageStack.pop();

    if (!current || !previous) {
        return;
    }

    previous.classList.add('active');

    requestAnimationFrame(() => {
        current.classList.add('leaving');
    });

    current.addEventListener(
        'transitionend',
        () => {
            current.classList.remove('active');
            current.classList.remove('leaving');
            current.classList.remove('previous');
        },
        {once:true}
    );
}