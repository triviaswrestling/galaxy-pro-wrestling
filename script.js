/* ==========================================================
   GALAXY PRO WRESTLING (GPW) - NAVEGACIÓN (PÁGINAS INTERNAS)
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const headerElement = document.querySelector(".main-header");

    if (headerElement) {
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

        // Marca el enlace activo según la página actual
        const currentPage = window.location.pathname.split("/").pop() || "index.html";
        const navLinks = headerElement.querySelectorAll(".main-nav a");

        navLinks.forEach(link => {
            if (link.getAttribute("href") === currentPage) {
                link.classList.add("active");
            }
        });

        // Lógica para abrir/cerrar el menú hamburguesa en celulares
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
});
