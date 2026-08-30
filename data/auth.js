// ======================================================
// MASAGI - AUTHENTICATION
// ======================================================


// ======================================================
// LOGIN
// ======================================================

async function login() {

    const email =
        document
            .getElementById("email")
            .value
            .trim();


    const password =
        document
            .getElementById("password")
            .value;


    const errorElement =
        document
            .getElementById("loginError");


    // VALIDASI

    if (!email || !password) {

        errorElement.innerText =
            "Email dan password harus diisi.";

        return;

    }


    errorElement.innerText =
        "Memproses...";


    // LOGIN SUPABASE

    const {
        data,
        error
    } =
        await supabaseClient
            .auth
            .signInWithPassword({

                email: email,

                password: password

            });


    // JIKA ERROR

    if (error) {

        console.error(
            "Login gagal:",
            error
        );


        errorElement.innerText =
            "Email atau password salah.";

        return;

    }


    // LOGIN BERHASIL

    errorElement.innerText = "";


    // MENUJU DASHBOARD ADMIN

    window.location.href =
        "index.html";

}



// ======================================================
// CEK LOGIN ADMIN
// ======================================================

async function cekLogin() {

    const {

        data: {
            session
        },

        error

    } =
        await supabaseClient
            .auth
            .getSession();



    if (error) {

        console.error(
            "Gagal memeriksa login:",
            error
        );

        return;

    }



    // ==================================================
    // JIKA BELUM LOGIN
    // ==================================================

    if (!session) {


        // CEK APAKAH HALAMAN BERADA
        // DI DALAM FOLDER /dashboard/


        if (
            window.location.pathname
                .includes("/dashboard/")
        ) {


            // Dari folder dashboard
            // naik satu folder

            window.location.href =
                "../login.html";

        }


        else {


            // Dari folder utama

            window.location.href =
                "login.html";

        }


    }

}



// ======================================================
// LOGOUT
// ======================================================

async function logout() {

    const {
        error
    } =
        await supabaseClient
            .auth
            .signOut();



    if (error) {

        console.error(
            "Logout gagal:",
            error
        );

        return;

    }



    // ==================================================
    // ARAHKAN KE LOGIN
    // ==================================================

    if (
        window.location.pathname
            .includes("/dashboard/")
    ) {


        window.location.href =
            "../login.html";

    }


    else {


        window.location.href =
            "login.html";

    }

}



// ======================================================
// CEK SUDAH LOGIN
// Digunakan pada login.html
// ======================================================

async function cekSudahLogin() {

    const {

        data: {
            session
        }

    } =
        await supabaseClient
            .auth
            .getSession();



    if (session) {

        window.location.href =
            "index.html";

    }

}