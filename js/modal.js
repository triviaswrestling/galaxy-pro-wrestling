/* =========================================
   LÓGICA DEL MODAL - GALAXY PRO WRESTLING
   ========================================= */

function openModal(globalIndex) {
    const wrestler = wrestlers[globalIndex];
    if (!wrestler) return;

    // 1. Nombre principal del luchador
    const nameElem = document.getElementById("modal-name");
    if (nameElem) {
        nameElem.textContent = wrestler.name;
    }

    // 2. Título superior fija "CAREER HIGHLIGHTS"
    const topTitle = document.querySelector(".modal-content h3");
    if (topTitle) {
        topTitle.textContent = "Career Highlights";
    }

    // 3. Franja inferior: División a la izquierda e Intérprete en DORADO a la derecha
    const divisionParagraph = document.querySelector(".modal-content > p");
    if (divisionParagraph) {
        divisionParagraph.innerHTML = `
            <span>${wrestler.division}</span>
            <span class="interpreter">${wrestler.interpreter || ""}</span>
        `;
    }

    // 4. Cargar lista de logros
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

    // Mostramos el modal y bloqueamos el scroll
    document.getElementById("modal").classList.add("show");
    document.body.classList.add("modal-open");
}

function closeModal() {
    document.getElementById("modal").classList.remove("show");
    document.body.classList.remove("modal-open");
}

// Cerrar haciendo clic fuera
window.onclick = function(event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        closeModal();
    }
};
