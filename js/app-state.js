const appState = {
    // index.html
    books: [],
    sortKey: 'createdAt',
    sortOrder: 'desc',
    statusFilter: 'owned',

    // add.html
    editId: null,
    editingBook: null,

    // シリーズ
    series: [],
};

window.appState = appState;