/* =========================================
   LÓGICA DEL MODAL - GALAXY PRO WRESTLING
   ========================================= */

function openModal(globalIndex) {
    const wrestler = wrestlers[globalIndex];
    if (!wrestler) return;

    // 1. División arriba de todo
    const divisionElem = document.getElementById("modal-division");
    if (divisionElem) {
        divisionElem.textContent = wrestler.division || "";
    }

    // 2. Nombre del luchador
    const nameElem = document.getElementById("modal-name");
    if (nameElem) {
        nameElem.textContent = wrestler.name;
    }

    // 3. Intérprete en dorado a la derecha de CAREER HIGHLIGHTS
    const interpreterElem = document.getElementById("modal-interpreter");
    if (interpreterElem) {
        interpreterElem.textContent = wrestler.interpreter || "";
    }

    // 4. Lista de logros
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

    // Mostramos el modal y bloqueamos el scroll del fondo
    document.getElementById("modal").classList.add("show");
    document.body.classList.add("modal-open");
}

function closeModal() {
    document.getElementById("modal").classList.remove("show");
    document.body.classList.remove("modal-open");
}

// Cerrar al hacer clic fuera del contenido
window.onclick = function(event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        closeModal();
    }
};
