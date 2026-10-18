
/* ==========================================================
   GALAXY PRO WRESTLING — CHAMPIONSHIP SYSTEM
   Archivo: js/campeonato.js
   ========================================================== */

(function () {
    "use strict";

    /* ======================================================
       ELEMENTOS HTML
       ====================================================== */

    const elements = {
        hero: document.getElementById("championship-hero"),
        category: document.getElementById("championship-category"),
        name: document.getElementById("championship-name"),
        subtitle: document.getElementById("championship-subtitle"),

        statusIndicator: document.getElementById(
            "championship-status-indicator"
        ),
        status: document.getElementById("championship-status"),

        belt: document.getElementById("championship-belt"),

        currentChampion: document.getElementById(
            "championship-current-champion"
        ),
        totalReigns: document.getElementById(
            "championship-total-reigns"
        ),
        established: document.getElementById(
            "championship-established"
        ),

        sectionTitle: document.getElementById(
            "championship-section-title"
        ),
        sectionDescription: document.getElementById(
            "championship-section-description"
        ),

        tabReigns: document.getElementById("tab-reigns"),
        tabHistory: document.getElementById("tab-history"),

        panelReigns: document.getElementById("panel-reigns"),
        panelHistory: document.getElementById("panel-history"),

        reigns: document.getElementById("championship-reigns"),
        reignsCount: document.getElementById("reigns-count"),

        historyIntro: document.getElementById(
            "championship-history-intro"
        ),
        historyDescription: document.getElementById(
            "championship-history-description"
        ),
        timeline: document.getElementById("championship-timeline")
    };


    /* ======================================================
       FUNCIONES GENERALES
       ====================================================== */

    function setText(element, value) {
        if (!element) return;

        element.textContent =
            value !== undefined &&
            value !== null &&
            String(value).trim() !== ""
                ? String(value)
                : "No registrado";
    }


    function createElement(tag, className, text) {
        const element = document.createElement(tag);

        if (className) {
            element.className = className;
        }

        if (text !== undefined && text !== null) {
            element.textContent = String(text);
        }

        return element;
    }


    function showMessage(container, message) {
        if (!container) return;

        container.replaceChildren();

        const paragraph = createElement(
            "p",
            "championship-loading",
            message
        );

        container.appendChild(paragraph);
    }


    function getChampionshipId() {
        const params = new URLSearchParams(window.location.search);

        return params.get("id");
    }


    function getDataValue(data, keys, fallback) {
        for (const key of keys) {
            if (
                data &&
                data[key] !== undefined &&
                data[key] !== null &&
                data[key] !== ""
            ) {
                return data[key];
            }
        }

        return fallback;
    }


/* ======================================================
   CONEXIÓN CON WRESTLERS.JS
   ====================================================== */

function getWrestlerPresentation(reign) {
    const wrestlers = window.GPW_WRESTLERS;

    if (!Array.isArray(wrestlers)) {
        return null;
    }

    const wrestlerId = reign && reign.wrestlerId;

    if (!wrestlerId) {
        return null;
    }

    const wrestler = wrestlers.find(function (item) {
        return item.id === wrestlerId;
    });

    if (!wrestler) {
        return null;
    }

    const presentations = wrestler.presentations || {};
    const presentationId =
        reign.presentationId ||
        wrestler.rosterPresentation ||
        wrestler.id;

    const presentation =
        presentations[presentationId] || null;

    if (!presentation) {
        return null;
    }

    return {
        wrestler: wrestler,
        presentation: presentation,
        name: presentation.name || wrestler.name || "Campeón",
        nickname: presentation.nickname || wrestler.nickname || "",
        image: presentation.image || wrestler.image || "images/Vacante.jpg"
    };
}
   

   
    /* ======================================================
       FECHAS
       ====================================================== */

    function parseDate(value) {
        if (!value) return null;

        if (value instanceof Date) {
            return isNaN(value.getTime()) ? null : value;
        }

        const text = String(value).trim();

        if (!text) return null;

        let date;

        if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
            date = new Date(text + "T00:00:00");
        } else {
            date = new Date(text);
        }

        return isNaN(date.getTime()) ? null : date;
    }


    function formatDate(value) {
        const date = parseDate(value);

        if (!date) {
            return "Sin registrar";
        }

        return date.toLocaleDateString("es-AR", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }).replace(/\./g, "").toUpperCase();
    }


    function formatDuration(startValue, endValue) {
        const start = parseDate(startValue);
        const end = parseDate(endValue) || new Date();

        if (!start) {
            return "No registrada";
        }

        const difference = Math.max(
            0,
            Math.floor((end - start) / 86400000)
        );

        if (difference === 1) {
            return "1 día";
        }

        return difference + " días";
    }


    /* ======================================================
       CARGAR INFORMACIÓN DEL CAMPEONATO
       ====================================================== */

    function loadChampionshipData(championship) {
        return new Promise(function (resolve, reject) {
            if (!championship || !championship.archivo) {
                reject(
                    new Error("No se encontró el archivo del campeonato.")
                );
                return;
            }

            const script = document.createElement("script");

            script.src =
                "js/championships/" + championship.archivo;

            script.onload = function () {
                if (window.GPWChampionshipData) {
                    resolve(window.GPWChampionshipData);
                } else {
                    reject(
                        new Error(
                            "El archivo no definió GPWChampionshipData."
                        )
                    );
                }
            };

            script.onerror = function () {
                reject(
                    new Error(
                        "No se pudo cargar " + championship.archivo
                    )
                );
            };

            document.head.appendChild(script);
        });
    }


    /* ======================================================
       RENDERIZAR INFORMACIÓN GENERAL
       ====================================================== */

    function renderChampionship(championship, data) {
        const title = getDataValue(
            data,
            ["nombre", "name", "titulo", "title"],
            championship.nombre || championship.name || "Campeonato"
        );

        const category = getDataValue(
            data,
            ["categoria", "category"],
            championship.categoria || championship.category || "Campeonato"
        );

        const subtitle = getDataValue(
            data,
            ["subtitulo", "subtitle", "descripcionCorta"],
            ""
        );

        const status = getDataValue(
            data,
            ["estado", "status"],
            championship.estado || championship.status || "Activo"
        );

        const belt = getDataValue(
            data,
            ["imagen", "belt", "beltImage", "imagenCampeonato"],
            "images/championships/placeholder.png"
        );

        const established = getDataValue(
            data,
            ["establecido", "fechaCreacion", "established"],
            "No registrado"
        );

        const reigns = getReigns(data);
        const currentChampion = getCurrentChampion(data, reigns);

        setText(elements.name, title);
        setText(elements.category, category);
        setText(elements.subtitle, subtitle);
        setText(elements.status, status);
        setText(elements.established, established);
        setText(elements.currentChampion, currentChampion);
        setText(elements.totalReigns, reigns.length);

        if (elements.belt) {
            elements.belt.src = belt;
            elements.belt.alt = title;
            elements.belt.onerror = function () {
                this.onerror = null;
                this.src = "images/championships/placeholder.png";
            };
        }

        if (elements.hero) {
            elements.hero.dataset.category = String(category)
                .toLowerCase()
                .replace(/\s+/g, "-");
        }

        if (elements.statusIndicator) {
            elements.statusIndicator.classList.toggle(
                "is-inactive",
                /inactivo|retirado|desactivado|vacante/i.test(
                    String(status)
                )
            );
        }

        renderReigns(reigns);
        renderHistory(data);
    }


    /* ======================================================
       OBTENER REINADOS
       ====================================================== */

    function getReigns(data) {
        const reigns = getDataValue(
            data,
            ["reinados", "reigns", "historialReinados", "historial"],
            []
        );

        return Array.isArray(reigns) ? reigns : [];
    }


    function getCurrentChampion(data, reigns) {
        const directChampion = getDataValue(
            data,
            [
                "campeonActual",
                "campeon",
                "currentChampion",
                "champion"
            ],
            null
        );

        if (directChampion) {
            if (typeof directChampion === "object") {
                return getDataValue(
                    directChampion,
                    ["nombre", "name"],
                    "No registrado"
                );
            }

            return directChampion;
        }

        const currentReign = reigns.find(function (reign) {
            const end = getDataValue(
                reign,
                ["fin", "fechaFin", "endDate", "end"],
                null
            );

            return !end;
        });

        if (currentReign) {
            return getDataValue(
                currentReign,
                ["campeon", "champion", "nombre"],
                "No registrado"
            );
        }

        return "Vacante";
    }


    /* ======================================================
       RENDERIZAR REINADOS
       ====================================================== */

    function renderReigns(reigns) {
        if (!elements.reigns) return;

        elements.reigns.replaceChildren();

        if (elements.reignsCount) {
            elements.reignsCount.textContent = String(reigns.length);
        }

        if (!reigns.length) {
            showMessage(
                elements.reigns,
                "Todavía no hay reinados registrados."
            );
            return;
        }

        reigns.forEach(function (reign, index) {
            const card = createElement(
                "article",
                "championship-reign"
            );

            
/* IMAGEN Y PRESENTACIÓN EXACTA DEL CAMPEÓN */

const wrestlerInfo = getWrestlerPresentation(reign);

const championName = wrestlerInfo
    ? wrestlerInfo.name
    : getDataValue(
        reign,
        ["campeon", "champion", "nombre"],
        "Campeón no registrado"
    );

const image = createElement(
    "img",
    "championship-reign-image"
);

image.loading = "lazy";
image.alt = championName;

image.src = wrestlerInfo
    ? wrestlerInfo.image
    : getDataValue(
        reign,
        ["imagen", "image", "foto", "fotoCampeon", "championImage"],
        "images/Vacante.jpg"
    );

image.onerror = function () {
    this.onerror = null;
    this.src = "images/Vacante.jpg";
};



            /* CONTENIDO DEL REINADO */

            const details = createElement(
                "div",
                "championship-reign-details"
            );

            const number = getDataValue(
                reign,
                ["numero", "numeroReinado", "number"],
                index + 1
            );

            const champion = championName;

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
                getDataValue(
                    reign,
                    ["descripcion", "description"],
                    "Sin descripción registrada."
                )
            );


            /* ==========================================
               FECHAS: PLACAS SEPARADAS
               ========================================== */

            const start = getDataValue(
                reign,
                ["inicio", "fechaInicio", "startDate", "start"],
                null
            );

            const end = getDataValue(
                reign,
                ["fin", "fechaFin", "endDate", "end"],
                null
            );

            const dates = createElement(
                "div",
                "championship-reign-dates"
            );

            /* PLACA DE INICIO */

            const startBox = createElement(
                "div",
                "championship-date-box championship-date-start"
            );

            const startLabel = createElement(
                "span",
                "championship-date-label",
                "INICIO"
            );

            const startValue = createElement(
                "strong",
                "",
                start ? formatDate(start) : "Sin registrar"
            );

            startBox.append(startLabel, startValue);


            /* PLACA DE FINALIZACIÓN O REINADO ACTUAL */

            const endBox = createElement(
                "div",
                "championship-date-box championship-date-end"
            );

            const endLabel = createElement(
                "span",
                "championship-date-label",
                end ? "FINALIZACIÓN" : "EN CURSO"
            );

            const endValue = createElement(
                "strong",
                "",
                end ? formatDate(end) : "Actualidad"
            );

            endBox.append(endLabel, endValue);
            dates.append(startBox, endBox);


            /* ==========================================
               DURACIÓN
               ========================================== */

            const duration = createElement(
                "p",
                "championship-reign-duration",
                "DURACIÓN"
            );

            const durationValue = createElement(
                "strong",
                "",
                formatDuration(start, end)
            );

            duration.appendChild(durationValue);


            /* ==========================================
               DEFENSAS
               ========================================== */

            const defensesValue = getDataValue(
                reign,
                ["defensas", "defenses"],
                null
            );

            const defenses = createElement(
                "p",
                "championship-reign-defenses",
                "DEFENSAS"
            );

            const defensesNumber = createElement(
                "strong",
                "",
                defensesValue !== null
                    ? String(defensesValue)
                    : "Sin registrar"
            );

            defenses.appendChild(defensesNumber);


            /* ==========================================
               ORDEN FINAL
               ========================================== */

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


    /* ======================================================
       RENDERIZAR HISTORIA DEL CAMPEONATO
       ====================================================== */

    function renderHistory(data) {
        const history = getDataValue(
            data,
            ["historia", "history", "lineage", "historialHistorico"],
            null
        );

        if (!history) {
            setText(
                elements.historyIntro,
                "Historia del campeonato"
            );

            setText(
                elements.historyDescription,
                "Todavía no hay información histórica registrada."
            );

            if (elements.timeline) {
                elements.timeline.replaceChildren();
            }

            return;
        }

        const intro = typeof history === "string"
            ? history
            : getDataValue(
                history,
                ["introduccion", "intro", "descripcion", "description"],
                "Historia del campeonato"
            );

        const description = typeof history === "object"
            ? getDataValue(
                history,
                ["descripcionGeneral", "resumen", "summary"],
                ""
            )
            : "";

        setText(elements.historyIntro, intro);
        setText(elements.historyDescription, description);

        const events = typeof history === "object"
            ? getDataValue(
                history,
                ["eventos", "timeline", "cambios", "events"],
                []
            )
            : [];

        renderTimeline(Array.isArray(events) ? events : []);
    }


    /* ======================================================
       LÍNEA DE TIEMPO
       ====================================================== */

    function renderTimeline(events) {
        if (!elements.timeline) return;

        elements.timeline.replaceChildren();

        if (!events.length) {
            showMessage(
                elements.timeline,
                "No hay acontecimientos históricos registrados."
            );
            return;
        }

        events.forEach(function (event) {
            const item = createElement(
                "article",
                "championship-timeline-item"
            );

            const date = getDataValue(
                event,
                ["fecha", "date", "año", "year"],
                ""
            );

            const title = getDataValue(
                event,
                ["titulo", "title", "nombre", "name"],
                "Acontecimiento histórico"
            );

            const description = getDataValue(
                event,
                ["descripcion", "description", "detalle", "detail"],
                ""
            );

            const dateElement = createElement(
                "span",
                "championship-timeline-date",
                date
            );

            const heading = createElement(
                "h4",
                "championship-timeline-title",
                title
            );

            const paragraph = createElement(
                "p",
                "championship-timeline-description",
                description
            );

            item.append(dateElement, heading, paragraph);
            elements.timeline.appendChild(item);
        });
    }


    /* ======================================================
       PESTAÑAS: REINADOS / HISTORIA
       ====================================================== */

    function activateTab(view) {
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
        }

        if (elements.panelReigns) {
            elements.panelReigns.hidden = !showReigns;
        }

        if (elements.panelHistory) {
            elements.panelHistory.hidden = showReigns;
        }

        setText(
            elements.sectionTitle,
            showReigns ? "Historial de reinados" : "Historia del campeonato"
        );

        setText(
            elements.sectionDescription,
            showReigns
                ? "Todos los reinados registrados de este campeonato."
                : "El origen, la evolución y los cambios de este campeonato."
        );
    }


    function initializeTabs() {
        if (elements.tabReigns) {
            elements.tabReigns.addEventListener("click", function () {
                activateTab("reigns");
            });
        }

        if (elements.tabHistory) {
            elements.tabHistory.addEventListener("click", function () {
                activateTab("history");
            });
        }

        activateTab("reigns");
    }


    /* ======================================================
       INICIALIZACIÓN
       ====================================================== */

    async function initialize() {
        initializeTabs();

        const id = getChampionshipId();

        if (!id) {
            showMessage(
                elements.reigns,
                "No se especificó qué campeonato querés consultar."
            );
            return;
        }

        if (!window.GPWChampionshipIndex) {
            showMessage(
                elements.reigns,
                "No se pudo cargar el índice de campeonatos."
            );
            return;
        }

        const championship =
            window.GPWChampionshipIndex.obtener(id);

        if (!championship) {
            showMessage(
                elements.reigns,
                "No se encontró el campeonato solicitado."
            );
            return;
        }

        try {
            const data = await loadChampionshipData(championship);

            renderChampionship(championship, data);

        } catch (error) {
            console.error(
                "Error al cargar el campeonato:",
                error
            );

            showMessage(
                elements.reigns,
                "No se pudo cargar la información del campeonato."
            );
        }
    }


    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initialize
        );
    } else {
        initialize();
    }

})();
