function openModal(index) {
    const wrestler = wrestlers[index];

    if (!wrestler) {
        return;
    }

    const modal = document.getElementById("modal");
    const modalName = document.getElementById("modal-name");
    const modalDivision = document.getElementById("modal-division");
    const achievementsList = document.getElementById("modal-achievements");

    // Datos principales
    modalName.textContent = wrestler.name;
    modalDivision.textContent = wrestler.division;

    // Limpiamos la lista de logros por las dudas
    achievementsList.innerHTML = "";

    // 1. Agregamos el Intérprete como el primer elemento o detalle especial
    if (wrestler.interpreter) {
        const interpreterItem = document.createElement("li");
        interpreterItem.innerHTML = `<strong>Intérprete:</strong> ${wrestler.interpreter}`;
        // Opcional: le podemos dar una clase o estilo diferenciado si querés
        interpreterItem.style.color = "#d90024"; // Un toque de color épico para destacarlo
        achievementsList.appendChild(interpreterItem);
    }

    // 2. Cargamos el resto de los Career Highlights (logros)
    if (wrestler.achievements && wrestler.achievements.length > 0) {
        wrestler.achievements.forEach(function (achievement) {
            const listItem = document.createElement("li");
            listItem.textContent = achievement;
            achievementsList.appendChild(listItem);
        });
    }

    // Mostramos el modal
    modal.classList.add("show");
    document.body.classList.add("modal-open");
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.classList.remove("show");
    document.body.classList.remove("modal-open");
}

/* CERRAR AL HACER CLIC EN EL FONDO */
document.getElementById("modal").addEventListener("click", function (event) {
    // Evita que se cierre si hacés clic dentro de la caja de contenido del modal
    if (event.target === this) {
        closeModal();
    }
});

/* CERRAR CON LA TECLA ESCAPE */
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeModal();
    }
});
