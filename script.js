// ROTACIÓN AUTOMÁTICA DE NOTICIAS DESTACADAS (TIEMPO ADECUADO DE LECTURA: 7 SEGUNDOS)
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
    }, 7000); // 7000 milisegundos = 7 segundos exactos para leer con calma
});
