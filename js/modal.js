/* =========================================
   LÓGICA DEL MODAL - GALAXY PRO WRESTLING
   ========================================= */

function openModal(globalIndex) {
    const wrestler = wrestlers[globalIndex];
    if (!wrestler) return;

    // Rellenamos textos principales
    document.getElementById("modal-name").textContent = wrestler.name;
    document.getElementById("modal-division").textContent = "Career Highlights";

    // Inyectamos la división a la izquierda y el intérprete en dorado a la derecha
    const divisionParagraph = document.querySelector(".modal-content > p");
    if (divisionParagraph) {
        divisionParagraph.innerHTML = `
            <span>${wrestler.division}</span>
            <span class="interpreter">${wrestler.interpreter || ""}</span>
        `;
    }

    // Cargamos la lista de logros (Career Highlights)
    const achievementsList = document.getElementById("modal-achievements");
    achievementsList.innerHTML = "";
    
    if (wrestler.achievements && wrestler.achievements.length > 0) {
        wrestler.achievements.forEach(ach => {
            const li = document.createElement("li");
            li.textContent = ach;
            achievementsList.appendChild(li);
        });
    }

    // Mostramos el modal y bloqueamos el scroll del fondo
    document.getElementById("modal").classList.add("show");
    document.body.classList.add("modal-open");
}

function closeModal() {
    document.getElementById("modal").classList.remove("show");
    document.body.classList.remove("modal-open");
}

// Opcional: Cerrar el modal haciendo clic fuera de la caja de contenido
window.onclick = function(event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        closeModal();
    }
};
