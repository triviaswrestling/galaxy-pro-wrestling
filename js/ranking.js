
/* =========================================
   SISTEMA DE RANKING - GALAXY PRO WRESTLING
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    loadRanking();
});

function loadRanking() {
    const rankingContainer = document.getElementById("ranking-grid");

    if (!rankingContainer || typeof wrestlers === "undefined") return;

    const rankedWrestlers = wrestlers
        .filter(w => typeof w.rank === "number" && w.rank > 0)
        .sort((a, b) => a.rank - b.rank);

    rankingContainer.innerHTML = "";

    rankedWrestlers.forEach(wrestler => {
        const globalIndex = wrestlers.findIndex(
            w => w.name === wrestler.name
        );

        const card = document.createElement("div");
        card.className = "ranking-card reveal";
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-label", `Puesto ${wrestler.rank}: ${wrestler.name}`);

        card.innerHTML = `
            <span class="rank-badge">#${wrestler.rank}</span>

            <div class="ranking-img-wrapper">
                <img
                    src="${wrestler.image}"
                    alt="${wrestler.name}"
                    loading="lazy"
                >
            </div>

            <div class="ranking-card-info">
                <h2></h2>
            </div>
        `;

        // Texto seguro: evita interpretar el nombre como HTML.
        card.querySelector(".ranking-card-info h2").textContent =
            wrestler.name || "Luchador";

        card.addEventListener("click", () => {
            openRankingModal(globalIndex);
        });

        card.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openRankingModal(globalIndex);
            }
        });

        rankingContainer.appendChild(card);
    });

    initRankingScrollObserver();
}

/* =========================================
   ABRIR PERFIL COMPLETO
   ========================================= */

function openRankingModal(globalIndex) {
    const wrestler = wrestlers[globalIndex];
    if (!wrestler) return;

    const modal = document.getElementById("ranking-modal");
    const modalContent = modal?.querySelector(".ranking-modal-content");

    if (!modal || !modalContent) return;

    modalContent.classList.remove(
        "modal-theme-cyan",
        "modal-theme-green",
        "modal-theme-gold",
        "modal-theme-orange"
    );

    const rankMod = ((wrestler.rank || 1) - 1) % 4;

    const themes = [
        "modal-theme-cyan",
        "modal-theme-green",
        "modal-theme-gold",
        "modal-theme-orange"
    ];

    modalContent.classList.add(themes[rankMod]);

    /* Foto y puesto */
    document.getElementById("modal-rank-badge").textContent =
        `#${wrestler.rank ?? "-"}`;

    document.getElementById("modal-img").src = wrestler.image || "";
    document.getElementById("modal-img").alt = wrestler.name || "Luchador";

    /* Identidad */
    document.getElementById("modal-nickname").textContent =
        wrestler.nickname || "GPW SUPERSTAR";

    document.getElementById("modal-name").textContent =
        wrestler.name || "Luchador";

    document.getElementById("modal-interpreter").textContent =
        wrestler.interpreter || "Desconocido";

    /* Estadísticas: admite correctamente valores de 0 a 100 */
    const stats = wrestler.stats || {};

    function getStat(value) {
        const number = Number(value);
        return Number.isFinite(number)
            ? Math.max(0, Math.min(100, number))
            : 70;
    }

    const micro = getStat(stats.micro);
    const charisma = getStat(stats.charisma);
    const power = getStat(stats.power);

    document.getElementById("val-micro").textContent = micro;
    document.getElementById("val-charisma").textContent = charisma;
    document.getElementById("val-power").textContent = power;

    document.getElementById("bar-micro").style.width = `${micro}%`;
    document.getElementById("bar-charisma").style.width = `${charisma}%`;
    document.getElementById("bar-power").style.width = `${power}%`;

    /* Overall */
    const overall = Math.round((micro + charisma + power) / 3);
    document.getElementById("val-overall").textContent = overall;

    /* Finisher */
    document.getElementById("modal-finisher").textContent =
        wrestler.finisher || "N/A";

    /* Theme Song */
    document.getElementById("modal-theme").textContent =
        wrestler.themeSong
            ? `🎵 ${wrestler.themeSong}`
            : "🎵 N/A";

    /* Logros */
    const achievementsList = document.getElementById("modal-achievements");
    achievementsList.innerHTML = "";

    const achievements = Array.isArray(wrestler.achievements)
        ? wrestler.achievements
        : [];

    if (achievements.length) {
        achievements.forEach(achievement => {
            const li = document.createElement("li");
            li.textContent = achievement;
            achievementsList.appendChild(li);
        });
    } else {
        const li = document.createElement("li");
        li.textContent = "Sin logros registrados aún.";
        achievementsList.appendChild(li);
    }

    modal.classList.add("show");
    document.body.classList.add("modal-open");
}

/* =========================================
   CERRAR PERFIL
   ========================================= */

function closeRankingModal() {
    const modal = document.getElementById("ranking-modal");

    if (modal) modal.classList.remove("show");

    document.body.classList.remove("modal-open");
}

window.addEventListener("click", event => {
    const modal = document.getElementById("ranking-modal");

    if (event.target === modal) {
        closeRankingModal();
    }
});

window.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeRankingModal();
    }
});

/* =========================================
   ANIMACIÓN DE ENTRADA DE TARJETAS
   ========================================= */

function initRankingScrollObserver() {
    const cards = document.querySelectorAll("#ranking-grid .ranking-card");

    if (!("IntersectionObserver" in window)) {
        cards.forEach(card => card.classList.add("reveal"));
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));
}
