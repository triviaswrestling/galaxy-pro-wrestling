// ROTACIÓN AUTOMÁTICA DE NOTICIAS DESTACADAS (SHOWCASE ESTILO WWE/TNA)
document.addEventListener('DOMContentLoaded', () => {
    const newsItems = document.querySelectorAll('.news-item');
    if (!newsItems.length) return;

    let currentIndex = 0;

    setInterval(() => {
        // Oculta la noticia actual
        newsItems[currentIndex].classList.remove('active');

        // Pasa a la siguiente (vuelve a 0 al llegar al final)
        currentIndex = (currentIndex + 1) % newsItems.length;

        // Muestra la nueva noticia
        newsItems[currentIndex].classList.add('active');
    }, 5000); // Cambia de noticia cada 5 segundos
});
