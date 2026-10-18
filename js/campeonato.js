
/* =====================================================
   GALAXY PRO WRESTLING
   SISTEMA DE CAMPEONATOS — PÁGINA INDIVIDUAL

   Archivo: js/campeonato.js

   FUNCIONES:
   - Leer el ID del campeonato desde la URL.
   - Buscarlo en GPWChampionshipIndex.
   - Cargar su archivo de datos correspondiente.
   - Mostrar la información del campeonato.
   - Alternar entre Reinados e Historia.
   - Mostrar errores claros si falta algún dato.
   ===================================================== */

(function () {
    "use strict";

    const INDEX = window.GPWChampionshipIndex;

    const $ = (selector) => document.querySelector(selector);

    const elements = {
        hero: $("#championship-hero"),
        category: $("#championship-category"),
        name: $("#championship-name"),
        subtitle: $("#championship-subtitle"),
        statusIndicator: $("#championship-status-indicator"),
        status: $("#championship-status"),
        belt: $("#championship-belt"),
        currentChampion: $("#championship-current-champion"),
        totalReigns: $("#championship-total-reigns"),
        established: $("#championship-established"),
        sectionTitle: $("#championship-section-title"),
        sectionDescription: $("#championship-section-description"),
        tabReigns: $("#tab-reigns"),
        tabHistory: $("#tab-history"),
        panelReigns: $("#panel-reigns"),
        panelHistory: $("#panel-history"),
        reignsCount: $("#reigns-count"),
        reigns: $("#championship-reigns"),
        historyDescription: $("#championship-history-description"),
        timeline: $("#championship-timeline")
    };

    const CATEGORY_NAMES = {
        world: "CAMPEONATO MUNDIAL",
        midcard: "CAMPEONATO MIDCARD",
        women: "CAMPEONATO FEMENINO",
        specialty: "CAMPEONATO ESPECIAL",
        tag: "CAMPEONATO EN PAREJAS"
    };

    const STATUS_NAMES = {
        active: "CAMPEONATO ACTIVO",
        vacant: "CAMPEONATO VACANTE",
        retired: "CAMPEONATO RETIRADO"
    };

    let championship = null;
    let championshipData = null;


    /* =============================================
       UTILIDADES
       ============================================= */

    function setText(element, value, fallback = "Por determinar") {
        if (element) {
            element.textContent =
                value !== undefined && value !== null && value !== ""
                    ? String(value)
                    : fallback;
        }
    }


    function showMessage(container, message) {
        if (!container) return;

        container.replaceChildren();

        const paragraph = document.createElement("p");
        paragraph.className = "championship-message";
        paragraph.textContent = message;

        container.appendChild(paragraph);
    }


    function getChampionshipId() {
        const params = new URLSearchParams(window.location.search);
        return (params.get("id") || "").trim();
    }


    function getDataValue(...keys) {
        for (const key of keys) {
            if (
                championshipData &&
                championshipData[key] !== undefined &&
                championshipData[key] !== null
            ) {
                return championshipData[key];
            }

            if (
                championship &&
                championship[key] !== undefined &&
                championship[key] !== null
            ) {
                return championship[key];
            }
        }

        return null;
    }


    function formatDate(value) {
        if (!value) return "Fecha no registrada";

        const date = new Date(value + "T00:00:00");

        if (Number.isNaN(date.getTime())) {
            return String(value);
        }

        return new Intl.DateTimeFormat("es-AR", {
            day: "numeric",
            month: "long",
            year: "numeric"
        }).format(date);
    }


    function formatDuration(start, end) {
        if (!start) return "Duración no registrada";

        const first = new Date(start + "T00:00:00");
        const last = end
            ? new Date(end + "T00:00:00")
            : new Date();

        if (
            Number.isNaN(first.getTime()) ||
            Number.isNaN(last.getTime())
        ) {
            return "Duración no registrada";
        }

        const days = Math.max(
            0,
            Math.floor((last - first) / 86400000)
        );

        if (days === 0) return "1 día";

        return days + (days === 1 ? " día" : " días");
    }


    function createElement(tag, className, text) {
        const element = document.createElement(tag);

        if (className) element.className = className;
        if (text !== undefined) element.textContent = text;

        return element;
    }


    /* =============================================
       ESTADO DE LA PÁGINA
       ============================================= */

    function showPageError(title, message) {
        setText(elements.name, title);
        setText(elements.subtitle, message);
        setText(elements.category, "GALAXY PRO WRESTLING");
        setText(elements.status, "INFORMACIÓN NO DISPONIBLE");
        setText(elements.currentChampion, "No disponible");
        setText(elements.totalReigns, "—");
        setText(elements.established, "—");

        showMessage(
            elements.reigns,
            message
        );

        showMessage(
            elements.timeline,
            message
        );

        setText(
            elements.historyDescription,
            message
        );

        document.title = title + " | Galaxy Pro Wrestling";
    }


    /* =============================================
       CARGA DEL ARCHIVO HISTÓRICO
       ============================================= */

    function loadChampionshipData() {
        return new Promise((resolve, reject) => {
            if (!championship || !championship.archivo) {
                reject(new Error(
                    "El índice no indica un archivo para este campeonato."
                ));
                return;
            }

            /*
             * Cada archivo debe registrar sus datos en:
             *
             * window.GPWChampionshipData
             *
             * Se elimina una posible referencia anterior para
             * evitar confundir los datos de dos campeonatos.
             */

            window.GPWChampionshipData = null;

            const script = document.createElement("script");

            script.src =
                "js/championships/" +
                encodeURIComponent(championship.archivo);

            script.async = true;

            script.onload = function () {
                const data = window.GPWChampionshipData;

                if (!data || typeof data !== "object") {
                    reject(new Error(
                        "El archivo se cargó, pero no registró GPWChampionshipData."
                    ));
                    return;
                }

                const loadedId =
                    data.id ||
                    data.championshipId ||
                    data.historialId;

                if (
                    loadedId &&
                    loadedId !== championship.id &&
                    loadedId !== championship.historialId
                ) {
                    reject(new Error(
                        "El ID del archivo no coincide con el campeonato solicitado."
                    ));
                    return;
                }

                resolve(data);
            };

            script.onerror = function () {
                reject(new Error(
                    "No se pudo cargar el archivo: " + championship.archivo
                ));
            };

            document.head.appendChild(script);
        });
    }


    /* =============================================
       INFORMACIÓN PRINCIPAL
       ============================================= */

    function renderChampionship() {
        const name = getDataValue("nombre", "name") ||
            championship.nombre;

        const subtitle = getDataValue(
            "subtitulo",
            "subtitle",
            "descripcion",
            "description"
        ) || "Galaxy Pro Wrestling";

        const category = getDataValue(
            "categoria",
            "category"
        ) || championship.categoria;

        const status = getDataValue(
            "estado",
            "status"
        ) || championship.estado;

        const beltImage = getDataValue(
            "imagen",
            "beltImage",
            "belt",
            "imagenCinturon"
        );

        const established = getDataValue(
            "establecido",
            "fechaCreacion",
            "established",
            "creationDate"
        );

        const reigns = getDataValue(
            "reinados",
            "reigns"
        );

        const history = getDataValue(
            "historia",
            "history"
        );

        setText(elements.name, name);
        setText(elements.subtitle, subtitle);

        setText(
            elements.category,
            CATEGORY_NAMES[category] || category
        );

        setText(
            elements.status,
            STATUS_NAMES[status] || status
        );

        if (elements.statusIndicator) {
            elements.statusIndicator.dataset.status = status;
        }

        if (elements.belt && beltImage) {
            elements.belt.src = beltImage;
            elements.belt.alt = "Cinturón de " + name;

            elements.belt.onerror = function () {
                this.style.visibility = "hidden";
            };
        }

        setText(
            elements.established,
            established ? formatDate(established) : null
        );

        const reignList = Array.isArray(reigns) ? reigns : [];

        setText(elements.totalReigns, reignList.length);
        setText(elements.reignsCount, reignList.length);

        const currentReign = reignList.find((reign) => {
            return (
                !reign.fin &&
                !reign.endDate &&
                !reign.fechaFin
            );
        });

        const currentChampion = getDataValue(
            "campeonActual",
            "currentChampion"
        ) || (
            currentReign
                ? (
                    currentReign.campeon ||
                    currentReign.champion ||
                    currentReign.nombre
                )
                : null
        );

        setText(
            elements.currentChampion,
            currentChampion || (
                status === "vacant"
                    ? "Vacante"
                    : "Por determinar"
            )
        );

        setText(
            elements.sectionTitle,
            "HISTORIA DEL CAMPEONATO"
        );

        setText(
            elements.sectionDescription,
            "Cada reinado forma parte de la historia de GPW."
        );

        setText(
            elements.historyDescription,
            typeof history === "string"
                ? history
                : (
                    history && history.descripcion
                        ? history.descripcion
                        : "La historia de este campeonato se presenta en la cronología."
                )
        );

        renderReigns(reignList);
        renderHistory(history);

        document.title = name + " | Galaxy Pro Wrestling";
    }


    /* =============================================
       RENDERIZADO DE REINADOS
       ============================================= */

    function renderReigns(reigns) {
        if (!elements.reigns) return;

        elements.reigns.replaceChildren();

        if (!reigns.length) {
            showMessage(
                elements.reigns,
                "Todavía no hay reinados registrados para este campeonato."
            );
            return;
        }

        reigns.forEach((reign, index) => {
            const card = createElement(
                "article",
                "championship-reign"
            );

            const image = createElement(
                "img",
                "championship-reign-image"
            );

            const photo = reign.foto ||
                reign.imagen ||
                reign.photo ||
                reign.image;

            if (photo) {
                image.src = photo;
                image.alt = "Campeón: " + (
                    reign.campeon ||
                    reign.champion ||
                    "Campeón"
                );
                image.loading = "lazy";
                image.decoding = "async";

                image.onerror = function () {
                    this.style.visibility = "hidden";
                };
            } else {
                image.alt = "Imagen no disponible";
                image.classList.add("is-empty");
            }

            const details = createElement(
                "div",
                "championship-reign-details"
            );

            const number = reign.numero ||
                reign.numeroReinado ||
                reign.number ||
                (index + 1);

            const champion = reign.campeon ||
                reign.champion ||
                reign.nombre ||
                "Campeón no registrado";

            const heading = createElement(
                "h4",
                "championship-reign-champion",
                champion
            );

            const reignNumber = createElement(
                "span",
                "championship-reign-number",
                "REINADO #" + number
            );

            const description = createElement(
                "p",
                "championship-reign-description",
                reign.descripcion ||
                reign.description ||
                "Sin descripción registrada."
            );

            const start = reign.inicio ||
                reign.fechaInicio ||
                reign.startDate ||
                reign.start;

            const end = reign.fin ||
                reign.fechaFin ||
                reign.endDate ||
                reign.end;

            const dateText = end
                ? formatDate(start) + " — " + formatDate(end)
                : start
                    ? formatDate(start) + " — Actualidad"
                    : "Fechas no registradas";

            const dates = createElement(
                "p",
                "championship-reign-dates",
                dateText
            );

            const duration = createElement(
                "p",
                "championship-reign-duration",
                "Duración: " + formatDuration(start, end)
            );

            const defensesValue = reign.defensas ??
                reign.defenses;

            const defenses = createElement(
                "p",
                "championship-reign-defenses",
                defensesValue !== undefined &&
                defensesValue !== null
                    ? "Defensas: " + defensesValue
                    : "Defensas: no registradas"
            );

            details.append(
                reignNumber,
                heading,
                description,
                dates,
                duration,
                defenses
            );

            card.append(image, details);
            elements.reigns.appendChild(card);
        });
    }


    /* =============================================
       RENDERIZADO DE HISTORIA
       ============================================= */

    function renderHistory(history) {
        if (!elements.timeline) return;

        elements.timeline.replaceChildren();

        let entries = [];

        if (Array.isArray(history)) {
            entries = history;
        } else if (history && Array.isArray(history.eventos)) {
            entries = history.eventos;
        } else if (history && Array.isArray(history.events)) {
            entries = history.events;
        } else if (championshipData) {
            const directHistory =
                championshipData.cronologia ||
                championshipData.timeline;

            if (Array.isArray(directHistory)) {
                entries = directHistory;
            }
        }

        if (!entries.length) {
            showMessage(
                elements.timeline,
                "Todavía no hay acontecimientos históricos registrados."
            );
            return;
        }

        entries.forEach((entry) => {
            const item = createElement(
                "article",
                "championship-timeline-item"
            );

            const date = entry.fecha ||
                entry.date ||
                entry.anio ||
                entry.year;

            const heading = createElement(
                "h4",
                "championship-timeline-title",
                entry.titulo ||
                entry.nombre ||
                entry.title ||
                "Acontecimiento histórico"
            );

            const dateElement = createElement(
                "span",
                "championship-timeline-date",
                date ? formatDateIfPossible(date) : "Fecha no registrada"
            );

            const description = createElement(
                "p",
                "championship-timeline-description",
                entry.descripcion ||
                entry.description ||
                "Sin descripción registrada."
            );

            item.append(
                dateElement,
                heading,
                description
            );

            const type = entry.tipo || entry.type;

            if (type) {
                item.dataset.type = String(type);
            }

            elements.timeline.appendChild(item);
        });
    }


    function formatDateIfPossible(value) {
        const text = String(value);

        if (/^\d{4}$/.test(text)) {
            return text;
        }

        if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
            return formatDate(text);
        }

        return text;
    }


    /* =============================================
       PESTAÑAS
       ============================================= */

    function switchTab(view) {
        const showReigns = view === "reigns";

        if (elements.tabReigns) {
            elements.tabReigns.classList.toggle(
                "is-active",
                showReigns
            );

            elements.tabReigns.setAttribute(
                "aria-selected",
                String(showReigns)
            );

            elements.tabReigns.tabIndex = showReigns ? 0 : -1;
        }

        if (elements.tabHistory) {
            elements.tabHistory.classList.toggle(
                "is-active",
                !showReigns
            );

            elements.tabHistory.setAttribute(
                "aria-selected",
                String(!showReigns)
            );

            elements.tabHistory.tabIndex = showReigns ? -1 : 0;
        }

        if (elements.panelReigns) {
            elements.panelReigns.hidden = !showReigns;
            elements.panelReigns.classList.toggle(
                "is-active",
                showReigns
            );
        }

        if (elements.panelHistory) {
            elements.panelHistory.hidden = showReigns;
            elements.panelHistory.classList.toggle(
                "is-active",
                !showReigns
            );
        }
    }


    function initializeTabs() {
        if (elements.tabReigns) {
            elements.tabReigns.addEventListener(
                "click",
                () => switchTab("reigns")
            );
        }

        if (elements.tabHistory) {
            elements.tabHistory.addEventListener(
                "click",
                () => switchTab("history")
            );
        }

        switchTab("reigns");
    }


    /* =============================================
       INICIALIZACIÓN
       ============================================= */

    async function initialize() {
        initializeTabs();

        if (!INDEX || typeof INDEX.obtener !== "function") {
            showPageError(
                "ÍNDICE NO DISPONIBLE",
                "No se encontró GPWChampionshipIndex. Revisá la ruta y el nombre del archivo del índice."
            );
            return;
        }

        const id = getChampionshipId();

        if (!id) {
            showPageError(
                "CAMPEONATO NO ESPECIFICADO",
                "Abrí esta página desde el catálogo o agregá un ID válido a la URL."
            );
            return;
        }

        championship = INDEX.obtener(id);

        if (!championship) {
            showPageError(
                "CAMPEONATO NO ENCONTRADO",
                "El ID '" + id + "' no está registrado en el índice de campeonatos."
            );
            return;
        }

        try {
            championshipData = await loadChampionshipData();
            renderChampionship();
        } catch (error) {
            console.error(
                "[GPW Championships]",
                error
            );

            showPageError(
                championship.nombre || "CAMPEONATO",
                error.message ||
                "No se pudieron cargar los datos de este campeonato."
            );
        }
    }


    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initialize,
            { once: true }
        );
    } else {
        initialize();
    }

})();
