const form = document.getElementById("bookForm");
const cancelButton = document.getElementById("cancelButton");

cancelButton.addEventListener("click", () => {

    location.href = "index.html";

});

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const book = {

        id: crypto.randomUUID(),

        title: document.getElementById("title").value,

        author: document.getElementById("author").value,

        isbn: document.getElementById("isbn").value

    };

    await saveBook(book);

    location.href = "index.html";

});