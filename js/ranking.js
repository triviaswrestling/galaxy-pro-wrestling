/* =========================================
   SISTEMA DE RANKING - GALAXY PRO WRESTLING
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    loadRanking();
});

function loadRanking() {
    const rankingContainer = document.getElementById("ranking-grid");
    if (!rankingContainer || typeof wrestlers === "undefined") return;

    // 1. Filtrar luchadores con rank numérico (> 0)
    const rankedWrestlers = wrestlers.filter(w => typeof w.rank === "number" && w.rank > 0);

    // 2. Ordenar de menor a mayor (#1 primero)
    rankedWrestlers.sort((a, b) => a.rank - b.rank);

    rankingContainer.innerHTML = "";

    // 3. Generar únicamente las tarjetas cuadradas con foto + puesto
    rankedWrestlers.forEach((wrestler) => {
        const globalIndex = wrestlers.findIndex(w => w.name === wrestler.name);

        const card = document.createElement("div");
        card.className = "ranking-card reveal";
        card.onclick = () => openRankingModal(globalIndex);

        card.innerHTML = `
            <div class="rank-badge">#${wrestler.rank}</div>
            <div class="ranking-img-wrapper">
                <img src="${wrestler.image}" alt="${wrestler.name}" loading="lazy">
            </div>
        `;

        rankingContainer.appendChild(card);
    });

    initRankingScrollObserver();
}

function openRankingModal(globalIndex) {
    const wrestler = wrestlers[globalIndex];
    if (!wrestler) return;

    const modalContent = document.querySelector(".ranking-modal-content");

    // Limpiar clases multicolor previas
    modalContent.classList.remove("modal-theme-cyan", "modal-theme-green", "modal-theme-gold", "modal-theme-orange");

    // Asignar color dinámico por puesto
    const rankMod = (wrestler.rank - 1) % 4;
    if (rankMod === 0) modalContent.classList.add("modal-theme-cyan");
    else if (rankMod === 1) modalContent.classList.add("modal-theme-green");
    else if (rankMod === 2) modalContent.classList.add("modal-theme-gold");
    else if (rankMod === 3) modalContent.classList.add("modal-theme-orange");

    // Datos principales
    document.getElementById("modal-rank-num").textContent = `#${wrestler.rank || '-'}`;
    document.getElementById("modal-division").textContent = wrestler.division || "";
    document.getElementById("modal-name").textContent = wrestler.name;
    document.getElementById("modal-interpreter").textContent = wrestler.interpreter || "";
    document.getElementById("modal-img").src = wrestler.image;

    // Atributos
    const stats = wrestler.stats || { micro: 70, charisma: 70, power: 70 };
    const microVal = stats.micro || 70;
    const charismaVal = stats.charisma || 70;
    const powerVal = stats.power || 70;

    document.getElementById("val-micro").textContent = microVal;
    document.getElementById("val-charisma").textContent = charismaVal;
    document.getElementById("val-power").textContent = powerVal;

    document.getElementById("bar-micro").style.width = `${microVal}%`;
    document.getElementById("bar-charisma").style.width = `${charismaVal}%`;
    document.getElementById("bar-power").style.width = `${powerVal}%`;

    // Overall
    const overall = Math.round((microVal + charismaVal + powerVal) / 3);
    document.getElementById("val-overall").textContent = overall;

    // Logros
    const achievementsList = document.getElementById("modal-achievements");
    if (achievementsList) {
        achievementsList.innerHTML = "";
        if (wrestler.achievements && wrestler.achievements.length > 0) {
            wrestler.achievements.forEach(ach => {
                const li = document.createElement("li");
                li.textContent = ach;
                achievementsList.appendChild(li);
            });
        }
    }

    document.getElementById("ranking-modal").classList.add("show");
    document.body.classList.add("modal-open");
}

function closeRankingModal() {
    document.getElementById("ranking-modal").classList.remove("show");
    document.body.classList.remove("modal-open");
}

window.onclick = function(event) {
    const modal = document.getElementById("ranking-modal");
    if (event.target === modal) {
        closeRankingModal();
    }
};

function initRankingScrollObserver() {
    const cards = document.querySelectorAll(".ranking-card");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));
      }
