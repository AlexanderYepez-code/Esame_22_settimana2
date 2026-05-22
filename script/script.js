// ===========================
//  AdoptDoggy – script.js
// ===========================

// Aspetta che il DOM sia pronto prima di fare qualsiasi cosa
document.addEventListener("DOMContentLoaded", function () {

    // --- Prendo i riferimenti agli elementi del DOM ---
    var btnInvia   = document.getElementById("btn-invia");
    var btnReset   = document.getElementById("btn-reset");
    var formView   = document.getElementById("form-view");
    var successView = document.getElementById("success-view");

    var campoNome      = document.getElementById("nome");
    var campoEmail     = document.getElementById("email");
    var campoOggetto   = document.getElementById("oggetto");
    var campoMessaggio = document.getElementById("messaggio");
    var campoPrivacy   = document.getElementById("privacy");


    // --- Click su "Invia messaggio" ---
    btnInvia.addEventListener("click", function () {

        // 1. Pulisco gli errori vecchi
        pulisciErrori();

        // 2. Valido i campi
        let valido = true;

        if (campoNome.value.trim().length < 3) {
            mostraErrore("error-nome", "Inserisci il tuo nome completo.");
            valido = false;
        }

        if (!emailValida(campoEmail.value.trim())) {
            mostraErrore("error-email", "Inserisci un indirizzo email valido.");
            valido = false;
        }

        if (campoOggetto.value === "") {
            mostraErrore("error-oggetto", "Seleziona un argomento.");
            valido = false;
        }

        if (campoMessaggio.value.trim().length < 10) {
            mostraErrore("error-messaggio", "Il messaggio deve essere di almeno 10 caratteri.");
            valido = false;
        }

        if (!campoPrivacy.checked) {
            mostraErrore("error-privacy", "Devi accettare la privacy policy.");
            valido = false;
        }

        // 3. Se non è valido mi fermo qui
        if (!valido) return;

        // 4. Simulo l'invio
        btnInvia.textContent = "Invio in corso...";
        btnInvia.disabled = true;

        setTimeout(function () {
            formView.style.display = "none";
            successView.style.display = "flex";
        }, 1000);

    });


    // --- Click su "Invia un altro messaggio" ---
    btnReset.addEventListener("click", function () {

        // Svuoto tutti i campi
        campoNome.value      = "";
        campoEmail.value     = "";
        campoOggetto.value   = "";
        campoMessaggio.value = "";
        campoPrivacy.checked = false;

        // Ripristino il bottone
        btnInvia.textContent = "Invia messaggio";
        btnInvia.disabled    = false;

        pulisciErrori();

        // Torno al form
        successView.style.display = "none";
        formView.style.display    = "block";

    });


    // --- Rimuovo l'errore appena l'utente inizia a correggere ---
    campoNome.addEventListener("input", function () {
        document.getElementById("error-nome").textContent = "";
    });

    campoEmail.addEventListener("input", function () {
        document.getElementById("error-email").textContent = "";
    });

    campoOggetto.addEventListener("change", function () {
        document.getElementById("error-oggetto").textContent = "";
    });

    campoMessaggio.addEventListener("input", function () {
        document.getElementById("error-messaggio").textContent = "";
    });

    campoPrivacy.addEventListener("change", function () {
        document.getElementById("error-privacy").textContent = "";
    });


    // --- Funzioni di supporto ---

    function mostraErrore(id, testo) {
        document.getElementById(id).textContent = testo;
    }

    function pulisciErrori() {
        var errori = document.querySelectorAll(".field-error");
        for (var i = 0; i < errori.length; i++) {
            errori[i].textContent = "";
        }
    }

    function emailValida(email) {
        // controlla che ci sia qualcosa @ qualcosa . qualcosa
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

});