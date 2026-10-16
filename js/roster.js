console.log("ROSTER.JS CARGADO");

const masculinoContainer = document.getElementById("roster");          // Contenedor División Masculina
const femeninoContainer = document.getElementById("femenino-roster"); // Contenedor División Femenina limpio

/* =========================================
   CONFIGURACIÓN DE ANIMACIÓN AL HACER SCROLL (TNA STYLE)
   ========================================= */
const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15 // Se activa cuando se ve el 15% de la tarjeta
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("reveal");
        } else {
            entry.target.classList.remove("reveal");
        }
    });
}, observerOptions);

/* =========================================
   CREAR TARJETA DE LUCHADOR
   ========================================= */
function createWrestlerCard(wrestler, globalIndex) {
    const card = document.createElement("div");
    card.className = "wrestler";

    card.onclick = function() {
        if (typeof openModal === "function") {
            openModal(globalIndex);
        }
    };

    const image = document.createElement("img");
    image.src = wrestler.image || "";
    image.alt = wrestler.name || "Luchador";
    image.loading = "lazy";

    const nickname = document.createElement("p");
    nickname.textContent = wrestler.nickname || "";

    const name = document.createElement("h2");
    name.textContent = wrestler.name || "Desconocido";

    const stable = document.createElement("p");
    stable.textContent = wrestler.stable || "";

    card.appendChild(image);
    card.appendChild(nickname);
    card.appendChild(name);
    card.appendChild(stable);

    cardObserver.observe(card);

    return card;
}

/* =========================================
   CARGAR DIVISIÓN MASCULINA
   ========================================= */
function loadMasculinoRoster(status) {
    if (!masculinoContainer || typeof wrestlers === "undefined") return;
    masculinoContainer.innerHTML = "";

    wrestlers.forEach(function(wrestler) {
        const wrestlerStatus = wrestler.status || "active";
        const wrestlerDivision = (wrestler.division || "").toLowerCase();

        if (wrestlerStatus === status && wrestlerDivision === "masculino") {
            const globalIndex = wrestlers.indexOf(wrestler);
            masculinoContainer.appendChild(createWrestlerCard(wrestler, globalIndex));
        }
    });
}

/* =========================================
   CARGAR DIVISIÓN FEMENINA
   ========================================= */
function loadFemeninoRoster(status) {
    if (!femeninoContainer || typeof wrestlers === "undefined") return;
    femeninoContainer.innerHTML = "";

    wrestlers.forEach(function(wrestler) {
        const wrestlerStatus = wrestler.status || "active";
        const wrestlerDivision = (wrestler.division || "").toLowerCase();

        if (wrestlerStatus === status && wrestlerDivision === "femenino") {
            const globalIndex = wrestlers.indexOf(wrestler);
            femeninoContainer.appendChild(createWrestlerCard(wrestler, globalIndex));
        }
    });
}

/* =========================================
   INICIALIZAR SEGÚN LA PÁGINA
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
    const main = document.querySelector("main");
    if (main) {
        const status = main.dataset.rosterStatus || "active";
        loadMasculinoRoster(status);
        loadFemeninoRoster(status);
    }
});
