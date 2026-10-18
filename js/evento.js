
/* =========================================
   GALAXY PRO WRESTLING — DETALLE DE EVENTOS
   Presentaciones, combates y resultados
   ========================================= */
(() => {
    "use strict";

    const $ = (selector, root = document) => root.querySelector(selector);
    const texto = (valor, fallback = "") => valor == null || valor === "" ? fallback : String(valor);
    const escapar = valor => String(valor ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
    const lista = valor => Array.isArray(valor) ? valor : valor == null ? [] : [valor];

    function obtenerRoster() {
        if (Array.isArray(window.GPW_WRESTLERS)) return window.GPW_WRESTLERS;
        if (typeof wrestlers !== "undefined" && Array.isArray(wrestlers)) return wrestlers;
        return [];
    }

    function buscarLuchador(id) {
        return obtenerRoster().find(l => String(l.id || l.name || "").toLowerCase() === String(id || "").toLowerCase()) || null;
    }

    function obtenerPresentacion(referencia) {
        if (typeof referencia === "string") referencia = {wrestlerId: referencia};
        referencia = referencia || {};
        const luchador = buscarLuchador(referencia.wrestlerId || referencia.id || referencia.name);
        if (!luchador) {
            return {
                id: referencia.presentationId || "",
                wrestlerId: referencia.wrestlerId || referencia.id || "",
                name: referencia.name || referencia.nombre || referencia.wrestlerId || "Luchador desconocido",
                nickname: "",
                image: referencia.image || "",
                interpreter: "",
                encontrado: false
            };
        }

        const presentaciones = luchador.presentations || {};
        const pid = referencia.presentationId || luchador.rosterPresentation || "default";
        const presentacion = presentaciones[pid] || presentaciones.default || null;
        const esBase = !presentacion;
        const datos = presentacion || luchador;

        return {
            id: pid,
            wrestlerId: luchador.id || luchador.name,
            name: datos.name || datos.nombre || luchador.name || "Luchador",
            nickname: datos.nickname || luchador.nickname || "",
            image: datos.image || luchador.image || "",
            interpreter: datos.interpreter || luchador.interpreter || "",
            type: datos.type || "normal",
            encontrado: true,
            base: esBase
        };
    }

    function imagenLuchador(referencia) {
        const p = obtenerPresentacion(referencia);
        const imagen = p.image
            ? `<img src="${escapar(p.image)}" alt="${escapar(p.name)}" loading="lazy" decoding="async" onerror="this.onerror=null;this.style.display='none';">`
            : `<div class="evento-imagen-vacia">SIN IMAGEN</div>`;

        return `<div class="evento-luchador-imagen">${imagen}</div>`;
    }

    function normalizarLados(combate) {
        if (Array.isArray(combate.lados) && combate.lados.length) {
            return combate.lados.map((lado, i) => ({
                id: String(lado.id || `lado-${i + 1}`),
                nombre: lado.nombre || lado.name || "",
                participantes: lista(lado.participantes || lado.miembros).map(p =>
                    typeof p === "string" ? {wrestlerId: p} : p
                )
            }));
        }

        const participantes = lista(combate.participantes).map(p =>
            typeof p === "string" ? {name: p} : p
        );

        return participantes.map((p, i) => ({
            id: String(p.sideId || p.ladoId || `lado-${i + 1}`),
            nombre: p.sideName || p.lado || "",
            participantes: [p]
        }));
    }

    function resolverNombreParticipante(p) {
        if (p.name || p.nombre) {
            const roster = buscarLuchador(p.wrestlerId || p.id);
            if (roster) {
                const presentacion = obtenerPresentacion(p);
                return presentacion.name;
            }
            return p.name || p.nombre;
        }
        return obtenerPresentacion(p).name;
    }

    function renderizarLado(lado) {
        const participantes = lado.participantes || [];
        const nombreLado = lado.nombre
            ? `<div class="evento-equipo-nombre">${escapar(lado.nombre)}</div>`
            : "";

        return `<div class="evento-lado" data-lado-id="${escapar(lado.id)}">
            ${nombreLado}
            <div class="evento-participantes">
                ${participantes.map(p => {
                    const datos = obtenerPresentacion(p);
                    return `<div class="evento-luchador" data-wrestler-id="${escapar(datos.wrestlerId)}" data-presentation-id="${escapar(datos.id)}">
                        ${imagenLuchador(p)}
                        <div class="evento-luchador-info">
                            <div class="evento-luchador-nombre">${escapar(datos.name)}</div>
                            ${datos.nickname ? `<div class="evento-luchador-apodo">${escapar(datos.nickname)}</div>` : ""}
                        </div>
                    </div>`;
                }).join("")}
            </div>
        </div>`;
    }

    function normalizarGanadores(resultado) {
        if (!resultado) return [];
        return lista(resultado.ganadores || resultado.winners || resultado.ganador || resultado.winner)
            .map(g => typeof g === "object" ? String(g.id || g.sideId || g.wrestlerId || g.name || "") : String(g));
    }

    function renderizarResultado(resultado, lados) {
        if (!resultado) return `<div class="evento-resultado">RESULTADO PENDIENTE</div>`;

        if (typeof resultado === "string") {
            return `<div class="evento-resultado">${escapar(resultado)}</div>`;
        }

        const tipo = texto(resultado.tipo || resultado.type, "Resultado");
        const metodo = texto(resultado.metodo || resultado.method);
        const detalle = texto(resultado.detalle || resultado.detail || resultado.descripcion);
        const ganadores = normalizarGanadores(resultado);

        const nombresGanadores = [];
        for (const lado of lados) {
            if (ganadores.includes(lado.id)) {
                nombresGanadores.push(lado.nombre || lado.participantes.map(resolverNombreParticipante).join(" / "));
            }
            for (const p of lado.participantes) {
                const datos = obtenerPresentacion(p);
                if (ganadores.includes(datos.wrestlerId) || ganadores.includes(datos.id)) {
                    nombresGanadores.push(datos.name);
                }
            }
        }

        const ganadorUnico = [...new Set(nombresGanadores)].join(" / ");
        const eliminaciones = lista(resultado.eliminaciones);
        const puntos = resultado.puntuacion || resultado.score || "";

        return `<div class="evento-resultado">
            <div class="evento-resultado-titulo">${escapar(tipo.replace(/[_-]/g, " ").toUpperCase())}</div>
            ${ganadorUnico ? `<div class="evento-ganador"><strong>GANADOR:</strong> ${escapar(ganadorUnico)}</div>` : ""}
            ${metodo ? `<div class="evento-resultado-metodo"><strong>MÉTODO:</strong> ${escapar(metodo)}</div>` : ""}
            ${puntos ? `<div class="evento-resultado-puntuacion"><strong>MARCADOR:</strong> ${escapar(typeof puntos === "object" ? JSON.stringify(puntos) : puntos)}</div>` : ""}
            ${detalle ? `<div class="evento-resultado-detalle">${escapar(detalle)}</div>` : ""}
            ${eliminaciones.length ? `<div class="evento-eliminaciones"><strong>ELIMINACIONES:</strong><ul>${eliminaciones.map(e => {
                if (typeof e === "string") return `<li>${escapar(e)}</li>`;
                const eliminado = e.eliminado || e.eliminadoId || e.wrestlerId || e.name || "Participante";
                const por = e.por || e.eliminador || e.eliminadorId || "";
                return `<li>${escapar(eliminado)}${por ? ` — eliminado por ${escapar(por)}` : ""}</li>`;
            }).join("")}</ul></div>` : ""}
        </div>`;
    }

    function renderizarCombate(combate, indice) {
        const lados = normalizarLados(combate);
        const titulo = texto(combate.titulo || combate.campeonato);
        const estipulacion = texto(combate.estipulacion || combate.stipulation);
        const tipo = texto(combate.tipo || combate.formato, "Combate");
        const separador = lados.length > 2 ? "VS" : "VS";

        return `<article class="evento-combate" data-combate-id="${escapar(combate.id || `combate-${indice + 1}`)}">
            <div class="evento-combate-encabezado">
                <span class="evento-combate-numero">COMBATE ${indice + 1}</span>
                <span class="evento-combate-tipo">${escapar(tipo)}</span>
            </div>
            ${titulo ? `<div class="evento-combate-titulo">${escapar(titulo)}</div>` : ""}
            ${estipulacion ? `<div class="evento-combate-estipulacion">${escapar(estipulacion)}</div>` : ""}
            <div class="evento-combate-lados">
                ${lados.map((lado, i) => `${i ? `<div class="evento-vs">${escapar(separador)}</div>` : ""}${renderizarLado(lado)}`).join("")}
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
                ${poster ? `<div class="evento-detalle-poster"><img src="${escapar(poster)}" alt="Póster de ${escapar(evento.nombre || "evento")}" loading="lazy" decoding="async" onerror="this.onerror=null;this.style.display='none';"></div>` : ""}
                <div class="evento-detalle-info">
                    <div class="evento-detalle-fecha">${escapar(fecha)}</div>
                    <h2 class="evento-detalle-titulo">${escapar(evento.nombre || "Evento GPW")}</h2>
                    ${descripcion ? `<p class="evento-detalle-descripcion">${escapar(descripcion)}</p>` : ""}
                    <div class="evento-detalle-total">${combates.length} COMBATE${combates.length === 1 ? "" : "S"}</div>
                </div>
            </header>
            <section class="evento-combates">
                ${combates.length ? combates.map(renderizarCombate).join("") : `<div class="eventos-empty">Todavía no hay combates cargados.</div>`}
            </section>
        </section>`;
    }

    window.GPW_RENDERIZAR_DETALLE = renderizarDetalle;
})();
