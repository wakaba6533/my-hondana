const dom = {
    // index.html
    topPage: document.getElementById('topPage'),
    appFooter: document.getElementById('appFooter'),
    addButton: document.getElementById('addButton'),
    bookList: document.getElementById('bookList'),
    get searchInput(){return document.getElementById('searchInput');},
    get sortButton(){return document.getElementById('sortButton');},
    get filterButton(){return document.getElementById('filterButton');},
    seriesPage: document.getElementById('seriesPage'),
    detailPage: document.getElementById('detailPage'),
    addPage: document.getElementById('addPage'),

    // シリーズ画面
    seriesTitle: document.getElementById('seriesTitle'),
    seriesInfo: document.getElementById('seriesInfo'),
    seriesBooks: document.getElementById('seriesBooks'),

    // 詳細画面
    detailTitle: document.getElementById('title'),
    detailAuthor: document.getElementById('author'),
    detailIsbn: document.getElementById('isbn'),
    soldInfo: document.getElementById('soldInfo'),
    editButton: document.getElementById('editButton'),
    sellButton: document.getElementById('sellButton'),
    deleteButton: document.getElementById('deleteButton'),
    backButton: document.getElementById('backButton'),
};

window.dom = dom;