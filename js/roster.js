console.log("ROSTER.JS CARGADO");

const masculinoContainer = document.getElementById("roster");          // Contenedor División Masculina
const femeninoContainer = document.getElementById("femenino-roster"); // Contenedor División Femenina limpio

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
    image.src = wrestler.image;
    image.alt = wrestler.name;
    image.loading = "lazy";

    const nickname = document.createElement("p");
    nickname.textContent = wrestler.nickname || "";

    const name = document.createElement("h2");
    name.textContent = wrestler.name;

    const stable = document.createElement("p");
    stable.textContent = wrestler.stable || "";

    card.appendChild(image);
    card.appendChild(nickname);
    card.appendChild(name);
    card.appendChild(stable);

    return card;
}

/* =========================================
   CARGAR DIVISIÓN MASCULINA
   ========================================= */
function loadMasculinoRoster(status) {
    if (!masculinoContainer) return;
    masculinoContainer.innerHTML = "";

    wrestlers.forEach(function(wrestler) {
        if (wrestler.status === status && wrestler.division === "Masculino") {
            const globalIndex = wrestlers.indexOf(wrestler);
            masculinoContainer.appendChild(createWrestlerCard(wrestler, globalIndex));
        }
    });
}

/* =========================================
   CARGAR DIVISIÓN FEMENINA
   ========================================= */
function loadFemeninoRoster(status) {
    if (!femeninoContainer) return;
    femeninoContainer.innerHTML = "";

    wrestlers.forEach(function(wrestler) {
        if (wrestler.status === status && wrestler.division === "Femenino") {
            const globalIndex = wrestlers.indexOf(wrestler);
            femeninoContainer.appendChild(createWrestlerCard(wrestler, globalIndex));
        }
    });
}

/* =========================================
   INICIALIZAR SEGÚN LA PÁGINA
   ========================================= */
const main = document.querySelector("main");

if (main) {
    const status = main.dataset.rosterStatus || "active";
    loadMasculinoRoster(status);
    loadFemeninoRoster(status);
}
