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

    // add.html
    form: document.getElementById('bookForm'),
    title: document.getElementById('title'),
    author: document.getElementById('author'),
    isbn: document.getElementById('isbn'),
    series: document.getElementById('series'),
    seriesMessage: document.getElementById('seriesMessage'),
    seriesSection: document.getElementById('seriesSection'),
    seriesCandidate: document.getElementById('seriesCandidate'),
    thumbnail: document.getElementById('thumbnail'),
    saveButton: document.getElementById('saveButton'),
    cancelButton: document.getElementById('cancelButton'),
    fetchButton: document.getElementById('fetchButton'),
    scanButton: document.getElementById('scanButton'),
    closeScanner: document.getElementById('closeScanner'),
    scannerModal: document.getElementById('scannerModal'),

    // detail.html
    detailTitle: document.getElementById('title'),
    detailAuthor: document.getElementById('author'),
    detailIsbn: document.getElementById('isbn'),
    soldInfo: document.getElementById('soldInfo'),
    editButton: document.getElementById('editButton'),
    sellButton: document.getElementById('sellButton'),
    deleteButton: document.getElementById('deleteButton'),
    backButton: document.getElementById('backButton'),

    // series.html
    seriesTitle: document.getElementById('seriesTitle'),
    seriesInfo: document.getElementById('seriesInfo'),
    seriesBooks: document.getElementById('seriesBooks'),
};

window.dom = dom;