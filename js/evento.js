
/* =========================================
   GALAXY PRO WRESTLING
   DETALLE DE EVENTOS
   ========================================= */

(() => {
    "use strict";

    function crearElemento(etiqueta, clase, contenido) {
        const elemento = document.createElement(etiqueta);

        if (clase) {
            elemento.className = clase;
        }

        if (contenido !== undefined && contenido !== null) {
            elemento.textContent = contenido;
        }

        return elemento;
    }

    function crearImagen(ruta, clase, descripcion) {
        if (!ruta) return null;

        const imagen = document.createElement("img");
        imagen.className = clase;
        imagen.src = ruta;
        imagen.alt = descripcion || "";
        imagen.loading = "lazy";
        imagen.decoding = "async";

        imagen.addEventListener("error", () => {
            imagen.remove();
        }, { once: true });

        return imagen;
    }

    function obtenerNombreParticipante(participante) {
        if (typeof participante === "string") {
            return participante;
        }

        if (participante && typeof participante === "object") {
            return participante.nombre ||
                participante.wrestlerId ||
                "Participante por confirmar";
        }

        return "Participante por confirmar";
    }

    function renderizarParticipantes(combate, tarjeta) {
        const participantes = Array.isArray(combate.participantes)
            ? combate.participantes
            : [];

        const lista = crearElemento(
            "div",
            "evento-participantes"
        );

        if (participantes.length === 0) {
            lista.appendChild(
                crearElemento(
                    "p",
                    "",
                    "Participantes por confirmar"
                )
            );
        } else {
            participantes.forEach((participante) => {
                const nombre = obtenerNombreParticipante(participante);

                lista.appendChild(
                    crearElemento("span", "evento-luchador", nombre)
                );
            });
        }

        tarjeta.appendChild(lista);
    }

    function renderizarCombate(combate, indice) {
        const tarjeta = crearElemento(
            "article",
            "evento-combate"
        );

        const numero = crearElemento(
            "span",
            "evento-combate-numero",
            `COMBATE ${indice + 1}`
        );

        tarjeta.appendChild(numero);

        if (combate.tipo) {
            tarjeta.appendChild(
                crearElemento(
                    "p",
                    "evento-combate-tipo",
                    combate.tipo
                )
            );
        }

        renderizarParticipantes(combate, tarjeta);

        if (combate.titulo) {
            tarjeta.appendChild(
                crearElemento(
                    "p",
                    "evento-combate-titulo",
                    combate.titulo
                )
            );
        }

        if (combate.resultado) {
            tarjeta.appendChild(
                crearElemento(
                    "p",
                    "evento-resultado",
                    combate.resultado
                )
            );
        } else {
            tarjeta.appendChild(
                crearElemento(
                    "p",
                    "evento-resultado pendiente",
                    "RESULTADO PENDIENTE"
                )
            );
        }

        return tarjeta;
    }

    function renderizarDetalle(evento, contenedor) {
        if (!evento || typeof evento !== "object") {
            throw new Error("Los datos del evento no son válidos.");
        }

        contenedor.replaceChildren();

        const detalle = crearElemento(
            "article",
            "evento-detalle"
        );

        const encabezado = crearElemento(
            "header",
            "evento-detalle-header"
        );

        if (evento.poster) {
            const poster = crearImagen(
                evento.poster,
                "evento-detalle-poster",
                `Póster de ${evento.nombre || "evento GPW"}`
            );

            if (poster) {
                encabezado.appendChild(poster);
            }
        }

        const informacion = crearElemento(
            "div",
            "evento-detalle-info"
        );

        informacion.appendChild(
            crearElemento(
                "p",
                "evento-detalle-etiqueta",
                "GALAXY PRO WRESTLING PRESENTA"
            )
        );

        informacion.appendChild(
            crearElemento(
                "h1",
                "evento-detalle-titulo",
                evento.nombre || "Evento sin título"
            )
        );

        if (evento.fecha) {
            informacion.appendChild(
                crearElemento(
                    "p",
                    "evento-detalle-fecha",
                    evento.fecha
                )
            );
        }

        if (evento.descripcion) {
            informacion.appendChild(
                crearElemento(
                    "p",
                    "evento-detalle-descripcion",
                    evento.descripcion
                )
            );
        }

        encabezado.appendChild(informacion);
        detalle.appendChild(encabezado);

        const seccionCombates = crearElemento(
            "section",
            "evento-combates"
        );

        seccionCombates.appendChild(
            crearElemento(
                "h2",
                "",
                "CARTELERA Y RESULTADOS"
            )
        );

        const combates = Array.isArray(evento.combates)
            ? evento.combates
            : [];

        if (combates.length === 0) {
            seccionCombates.appendChild(
                crearElemento(
                    "p",
                    "eventos-empty",
                    "LA CARTELERA TODAVÍA NO ESTÁ CARGADA."
                )
            );
        } else {
            combates.forEach((combate, indice) => {
                seccionCombates.appendChild(
                    renderizarCombate(combate, indice)
                );
            });
        }

        detalle.appendChild(seccionCombates);
        contenedor.appendChild(detalle);
    }

    window.GPW_RENDERIZAR_DETALLE = renderizarDetalle;
})();
