// ======================================================
// MASAGI - DASHBOARD ADMIN
// ======================================================


// ======================================================
// FORMAT ANGKA
// ======================================================

function formatAngka(nilai) {

    return new Intl.NumberFormat(
        "id-ID"
    ).format(nilai);

}


function formatDesimal(nilai) {

    return new Intl.NumberFormat(
        "id-ID",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    ).format(nilai);

}


function formatPersen(nilai) {

    return Number(nilai).toFixed(1) + "%";

}


// ======================================================
// NORMALISASI STATUS
// ======================================================

function normalisasiStatus(status) {

    return String(status || "")
        .trim()
        .toLowerCase();

}


// ======================================================
// HELPER ISI ELEMENT
// ======================================================

function isiElement(id, nilai) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent =
            nilai;

    }

}


// ======================================================
// VALIDASI DATA
// ======================================================

function validasiData() {

    if (
        typeof dataRumah === "undefined" ||
        !Array.isArray(dataRumah)
    ) {

        console.error(
            "dataRumah tidak ditemukan."
        );

        return false;

    }


    if (
        typeof dataWilayah === "undefined"
    ) {

        console.error(
            "dataWilayah tidak ditemukan."
        );

        return false;

    }


    return true;

}


// ======================================================
// HITUNG DATA RUMAH
// ======================================================

function hitungDataRumah() {

    const totalRumah =
        dataRumah.length;


    const sudahMemilah =
        dataRumah.filter(
            rumah => {

                const status =
                    normalisasiStatus(
                        rumah.status
                    );


                return (
                    status === "sudah memilah" ||
                    status === "mengolah"
                );

            }
        ).length;


    const belumMemilah =
        dataRumah.filter(
            rumah => {

                return (
                    normalisasiStatus(
                        rumah.status
                    ) ===
                    "belum memilah"
                );

            }
        ).length;


    return {

        totalRumah,

        sudahMemilah,

        belumMemilah

    };

}


// ======================================================
// HITUNG DATA WILAYAH
// ======================================================

function hitungDataWilayah() {

    const totalKK =
        Number(
            dataWilayah.totalKK
        ) || 0;


    const totalJiwa =
        Number(
            dataWilayah.totalJiwa
        ) || 0;


    const faktorTimbulan =
        Number(
            dataWilayah.faktorTimbulanKgPerJiwa
        ) || 0;


    const potensiTimbulan =
        totalJiwa *
        faktorTimbulan;


    const memilahOrganik =
        Number(
            dataWilayah.pemilahan?.organik
        ) || 0;


    const memilahNonorganik =
        Number(
            dataWilayah.pemilahan?.nonorganik
        ) || 0;


    const memilahAnorganik =
        Number(
            dataWilayah.pemilahan?.anorganik
        ) || 0;


    const memilahJelantah =
        Number(
            dataWilayah.pemilahan?.minyakJelantah
        ) || 0;


    return {

        totalKK,

        totalJiwa,

        potensiTimbulan,

        memilahOrganik,

        memilahNonorganik,

        memilahAnorganik,

        memilahJelantah

    };

}


// ======================================================
// TAMPILKAN DASHBOARD
// ======================================================

