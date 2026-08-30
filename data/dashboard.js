// ========================================
// HITUNG DASHBOARD
// ========================================

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



    // KARTU

    const totalElement =
        document.getElementById("totalRumah");

    const sudahElement =
        document.getElementById("sudahMemilah");

    const belumElement =
        document.getElementById("belumMemilah");


    if (totalElement) {
        totalElement.innerText = total;
    }


    if (sudahElement) {
        sudahElement.innerText = sudah;
    }


    if (belumElement) {
        belumElement.innerText = belum;
    }



    // DONUT CENTER

    const totalDonut =
        document.getElementById("totalDonut");


    if (totalDonut) {
        totalDonut.innerText = total;
    }



    // LEGEND

    const legendSudah =
        document.getElementById("legendSudah");


    const legendBelum =
        document.getElementById("legendBelum");


    if (legendSudah) {
        legendSudah.innerText =
            sudah + " Rumah";
    }


    if (legendBelum) {
        legendBelum.innerText =
            belum + " Rumah";
    }



    // PERSENTASE DONUT

    const persenSudah =
        total > 0
        ? ((sudah / total) * 100).toFixed(1)
        : 0;


    const persenBelum =
        total > 0
        ? ((belum / total) * 100).toFixed(1)
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
            persenSudah + "%";

    }


    if (persenBelumElement) {

        persenBelumElement.innerText =
            persenBelum + "%";

    }



    buatDiagramStatus(
        sudah,
        belum
    );


    buatDiagramRW();

}



// ========================================
// TANGGAL
// ========================================

function tampilkanTanggal() {

    const tanggal = new Date();


    const format =
        tanggal.toLocaleDateString(
            "id-ID",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );


    const element =
        document.getElementById(
            "tanggalHariIni"
        );


    if (element) {

        element.innerText = format;

    }

}



// ========================================
// DIAGRAM DONAT
// ========================================

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

                type: "doughnut",


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

                            borderColor: "#ffffff",

                            borderWidth: 2

                        }

                    ]

                },


                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    cutout: "68%",

                    plugins: {

                        legend: {
                            display: false
                        },

                        tooltip: {

                            callbacks: {

                                label: function(context) {

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



// ========================================
// DATA PER RW
// ========================================

function hitungDataRW() {


    const rwData = {};


    dataRumah.forEach(
        rumah => {


            const rw =
                rumah.rw;


            if (!rwData[rw]) {

                rwData[rw] = {

                    total: 0,

                    sudah: 0

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



// ========================================
// DIAGRAM BATANG RW
// ========================================

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
        Object.keys(rwData)
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

                type: "bar",


                data: {

                    labels: labels,


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

                    responsive: true,

                    maintainAspectRatio: false,


                    scales: {


                        y: {

                            beginAtZero: true,

                            max: 100,


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



// ========================================
// QR CODE
// ========================================

let qrSudahDibuat = false;


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



        new QRCode(

            document.getElementById(
                "qrcode"
            ),

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



// ========================================
// TUTUP MODAL KETIKA KLIK LUAR
// ========================================

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



// ========================================
// JALANKAN
// ========================================

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

    }
);