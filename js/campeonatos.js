
/* =========================================================
   GALAXY PRO WRESTLING
   MOTOR DEL CATÁLOGO DE CAMPEONATOS

   Archivo: js/campeonatos.js

   Requiere:
   js/championships/indicecampeonato.js

   Funciones:
   - Generar tarjetas automáticamente.
   - Buscar campeonatos y campeones.
   - Filtrar por categoría y estado.
   - Ordenar por nombre y antigüedad.
   - Actualizar contadores.
   - Enlazar con la ficha de cada campeonato.
   - Mostrar mensajes si no hay resultados.
   ========================================================= */

(function () {
    "use strict";

    /* =====================================================
       01. INICIALIZACIÓN
       ===================================================== */

    const iniciarCatalogo = () => {
        const indice = window.GPWChampionshipIndex;

        const grid = document.getElementById("championship-grid");
        const totalEl = document.getElementById("catalog-total");
        const activeEl = document.getElementById("catalog-active");
        const vacantEl = document.getElementById("catalog-vacant");
        const searchInput = document.getElementById("catalog-search");
        const clearSearch = document.getElementById("catalog-clear-search");
        const categorySelect = document.getElementById("catalog-category");
        const statusSelect = document.getElementById("catalog-status");
        const sortSelect = document.getElementById("catalog-sort");
        const resetButton = document.getElementById("catalog-reset");
        const emptyResetButton = document.getElementById("catalog-empty-reset");
        const emptyMessage = document.getElementById("catalog-empty");
        const resultsCount = document.getElementById("catalog-results-count");

        if (!grid) {
            console.error(
                "[GPW Championships] No se encontró #championship-grid."
            );
            return;
        }

        /* =================================================
           02. VERIFICAR EL ÍNDICE CENTRAL
           ================================================= */

        if (
            !indice ||
            typeof indice.obtenerTodos !== "function"
        ) {
            grid.innerHTML = `
                <div class="catalog-error">
                    <i class="fa-solid fa-triangle-exclamation"
                       aria-hidden="true"></i>
                    <p>NO SE PUDO CARGAR EL ÍNDICE DE CAMPEONATOS.</p>
                    <p>Revisá la ruta de indicecampeonato.js.</p>
                </div>
            `;

            grid.setAttribute("aria-busy", "false");

            console.error(
                "[GPW Championships] GPWChampionshipIndex no está disponible."
            );
            return;
        }

        /* =================================================
           03. OBTENER LOS CAMPEONATOS REGISTRADOS
           ================================================= */

        let campeonatos;

        try {
            campeonatos = indice.obtenerTodos();
        } catch (error) {
            console.error(
                "[GPW Championships] Error leyendo el índice:",
                error
            );

            campeonatos = [];
        }

        if (!Array.isArray(campeonatos)) {
            campeonatos = [];
        }

        /* =================================================
           04. NORMALIZAR DATOS OPCIONALES

           El índice actual registra nombre, ID, categoría,
           estado, archivo histórico y orden.

           Los datos adicionales, como imagen, campeón y año,
           se utilizarán cuando estén disponibles.
           ================================================= */

        const normalizar = (valor) =>
            String(valor ?? "")
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .trim();

        const obtenerAnio = (campeonato) => {
            const valor =
                campeonato.anioCreacion ??
                campeonato.añoCreacion ??
                campeonato.anoCreacion ??
                campeonato.anio ??
                campeonato.año ??
                campeonato.ano ??
                campeonato.year ??
                null;

            const anio = Number(valor);

            return Number.isFinite(anio) && anio > 0
                ? anio
                : null;
        };

        const obtenerCampeon = (campeonato) => {
            return (
                campeonato.campeonActual ??
                campeonato.campeon ??
                campeonato.currentChampion ??
                campeonato.champion ??
                ""
            );
        };

        const obtenerImagen = (campeonato) => {
            return (
                campeonato.imagenCinturon ??
                campeonato.imagen ??
                campeonato.beltImage ??
                campeonato.image ??
                ""
            );
        };

        const obtenerEstado = (campeonato) => {
            const estado = normalizar(campeonato.estado);

            if (["vacant", "vacante", "vacantes"].includes(estado)) {
                return "vacant";
            }

            if (["retired", "retirado", "retirados"].includes(estado)) {
                return "retired";
            }

            return "active";
        };

        const nombresCategoria = {
            world: "World Championship",
            midcard: "Midcard Championship",
            tag: "Tag Team Championship",
            trios: "Trios Championship",
            women: "Women's Championship",
            specialty: "Specialty Championship",
            other: "Otros campeonatos"
        };

        const nombresEstado = {
            active: "ACTIVO",
            vacant: "VACANTE",
            retired: "RETIRADO"
        };

        /* =================================================
           05. CONTADORES GENERALES
           ================================================= */

        if (totalEl) {
            totalEl.textContent = campeonatos.length;
        }

        if (activeEl) {
            activeEl.textContent = campeonatos.filter(
                c => obtenerEstado(c) === "active"
            ).length;
        }

        if (vacantEl) {
            vacantEl.textContent = campeonatos.filter(
                c => obtenerEstado(c) === "vacant"
            ).length;
        }

        /* =================================================
           06. CREAR TARJETAS
           ================================================= */

        const crearTarjeta = (campeonato) => {
            const id = String(campeonato.id || "");
            const nombre = String(campeonato.nombre || "Campeonato");
            const categoria = String(campeonato.categoria || "other");
            const estado = obtenerEstado(campeonato);
            const campeon = obtenerCampeon(campeonato);
            const imagen = obtenerImagen(campeonato);
            const anio = obtenerAnio(campeonato);

            const article = document.createElement("article");
            article.className = "championship-card";
            article.dataset.id = id;
            article.dataset.category = categoria;
            article.dataset.status = estado;

            const link = document.createElement("a");
            link.className = "championship-card-link";

            /*
             * Página individual prevista.
             * El archivo campeonato.html deberá crearse
             * para que este enlace pueda abrir la ficha.
             */
            link.href = "campeonato.html?id=" + encodeURIComponent(id);
            link.setAttribute(
                "aria-label",
                "Ver ficha histórica de " + nombre
            );

            /* Imagen o marcador provisional del cinturón. */

            const imageBox = document.createElement("div");
            imageBox.className = "championship-card-image";

            if (imagen) {
                const img = document.createElement("img");

                img.src = imagen;
                img.alt = "Cinturón de " + nombre;
                img.loading = "lazy";
                img.decoding = "async";

                img.addEventListener("error", () => {
                    img.remove();

                    if (!imageBox.querySelector(".championship-image-placeholder")) {
                        const placeholder = document.createElement("div");
                        placeholder.className = "championship-image-placeholder";
                        placeholder.innerHTML =
                            '<i class="fa-solid fa-trophy" aria-hidden="true"></i>';
                        imageBox.appendChild(placeholder);
                    }
                }, { once: true });

                imageBox.appendChild(img);
            } else {
                const placeholder = document.createElement("div");
                placeholder.className = "championship-image-placeholder";
                placeholder.innerHTML =
                    '<i class="fa-solid fa-trophy" aria-hidden="true"></i>';

                imageBox.appendChild(placeholder);
            }

            /* Etiqueta de estado. */

            const statusBadge = document.createElement("span");
            statusBadge.className =
                "championship-card-status status-" + estado;
            statusBadge.textContent = nombresEstado[estado];

            imageBox.appendChild(statusBadge);

            /* Información del campeonato. */

            const content = document.createElement("div");
            content.className = "championship-card-content";

            const categoryLabel = document.createElement("p");
            categoryLabel.className = "championship-card-category";
            categoryLabel.textContent =
                nombresCategoria[categoria] || nombresCategoria.other;

            const title = document.createElement("h3");
            title.className = "championship-card-name";
            title.textContent = nombre;

            const championRow = document.createElement("p");
            championRow.className = "championship-card-champion";

            const championLabel = document.createElement("span");
            championLabel.className = "championship-card-champion-label";
            championLabel.textContent = "CAMPEÓN ACTUAL";

            const championName = document.createElement("strong");
            championName.className = "championship-card-champion-name";

            if (estado === "vacant") {
                championName.textContent = "Título vacante";
            } else if (estado === "retired") {
                championName.textContent = "Campeonato retirado";
            } else {
                championName.textContent =
                    campeon || "Información próximamente";
            }

            championRow.append(championLabel, championName);

            const yearLabel = document.createElement("p");
            yearLabel.className = "championship-card-year";
            yearLabel.textContent = anio
                ? "ESTABLECIDO EN " + anio
                : "AÑO NO CONFIGURADO";

            content.append(
                categoryLabel,
                title,
                championRow,
                yearLabel
            );

            link.append(imageBox, content);
            article.appendChild(link);

            return article;
        };

        /* =================================================
           07. BUSCADOR, FILTROS Y ORDEN
           ================================================= */

        const obtenerResultados = () => {
            const busqueda = normalizar(searchInput?.value || "");
            const categoriaElegida = categorySelect?.value || "all";
            const estadoElegido = statusSelect?.value || "all";
            const ordenElegido = sortSelect?.value || "default";

            let resultados = campeonatos.filter((campeonato) => {
                const categoria = campeonato.categoria || "other";
                const estado = obtenerEstado(campeonato);
                const campeon = obtenerCampeon(campeonato);

                const texto = normalizar([
                    campeonato.nombre,
                    campeonato.id,
                    campeonato.categoria,
                    nombresCategoria[categoria],
                    campeon,
                    estado,
                    nombresEstado[estado],
                    obtenerAnio(campeonato) || ""
                ].join(" "));

                const coincideBusqueda =
                    !busqueda || texto.includes(busqueda);

                const coincideCategoria =
                    categoriaElegida === "all" ||
                    categoria === categoriaElegida;

                const coincideEstado =
                    estadoElegido === "all" ||
                    estado === estadoElegido;

                return (
                    coincideBusqueda &&
                    coincideCategoria &&
                    coincideEstado
                );
            });

            if (ordenElegido === "name") {
                resultados.sort((a, b) =>
                    String(a.nombre || "").localeCompare(
                        String(b.nombre || ""),
                        "es",
                        { sensitivity: "base" }
                    )
                );
            }

            if (ordenElegido === "oldest") {
                resultados.sort((a, b) => {
                    const anioA = obtenerAnio(a);
                    const anioB = obtenerAnio(b);

                    if (anioA === null && anioB === null) {
                        return (a.orden || 0) - (b.orden || 0);
                    }

                    if (anioA === null) return 1;
                    if (anioB === null) return -1;

                    return anioA - anioB;
                });
            }

            if (ordenElegido === "newest") {
                resultados.sort((a, b) => {
                    const anioA = obtenerAnio(a);
                    const anioB = obtenerAnio(b);

                    if (anioA === null && anioB === null) {
                        return (a.orden || 0) - (b.orden || 0);
                    }

                    if (anioA === null) return 1;
                    if (anioB === null) return -1;

                    return anioB - anioA;
                });
            }

            if (ordenElegido === "default") {
                resultados.sort(
                    (a, b) => (a.orden || 0) - (b.orden || 0)
                );
            }

            return resultados;
        };

        /* =================================================
           08. DIBUJAR RESULTADOS
           ================================================= */

        const renderizar = () => {
            const resultados = obtenerResultados();

            grid.replaceChildren();

            resultados.forEach((campeonato) => {
                grid.appendChild(crearTarjeta(campeonato));
            });

            const hayResultados = resultados.length > 0;

            if (emptyMessage) {
                emptyMessage.hidden = hayResultados;
            }

            if (grid) {
                grid.hidden = !hayResultados;
                grid.setAttribute("aria-busy", "false");
            }

            if (resultsCount) {
                const total = resultados.length;

                resultsCount.textContent =
                    total + (total === 1
                        ? " CAMPEONATO"
                        : " CAMPEONATOS");
            }

            if (clearSearch && searchInput) {
                clearSearch.hidden = searchInput.value.length === 0;
            }
        };

        /* =================================================
           09. RESTABLECER FILTROS
           ================================================= */

        const restablecer = () => {
            if (searchInput) searchInput.value = "";
            if (categorySelect) categorySelect.value = "all";
            if (statusSelect) statusSelect.value = "all";
            if (sortSelect) sortSelect.value = "default";

            renderizar();

            if (searchInput) {
                searchInput.focus();
            }
        };

        /* =================================================
           10. CONECTAR CONTROLES
           ================================================= */

        searchInput?.addEventListener("input", renderizar);
        categorySelect?.addEventListener("change", renderizar);
        statusSelect?.addEventListener("change", renderizar);
        sortSelect?.addEventListener("change", renderizar);

        clearSearch?.addEventListener("click", () => {
            if (searchInput) {
                searchInput.value = "";
            }

            renderizar();
            searchInput?.focus();
        });

        resetButton?.addEventListener("click", restablecer);
        emptyResetButton?.addEventListener("click", restablecer);

        /* =================================================
           11. PRIMERA CARGA
           ================================================= */

        renderizar();

        console.info(
            "[GPW Championships] Catálogo iniciado:",
            campeonatos.length,
            "campeonatos registrados."
        );
    };

    /* El script se carga con defer desde el HTML. */

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            iniciarCatalogo,
            { once: true }
        );
    } else {
        iniciarCatalogo();
    }

})();

