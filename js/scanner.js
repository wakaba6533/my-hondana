let html5QrCode = null;

async function startScanner() {
    const page = dom.addPage;

    const modal =
        page.querySelector('#scannerModal');

    modal.classList.add('show');

    html5QrCode = new Html5Qrcode('reader');

    await html5QrCode.start(
        {facingMode: 'environment'},
        {fps: 10, qrbox: 250},
        onScanSuccess,
    );
}

async function onScanSuccess(decodedText) {
    const page = dom.addPage;

    page.querySelector('#isbn')
        .value = decodedText;

    await stopScanner();

    if (typeof loadBookInfo === 'function') {
        loadBookInfo(decodedText);
    }
}

async function stopScanner() {
    if (html5QrCode) {
        try {
            await html5QrCode.stop();
        } finally {
            html5QrCode.clear();
            html5QrCode = null;
        }
    }

    const modal =
        dom.addPage.querySelector('#scannerModal');

    if (modal) {
        modal.classList.remove('show');
    }
}

window.startScanner = startScanner;
window.stopScanner = stopScanner;