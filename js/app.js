const scanButton = document.getElementById("scanButton");

// バーコード読取ボタンをクリックしたら登録画面に遷移
scanButton.addEventListener("click", () => {
    location.href = "add.html";
});