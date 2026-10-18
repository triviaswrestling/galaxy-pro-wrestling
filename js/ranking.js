
/* =========================================
   SISTEMA DE RANKING - GALAXY PRO WRESTLING
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    loadRanking();
});

/* =========================================
   OBTENER PRESENTACIÓN DEL RANKING
   ========================================= */

function getRankingPresentation(wrestler) {
    const presentations = wrestler.presentations || {};
    const presentationId = wrestler.rankingPresentation || wrestler.id;
    const presentation = presentations[presentationId] || {};

    return {
        id: presentationId || wrestler.name,
        name: Object.prototype.hasOwnProperty.call(presentation, "name")
            ? presentation.name
            : wrestler.name || "Luchador",
        nickname: Object.prototype.hasOwnProperty.call(presentation, "nickname")
            ? presentation.nickname
            : wrestler.nickname || "",
        image: Object.prototype.hasOwnProperty.call(presentation, "image")
            ? presentation.image
            : wrestler.image || "",
        finisher: Object.prototype.hasOwnProperty.call(presentation, "finisher")
            ? presentation.finisher
            : wrestler.finisher || "",
        themeSong: Object.prototype.hasOwnProperty.call(presentation, "themeSong")
            ? presentation.themeSong
            : wrestler.themeSong || "",
        signature: Object.prototype.hasOwnProperty.call(presentation, "signature")
            ? presentation.signature
            : wrestler.signature || ""
    };
}

/* =========================================
   CARGAR RANKING
   ========================================= */

function loadRanking() {
    const rankingContainer = document.getElementById("ranking-grid");

    if (!rankingContainer || typeof wrestlers === "undefined") return;

    const rankedWrestlers = wrestlers
        .map((wrestler, index) => ({ wrestler, index }))
        .filter(item =>
            typeof item.wrestler.rank === "number" &&
            item.wrestler.rank > 0
        )
        .sort((a, b) => a.wrestler.rank - b.wrestler.rank);

    rankingContainer.innerHTML = "";

    rankedWrestlers.forEach(({ wrestler, index }) => {
        const presentation = getRankingPresentation(wrestler);

        const card = document.createElement("div");
        card.className = "ranking-card reveal";
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.setAttribute(
            "aria-label",
            `Puesto ${wrestler.rank}: ${presentation.name}`
        );

        card.dataset.wrestlerId = wrestler.id || wrestler.name;
        card.dataset.presentationId = presentation.id;

        card.innerHTML = `
            <span class="rank-badge">#${wrestler.rank}</span>
            <div class="ranking-img-wrapper">
                <img alt="" loading="lazy">
            </div>
            <div class="ranking-card-info">
                <h2></h2>
            </div>
        `;

        const image = card.querySelector(".ranking-img-wrapper img");
        image.src = presentation.image;
        image.alt = presentation.name;

        card.querySelector(".ranking-card-info h2").textContent =
            presentation.name;

        card.addEventListener("click", () => {
            openRankingModal(index);
        });

        card.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openRankingModal(index);
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

    const presentation = getRankingPresentation(wrestler);
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
    const rankBadge = document.getElementById("modal-rank-badge");
    if (rankBadge) {
        rankBadge.textContent = `#${wrestler.rank ?? "-"}`;
    }

    const modalImage = document.getElementById("modal-img");
    if (modalImage) {
        modalImage.src = presentation.image;
        modalImage.alt = presentation.name;
    }

    /* Identidad seleccionada para el ranking */
    const nicknameElem = document.getElementById("modal-nickname");
    if (nicknameElem) {
        nicknameElem.textContent = presentation.nickname || "GPW SUPERSTAR";
    }

    const nameElem = document.getElementById("modal-name");
    if (nameElem) {
        nameElem.textContent = presentation.name;
    }

    const interpreterElem = document.getElementById("modal-interpreter");
    if (interpreterElem) {
        interpreterElem.textContent = wrestler.interpreter || "Desconocido";
    }

    /* Estadísticas del perfil original */
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

    const statElements = [
        ["val-micro", micro],
        ["val-charisma", charisma],
        ["val-power", power]
    ];

    statElements.forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    });

    const barElements = [
        ["bar-micro", micro],
        ["bar-charisma", charisma],
        ["bar-power", power]
    ];

    barElements.forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.style.width = `${value}%`;
    });

    /* Overall */
    const overall = Math.round((micro + charisma + power) / 3);
    const overallElem = document.getElementById("val-overall");

    if (overallElem) {
        overallElem.textContent = overall;
    }

    /* Finisher de la presentación */
    const finisherElem = document.getElementById("modal-finisher");
    if (finisherElem) {
        finisherElem.textContent = presentation.finisher || "N/A";
    }

    /* Theme Song de la presentación */
    const themeElem = document.getElementById("modal-theme");
    if (themeElem) {
        themeElem.textContent = presentation.themeSong
            ? `🎵 ${presentation.themeSong}`
            : "🎵 N/A";
    }

    /* Logros compartidos del luchador */
    const achievementsList = document.getElementById("modal-achievements");

    if (achievementsList) {
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
