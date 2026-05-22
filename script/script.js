

document.addEventListener("DOMContentLoaded", function () {

    // --- Elementi del DOM ---
    let btnInvia    = document.getElementById("btn-invia");
    let btnReset    = document.getElementById("btn-reset");
    let formView    = document.getElementById("form-view");
    let successView = document.getElementById("success-view");

    let campoNome      = document.getElementById("nome");
    let campoEmail     = document.getElementById("email");
    let campoOggetto   = document.getElementById("oggetto");
    let campoMessaggio = document.getElementById("messaggio");
    let campoPrivacy   = document.getElementById("privacy");

    // --- Invia form ---
    btnInvia.addEventListener("click", function () {

        pulisciErrori();

        let valido = true;

        // Controllo nome
        if (campoNome.value.trim().length < 3) {
            mostraErrore("error-nome", "Inserisci il tuo nome completo.");
            valido = false;
        }

        // Controllo email
        if (!emailValida(campoEmail.value.trim())) {
            mostraErrore("error-email", "Inserisci un indirizzo email valido.");
            valido = false;
        }

        // Controllo argomento
        if (campoOggetto.value === "") {
            mostraErrore("error-oggetto", "Seleziona un argomento.");
            valido = false;
        }

        // Controllo messaggio
        if (campoMessaggio.value.trim().length < 10) {
            mostraErrore("error-messaggio", "Scrivi almeno 10 caratteri.");
            valido = false;
        }

        // Controllo privacy
        if (!campoPrivacy.checked) {
            mostraErrore("error-privacy", "Devi accettare la privacy policy.");
            valido = false;
        }

        // Se c'è almeno un errore mi fermo
        if (!valido) return;

        // Tutto ok: simulo l'invio
        btnInvia.textContent = "Invio in corso...";
        btnInvia.disabled    = true;

        setTimeout(function () {
            formView.style.display    = "none";
            successView.style.display = "flex";
        }, 1000);

    });

    // --- Reset form ---
    btnReset.addEventListener("click", function () {

        campoNome.value      = "";
        campoEmail.value     = "";
        campoOggetto.value   = "";
        campoMessaggio.value = "";
        campoPrivacy.checked = false;

        btnInvia.textContent = "Invia messaggio";
        btnInvia.disabled    = false;

        pulisciErrori();

        successView.style.display = "none";
        formView.style.display    = "block";

    });

    // --- Cancella errore mentre l'utente corregge ---
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
        let errori = document.querySelectorAll(".field-error");
        for (let i = 0; i < errori.length; i++) {
            errori[i].textContent = "";
        }
    }

    function emailValida(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

});