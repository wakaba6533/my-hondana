const scanButton = document.getElementById("scanButton");

scanButton.addEventListener("click", () => {

    location.href = "add.html";

});

async function loadBooks() {

    const books = await getBooks();

    const list = document.getElementById("bookList");

    list.innerHTML = "";

    if (books.length === 0) {

        list.innerHTML = `
            <p class="empty">
                まだ本はありません
            </p>
        `;

        return;

    }

    books.forEach(book => {

        const div = document.createElement("div");

        div.className = "book-card";

        div.innerHTML = `
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <small>${book.isbn}</small>
        `;

        list.appendChild(div);

    });

}

loadBooks();