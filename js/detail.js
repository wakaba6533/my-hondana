const params = new URLSearchParams(location.search);

const id = params.get("id");

const deleteButton = document.getElementById("deleteButton");

const backButton = document.getElementById("backButton");

load();

async function load() {

    const book = await getBook(id);

    document.getElementById("title").textContent =
        book.title;

    document.getElementById("author").textContent =
        book.author;

    document.getElementById("isbn").textContent =
        book.isbn;

}

backButton.addEventListener("click", () => {

    location.href = "index.html";

});

deleteButton.addEventListener("click", async () => {

    const ok = confirm("この本を削除しますか？");

    if (!ok) {

        return;

    }

    await deleteBook(id);

    location.href = "index.html";

});