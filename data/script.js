// ==========================
// HITUNG DATA DASHBOARD
// ==========================

function hitungDashboard() {

    const total = dataRumah.length;


    const sudah = dataRumah.filter(
        rumah =>
        rumah.status === "Sudah Memilah"
    ).length;


    const belum = dataRumah.filter(
        rumah =>
        rumah.status === "Belum Memilah"
    ).length;


    const persenSudah =
        total > 0
        ? ((sudah / total) * 100).toFixed(1)
        : 0;


    const persenBelum =
        total > 0
        ? ((belum / total) * 100).toFixed(1)
        : 0;



    document.getElementById(
        "totalRumah"
    ).innerText = total;


    document.getElementById(
        "sudahMemilah"
    ).innerText = sudah;


    document.getElementById(
        "belumMemilah"
    ).innerText = belum;


    document.getElementById(
        "persenMemilah"
    ).innerText = persenSudah + "%";


    document.getElementById(
        "persenBelum"
    ).innerText = persenBelum + "%";

}



// ==========================
// TANGGAL
// ==========================

function tampilkanTanggal() {

    const tanggal = new Date();


    const format = tanggal.toLocaleDateString(
        "id-ID",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );


    document.getElementById(
        "tanggalHariIni"
    ).innerText = format;

}



// ==========================
// QR CODE
// ==========================

let qrSudahDibuat = false;


function bukaQR() {

    const modal =
        document.getElementById("modalQR");


    modal.style.display = "flex";


    if (!qrSudahDibuat) {


        /*
        LINK HALAMAN DATA RUMAH
        */


        const urlDataRumah =
            "https://codingA29.github.io/masagi/dashboard/data-rumah.html";


        new QRCode(
            document.getElementById("qrcode"),
            {
                text: urlDataRumah,

                width: 230,

                height: 230,

                correctLevel:
                    QRCode.CorrectLevel.H
            }
        );


        qrSudahDibuat = true;

    }

}



function tutupQR() {

    document.getElementById(
        "modalQR"
    ).style.display = "none";

}



// ==========================
// JALANKAN
// ==========================

hitungDashboard();

tampilkanTanggal();