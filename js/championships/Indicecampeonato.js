
/* =====================================================
   GALAXY PRO WRESTLING
   ÍNDICE CENTRAL DE CAMPEONATOS

   Archivo: js/championships/indicecampeonato.js

   FUNCIÓN:
   - Registrar todos los campeonatos de GPW.
   - Identificar cada título mediante un ID permanente.
   - Indicar dónde está su archivo histórico.
   - Conectar catálogo, fichas individuales y eventos.
   - Permitir agregar títulos sin reestructurar el sistema.

   IMPORTANTE:
   Este archivo NO contiene los reinados.
   Cada campeonato mantiene su propio archivo.
   ===================================================== */

(function (global) {
    "use strict";

    const campeonatos = {

        /* =============================================
           01. GPW CHAMPIONSHIP
           ============================================= */

        gpw: {
            id: "gpw",
            nombre: "GPW Championship",
            categoria: "world",
            estado: "active",
            archivo: "gpw.js",
            historialId: "gpw",
            orden: 1
        },

        /* =============================================
           02. SUPERMASSIVE CHAMPIONSHIP
           ============================================= */

        supermassive: {
            id: "supermassive",
            nombre: "Supermassive Championship",
            categoria: "midcard",
            estado: "active",
            archivo: "supermassive.js",
            historialId: "supermassive",
            orden: 2
        },

        /* =============================================
           03. GALAXY WOMEN'S CHAMPIONSHIP
           ============================================= */

        womens: {
            id: "womens",
            nombre: "Galaxy Women's Championship",
            categoria: "women",
            estado: "active",
            archivo: "womens.js",
            historialId: "womens",
            orden: 3
        },

        /* =============================================
           04. X-DIVISION CHAMPIONSHIP
           ============================================= */

        xDivision: {
            id: "x-division",
            nombre: "X-Division Championship",
            categoria: "specialty",
            estado: "active",
            archivo: "x-division.js",
            historialId: "x-division",
            orden: 4
        },

        /* =============================================
           05. INFINITY CHAMPIONSHIP
           ============================================= */

        infinity: {
            id: "infinity",
            nombre: "Infinity Championship",
            categoria: "specialty",
            estado: "active",
            archivo: "infinity.js",
            historialId: "infinity",
            orden: 5
        },

        /* =============================================
           06. BIG BANG CHAMPIONSHIP
           ============================================= */

        bigBang: {
            id: "big-bang",
            nombre: "Big Bang Championship",
            categoria: "specialty",
            estado: "active",
            archivo: "big-bang.js",
            historialId: "big-bang",
            orden: 6
        },

        /* =============================================
           07. UNIVERSAL TAG TEAM CHAMPIONSHIP
           ============================================= */

        universalTagTeam: {
            id: "universal-tag-team",
            nombre: "Universal Tag Team Championship",
            categoria: "tag",
            estado: "active",
            archivo: "universal-tag-team.js",
            historialId: "universal-tag-team",
            orden: 7
        }

    };


    /* =============================================
       FUNCIONES PÚBLICAS DEL ÍNDICE
       ============================================= */

    const indiceCampeonato = {

        /**
         * Devuelve todos los campeonatos registrados.
         */
        obtenerTodos() {
            return Object.values(campeonatos)
                .sort((a, b) => a.orden - b.orden);
        },


        /**
         * Busca un campeonato por su ID.
         *
         * Ejemplo:
         * obtener("gpw")
         */
        obtener(id) {
            if (!id) return null;

            return campeonatos[id] ||
                Object.values(campeonatos).find(
                    campeonato => campeonato.id === id
                ) ||
                null;
        },


        /**
         * Devuelve los campeonatos de una categoría.
         *
         * Ejemplo:
         * obtenerPorCategoria("world")
         */
        obtenerPorCategoria(categoria) {
            if (!categoria || categoria === "all") {
                return this.obtenerTodos();
            }

            return this.obtenerTodos().filter(
                campeonato => campeonato.categoria === categoria
            );
        },


        /**
         * Devuelve los campeonatos por estado.
         *
         * Estados previstos:
         * active, vacant, retired.
         */
        obtenerPorEstado(estado) {
            if (!estado || estado === "all") {
                return this.obtenerTodos();
            }

            return this.obtenerTodos().filter(
                campeonato => campeonato.estado === estado
            );
        },


        /**
         * Construye la ruta al archivo histórico.
         *
         * El índice está en:
         * js/championships/indicecampeonato.js
         *
         * Los historiales estarán en esa misma carpeta.
         */
        obtenerRutaHistorial(id) {
            const campeonato = this.obtener(id);

            if (!campeonato) return null;

            return "js/championships/" + campeonato.archivo;
        },


        /**
         * Comprueba si existe un ID registrado.
         */
        existe(id) {
            return this.obtener(id) !== null;
        },


        /**
         * Devuelve la cantidad de títulos registrados.
         */
        contar() {
            return Object.keys(campeonatos).length;
        }

    };


    /* =============================================
       REGISTRO GLOBAL PARA EL RESTO DE GPW
       ============================================= */

    global.GPWChampionshipIndex = indiceCampeonato;


})(window);
