const appState = {
    // index.html
    books: [],
    sortKey: 'createdAt',
    sortOrder: 'desc',
    statusFilter: 'owned',

    // 登録画面
    editId: null,
    editingBook: null,

    // シリーズ
    series: [],
};

window.appState = appState;