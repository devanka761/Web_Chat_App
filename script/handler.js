// Ganti kode ini dengan copy paste dari firebase kamu

var firebaseConfig = {
    apiKey: "API KEY KAMU",
    authDomain: "AUTH DOMAIN KAMU",
    databaseURL: "DATABASE URL KAMU",
    projectId: "NAMA PROJECT ID KAMU",
    messagingSenderId: "SENDER ID KAMU",
    appId: "APP ID KAMU",
};
firebase.initializeApp(firebaseConfig);


// BUAT PROMPT - BISA GANTI PAKE SWEET ALERT

var a = prompt("Siapa nama kamu?");
    if(a == null || a == ''){
        alert("Isi nama terlebih dahulu!");
        window.location.reload();
    }
    else{
        alert("Selamat datang "+a);
    }