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
};

window.dom = dom;