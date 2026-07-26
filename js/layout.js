function createHeader({
    back = false,
    search = false,
    sort = false,
    filter = false,
}) {
    return `
        <header class="app-header">
            ${
                back
                ? `
                    <button class="header-back-button">
                        ‹
                    </button>
                `
                : ''
            }
            ${
                search
                ? `
                    <div class="header-search">
                        <input
                            type="search"
                            id="searchInput"
                            placeholder="検索"
                        >
                    </div>
                    ${
                        sort
                        ? `
                        <button
                            id="sortButton"
                            class="header-icon-button">
                            ↕️
                        </button>
                        `
                        : ''
                    }
                    ${
                        filter
                        ? `
                        <button
                            id="filterButton"
                            class="header-icon-button">
                            ⚙️
                        </button>
                        `
                        : ''
                    }
                `
                : ''
            }
            <div id="headerMenu" class="header-menu"></div>
        </header>
    `;
}

function createFooter() {
    return `
        <nav class="app-footer">
            <button id="footerListButton">
                📚
                <span>一覧</span>
            </button>
            <button id="footerAddButton">
                ➕
                <span>登録</span>
            </button>
        </nav>
    `;
}

window.createHeader = createHeader;
window.createFooter = createFooter;