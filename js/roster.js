
console.log("ROSTER.JS CARGADO");

const masculinoContainer = document.getElementById("roster");
const femeninoContainer = document.getElementById("femenino-roster");

/* =========================================
   ANIMACIÓN AL HACER SCROLL
   ========================================= */
const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15
};

const cardObserver = typeof IntersectionObserver !== "undefined"
    ? new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal");
            } else {
                entry.target.classList.remove("reveal");
            }
        });
    }, observerOptions)
    : null;

/* =========================================
   OBTENER PRESENTACIÓN DEL ROSTER
   ========================================= */
function getRosterPresentation(wrestler) {
    const presentations = wrestler.presentations || {};
    const presentationId = wrestler.rosterPresentation || wrestler.id;
    const presentation = presentations[presentationId] || {};

    return {
        id: presentationId || wrestler.name,
        name: Object.prototype.hasOwnProperty.call(presentation, "name")
            ? presentation.name
            : wrestler.name || "Desconocido",
        nickname: Object.prototype.hasOwnProperty.call(presentation, "nickname")
            ? presentation.nickname
            : wrestler.nickname || "",
        image: Object.prototype.hasOwnProperty.call(presentation, "image")
            ? presentation.image
            : wrestler.image || "",
        stable: wrestler.stable || ""
    };
}

/* =========================================
   CREAR TARJETA DE LUCHADOR
   ========================================= */
function createWrestlerCard(wrestler, globalIndex) {
    const presentation = getRosterPresentation(wrestler);
    const card = document.createElement("div");

    card.className = "wrestler";
    card.dataset.wrestlerId = wrestler.id || wrestler.name;
    card.dataset.presentationId = presentation.id;

    card.onclick = function() {
        if (typeof openModal === "function") {
            openModal(globalIndex);
        }
    };

    const image = document.createElement("img");
    image.src = presentation.image;
    image.alt = presentation.name || "Luchador";
    image.loading = "lazy";

    const nickname = document.createElement("p");
    nickname.textContent = presentation.nickname;

    const name = document.createElement("h2");
    name.textContent = presentation.name;

    const stable = document.createElement("p");
    stable.textContent = presentation.stable;

    card.appendChild(image);
    card.appendChild(nickname);
    card.appendChild(name);
    card.appendChild(stable);

    if (cardObserver) {
        cardObserver.observe(card);
    }

    return card;
}

/* =========================================
   CARGAR DIVISIÓN MASCULINA
   ========================================= */
function loadMasculinoRoster(status) {
    if (!masculinoContainer || typeof wrestlers === "undefined") return;

    masculinoContainer.innerHTML = "";

    wrestlers.forEach(function(wrestler, index) {
        const wrestlerStatus = wrestler.status || "active";
        const wrestlerDivision = (wrestler.division || "").toLowerCase();

        if (
            wrestlerStatus === status &&
            wrestlerDivision === "masculino"
        ) {
            masculinoContainer.appendChild(
                createWrestlerCard(wrestler, index)
            );
        }
    });
}

/* =========================================
   CARGAR DIVISIÓN FEMENINA
   ========================================= */
function loadFemeninoRoster(status) {
    if (!femeninoContainer || typeof wrestlers === "undefined") return;

    femeninoContainer.innerHTML = "";

    wrestlers.forEach(function(wrestler, index) {
        const wrestlerStatus = wrestler.status || "active";
        const wrestlerDivision = (wrestler.division || "").toLowerCase();

        if (
            wrestlerStatus === status &&
            wrestlerDivision === "femenino"
        ) {
            femeninoContainer.appendChild(
                createWrestlerCard(wrestler, index)
            );
        }
    });
}

/* =========================================
   INICIALIZAR ROSTER
   ========================================= */
document.addEventListener("DOMContentLoaded", function() {
    const main = document.querySelector("main");

    if (main) {
        const status = main.dataset.rosterStatus || "active";

        loadMasculinoRoster(status);
        loadFemeninoRoster(status);
    }
});
