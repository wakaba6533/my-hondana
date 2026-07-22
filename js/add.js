const form = document.getElementById("bookForm");
const cancelButton = document.getElementById("cancelButton");

cancelButton.addEventListener("click", () => {

    history.back();

});

form.addEventListener("submit", (event) => {

    event.preventDefault();

    // STEP4でここをIndexedDB保存に変更する

    location.href = "index.html";

});