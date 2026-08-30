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
        document.getElementById(
            "loginError"
        );


    errorElement.innerText =
        "Memproses...";


    if (!email || !password) {

        errorElement.innerText =
            "Email dan password harus diisi.";

        return;
    }


    const {
        data,
        error
    } =
        await supabaseClient.auth
        .signInWithPassword({

            email: email,

            password: password

        });


    if (error) {

        console.error(error);

        errorElement.innerText =
            "Email atau password salah.";

        return;

    }


    errorElement.innerText =
        "";


    window.location.href =
        "index.html";

}



async function cekLogin() {

    const {
        data: {
            session
        },
        error
    } =
        await supabaseClient.auth
        .getSession();


    if (error) {

        console.error(
            "Gagal memeriksa session:",
            error
        );

        return;

    }


    if (!session) {

        window.location.href =
            "login.html";

    }

}



async function logout() {

    const {
        error
    } =
        await supabaseClient.auth
        .signOut();


    if (error) {

        console.error(
            "Logout gagal:",
            error
        );

        return;

    }


    window.location.href =
        "login.html";

}



async function cekSudahLogin() {

    const {
        data: {
            session
        }
    } =
        await supabaseClient.auth
        .getSession();


    if (session) {

        window.location.href =
            "index.html";

    }

}