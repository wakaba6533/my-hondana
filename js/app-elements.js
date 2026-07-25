const dom = {
    // index.html
    addButton: document.getElementById('addButton'),
    bookList: document.getElementById('bookList'),
    searchInput: document.getElementById('searchInput'),

    // add.html
    form: document.getElementById('bookForm'),
    title: document.getElementById('title'),
    author: document.getElementById('author'),
    isbn: document.getElementById('isbn'),
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
};

window.dom = dom;