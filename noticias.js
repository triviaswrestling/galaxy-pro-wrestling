/* ==========================================================
   GALAXY PRO WRESTLING - SISTEMA DE NOTICIAS (NOTICIAS.JS)
   ========================================================== */

const NOTICIAS_POR_PAGINA = 10;
let paginaActual = 1;
let listaNoticiasGlobal = [];

function cargarNoticias() {
    const newsGrid = document.getElementById("newsGrid");
    if (!newsGrid) return;

    newsGrid.innerHTML = `<p style="color: #00e1ff; text-align: center; font-weight: 700; padding: 30px;">Cargando noticias...</p>`;

    // Lee el archivo índice generado automáticamente con todas las notas
    fetch("./notas/indice.json")
        .then(response => {
            if (!response.ok) throw new Error("No se pudo cargar el índice de noticias");
            return response.json();
        })
        .then(data => {
            listaNoticiasGlobal = data;
            renderizarNoticias();
        })
        .catch(() => {
            newsGrid.innerHTML = `<p style="color: #ff4444; text-align: center;">Error al cargar las noticias.</p>`;
        });
}

function renderizarNoticias() {
    const newsGrid = document.getElementById("newsGrid");
    const pagination = document.getElementById("pagination");

    if (!newsGrid) return;

    // Cortar el listado de 10 en 10 según la página actual
    const inicio = (paginaActual - 1) * NOTICIAS_POR_PAGINA;
    const fin = inicio + NOTICIAS_POR_PAGINA;
    const noticiasPagina = listaNoticiasGlobal.slice(inicio, fin);

    if (noticiasPagina.length === 0) {
        newsGrid.innerHTML = `<p style="color: #888; text-align: center;">No hay noticias disponibles.</p>`;
        return;
    }

    // Inyectar el HTML de las tarjetas en la grilla
    newsGrid.innerHTML = noticiasPagina.map(noticia => `
        <article class="news-card">
            <div class="news-card-image">
                <img src="${noticia.imagen}" alt="${noticia.titulo}" loading="lazy">
                <span class="news-badge">${noticia.categoria}</span>
            </div>
            <div class="news-card-body">
                <h3>${noticia.titulo}</h3>
                <p>${noticia.resumen}</p>
                <a href="${noticia.link}" class="read-more-btn">LEER MÁS <i class="fa-solid fa-chevron-right"></i></a>
            </div>
        </article>
    `).join("");

    // Generar botones numerados de paginación
    const totalPaginas = Math.ceil(listaNoticiasGlobal.length / NOTICIAS_POR_PAGINA);
    
    if (totalPaginas > 1 && pagination) {
        let botonesHTML = "";
        for (let i = 1; i <= totalPaginas; i++) {
            botonesHTML += `
                <button class="page-btn ${i === paginaActual ? 'active' : ''}" onclick="cambiarPagina(${i})">
                    ${i}
                </button>
            `;
        }
        pagination.innerHTML = botonesHTML;
    } else if (pagination) {
        pagination.innerHTML = "";
    }
}

// Función global para saltar de página y subir al inicio suavemente
window.cambiarPagina = function(nuevaPagina) {
    paginaActual = nuevaPagina;
    renderizarNoticias();
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Inicializar al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    cargarNoticias();
});
