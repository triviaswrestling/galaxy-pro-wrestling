const wrestlers = [
    {
        name: "Cody Rhodes",
        nickname: "The American Nightmare",
        division: "masculino",
        status: "active",
        rank: 1,
        interpreter: "Yahir 🇪🇨",
        image: "imagen/gpw_cody_rhodes.webp",
        themeSong: "Kingdom - Downstait",
        finisher: "Cross Rhodes",
        signature: "Cody Cutter / Disaster Kick",
        stats: {
            micro: 92,
            charisma: 96,
            power: 88
        },
        achievements: [
            "Undisputed GPW Universal Champion",
            "Royal Rumble Winner",
            "Triple Crown Champion"
        ]
    },

    {name: "Velveteen Dream", nickname: "The American Nightmare", division: "masculino",
        status: "active", rank: 3,  interpreter: "Manu HPS 🇩🇴",
        image: "imagen/gpw_logo_original.webp",
        themeSong: "Kingdom - Downstait", finisher: "Cross Rhodes",
        signature: "Cody Cutter / Disaster Kick",
        stats: { micro: 72,  charisma: 96, power: 88},
        achievements: ["Undisputed GPW Universal Champion",
                       "Royal Rumble Winner",
                       "Triple Crown Champion"]},

    { id: "bray-wyatt", name: "Bray Wyatt", nickname: "The Eater of Worlds", division: "masculino",
    status: "active", rank: 8, interpreter: "Bray Wyatt",
    image: "imagen/bray-wyatt.webp", stable: "",
    alterego: ["the-fiend"],
    presentations: {
        "bray-wyatt": { name: "Bray Wyatt", nickname: "The Eater of Worlds", image: "imagen/bray-wyatt.webp", type: "normal" },
        "the-fiend": { name: "The Fiend", nickname: "The Fiend", image: "imagen/the-fiend.webp", type: "alterego" },
        "bray-wyatt-wwe": { name: "Bray Wyatt", nickname: "WWE Champion", image: "imagen/bray-wyatt-wwe.webp", type: "champion" },
        "bray-wyatt-intercontinental": { name: "Bray Wyatt", nickname: "Intercontinental Champion", image: "imagen/bray-wyatt-intercontinental.webp", type: "champion" },
        "bray-wyatt-wwe-2": { name: "Bray Wyatt", nickname: "WWE Champion", image: "imagen/bray-wyatt-wwe-2.webp", type: "champion" }
    },
    rosterPresentation: "the-fiend", rankingPresentation: "bray-wyatt",
    themeSong: "Live in Fear", finisher: "Sister Abigail",
    signature: "Mandible Claw / Uranage",
    stats: { micro: 90, charisma: 98, power: 91 },
    achievements: ["WWE Champion", "2x WWE Universal Champion"]
    },

    { id: "finn-balor",
      name: "Finn Bálor",
      nickname: "The Prince",
      division: "masculino",
      status: "active",
      rank: 0,
      interpreter: "Feargal Devitt",
      image: "imagen/finn-balor.webp",
      stable: "",
      alterego: ["the-demon"],
      presentations: {
        "finn-balor": { name: "Finn Bálor",
            nickname: "The Prince",
            image: "imagen/finn-balor.webp",
            themeSong: "",
            finisher: "Coup de Grâce",
            signature: "1916 / Sling Blade",
            type: "normal" },
        "the-demon": { name: "The Demon", nickname: "The Demon King",
            image: "imagen/the-demon-finn-balor.webp",
            themeSong: "",
            finisher: "Coup de Grâce",
            signature: "1916 / Sling Blade",
            type: "alterego"
        }
    },

    rosterPresentation: "finn-balor",
    rankingPresentation: "finn-balor",

    themeSong: "",
    finisher: "Coup de Grâce",
    signature: "1916 / Sling Blade",

    stats: { micro: 85,
        charisma: 92,
        power: 82},

    achievements: [],

    championships: [],},
    

    {id: "manolete",
     name: "Manolete",
     nickname: "El Inesperado",
     division: "masculino",
     status: "inactive",
     rank: 5,
     interpreter: "Manolete 🇪🇸",
     image: "imagen/gpw_logo_original.webp",
     presentations: {},
     rosterPresentation: "manolete",
     rankingPresentation: "manolete",
     alterego: [],
     stable: "",
     themeSong: "",
     finisher: "",
     signature: "",
     stats: { micro: 10, charisma: 20, power: 30 },
     achievements: []},
    
    
    {
        name: "Bret Hart",
        nickname: "The Darkman",
        division: "masculino",
        status: "active",
        rank: 2,
        interpreter: "Bret Hart",
        image: "imagen/gpw_cody_rhodes.webp",
        stable: "Hart ReFoundation",
        themeSong: "Hitman - Jim Johnston",
        finisher: "Sharpshooter",
        signature: "Piledriver / Inverted Atomic Drop",
        stats: {
            micro: 88,
            charisma: 94,
            power: 90
        },
        achievements: [
            "16x World Champion",
            "5x United States Champion",
            "Ganador del torneo principal de GPW"
        ]
    }
];
