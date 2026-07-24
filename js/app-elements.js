const dom = {
    // index.html
    addButton: document.getElementById('addButton'),
    bookList: document.getElementById('bookList'),
    searchInput: document.getElementById('searchInput'),
    statusHeader: document.getElementById('statusHeader'),
    sortableHeaders: document.querySelectorAll('.sortable'),

    // add.html
    form: document.getElementById('bookForm'),
    title: document.getElementById('title'),
    author: document.getElementById('author'),
    publisher: document.getElementById('publisher'),
    isbn: document.getElementById('isbn'),
    thumbnail: document.getElementById('thumbnail'),
    saveButton: document.getElementById('saveButton'),
    cancelButton: document.getElementById('cancelButton'),
    fetchButton: document.getElementById('fetchButton'),
    scanButton: document.getElementById('scanButton'),
    closeScanner: document.getElementById('closeScanner'),
    scannerModal: document.getElementById('scannerModal'),
};

window.dom = dom;