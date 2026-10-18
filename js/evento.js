
/* =========================================
   GALAXY PRO WRESTLING — DETALLE DE EVENTOS
   Match cards, presentaciones y resultados
   ========================================= */
(() => {
    "use strict";

    const $ = (selector, root = document) => root.querySelector(selector);
    const texto = (valor, fallback = "") =>
        valor == null || valor === "" ? fallback : String(valor);
    const lista = valor =>
        Array.isArray(valor) ? valor : valor == null ? [] : [valor];

    const escapar = valor => String(valor ?? "").replace(/[&<>"']/g, c => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;",
        '"': "&quot;", "'": "&#39;"
    }[c]));

    const COLORES_LADOS = [
        "#168bd2", "#e23b52", "#27b99a", "#b078e5",
        "#e4a33b", "#45c6d9", "#ef7950", "#8dbb48"
    ];

    function obtenerRoster() {
        if (Array.isArray(window.GPW_WRESTLERS)) return window.GPW_WRESTLERS;
        if (typeof wrestlers !== "undefined" && Array.isArray(wrestlers)) return wrestlers;
        return [];
    }

    function buscarLuchador(id) {
        if (!id) return null;
        return obtenerRoster().find(l =>
            String(l.id || l.name || "").toLowerCase() === String(id).toLowerCase()
        ) || null;
    }

    function obtenerPresentacion(referencia) {
        if (typeof referencia === "string") referencia = { wrestlerId: referencia };
        referencia = referencia || {};

        const luchador = buscarLuchador(
            referencia.wrestlerId || referencia.id || referencia.name
        );

        if (!luchador) {
            return {
                id: referencia.presentationId || "",
                wrestlerId: referencia.wrestlerId || referencia.id || "",
                name: referencia.name || referencia.nombre ||
                    referencia.wrestlerId || "Luchador desconocido",
                nickname: "",
                image: referencia.image || "",
                interpreter: "",
                encontrado: false
            };
        }

        const presentaciones = luchador.presentations || {};
        const pid = referencia.presentationId ||
            luchador.rosterPresentation || "default";
        const presentacion = presentaciones[pid] ||
            (pid === "default" ? null : presentaciones.default) || null;
        const datos = presentacion || luchador;

        return {
            id: pid,
            wrestlerId: luchador.id || luchador.name,
            name: datos.name || datos.nombre || luchador.name || "Luchador",
            nickname: datos.nickname || luchador.nickname || "",
            image: datos.image || luchador.image || "",
            interpreter: datos.interpreter || luchador.interpreter || "",
            type: datos.type || "normal",
            encontrado: true
        };
    }

    function normalizarReferencia(p) {
        return typeof p === "string" ? { wrestlerId: p } : (p || {});
    }

    function normalizarLados(combate) {
        if (Array.isArray(combate.lados) && combate.lados.length) {
            return combate.lados.map((lado, i) => ({
                id: String(lado.id || `lado-${i + 1}`),
                nombre: lado.nombre || lado.name || "",
                participantes: lista(lado.participantes || lado.miembros)
                    .map(normalizarReferencia)
            }));
        }

        const participantes = lista(combate.participantes)
            .map(normalizarReferencia);
        const lados = [];

        participantes.forEach((p, i) => {
            const sideId = p.sideId || p.ladoId;
            let lado = sideId
                ? lados.find(l => l.id === String(sideId))
                : null;

            if (!lado) {
                lado = {
                    id: String(sideId || `lado-${i + 1}`),
                    nombre: p.sideName || p.lado || "",
                    participantes: []
                };
                lados.push(lado);
            }

            lado.participantes.push(p);
        });

        return lados;
    }

    function colorValido(color) {
        if (typeof color !== "string") return "";
        const c = color.trim();

        if (/^#[\da-f]{3,8}$/i.test(c)) return c;
        if (/^(rgb|rgba|hsl|hsla)\([\d\s.,%+-]+\)$/i.test(c)) return c;
        if (/^[a-z]{3,20}$/i.test(c)) return c;

        return "";
    }

    function obtenerDatosTitulo(combate) {
        const fuente = combate.campeonato || combate.titulo || null;

        if (fuente && typeof fuente === "object") {
            return {
                nombre: texto(fuente.nombre || fuente.name || fuente.titulo),
                color: colorValido(
                    fuente.color || fuente.colorPrimario || fuente.accent
                )
            };
        }

        return {
            nombre: texto(fuente),
            color: colorValido(
                combate.colorCampeonato ||
                combate.campeonatoColor ||
                combate.colorTitulo
            )
        };
    }

    function obtenerRol(p) {
        const rol = String(p.role || p.rol || "").toLowerCase();

        if (["campeon", "campeón", "champion", "champion"].includes(rol)) {
            return "CAMPEÓN";
        }
        if (["retador", "retadora", "challenger", "contender"].includes(rol)) {
            return "RETADOR";
        }
        if (p.esCampeon === true || p.esCampeón === true) return "CAMPEÓN";
        if (p.esRetador === true) return "RETADOR";

        return "";
    }

    function imagenLuchador(datos) {
        if (!datos.image) {
            return `<div class="evento-imagen-vacia">SIN IMAGEN</div>`;
        }

        return `<img
            src="${escapar(datos.image)}"
            alt="${escapar(datos.name)}"
            loading="lazy"
            decoding="async"
            onerror="this.onerror=null;this.style.display='none';"
        >`;
    }

    function renderizarLado(lado, indice, cantidadLados) {
        const color = COLORES_LADOS[indice % COLORES_LADOS.length];

        return `<section
            class="evento-lado"
            data-lado-id="${escapar(lado.id)}"
            data-lado-index="${indice}"
            style="--evento-lado-color:${color}"
        >
            ${lado.nombre
                ? `<div class="evento-equipo-nombre">${escapar(lado.nombre)}</div>`
                : ""}
            <div class="evento-participantes">
                ${lado.participantes.map(p => {
                    const datos = obtenerPresentacion(p);
                    const rol = obtenerRol(p);

                    return `<article
                        class="evento-luchador"
                        data-wrestler-id="${escapar(datos.wrestlerId)}"
                        data-presentation-id="${escapar(datos.id)}"
                    >
                        <div class="evento-luchador-imagen">
                            ${imagenLuchador(datos)}
                            <div class="evento-luchador-overlay">
                                ${rol
                                    ? `<span class="evento-luchador-rol">${escapar(rol)}</span>`
                                    : ""}
                                ${datos.nickname
                                    ? `<span class="evento-luchador-apodo">${escapar(datos.nickname)}</span>`
                                    : ""}
                                <div class="evento-luchador-nombre">${escapar(datos.name)}</div>
                            </div>
                        </div>
                    </article>`;
                }).join("")}
            </div>
        </section>`;
    }

    function normalizarGanadores(resultado) {
        if (!resultado) return [];

        return lista(
            resultado.ganadores || resultado.winners ||
            resultado.ganador || resultado.winner
        ).map(g => typeof g === "object"
            ? String(g.id || g.sideId || g.wrestlerId || g.name || "")
            : String(g)
        );
    }

    function resolverNombreParticipante(p) {
        const datos = obtenerPresentacion(p);
        return datos.name;
    }

    function renderizarResultado(resultado, lados) {
        if (!resultado) {
            return `<div class="evento-resultado">
                <div class="evento-resultado-titulo">RESULTADO PENDIENTE</div>
            </div>`;
        }

        if (typeof resultado === "string") {
            return `<div class="evento-resultado">
                <div class="evento-resultado-titulo">${escapar(resultado)}</div>
            </div>`;
        }

        const tipo = texto(resultado.tipo || resultado.type, "Resultado");
        const metodo = texto(resultado.metodo || resultado.method);
        const detalle = texto(
            resultado.detalle || resultado.detail || resultado.descripcion
        );
        const ganadores = normalizarGanadores(resultado);
        const nombres = [];

        lados.forEach(lado => {
            if (ganadores.includes(lado.id)) {
                nombres.push(
                    lado.nombre ||
                    lado.participantes.map(resolverNombreParticipante).join(" / ")
                );
                return;
            }

            lado.participantes.forEach(p => {
                const datos = obtenerPresentacion(p);

                if (
                    ganadores.includes(String(datos.wrestlerId)) ||
                    ganadores.includes(String(datos.id))
                ) {
                    nombres.push(datos.name);
                }
            });
        });

        const puntos = resultado.puntuacion || resultado.score || "";
        const eliminaciones = lista(resultado.eliminaciones);
        const ganadoresUnicos = [...new Set(nombres)];

        return `<div class="evento-resultado">
            <div class="evento-resultado-titulo">
                ${escapar(tipo.replace(/[_-]/g, " ").toUpperCase())}
            </div>

            ${ganadoresUnicos.length
                ? `<div class="evento-ganador">
                    <strong>GANADOR${ganadoresUnicos.length > 1 ? "ES" : ""}:</strong>
                    ${escapar(ganadoresUnicos.join(" / "))}
                </div>`
                : ""}

            ${metodo
                ? `<div class="evento-resultado-metodo">
                    <strong>MÉTODO:</strong> ${escapar(metodo)}
                </div>`
                : ""}

            ${puntos
                ? `<div class="evento-resultado-puntuacion">
                    <strong>MARCADOR:</strong>
                    ${escapar(typeof puntos === "object"
                        ? JSON.stringify(puntos) : puntos)}
                </div>`
                : ""}

            ${detalle
                ? `<div class="evento-resultado-detalle">${escapar(detalle)}</div>`
                : ""}

            ${eliminaciones.length
                ? `<div class="evento-eliminaciones">
                    <strong>ELIMINACIONES:</strong>
                    <ul>${eliminaciones.map(e => {
                        if (typeof e === "string") return `<li>${escapar(e)}</li>`;

                        const eliminado = e.eliminado || e.eliminadoId ||
                            e.wrestlerId || e.name || "Participante";
                        const por = e.por || e.eliminador ||
                            e.eliminadorId || "";

                        return `<li>${escapar(eliminado)}${
                            por ? ` — eliminado por ${escapar(por)}` : ""
                        }</li>`;
                    }).join("")}</ul>
                </div>`
                : ""}
        </div>`;
    }

    function renderizarCombate(combate, indice) {
        const lados = normalizarLados(combate);
        const titulo = obtenerDatosTitulo(combate);
        const tipo = texto(combate.tipo || combate.formato, "Combate");
        const estipulacion = texto(combate.estipulacion || combate.stipulation);
        const cantidadParticipantes = lados.reduce(
            (total, lado) => total + lado.participantes.length, 0
        );

        const esMultitudinario =
            /royal rumble|battle royal|battle royale/i.test(tipo + " " + estipulacion);

        const clases = [
            "evento-combate",
            esMultitudinario ? "evento-combate-multitudinario" : ""
        ].filter(Boolean).join(" ");

        return `<article
            class="${clases}"
            data-combate-id="${escapar(combate.id || `combate-${indice + 1}`)}"
            data-cantidad-lados="${lados.length}"
            data-cantidad-participantes="${cantidadParticipantes}"
        >
            <header class="evento-combate-encabezado">
                <span class="evento-combate-numero">
                    COMBATE ${String(indice + 1).padStart(2, "0")}
                </span>
                <span class="evento-combate-tipo">${escapar(tipo)}</span>
            </header>

            ${titulo.nombre
                ? `<div
                    class="evento-combate-titulo"
                    ${titulo.color
                        ? `style="--evento-titulo-color:${escapar(titulo.color)}"`
                        : ""}
                >
                    <span class="evento-combate-titulo-etiqueta">
                        CAMPEONATO EN JUEGO
                    </span>
                    <strong>${escapar(titulo.nombre)}</strong>
                </div>`
                : ""}

            ${estipulacion
                ? `<div class="evento-combate-estipulacion">
                    ${escapar(estipulacion)}
                </div>`
                : ""}

            <div class="evento-combate-lados">
                ${lados.map((lado, i) =>
                    renderizarLado(lado, i, lados.length)
                ).join("")}
            </div>

            ${renderizarResultado(combate.resultado, lados)}
        </article>`;
    }

    function renderizarDetalle(evento, contenedor) {
        if (!evento || !contenedor) return;

        const combates = lista(evento.combates || evento.matches);
        const fecha = texto(evento.fecha, "Fecha no anunciada");
        const poster = texto(evento.poster);
        const descripcion = texto(evento.descripcion);

        contenedor.innerHTML = `<section class="evento-detalle">
            <header class="evento-detalle-header">
                ${poster
                    ? `<div class="evento-detalle-poster">
                        <img
                            src="${escapar(poster)}"
                            alt="Póster de ${escapar(evento.nombre || "evento")}"
                            loading="lazy"
                            decoding="async"
                            onerror="this.onerror=null;this.style.display='none';"
                        >
                    </div>`
                    : ""}

                <div class="evento-detalle-info">
                    <div class="evento-detalle-fecha">${escapar(fecha)}</div>
                    <h2 class="evento-detalle-titulo">
                        ${escapar(evento.nombre || "Evento GPW")}
                    </h2>
                    ${descripcion
                        ? `<p class="evento-detalle-descripcion">${escapar(descripcion)}</p>`
                        : ""}
                    <div class="evento-detalle-total">
                        ${combates.length}
                        COMBATE${combates.length === 1 ? "" : "S"}
                    </div>
                </div>
            </header>

            <section class="evento-combates">
                ${combates.length
                    ? combates.map(renderizarCombate).join("")
                    : `<div class="eventos-empty">Todavía no hay combates cargados.</div>`
                }
            </section>
        </section>`;
    }

    window.GPW_RENDERIZAR_DETALLE = renderizarDetalle;
})();
