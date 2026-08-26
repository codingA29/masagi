const dataRumah = [
    {
        alamat: "Jl. Sukaluyu I No. 12",
        rt: "01",
        rw: "01",
        status: "Sudah Memilah",
        tanggal: "26/08/2026"
    },

    {
        alamat: "Jl. Sukaluyu I No. 15",
        rt: "02",
        rw: "01",
        status: "Belum Memilah",
        tanggal: "26/08/2026"
    },

    {
        alamat: "Jl. Sukaluyu II No. 03",
        rt: "03",
        rw: "02",
        status: "Sudah Memilah",
        tanggal: "26/08/2026"
    },

    {
        alamat: "Jl. Sukaluyu II No. 08",
        rt: "04",
        rw: "02",
        status: "Sudah Memilah",
        tanggal: "26/08/2026"
    },

    {
        alamat: "Jl. Sukaluyu III No. 21",
        rt: "01",
        rw: "03",
        status: "Belum Memilah",
        tanggal: "26/08/2026"
    }
];


function tampilkanData(data) {

    const tabel = document.getElementById("tabelRumah");

    tabel.innerHTML = "";

    data.forEach((rumah, index) => {

        const statusClass =
            rumah.status === "Sudah Memilah"
            ? "sudah"
            : "belum";

        tabel.innerHTML += `
            <tr>

                <td>${index + 1}</td>

                <td>${rumah.alamat}</td>

                <td>RT ${rumah.rt}</td>

                <td>RW ${rumah.rw}</td>

                <td>
                    <span class="status ${statusClass}">
                        ${rumah.status}
                    </span>
                </td>

                <td>${rumah.tanggal}</td>

            </tr>
        `;
    });

}


function hitungRingkasan() {

    const total = dataRumah.length;

    const sudah = dataRumah.filter(
        rumah => rumah.status === "Sudah Memilah"
    ).length;

    const belum = total - sudah;

    const persenSudah =
        total > 0
        ? ((sudah / total) * 100).toFixed(1)
        : 0;

    const persenBelum =
        total > 0
        ? ((belum / total) * 100).toFixed(1)
        : 0;


    document.getElementById("totalRumah").innerText = total;

    document.getElementById("sudahMemilah").innerText = sudah;

    document.getElementById("belumMemilah").innerText = belum;

    document.getElementById("persenMemilah").innerText =
        persenSudah + "%";

    document.getElementById("persenBelum").innerText =
        persenBelum + "%";

}


function cariRumah() {

    const keyword =
        document.getElementById("cariData")
        .value
        .toLowerCase();

    const hasil = dataRumah.filter(rumah =>
        rumah.alamat.toLowerCase().includes(keyword)
        ||
        rumah.rw.toLowerCase().includes(keyword)
    );

    tampilkanData(hasil);

}


/* TANGGAL */

const tanggal = new Date();

const formatTanggal = tanggal.toLocaleDateString(
    "id-ID",
    {
        day: "numeric",
        month: "long",
        year: "numeric"
    }
);

document.getElementById("tanggalHariIni").innerText =
    formatTanggal;


/* JALANKAN */

tampilkanData(dataRumah);

hitungRingkasan();