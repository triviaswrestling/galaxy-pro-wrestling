/* =========================================
   ESTILOS GENERALES - GALAXY PRO WRESTLING
   ========================================= */
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    background: #0b0b0b;
    color: #ffffff;
    font-family: Arial, sans-serif;
}

body.modal-open {
    overflow: hidden;
}

/* =========================================
   CONTENEDOR PRINCIPAL Y DIVISIONES DE ROSTER
   ========================================= */
main {
    padding: 30px 15px;
    background: #0b0b0b;
    max-width: 1200px;
    margin: 0 auto;
}

main > h1 {
    margin: 0 0 30px;
    color: #eeeeee;
    font-size: 36px;
    font-weight: 900;
    text-align: center;
    letter-spacing: 2px;
    text-transform: uppercase;
}

/* Estructura de la grilla: 2 columnas en celular, 5 en PC */
.roster {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-bottom: 40px;
}

@media (min-width: 768px) {
    .roster {
        grid-template-columns: repeat(5, 1fr);
        gap: 18px;
    }
}

/* =========================================
   TARJETA DE LUCHADOR (WRESTLER CARD)
   ========================================= */
.wrestler {
    position: relative;
    background: #151515;
    border: 1px solid #333333;
    border-top: 3px solid #00bfff;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    text-align: center;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.65);
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.wrestler:hover {
    transform: translateY(-4px) scale(1.03);
    border-color: #00bfff;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.9), 0 0 25px rgba(0, 191, 255, 0.3);
}

.wrestler img {
    width: 100%;
    height: auto;
    display: block;
    border-bottom: 2px solid #292929;
    aspect-ratio: 4 / 5;
    object-fit: cover;
}

/* Apodo del luchador (Ahora en color cian/celeste) */
.wrestler > p:first-of-type {
    margin: 8px 5px 0;
    color: #00bfff;
    font-size: 9px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Nombre principal del luchador */
.wrestler > h2 {
    margin: 3px 5px;
    color: #ffffff;
    font-size: 15px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Stable o equipo (Ahora en color gris secundario) */
.wrestler > h2 + p {
    margin: 0 5px 10px;
    color: #aaaaaa;
    font-size: 9px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* =========================================
   DIVISOR DE SECCIÓN
   ========================================= */
.roster-divider {
    display: flex;
    align-items: center;
    gap: 15px;
    margin: 40px 0 20px;
}

.roster-divider::before,
.roster-divider::after {
    content: "";
    flex: 1;
    height: 2px;
    background: #333333;
}

.roster-divider h1 {
    margin: 0;
    color: #eeeeee;
    font-size: 22px;
    font-weight: 900;
    letter-spacing: 2px;
    text-transform: uppercase;
    white-space: nowrap;
}

/* =========================================
   MODAL ÉPICO (ORDEN INVERTIDO Y DORADO)
   ========================================= */
.modal {
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: radial-gradient(circle at 50% 45%, rgba(0, 150, 255, 0.22), rgba(0, 0, 0, 0.94) 70%);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 0.35s ease, visibility 0.35s ease;
    z-index: 9999;
}

.modal.show {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
}

.modal-content {
    position: relative;
    width: 85%;
    max-width: 500px;
    background: radial-gradient(circle at 50% 0%, rgba(0, 150, 255, 0.2), transparent 40%), #101010;
    border: 2px solid #333333;
    border-top: 4px solid #00bfff;
    border-radius: 4px;
    box-shadow: 0 8px 30px rgba(0,0,0,.9), 0 0 20px rgba(0,191,255,0.25);
    overflow: hidden;
    transform: translateY(20px) scale(0.96);
    transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.modal.show .modal-content {
    transform: translateY(0) scale(1);
}

/* Franja superior azulada */
.modal-content::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #004470, #00bfff 35%, #66d9ff 50%, #00bfff 65%, #004470);
    z-index: 5;
}

/* 1. La división (ahora arriba, tamaño chico) */
.modal-content h3 {
    margin: 0;
    padding: 18px 20px 4px;
    color: #bdbdbd;
    font-size: 8px;
    font-weight: 900;
    letter-spacing: 3px;
    text-transform: uppercase;
}

/* 2. El nombre del luchador (Career Highlights o Nombre principal) */
.modal-content h2 {
    margin: 0;
    padding: 4px 20px 12px;
    background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.015));
    color: #ffffff;
    font-size: 24px;
    font-weight: 900;
    letter-spacing: 1px;
    text-transform: uppercase;
    border-bottom: 1px solid #3a3a3a;
}

/* 3. Franja inferior del modal: Distribución Flex para alinear División/Género a la izquierda e Intérprete en DORADO a la derecha a la misma altura */
.modal-content > p {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: 8px 20px 10px;
    background: #181818;
    color: #aaaaaa;
    font-size: 9px;
    font-weight: 900;
    letter-spacing: 2px;
    text-transform: uppercase;
    border-bottom: 1px solid #2a2a2a;
}

/* Estilo dorado y alineado para el intérprete dentro de esa misma línea */
.modal-content > p span.interpreter {
    color: #ffd700;
    font-weight: 900;
    letter-spacing: 1px;
}

.modal-content ul {
    margin: 0;
    padding: 16px 20px 20px 35px;
    background: rgba(0,0,0,0.2);
    max-height: 250px;
    overflow-y: auto;
}

.modal-content li {
    color: #dedede;
    font-size: 11px;
    font-weight: 600;
    line-height: 1.5;
    margin-bottom: 6px;
}

.modal-content li::marker {
    color: #00bfff;
}

/* Botón de cierre del modal en tono azul */
.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 28px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(145deg, #0099ff, #0055aa);
    border: 1px solid #66d9ff;
    color: #ffffff;
    font-size: 18px;
    font-weight: 900;
    cursor: pointer;
    z-index: 10;
    border-radius: 2px;
}

.close-button:hover {
    background: linear-gradient(145deg, #33bbff, #0077cc);
}
