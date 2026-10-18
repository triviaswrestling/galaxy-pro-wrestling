
/* =========================================
   MODAL DEL ROSTER - GALAXY PRO WRESTLING
   ========================================= */

function getRosterModalPresentation(wrestler) {
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
            : wrestler.image || ""
    };
}

/* =========================================
   ABRIR MODAL
   ========================================= */

function openModal(globalIndex) {
    const wrestler = wrestlers[globalIndex];
    if (!wrestler) return;

    const presentation = getRosterModalPresentation(wrestler);

    /* División */
    const divisionElem = document.getElementById("modal-division");
    if (divisionElem) {
        divisionElem.textContent = wrestler.division || "";
    }

    /* Nombre de la presentación */
    const nameElem = document.getElementById("modal-name");
    if (nameElem) {
        nameElem.textContent = presentation.name;
    }

    /* Intérprete del perfil original */
    const interpreterElem = document.getElementById("modal-interpreter");
    if (interpreterElem) {
        interpreterElem.textContent = wrestler.interpreter || "";
    }

    /* Logros compartidos */
    const achievementsList = document.getElementById("modal-achievements");

    if (achievementsList) {
        achievementsList.innerHTML = "";

        const achievements = Array.isArray(wrestler.achievements)
            ? wrestler.achievements
            : [];

        if (achievements.length > 0) {
            achievements.forEach(achievement => {
                const li = document.createElement("li");
                li.textContent = achievement;
                achievementsList.appendChild(li);
            });
        }
    }

    /* Mostrar modal */
    const modal = document.getElementById("modal");

    if (modal) {
        modal.classList.add("show");
        document.body.classList.add("modal-open");
    }
}

/* =========================================
   CERRAR MODAL
   ========================================= */

function closeModal() {
    const modal = document.getElementById("modal");

    if (modal) {
        modal.classList.remove("show");
    }

    document.body.classList.remove("modal-open");
}

/* =========================================
   CERRAR AL TOCAR FUERA DEL MODAL
   ========================================= */

window.addEventListener("click", function(event) {
    const modal = document.getElementById("modal");

    if (modal && event.target === modal) {
        closeModal();
    }
});
