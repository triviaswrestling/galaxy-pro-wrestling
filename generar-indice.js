/* ==========================================================
   GALAXY PRO WRESTLING (GPW) - GENERADOR AUTOMÁTICO DE ÍNDICE
   ========================================================== */

const fs = require('fs');
const path = require('path');

const dirNotas = path.join(__dirname, 'notas');
let indice = [];

if (fs.existsSync(dirNotas)) {
    // Lee todos los archivos de la carpeta notas
    fs.readdirSync(dirNotas).forEach(file => {
        if (file.startsWith('nota-') && file.endsWith('.json')) {
            const filePath = path.join(dirNotas, file);
            try {
                const contenido = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                
                // Extrae el texto del lead (primer párrafo) para usarlo como resumen en las tarjetas
                const lead = contenido.contenido.find(b => b.tipo === "lead")?.texto || "Lee la noticia completa en el portal oficial de GPW.";
                
                indice.push({
                    id: contenido.id,
                    titulo: contenido.titulo,
                    categoria: contenido.categoria,
                    resumen: lead,
                    imagen: contenido.imagen,
                    fecha: contenido.fecha,
                    link: `noticia.html?id=${contenido.id}`
                });
            } catch (e) {
                console.log(`⚠️ Error leyendo el archivo ${file}:`, e.message);
            }
        }
    });

    // Ordenar de más nuevo a más viejo por fecha (y por ID si coinciden)
    indice.sort((a, b) => new Date(b.fecha) - new Date(a.fecha) || b.id - a.id);

    // Guardar el resultado final en notas/indice.json
    const rutaIndice = path.join(dirNotas, 'indice.json');
    fs.writeFileSync(rutaIndice, JSON.stringify(indice, null, 4));
    
    console.log(`✅ ¡Índice actualizado con éxito!`);
    console.log(`📊 Total de notas procesadas: ${indice.length}`);
    console.log(`📁 Archivo guardado en: ${rutaIndice}`);
} else {
    console.log("❌ No se encontró la carpeta 'notas' en el directorio.");
}
