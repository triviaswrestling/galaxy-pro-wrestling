
/* =========================================
   GALAXY PRO WRESTLING
   ARCHIVO DE EVENTOS — NAVEGACIÓN
   ========================================= */

(() => {
    "use strict";

    const cargarArchivos = new Map();
    let temporadaActual = null;
    let eventosActuales = [];

    document.addEventListener("DOMContentLoaded", iniciar);

    function iniciar() {
        const ids = [
            "temporadas-view",
            "eventos-view",
            "evento-detalle-view",
            "temporadas-grid",
            "eventos-grid",
            "evento-detalle",
            "temporada-titulo",
            "temporada-descripcion",
            "volver-temporadas",
            "volver-eventos"
        ];

        const elementos = {};

        for (const id of ids) {
            elementos[id] = document.getElementById(id);

            if (!elementos[id]) {
                console.error(
                    `[GPW Eventos] No se encontró el elemento #${id}.`
                );
                return;
            }
        }

        const {
            "temporadas-view": vistaTemporadas,
            "eventos-view": vistaEventos,
            "evento-detalle-view": vistaDetalle,
            "temporadas-grid": gridTemporadas,
            "eventos-grid": gridEventos,
            "evento-detalle": contenedorDetalle,
            "temporada-titulo": tituloTemporada,
            "temporada-descripcion": descripcionTemporada,
            "volver-temporadas": botonVolverTemporadas,
            "volver-eventos": botonVolverEventos
        } = elementos;

        function mostrarVista(nombre) {
            vistaTemporadas.hidden = nombre !== "temporadas";
            vistaEventos.hidden = nombre !== "eventos";
            vistaDetalle.hidden = nombre !== "detalle";

            window.scrollTo(0, 0);
        }

        function mostrarMensaje(contenedor, mensaje, clase) {
            contenedor.replaceChildren();

            const texto = document.createElement("p");
            texto.className = clase || "eventos-empty";
            texto.textContent = mensaje;

            contenedor.appendChild(texto);
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

        function crearTarjeta({
            clase,
            titulo,
            descripcion,
            imagen,
            claseImagen,
            alAbrir
        }) {
            const tarjeta = document.createElement("article");
            tarjeta.className = clase;
            tarjeta.tabIndex = 0;
            tarjeta.setAttribute("role", "button");

            tarjeta.setAttribute(
                "aria-label",
                `Abrir ${titulo}`
            );

            const img = crearImagen(
                imagen,
                claseImagen,
                titulo
            );

            if (img) {
                tarjeta.appendChild(img);
            }

            const informacion = document.createElement("div");

            informacion.className =
                clase === "temporada-card"
                    ? "temporada-card-info"
                    : "evento-card-info";

            const encabezado = document.createElement("h3");
            encabezado.textContent = titulo;
            informacion.appendChild(encabezado);

            if (descripcion) {
                const texto = document.createElement("p");
                texto.textContent = descripcion;
                informacion.appendChild(texto);
            }

            tarjeta.appendChild(informacion);

            tarjeta.addEventListener("click", alAbrir);

            tarjeta.addEventListener("keydown", (evento) => {
                if (
                    evento.key === "Enter" ||
                    evento.key === " "
                ) {
                    evento.preventDefault();
                    alAbrir();
                }
            });

            return tarjeta;
        }

        function obtenerTemporadas() {
            const catalogo = window.GPW_TEMPORADAS;

            if (!Array.isArray(catalogo)) {
                throw new Error(
                    "No se encontró el índice GPW_TEMPORADAS."
                );
            }

            return catalogo;
        }

        function renderizarTemporadas() {
            let temporadas;

            try {
                temporadas = obtenerTemporadas();
            } catch (error) {
                console.error(error);

                mostrarMensaje(
                    gridTemporadas,
                    "NO SE PUDO CARGAR EL CATÁLOGO DE TEMPORADAS.",
                    "eventos-error"
                );
                return;
            }

            gridTemporadas.replaceChildren();

            if (temporadas.length === 0) {
                mostrarMensaje(
                    gridTemporadas,
                    "TODAVÍA NO HAY TEMPORADAS CARGADAS.",
                    "eventos-empty"
                );
                return;
            }

            temporadas.forEach((temporada) => {
                const tarjeta = crearTarjeta({
                    clase: "temporada-card",
                    titulo: temporada.nombre,
                    descripcion: temporada.descripcion,
                    imagen: temporada.imagen,
                    claseImagen: "temporada-card-image",
                    alAbrir: () => abrirTemporada(temporada)
                });

                gridTemporadas.appendChild(tarjeta);
            });
        }

        function cargarArchivoTemporada(temporada) {
            if (!temporada.archivo) {
                return Promise.reject(
                    new Error(
                        `La temporada "${temporada.nombre}" no tiene archivo asignado.`
                    )
                );
            }

            const ruta = temporada.archivo;

            if (cargarArchivos.has(ruta)) {
                return cargarArchivos.get(ruta);
            }

            const promesa = new Promise((resolve, reject) => {
                const script = document.createElement("script");

                script.src = ruta;
                script.async = true;

                script.onload = () => resolve();
                script.onerror = () => {
                    reject(
                        new Error(`No se pudo cargar ${ruta}.`)
                    );
                };

                document.head.appendChild(script);
            });

            cargarArchivos.set(ruta, promesa);

            promesa.catch(() => {
                cargarArchivos.delete(ruta);
            });

            return promesa;
        }

        async function abrirTemporada(temporada) {
            temporadaActual = temporada;

            tituloTemporada.textContent = temporada.nombre;
            descripcionTemporada.textContent =
                temporada.descripcion || "";

            mostrarVista("eventos");

            mostrarMensaje(
                gridEventos,
                "CARGANDO EVENTOS...",
                "eventos-loading"
            );

            try {
                await cargarArchivoTemporada(temporada);

                const datos =
                    window.GPW_DATOS_TEMPORADAS &&
                    window.GPW_DATOS_TEMPORADAS[temporada.id];

                if (!datos || !Array.isArray(datos.eventos)) {
                    throw new Error(
                        `No se encontraron los eventos de ${temporada.nombre}.`
                    );
                }

                eventosActuales = [...datos.eventos];

                eventosActuales.sort((a, b) => {
                    const fechaA = Date.parse(a.fecha);
                    const fechaB = Date.parse(b.fecha);

                    const validaA = Number.isFinite(fechaA);
                    const validaB = Number.isFinite(fechaB);

                    if (!validaA && !validaB) return 0;
                    if (!validaA) return 1;
                    if (!validaB) return -1;

                    return fechaB - fechaA;
                });

                renderizarEventos();
            } catch (error) {
                console.error("[GPW Eventos]", error);

                mostrarMensaje(
                    gridEventos,
                    "NO SE PUDIERON CARGAR LOS EVENTOS. REVISÁ EL ARCHIVO DE ESTA TEMPORADA.",
                    "eventos-error"
                );
            }
        }

        function renderizarEventos() {
            gridEventos.replaceChildren();

            if (eventosActuales.length === 0) {
                mostrarMensaje(
                    gridEventos,
                    "ESTA TEMPORADA TODAVÍA NO TIENE EVENTOS.",
                    "eventos-empty"
                );
                return;
            }

            eventosActuales.forEach((evento) => {
                const tarjeta = crearTarjeta({
                    clase: "evento-card",
                    titulo: evento.nombre,
                    descripcion: evento.fecha || "Fecha por confirmar",
                    imagen: evento.poster,
                    claseImagen: "evento-card-poster",
                    alAbrir: () => abrirDetalle(evento)
                });

                gridEventos.appendChild(tarjeta);
            });
        }

        function abrirDetalle(evento) {
            const renderizarDetalle =
                window.GPW_RENDERIZAR_DETALLE;

            if (typeof renderizarDetalle !== "function") {
                console.error(
                    "[GPW Eventos] Falta cargar js/evento.js."
                );

                mostrarMensaje(
                    contenedorDetalle,
                    "EL SISTEMA DE DETALLE TODAVÍA NO ESTÁ DISPONIBLE.",
                    "eventos-error"
                );

                mostrarVista("detalle");
                return;
            }

            try {
                renderizarDetalle(evento, contenedorDetalle);
                mostrarVista("detalle");
            } catch (error) {
                console.error(
                    "[GPW Eventos] Error al mostrar el evento:",
                    error
                );

                mostrarMensaje(
                    contenedorDetalle,
                    "NO SE PUDO MOSTRAR ESTE EVENTO.",
                    "eventos-error"
                );

                mostrarVista("detalle");
            }
        }

        botonVolverTemporadas.addEventListener("click", () => {
            temporadaActual = null;
            eventosActuales = [];
            mostrarVista("temporadas");
        });

        botonVolverEventos.addEventListener("click", () => {
            if (temporadaActual) {
                mostrarVista("eventos");
            } else {
                mostrarVista("temporadas");
            }
        });

        renderizarTemporadas();
        mostrarVista("temporadas");
    }
})();
