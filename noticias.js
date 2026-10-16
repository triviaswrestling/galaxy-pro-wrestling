/* ==========================================================
   GALAXY PRO WRESTLING - SISTEMA DE NOTICIAS (NOTICIAS.JS)
   ========================================================== */

// 1. BASE DE DATOS DE NOTICIAS
// Agregá todas las noticias que quieras. Mantené la fecha en formato "YYYY-MM-DD" para ordenar.
const listaNoticias = [
    {
        id: 1,
        titulo: "¡Anunciado el Evento Principal para Galactic Clash!",
        categoria: "GPW CLASH 2026",
        resumen: "Los máximos exponentes del universo GPW se enfrentarán en una lucha sin precedentes por la gloria intergaláctica.",
        imagen: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop",
        fecha: "2026-10-15",
        link: "noticia.html?id=12"
    },
    {
        id: 11,
        titulo: "Nuevo Contendiente #1 al Campeonato Mundial",
        categoria: "CAMPEONATO MUNDIAL",
        resumen: "Tras una contienda brutal el pasado fin de semana, tenemos un nuevo retador oficial al cinturón de GPW.",
        imagen: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop",
        fecha: "2026-10-12",
        link: "noticia.html?id=11"
    },
    {
        id: 10,
        titulo: "Firma Estelar: Nueva Incorporación al Elenco",
        categoria: "ROSTER UPDATE",
        resumen: "Un reconocido talento de la escena independiente ha firmado un contrato exclusivo con Galaxy Pro Wrestling.",
        imagen: "https://images.unsplash.com/photo-1566393028674-d1912e42337d?w=800&auto=format&fit=crop",
        fecha: "2026-10-10",
        link: "noticia.html?id=10"
    }
    // Podés seguir agregando más noticias con sus IDs y fechas correspondientes
];

// 2. CONFIGURACIÓN DE PAGINACIÓN (10 NOTICIAS POR PÁGINA)
const NOTICIAS_POR_PAGINA = 10;
let paginaActual = 1;

function renderizarNoticias() {
    const newsGrid = document.getElementById("newsGrid");
    const pagination = document.getElementById("pagination");

    if (!newsGrid) return; // Si no está el contenedor en la página, no ejecuta

    // Ordenar noticias por fecha: las más recientes primero
    const noticiasOrdenadas = [...listaNoticias].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    // Cortar el listado de 10 en 10 según la página actual
    const inicio = (paginaActual - 1) * NOTICIAS_POR_PAGINA;
    const fin = inicio + NOTICIAS_POR_PAGINA;
    const noticiasPagina = noticiasOrdenadas.slice(inicio, fin);

    // Inyectar el HTML de las tarjetas
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

    // Generar botones numerados de paginación si supera las 10 noticias
    const totalPaginas = Math.ceil(noticiasOrdenadas.length / NOTICIAS_POR_PAGINA);
    
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

// Inicializar renderizado al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    renderizarNoticias();
});
      