function hitungDashboard() {

    if (!validasiData()) {

        return;

    }


    const rumah =
        hitungDataRumah();


    const wilayah =
        hitungDataWilayah();


    // ==================================================
    // KARTU UTAMA
    // ==================================================

    isiElement(
        "totalRumah",
        formatAngka(
            rumah.totalRumah
        )
    );


    isiElement(
        "sudahMemilah",
        formatAngka(
            rumah.sudahMemilah
        )
    );


    isiElement(
        "belumMemilah",
        formatAngka(
            rumah.belumMemilah
        )
    );


    // ==================================================
    // KARTU WILAYAH
    // ==================================================

    isiElement(
        "totalKK",
        formatAngka(
            wilayah.totalKK
        )
    );


    isiElement(
        "totalJiwa",
        formatAngka(
            wilayah.totalJiwa
        )
    );


    isiElement(
        "potensiTimbulan",
        formatDesimal(
            wilayah.potensiTimbulan
        )
    );


    isiElement(
        "memilahOrganik",
        formatAngka(
            wilayah.memilahOrganik
        )
    );


    isiElement(
        "memilahNonorganik",
        formatAngka(
            wilayah.memilahNonorganik
        )
    );


    isiElement(
        "memilahAnorganik",
        formatAngka(
            wilayah.memilahAnorganik
        )
    );


    isiElement(
        "memilahJelantah",
        formatAngka(
            wilayah.memilahJelantah
        )
    );


    // ==================================================
    // DONUT
    // ==================================================

    isiElement(
        "totalDonut",
        formatAngka(
            rumah.totalRumah
        )
    );


    isiElement(
        "legendSudah",
        formatAngka(
            rumah.sudahMemilah
        ) + " Rumah"
    );


    isiElement(
        "legendBelum",
        formatAngka(
            rumah.belumMemilah
        ) + " Rumah"
    );


    const persenSudah =
        rumah.totalRumah > 0
            ?
            (
                rumah.sudahMemilah /
                rumah.totalRumah *
                100
            )
            : 0;


    const persenBelum =
        rumah.totalRumah > 0
            ?
            (
                rumah.belumMemilah /
                rumah.totalRumah *
                100
            )
            : 0;


    isiElement(
        "persenSudahDonut",
        formatPersen(
            persenSudah
        )
    );


    isiElement(
        "persenBelumDonut",
        formatPersen(
            persenBelum
        )
    );


    // ==================================================
    // GRAFIK
    // ==================================================

    buatDiagramStatus(
        rumah.sudahMemilah,
        rumah.belumMemilah
    );


    buatDiagramRW();

}


// ======================================================
// TANGGAL
// ======================================================

function tampilkanTanggal() {

    const tanggal =
        new Date();


    const format =
        tanggal.toLocaleDateString(
            "id-ID",
            {
                day:
                    "numeric",

                month:
                    "long",

                year:
                    "numeric"
            }
        );


    const element =
        document.getElementById(
            "tanggalHariIni"
        );


    if (element) {

        element.textContent =
            format;

    }

}


// ======================================================
// DIAGRAM STATUS
// ======================================================

let statusChart = null;


function buatDiagramStatus(
    sudah,
    belum
) {

    const canvas =
        document.getElementById(
            "statusChart"
        );


    if (!canvas) {

        return;

    }


    if (statusChart) {

        statusChart.destroy();

    }


    statusChart =
        new Chart(
            canvas,
            {

                type:
                    "doughnut",


                data: {

                    labels: [
                        "Sudah Memilah",
                        "Belum Memilah"
                    ],


                    datasets: [

                        {

                            data: [
                                sudah,
                                belum
                            ],

                            backgroundColor: [
                                "#20a955",
                                "#ef3340"
                            ],

                            borderColor:
                                "#ffffff",

                            borderWidth:
                                2,

                            hoverOffset:
                                4

                        }

                    ]

                },


                options: {

                    responsive:
                        true,

                    maintainAspectRatio:
                        false,

                    cutout:
                        "68%",


                    plugins: {

                        legend: {

                            display:
                                false

                        }

                    }

                }

            }
        );

}


// ======================================================
// DIAGRAM PER RW
// ======================================================

let rwChart = null;


