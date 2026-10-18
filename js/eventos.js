
/* =========================================
   GALAXY PRO WRESTLING
   SISTEMA DE ARCHIVO DE EVENTOS
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const temporadasView = document.getElementById("temporadas-view");
    const eventosView = document.getElementById("eventos-view");
    const detalleView = document.getElementById("evento-detalle-view");

    const temporadasGrid = document.getElementById("temporadas-grid");
    const eventosGrid = document.getElementById("eventos-grid");
    const detalleContenedor = document.getElementById("evento-detalle");

    const volverTemporadas = document.getElementById("volver-temporadas");
    const volverEventos = document.getElementById("volver-eventos");

    /*
     * CATÁLOGO INICIAL
     * Acá conectaremos las temporadas y los eventos reales de GPW.
     * No agregamos temporadas ficticias ni resultados inventados.
     */
    const temporadas = [];

    function mostrarVista(vistaActiva) {
        temporadasView.hidden = vistaActiva !== "temporadas";
        eventosView.hidden = vistaActiva !== "eventos";
        detalleView.hidden = vistaActiva !== "detalle";

        window.scrollTo({
            top: 0,
            behavior: "auto"
        });
    }

    function mostrarEstado(contenedor, mensaje, clase = "eventos-empty") {
        contenedor.replaceChildren();

        const texto = document.createElement("p");
        texto.className = clase;
        texto.textContent = mensaje;

        contenedor.appendChild(texto);
    }

    function renderizarTemporadas() {
        temporadasGrid.replaceChildren();

        if (temporadas.length === 0) {
            mostrarEstado(
                temporadasGrid,
                "EL ARCHIVO DE TEMPORADAS SE ESTÁ PREPARANDO."
            );
            return;
        }

        temporadas.forEach((temporada) => {
            const tarjeta = document.createElement("article");
            tarjeta.className = "temporada-card";

            const informacion = document.createElement("div");
            informacion.className = "temporada-card-info";

            const titulo = document.createElement("h3");
            titulo.textContent = temporada.nombre;

            const descripcion = document.createElement("p");
            descripcion.textContent = temporada.descripcion || "";

            informacion.append(titulo, descripcion);
            tarjeta.appendChild(informacion);

            tarjeta.tabIndex = 0;
            tarjeta.setAttribute("role", "button");
            tarjeta.setAttribute(
                "aria-label",
                `Abrir ${temporada.nombre}`
            );

            const abrir = () => renderizarEventos(temporada);

            tarjeta.addEventListener("click", abrir);
            tarjeta.addEventListener("keydown", (evento) => {
                if (evento.key === "Enter" || evento.key === " ") {
                    evento.preventDefault();
                    abrir();
                }
            });

            temporadasGrid.appendChild(tarjeta);
        });
    }

    function renderizarEventos(temporada) {
        document.getElementById("temporada-titulo").textContent =
            temporada.nombre;

        document.getElementById("temporada-descripcion").textContent =
            temporada.descripcion || "";

        eventosGrid.replaceChildren();

        if (!temporada.eventos || temporada.eventos.length === 0) {
            mostrarEstado(
                eventosGrid,
                "TODAVÍA NO HAY EVENTOS CARGADOS EN ESTA TEMPORADA."
            );
        } else {
            const eventosOrdenados = [...temporada.eventos].sort(
                (a, b) => new Date(b.fecha) - new Date(a.fecha)
            );

            eventosOrdenados.forEach((evento) => {
                const tarjeta = document.createElement("article");
                tarjeta.className = "evento-card";

                const informacion = document.createElement("div");
                informacion.className = "evento-card-info";

                const titulo = document.createElement("h3");
                titulo.textContent = evento.nombre;

                const fecha = document.createElement("p");
                fecha.textContent = evento.fecha || "Fecha por confirmar";

                informacion.append(titulo, fecha);
                tarjeta.appendChild(informacion);

                tarjeta.tabIndex = 0;
                tarjeta.setAttribute("role", "button");

                const abrir = () => renderizarDetalle(evento);

                tarjeta.addEventListener("click", abrir);
                tarjeta.addEventListener("keydown", (tecla) => {
                    if (tecla.key === "Enter" || tecla.key === " ") {
                        tecla.preventDefault();
                        abrir();
                    }
                });

                eventosGrid.appendChild(tarjeta);
            });
        }

        mostrarVista("eventos");
    }

    function renderizarDetalle(evento) {
        detalleContenedor.replaceChildren();

        const encabezado = document.createElement("header");
        encabezado.className = "evento-detalle-header";

        const titulo = document.createElement("h1");
        titulo.textContent = evento.nombre;

        const fecha = document.createElement("p");
        fecha.textContent = evento.fecha || "Fecha por confirmar";

        encabezado.append(titulo, fecha);
        detalleContenedor.appendChild(encabezado);

        const combates = document.createElement("section");
        combates.className = "evento-combates";

        const tituloCombates = document.createElement("h2");
        tituloCombates.textContent = "CARTELERA Y RESULTADOS";
        combates.appendChild(tituloCombates);

        if (!evento.combates || evento.combates.length === 0) {
            mostrarEstado(
                combates,
                "LOS COMBATES DE ESTE EVENTO TODAVÍA NO ESTÁN CARGADOS."
            );
        } else {
            evento.combates.forEach((combate) => {
                const tarjeta = document.createElement("article");
                tarjeta.className = "evento-combate";

                const participantes = document.createElement("p");
                participantes.textContent =
                    combate.participantes || "Participantes por confirmar";

                tarjeta.appendChild(participantes);

                if (combate.resultado) {
                    const resultado = document.createElement("p");
                    resultado.className = "evento-resultado";
                    resultado.textContent = combate.resultado;
                    tarjeta.appendChild(resultado);
                }

                combates.appendChild(tarjeta);
            });
        }

        detalleContenedor.appendChild(combates);
        mostrarVista("detalle");
    }

    volverTemporadas.addEventListener("click", () => {
        mostrarVista("temporadas");
    });

    volverEventos.addEventListener("click", () => {
        mostrarVista("eventos");
    });

    renderizarTemporadas();
    mostrarVista("temporadas");
});
