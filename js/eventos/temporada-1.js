
window.GPW_DATOS_TEMPORADAS = window.GPW_DATOS_TEMPORADAS || {};

window.GPW_DATOS_TEMPORADAS["temporada-1"] = {
    id: "temporada-1",
    nombre: "TEMPORADA 1",
    eventos: [
        {
            id: "t1-galaxymania",
            nombre: "GALAXYMANIA",
            fecha: "2026-12-20",
            poster: "images/eventos/galaxymania.jpg",
            descripcion: "La noche más grande de GPW.",
            sagaId: "el-ascenso",
            combates: [
                {
                    id: "gm-01",
                    tipo: "SINGLES",
                    estipulacion: "SINGLES MATCH",
                    tituloEnJuego: "GPW UNIVERSAL CHAMPIONSHIP",
                    lados: [
                        {id:"cody",nombre:"Cody Rhodes",participantes:[{wrestlerId:"cody-rhodes",presentationId:"default"}]},
                        {id:"bray",nombre:"Bray Wyatt",participantes:[{wrestlerId:"bray-wyatt",presentationId:"bray-wyatt"}]}
                    ],
                    resultado: {estado:"finalizado",ganadores:["cody"],metodo:"PINfall",detalle:"Cody Rhodes gana tras conectar dos Cross Rhodes."}
                },
                {
                    id: "gm-02",
                    tipo: "SINGLES",
                    estipulacion: "NO DISQUALIFICATION MATCH",
                    tituloEnJuego: "",
                    lados: [
                        {id:"fiend",nombre:"The Fiend",participantes:[{wrestlerId:"bray-wyatt",presentationId:"the-fiend"}]},
                        {id:"finn",nombre:"Finn Bálor",participantes:[{wrestlerId:"finn-balor",presentationId:"finn-balor"}]}
                    ],
                    resultado: {estado:"finalizado",ganadores:["fiend"],metodo:"PINfall",detalle:"The Fiend gana tras aplicar Sister Abigail sobre una silla."}
                },
                {
                    id: "gm-03",
                    tipo: "TRIPLE_THREAT",
                    estipulacion: "TRIPLE THREAT MATCH",
                    tituloEnJuego: "",
                    lados: [
                        {id:"bret",nombre:"Bret Hart",participantes:[{wrestlerId:"bret-hart",presentationId:"default"}]},
                        {id:"dream",nombre:"El Único Velveteen Dream",participantes:[{wrestlerId:"el-unico-velveteen-dream",presentationId:"default"}]},
                        {id:"manolete",nombre:"Manolete",participantes:[{wrestlerId:"manolete",presentationId:"default"}]}
                    ],
                    resultado: {estado:"finalizado",ganadores:["bret"],metodo:"SUBMISSION",detalle:"Bret Hart hace rendir a Manolete con el Sharpshooter mientras Dream está fuera del ring."}
                },
                {
                    id: "gm-04",
                    tipo: "FATAL_4_WAY",
                    estipulacion: "FATAL 4-WAY ELIMINATION MATCH",
                    tituloEnJuego: "",
                    lados: [
                        {id:"cody",nombre:"Cody Rhodes",participantes:[{wrestlerId:"cody-rhodes",presentationId:"default"}]},
                        {id:"finn",nombre:"Finn Bálor",participantes:[{wrestlerId:"finn-balor",presentationId:"the-demon"}]},
                        {id:"bray",nombre:"Bray Wyatt",participantes:[{wrestlerId:"bray-wyatt",presentationId:"bray-wyatt"}]},
                        {id:"bret",nombre:"Bret Hart",participantes:[{wrestlerId:"bret-hart",presentationId:"default"}]}
                    ],
                    resultado: {estado:"finalizado",ganadores:["finn"],metodo:"PINfall",detalle:"The Demon elimina a Cody y después cubre a Bray Bálor tras el Coup de Grâce."}
                },
                {
                    id: "gm-05",
                    tipo: "TAG_TEAM",
                    estipulacion: "TAG TEAM MATCH",
                    tituloEnJuego: "GPW WORLD TAG TEAM CHAMPIONSHIP",
                    lados: [
                        {id:"team-a",nombre:"NIGHTMARE & HITMAN",participantes:[{wrestlerId:"cody-rhodes",presentationId:"default"},{wrestlerId:"bret-hart",presentationId:"default"}]},
                        {id:"team-b",nombre:"THE DARKNESS",participantes:[{wrestlerId:"bray-wyatt",presentationId:"the-fiend"},{wrestlerId:"finn-balor",presentationId:"the-demon"}]}
                    ],
                    resultado: {estado:"finalizado",ganadores:["team-b"],metodo:"PINfall",detalle:"The Fiend cubre a Cody Rhodes después de una combinación con The Demon."}
                },
                {
                    id: "gm-06",
                    tipo: "MULTI_TEAM",
                    estipulacion: "TRIPLE THREAT TAG TEAM MATCH",
                    tituloEnJuego: "",
                    lados: [
                        {id:"team-a",nombre:"TEAM CODY",participantes:[{wrestlerId:"cody-rhodes",presentationId:"default"},{wrestlerId:"manolete",presentationId:"default"}]},
                        {id:"team-b",nombre:"TEAM WYATT",participantes:[{wrestlerId:"bray-wyatt",presentationId:"bray-wyatt"},{wrestlerId:"finn-balor",presentationId:"finn-balor"}]},
                        {id:"team-c",nombre:"DREAM & HITMAN",participantes:[{wrestlerId:"el-unico-velveteen-dream",presentationId:"default"},{wrestlerId:"bret-hart",presentationId:"default"}]}
                    ],
                    resultado: {estado:"finalizado",ganadores:["team-c"],metodo:"PINfall",detalle:"Dream distrae a Cody y Bret cubre a Manolete tras un Piledriver."}
                },
                {
                    id: "gm-07",
                    tipo: "HANDICAP",
                    estipulacion: "2-ON-1 HANDICAP MATCH",
                    tituloEnJuego: "",
                    lados: [
                        {id:"solo",nombre:"The Fiend",participantes:[{wrestlerId:"bray-wyatt",presentationId:"the-fiend"}]},
                        {id:"duo",nombre:"Cody Rhodes & Manolete",participantes:[{wrestlerId:"cody-rhodes",presentationId:"default"},{wrestlerId:"manolete",presentationId:"default"}]}
                    ],
                    resultado: {estado:"finalizado",ganadores:["solo"],metodo:"PINfall",detalle:"The Fiend resiste el ataque combinado y cubre a Manolete tras Sister Abigail."}
                },
                {
                    id: "gm-08",
                    tipo: "SINGLES",
                    estipulacion: "STEEL CAGE MATCH",
                    tituloEnJuego: "",
                    lados: [
                        {id:"finn",nombre:"The Demon",participantes:[{wrestlerId:"finn-balor",presentationId:"the-demon"}]},
                        {id:"bret",nombre:"Bret Hart",participantes:[{wrestlerId:"bret-hart",presentationId:"default"}]}
                    ],
                    resultado: {estado:"finalizado",ganadores:["bret"],metodo:"ESCAPE",detalle:"Bret Hart logra escapar de la jaula segundos antes de que Finn pueda detenerlo."}
                },
                {
                    id: "gm-09",
                    tipo: "BATTLE_ROYAL",
                    estipulacion: "BATTLE ROYAL",
                    tituloEnJuego: "GANADOR: OPORTUNIDAD TITULAR",
                    lados: [
                        {id:"participantes",nombre:"PARTICIPANTES",participantes:[{wrestlerId:"cody-rhodes",presentationId:"default"},{wrestlerId:"bray-wyatt",presentationId:"bray-wyatt"},{wrestlerId:"finn-balor",presentationId:"finn-balor"},{wrestlerId:"bret-hart",presentationId:"default"},{wrestlerId:"el-unico-velveteen-dream",presentationId:"default"},{wrestlerId:"manolete",presentationId:"default"}]}
                    ],
                    resultado: {estado:"finalizado",ganadores:["bret-hart"],metodo:"ULTIMA ELIMINACION",detalle:"Bret Hart elimina a The Fiend en último lugar y gana una oportunidad titular."}
                },
                {
                    id: "gm-10",
                    tipo: "SINGLES",
                    estipulacion: "LADDER MATCH",
                    tituloEnJuego: "GPW UNIVERSAL CHAMPIONSHIP — FUTURE TITLE CONTRACT",
                    lados: [
                        {id:"dream",nombre:"El Único Velveteen Dream",participantes:[{wrestlerId:"el-unico-velveteen-dream",presentationId:"default"}]},
                        {id:"manolete",nombre:"Manolete",participantes:[{wrestlerId:"manolete",presentationId:"default"}]}
                    ],
                    resultado: {estado:"finalizado",ganadores:["dream"],metodo:"OBJETO RECUPERADO",detalle:"Velveteen Dream descuelga el contrato y asegura una futura oportunidad por el campeonato."}
                }
            ]
        }
    ]
};

