let html5QrCode = null;

async function startScanner() {
    document.getElementById('scannerModal').classList.add('show');
    html5QrCode = new Html5Qrcode('reader');

    await html5QrCode.start(
        {
            facingMode: 'environment',
        },
        {
            fps: 10,
            qrbox: 250,
        },
        onScanSuccess,
    );
}

async function onScanSuccess(decodedText) {
    document.getElementById('isbn').value = decodedText;

    await stopScanner();

    if (window.loadBookInfo) {
        window.loadBookInfo(decodedText);
    }
}

async function stopScanner() {
    if (html5QrCode) {
        await html5QrCode.stop();

        html5QrCode.clear();
    }
    document.getElementById('scannerModal').classList.remove('show');
}
