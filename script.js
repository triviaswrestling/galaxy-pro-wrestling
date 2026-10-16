/* ==========================================================
   GALAXY PRO WRESTLING (GPW) - NAVEGACIÓN EN PÁGINAS INTERNAS
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const headerElement = document.querySelector(".main-header");

    if (headerElement) {
        // Inyecta el logo, el botón hamburguesa y el menú desplegable
        headerElement.innerHTML = `
            <div class="logo-area">
                <a href="index.html">
                    <img src="logo.webp" alt="Galaxy Pro Wrestling Logo" class="site-logo">
                </a>
            </div>

            <button class="menu-toggle" id="menuButton" aria-label="Abrir menú">
                <i class="fa-solid fa-bars"></i>
            </button>

            <nav class="main-nav" id="mainNav">
                <a href="index.html">INICIO</a>
                <a href="noticias.html">NOTICIAS</a>
                <a href="luchadores.html">ROSTER</a>
                <a href="alumni.html">ALUMNI</a>
                <a href="eventos.html">EVENTOS</a>
                <a href="campeonatos.html">CAMPEONATOS</a>
                <a href="rankings.html">RANKINGS</a>
                <a href="reglas.html">REGLAS</a>
                <a href="estipulaciones.html">ESTIPULACIONES</a>
            </nav>
        `;

        // Marcar enlace activo según la página actual
        const currentPage = window.location.pathname.split("/").pop() || "index.html";
        const navLinks = headerElement.querySelectorAll(".main-nav a");

        navLinks.forEach(link => {
            if (link.getAttribute("href") === currentPage) {
                link.classList.add("active");
            }
        });

        // Abrir y cerrar el menú hamburguesa
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
