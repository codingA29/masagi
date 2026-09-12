// ======================================================
// MASAGI - DASHBOARD ADMIN
// ======================================================


// ======================================================
// FORMAT PERSENTASE
// ======================================================

function formatPersen(nilai) {

    return Number(nilai).toFixed(1) + "%";

}


// ======================================================
// HITUNG DASHBOARD
// ======================================================

function hitungDashboard() {

    const total =
        dataRumah.length;


    const sudah =
        dataRumah.filter(
            rumah =>
                rumah.status ===
                "Sudah Memilah"
        ).length;


    const belum =
        dataRumah.filter(
            rumah =>
                rumah.status ===
                "Belum Memilah"
        ).length;


    // ==================================================
    // KARTU
    // ==================================================

    const totalElement =
        document.getElementById(
            "totalRumah"
        );

    const sudahElement =
        document.getElementById(
            "sudahMemilah"
        );

    const belumElement =
        document.getElementById(
            "belumMemilah"
        );


    if (totalElement) {

        totalElement.innerText =
            total;

    }


    if (sudahElement) {

        sudahElement.innerText =
            sudah;

    }


    if (belumElement) {

        belumElement.innerText =
            belum;

    }


    // ==================================================
    // DONUT CENTER
    // ==================================================

    const totalDonut =
        document.getElementById(
            "totalDonut"
        );


    if (totalDonut) {

        totalDonut.innerText =
            total;

    }


    // ==================================================
    // LEGEND
    // ==================================================

    const legendSudah =
        document.getElementById(
            "legendSudah"
        );


    const legendBelum =
        document.getElementById(
            "legendBelum"
        );


    if (legendSudah) {

        legendSudah.innerText =
            sudah +
            " Rumah";

    }


    if (legendBelum) {

        legendBelum.innerText =
            belum +
            " Rumah";

    }


    // ==================================================
    // PERSENTASE DONUT
    // ==================================================

    const persenSudah =
        total > 0
            ? (sudah / total) * 100
            : 0;


    const persenBelum =
        total > 0
            ? (belum / total) * 100
            : 0;


    const persenSudahElement =
        document.getElementById(
            "persenSudahDonut"
        );


    const persenBelumElement =
        document.getElementById(
            "persenBelumDonut"
        );


    if (persenSudahElement) {

        persenSudahElement.innerText =
            formatPersen(
                persenSudah
            );

    }


    if (persenBelumElement) {

        persenBelumElement.innerText =
            formatPersen(
                persenBelum
            );

    }


    // ==================================================
    // GRAFIK
    // ==================================================

    buatDiagramStatus(
        sudah,
        belum
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

        element.innerText =
            format;

    }

}


// ======================================================
// DIAGRAM DONAT
// ======================================================

let statusChart;


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

                                "#20AA59",

                                "#F53240"

                            ],


                            hoverBackgroundColor: [

                                "#17974C",

                                "#E52A37"

                            ],


                            borderColor:
                                "#FFFFFF",


                            borderWidth:
                                3,


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
                        "69%",


                    animation: {

                        duration:
                            700

                    },


                    plugins: {

                        legend: {

                            display:
                                false

                        },


                        tooltip: {

                            backgroundColor:
                                "#14213D",


                            titleColor:
                                "#FFFFFF",


                            bodyColor:
                                "#FFFFFF",


                            padding:
                                12,


                            cornerRadius:
                                8,


                            callbacks: {

                                label:
                                    function(context) {

                                        return (

                                            context.label +

                                            ": " +

                                            context.raw +

                                            " Rumah"

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
// DATA PER RW
// ======================================================

function hitungDataRW() {

    const rwData = {};


    dataRumah.forEach(
        rumah => {

            const rw =
                String(
                    rumah.rw
                ).padStart(
                    2,
                    "0"
                );


            if (!rwData[rw]) {

                rwData[rw] = {

                    total:
                        0,

                    sudah:
                        0

                };

            }


            rwData[rw].total++;


            if (
                rumah.status ===
                "Sudah Memilah"
            ) {

                rwData[rw].sudah++;

            }

        }
    );


    return rwData;

}


// ======================================================
// PLUGIN ANGKA DI ATAS BATANG
// ======================================================

const labelBatangPlugin = {

    id:
        "labelBatangMasagi",


    afterDatasetsDraw(chart) {

        const {
            ctx
        } =
            chart;


        ctx.save();


        ctx.font =
            "600 12px Arial";


        ctx.fillStyle =
            "#14213D";


        ctx.textAlign =
            "center";


        ctx.textBaseline =
            "bottom";


        chart.data.datasets.forEach(
            (
                dataset,
                datasetIndex
            ) => {

                const meta =
                    chart.getDatasetMeta(
                        datasetIndex
                    );


                meta.data.forEach(
                    (
                        bar,
                        index
                    ) => {

                        const nilai =
                            dataset.data[index];


                        ctx.fillText(
                            nilai + "%",
                            bar.x,
                            bar.y - 7
                        );

                    }
                );

            }
        );


        ctx.restore();

    }

};


// ======================================================
// DIAGRAM BATANG RW
// ======================================================

let rwChart;


function buatDiagramRW() {

    const canvas =
        document.getElementById(
            "rwChart"
        );


    if (!canvas) {

        return;

    }


    const rwData =
        hitungDataRW();


    const daftarRW =
        Object.keys(
            rwData
        )
        .sort(
            (
                a,
                b
            ) =>
                Number(a) -
                Number(b)
        );


    const labels =
        daftarRW.map(
            rw =>
                "RW " +
                rw
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
                                "#18A05E",


                            hoverBackgroundColor:
                                "#138A51",


                            borderColor:
                                "#168A52",


                            borderWidth:
                                1,


                            borderRadius:
                                7,


                            borderSkipped:
                                false,


                            maxBarThickness:
                                68

                        }

                    ]

                },


                plugins: [

                    labelBatangPlugin

                ],


                options: {

                    responsive:
                        true,


                    maintainAspectRatio:
                        false,


                    layout: {

                        padding: {

                            top:
                                20

                        }

                    },


                    animation: {

                        duration:
                            700

                    },


                    scales: {


                        y: {

                            beginAtZero:
                                true,


                            max:
                                100,


                            ticks: {

                                stepSize:
                                    10,


                                color:
                                    "#667085",


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
                                    "#E6ECE8",


                                drawBorder:
                                    false

                            },


                            border: {

                                display:
                                    false

                            }

                        },


                        x: {

                            ticks: {

                                color:
                                    "#475467",


                                font: {

                                    weight:
                                        "600"

                                }

                            },


                            grid: {

                                display:
                                    false

                            },


                            border: {

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

                            backgroundColor:
                                "#14213D",


                            titleColor:
                                "#FFFFFF",


                            bodyColor:
                                "#FFFFFF",


                            padding:
                                12,


                            cornerRadius:
                                8,


                            callbacks: {

                                label:
                                    function(context) {

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

        const urlDashboardPublik =

            "https://codingA29.github.io/masagi/dashboard-publik.html";


        const qrContainer =
            document.getElementById(
                "qrcode"
            );


        if (!qrContainer) {

            return;

        }


        qrContainer.innerHTML =
            "";


        new QRCode(

            qrContainer,

            {

                text:
                    urlDashboardPublik,


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
// TUTUP MODAL KETIKA KLIK LUAR
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
// TUTUP QR DENGAN ESC
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
// JALANKAN
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        tampilkanTanggal();


        if (
            typeof dataRumah !==
            "undefined"
        ) {

            hitungDashboard();

        }
        else {

            console.error(
                "dataRumah tidak ditemukan."
            );

        }

    }
);