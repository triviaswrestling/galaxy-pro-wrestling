/* ==========================================================
   GALAXY PRO WRESTLING (GPW) - DINÁMICA DE INICIO Y SLIDER (INDEX.JS)
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const showcaseContainer = document.querySelector(".news-showcase-card");
    if (!showcaseContainer) return;

    showcaseContainer.innerHTML = `<p style="color: #00e1ff; text-align: center; font-weight: 700; padding: 20px;">Cargando últimas noticias...</p>`;

    // 1. Cargar el índice dinámicamente
    fetch("./notas/indice.json")
        .then(response => {
            if (!response.ok) throw new Error("No se pudo cargar el showcase");
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data) || data.length === 0) {
                showcaseContainer.innerHTML = `<p style="color: #888; text-align: center;">No hay noticias recientes.</p>`;
                return;
            }

            // Tomamos las primeras 5 notas más recientes
            const ultimasNotas = data.slice(0, 5);
            let htmlCards = "";

            ultimasNotas.forEach((nota, index) => {
                // La primera noticia arranca activa para el slider
                const claseActiva = index === 0 ? "news-item active" : "news-item";

                htmlCards += `
                    <article class="${claseActiva}">
                        <div class="news-image-wrapper">
                            <img src="${nota.imagen}" alt="${nota.titulo}">
                            <div class="image-overlay"></div>
                        </div>
                        <div class="news-content-box">
                            <span class="news-badge">${nota.categoria}</span>
                            <h4 class="news-heading">${nota.titulo}</h4>
                            <p class="news-excerpt">${nota.resumen}</p>
                            <a href="noticia.html?id=${nota.id}" class="news-btn">LEER MÁS <i class="fa-solid fa-chevron-right"></i></a>
                        </div>
                    </article>
                `;
            });

            // Inyectamos las tarjetas en el contenedor
            showcaseContainer.innerHTML = htmlCards;

            // 2. INICIAR LA ROTACIÓN AUTOMÁTICA DEL SLIDER
            iniciarSlider();
        })
        .catch(() => {
            showcaseContainer.innerHTML = `<p style="color: #ff4444; text-align: center;">Error al cargar el showcase.</p>`;
        });
});

// Función de rotación que pusiste en marcha
function iniciarSlider() {
    const newsItems = document.querySelectorAll('.news-item');

    if (newsItems.length > 1) { // Solo rota si hay más de una noticia
        let currentIndex = 0;

        setInterval(() => {
            // Oculta la noticia actual
            newsItems[currentIndex].classList.remove('active');

            // Pasa a la siguiente (vuelve a 0 al llegar al final)
            currentIndex = (currentIndex + 1) % newsItems.length;

            // Muestra la nueva noticia
            newsItems[currentIndex].classList.add('active');
        }, 7000); // 7 segundos exactos por noticia
    }
}
