
/* =====================================================
   GALAXY PRO WRESTLING
   CAMPEONATO DE PRUEBA — GPW CHAMPIONSHIP

   Archivo: js/championships/gpw.js

   DATOS FICTICIOS PARA PRUEBAS VISUALES.

   Incluye:
   - 10 reinados.
   - Duraciones diferentes.
   - Campeones y eventos ficticios.
   - Fechas de inicio y finalización.
   - Campeonato actualmente VACANTE.
   - Preparación para conectar cada reinado con eventos.
   ===================================================== */

(function (global) {
    "use strict";

    global.GPWChampionshipData = {

        id: "gpw",
        name: "Galaxy Pro Championship",
        category: "maximo",

        status: "active",
        currentChampionId: "bray-wtatt",
        vacantSince: "null",

        established: "2022-01-01",

        description:
            "Campeonato principal de Galaxy Pro Wrestling. " +
            "Este registro es una demostración ficticia " +
            "para probar el sistema histórico.",

        /* =============================================
           DIEZ REINADOS FICTICIOS
           Orden: más reciente primero.
           ============================================= */

        reigns: [

            
{
    id: "gpw-reign-010",
    number: 10,

    championId: "bray-wyatt",
    presentationId: "the-fiend",
    champion: "The Fiend",
    image: "",

    startDate: "2026-08-01",
    endDate: "2026-10-10",

    wonAt: "GPW: Final Collision",
    lostAt: "GPW: Grand Finale",

    wonAgainst: "Marcus Steel",
    lostAgainst: "Dante Cross",

    description:
        "Ganó el campeonato en una lucha individual. " +
        "Su reinado terminó tras una defensa titular.",

    defenses: 3,

    eventIds: [
        "test-event-101",
        "test-event-102",
        "test-event-103"
    ]
}
,

            {
                id: "gpw-reign-009",
                number: 9,
                championId: "test-champion-009",
                champion: "Dante Cross",
                image: "",
                startDate: "2026-04-01",
                endDate: "2026-07-31",
                wonAt: "GPW: Spring Warfare",
                lostAt: "GPW: Final Collision",
                wonAgainst: "Adrian Storm",
                lostAgainst: "Adrian Storm",
                description:
                    "Un reinado de varios meses con defensas " +
                    "ante distintos retadores.",
                defenses: 5,
                eventIds: [
                    "test-event-091",
                    "test-event-092",
                    "test-event-093",
                    "test-event-094",
                    "test-event-095"
                ]
            },

            {
                id: "gpw-reign-008",
                number: 8,
                championId: "test-champion-008",
                champion: "Marcus Steel",
                image: "",
                startDate: "2026-03-15",
                endDate: "2026-03-31",
                wonAt: "GPW: Revolution",
                lostAt: "GPW: Spring Warfare",
                wonAgainst: "Dante Cross",
                lostAgainst: "Dante Cross",
                description:
                    "Un reinado breve que terminó en su primera " +
                    "defensa titular.",
                defenses: 0,
                eventIds: [
                    "test-event-081"
                ]
            },

            {
                id: "gpw-reign-007",
                number: 7,
                championId: "test-champion-007",
                champion: "Victor Blaze",
                image: "",
                startDate: "2025-11-01",
                endDate: "2026-03-14",
                wonAt: "GPW: Halloween Havoc",
                lostAt: "GPW: Revolution",
                wonAgainst: "Ryan Knight",
                lostAgainst: "Marcus Steel",
                description:
                    "Un reinado extenso con varias defensas " +
                    "exitosas frente a rivales de primer nivel.",
                defenses: 6,
                eventIds: [
                    "test-event-071",
                    "test-event-072",
                    "test-event-073",
                    "test-event-074",
                    "test-event-075",
                    "test-event-076"
                ]
            },

            {
                id: "gpw-reign-006",
                number: 6,
                championId: "test-champion-006",
                champion: "Ryan Knight",
                image: "",
                startDate: "2025-10-20",
                endDate: "2025-10-31",
                wonAt: "GPW: October Fight",
                lostAt: "GPW: Halloween Havoc",
                wonAgainst: "Victor Blaze",
                lostAgainst: "Victor Blaze",
                description:
                    "Un reinado corto que cambió de manos " +
                    "en el siguiente gran evento.",
                defenses: 0,
                eventIds: [
                    "test-event-061"
                ]
            },

            {
                id: "gpw-reign-005",
                number: 5,
                championId: "test-champion-005",
                champion: "Ethan Hunter",
                image: "",
                startDate: "2025-04-01",
                endDate: "2025-10-19",
                wonAt: "GPW: New Era",
                lostAt: "GPW: October Fight",
                wonAgainst: "Ryan Knight",
                lostAgainst: "Ryan Knight",
                description:
                    "Un reinado de varios meses marcado por " +
                    "defensas titulares consecutivas.",
                defenses: 4,
                eventIds: [
                    "test-event-051",
                    "test-event-052",
                    "test-event-053",
                    "test-event-054"
                ]
            },

            {
                id: "gpw-reign-004",
                number: 4,
                championId: "test-champion-004",
                champion: "Noah Phoenix",
                image: "",
                startDate: "2025-03-25",
                endDate: "2025-03-31",
                wonAt: "GPW: Breakpoint",
                lostAt: "GPW: New Era",
                wonAgainst: "Ethan Hunter",
                lostAgainst: "Ethan Hunter",
                description:
                    "Un reinado de pocos días, pensado para " +
                    "comprobar duraciones muy breves.",
                defenses: 0,
                eventIds: [
                    "test-event-041"
                ]
            },

            {
                id: "gpw-reign-003",
                number: 3,
                championId: "test-champion-003",
                champion: "Logan Reign",
                image: "",
                startDate: "2024-01-01",
                endDate: "2025-03-24",
                wonAt: "GPW: Year One",
                lostAt: "GPW: Breakpoint",
                wonAgainst: "Noah Phoenix",
                lostAgainst: "Noah Phoenix",
                description:
                    "Un reinado de larga duración que sirve " +
                    "para probar historiales extensos.",
                defenses: 12,
                eventIds: [
                    "test-event-031",
                    "test-event-032",
                    "test-event-033"
                ]
            },

            {
                id: "gpw-reign-002",
                number: 2,
                championId: "test-champion-002",
                champion: "Alex Thunder",
                image: "",
                startDate: "2023-06-01",
                endDate: "2023-12-31",
                wonAt: "GPW: Summer Break",
                lostAt: "GPW: Year One",
                wonAgainst: "Logan Reign",
                lostAgainst: "Logan Reign",
                description:
                    "Un reinado intermedio con varias defensas " +
                    "durante la temporada.",
                defenses: 4,
                eventIds: [
                    "test-event-021",
                    "test-event-022",
                    "test-event-023",
                    "test-event-024"
                ]
            },

            {
                id: "gpw-reign-001",
                number: 1,
                championId: "test-champion-001",
                champion: "James Titan",
                image: "",
                startDate: "2022-01-01",
                endDate: "2023-05-31",
                wonAt: "GPW: Inaugural Night",
                lostAt: "GPW: Summer Break",
                wonAgainst: null,
                lostAgainst: "Alex Thunder",
                description:
                    "Primer campeón ficticio de la historia " +
                    "de prueba del GPW Championship.",
                defenses: 8,
                eventIds: [
                    "test-event-011",
                    "test-event-012",
                    "test-event-013"
                ]
            }

        ],

        /* =============================================
           PERÍODOS DE VACANCIA

           No cuentan como reinados.
           ============================================= */

        vacancies: [
            {
                id: "gpw-vacancy-test-001",
                startDate: "2026-10-11",
                endDate: null,
                reason:
                    "Vacancia ficticia para comprobar la " +
                    "presentación de un título sin campeón.",
                eventId: "test-event-vacancy-001"
            }
        ],

        /* =============================================
           HISTORIA DEL CAMPEONATO
           ============================================= */

        history: [
            {
                id: "gpw-history-001",
                type: "creation",
                date: "2022-01-01",
                title: "Creación del campeonato",
                description:
                    "Se establece el GPW Championship. " +
                    "Acontecimiento ficticio de prueba.",
                eventId: "test-event-001"
            },
            {
                id: "gpw-history-002",
                type: "vacancy",
                date: "2026-10-11",
                title: "Campeonato vacante",
                description:
                    "El título queda vacante después del " +
                    "décimo reinado ficticio.",
                eventId: "test-event-vacancy-001"
            }
        ]

    };

})(window);
