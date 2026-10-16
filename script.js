/* ==========================================================
   GALAXY PRO WRESTLING (GPW) - SCRIPT UNIFICADO
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // ======================================================
    // 1. INYECCIÓN DEL MENÚ EN PÁGINAS SECUNDARIAS
    // ======================================================
    const headerElement = document.querySelector(".main-header");

    if (headerElement) {
        // Inyecta el logo.webp, el botón hamburguesa y el menú desplegable
        headerElement.innerHTML = `
            <div class="logo-area">
                <a href="index.html">
                    <img src="logo.webp" alt="Galaxy Pro Wrestling Logo" class="site-logo">
                </a>
            </div>

            <!-- Botón Hamburguesa Mobile -->
            <button class="menu-toggle" id="menuButton" aria-label="Abrir menú">
                <i class="fa-solid fa-bars"></i>
            </button>

            <!-- Menú Desplegable -->
            <nav class="main-nav" id="mainNav">
                <a href="index.html"><i class="fa-solid fa-house"></i> Inicio</a>
                <a href="noticias.html"><i class="fa-solid fa-newspaper"></i> Noticias</a>
                <a href="luchadores.html"><i class="fa-solid fa-user-ninja"></i> Roster</a>
                <a href="alumni.html"><i class="fa-solid fa-user-clock"></i> Alumni</a>
                
                <a href="eventos.html"><i class="fa-solid fa-calendar-days"></i> Eventos</a>
                <a href="campeonatos.html"><i class="fa-solid fa-trophy"></i> Campeonatos</a>
                <a href="rankings.html"><i class="fa-solid fa-ranking-star"></i> Rankings</a>
            
                <a href="reglas.html"><i class="fa-solid fa-book"></i> Reglas</a>
                <a href="estipulaciones.html"><i class="fa-solid fa-bolt"></i> Estipulaciones</a>
            </nav>
        `;

        // Marca el enlace de la página en la que estás parado
        const currentPage = window.location.pathname.split("/").pop() || "index.html";
        const navLinks = headerElement.querySelectorAll(".main-nav a");

        navLinks.forEach(link => {
            if (link.getAttribute("href") === currentPage) {
                link.classList.add("active");
            }
        });

        // Lógica para abrir/cerrar el menú en celulares
        const menuButton = document.getElementById("menuButton");
        const nav = document.getElementById("mainNav");

        if (menuButton && nav) {
            menuButton.addEventListener("click", (e) => {
                e.stopPropagation();
                nav.classList.toggle("active");
            });

            document.addEventListener("click", (e) => {
                if (!nav.contains(e.target) && !menuButton.contains(e.target)) {
                    nav.classList.remove("active");
                }
            });
        }
    }

    // ======================================================
    // 2. ROTACIÓN AUTOMÁTICA DE NOTICIAS DESTACADAS (INDEX)
    // ======================================================
    const newsItems = document.querySelectorAll('.news-item');
    if (newsItems.length > 0) {
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

});