function buatDiagramRW() {

    const canvas =
        document.getElementById(
            "rwChart"
        );


    if (!canvas) {

        return;

    }


    const rwData = {};


    dataRumah.forEach(
        rumah => {

            const rw =
                String(
                    rumah.rw || ""
                )
                .replace(
                    /^RW\s*/i,
                    ""
                )
                .padStart(
                    2,
                    "0"
                );


            if (!rw) {

                return;

            }


            if (!rwData[rw]) {

                rwData[rw] = {

                    total:
                        0,

                    sudah:
                        0

                };

            }


            rwData[rw].total++;


            const status =
                normalisasiStatus(
                    rumah.status
                );


            if (
                status ===
                    "sudah memilah" ||
                status ===
                    "mengolah"
            ) {

                rwData[rw].sudah++;

            }

        }
    );


    const daftarRW =
        Object.keys(
            rwData
        )
        .sort(
            (a, b) =>
                Number(a) -
                Number(b)
        );


    const labels =
        daftarRW.map(
            rw =>
                "RW " + rw
        );


    const percentages =
        daftarRW.map(
            rw => {

                const total =
                    rwData[rw].total;


                const sudah =
                    rwData[rw].sudah;


                if (total === 0) {

                    return 0;

                }


                return Number(
                    (
                        sudah /
                        total *
                        100
                    ).toFixed(1)
                );

            }
        );


    if (rwChart) {

        rwChart.destroy();

    }


    rwChart =
        new Chart(
            canvas,
            {

                type:
                    "bar",


                data: {

                    labels:
                        labels,


                    datasets: [

                        {

                            label:
                                "Rumah Memilah",

                            data:
                                percentages,

                            backgroundColor:
                                "#159153",

                            borderRadius:
                                6,

                            maxBarThickness:
                                70

                        }

                    ]

                },


                options: {

                    responsive:
                        true,

                    maintainAspectRatio:
                        false,


                    scales: {

                        y: {

                            beginAtZero:
                                true,

                            max:
                                100,


                            ticks: {

                                callback:
                                    function(value) {

                                        return (
                                            value +
                                            "%"
                                        );

                                    }

                            },


                            grid: {

                                color:
                                    "#e6ece9"

                            }

                        },


                        x: {

                            grid: {

                                display:
                                    false

                            }

                        }

                    },


                    plugins: {

                        legend: {

                            display:
                                false

                        },


                        tooltip: {

                            callbacks: {

                                label:
                                    function(
                                        context
                                    ) {

                                        return (
                                            context.raw +
                                            "% rumah memilah"
                                        );

                                    }

                            }

                        }

                    }

                }

            }
        );

}


// ======================================================
// QR CODE
// ======================================================

let qrSudahDibuat =
    false;


function bukaQR() {

    const modal =
        document.getElementById(
            "modalQR"
        );


    if (!modal) {

        return;

    }


    modal.style.display =
        "flex";


    if (!qrSudahDibuat) {

        const urlDataRumah =

            "https://codingA29.github.io/masagi/dashboard-publik.html";


        const tempatQR =
            document.getElementById(
                "qrcode"
            );


        if (!tempatQR) {

            return;

        }


        tempatQR.innerHTML =
            "";


        new QRCode(
            tempatQR,
            {

                text:
                    urlDataRumah,

                width:
                    230,

                height:
                    230,

                correctLevel:
                    QRCode.CorrectLevel.H

            }
        );


        qrSudahDibuat =
            true;

    }

}


// ======================================================
// TUTUP QR
// ======================================================

function tutupQR() {

    const modal =
        document.getElementById(
            "modalQR"
        );


    if (modal) {

        modal.style.display =
            "none";

    }

}


// ======================================================
// KLIK LUAR MODAL
// ======================================================

window.addEventListener(
    "click",
    function(event) {

        const modal =
            document.getElementById(
                "modalQR"
            );


        if (
            modal &&
            event.target === modal
        ) {

            tutupQR();

        }

    }
);


// ======================================================
// ESC
// ======================================================

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key ===
            "Escape"
        ) {

            tutupQR();

        }

    }
);


// ======================================================
// JALANKAN DASHBOARD
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        tampilkanTanggal();


        if (
            validasiData()
        ) {

            hitungDashboard();

        }

    }
);