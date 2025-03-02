export const Pokedex: {[speciesid: string]: SpeciesData} = {
	shaymin: {
		inherit: true,
		num: 1,
		types: ["Grass"],
		abilities: {0: "Natural Cure", H: "Disperal"},
	},
	heatmor: {
		inherit: true,
		num: 2,
		baseStats: {hp: 78, atk: 102, def: 61, spa: 102, spd: 61, spe: 80},
		abilities: {0: "Gluttony", 1: "Flash Fire", H: "Stakeout"},		
	},
	slowclone: {
		num: 3,
		name: "Slowclone",
		types: ["Water"],
		baseStats: {hp: 120, atk: 100, def: 100, spa: 75, spd: 75, spe: 20},
		abilities: {0: "Shell Armor", 1: "Oblivious", H: "Water Veil"},
		heightm: 2,
		weightkg: 120,
		prevo: "slowpoke",
	},
	eevee: {
    	inherit: true,
		evos: ["Vaporeon", "Jolteon", "Flareon", "Espeon", "Umbreon", "Leafeon", "Glaceon", "Sylveon", "Mytheon"],
	},
	mytheon: {
		num: 4,
		name: "Mytheon",
		types: ["Dragon"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 110, atk: 95, def: 65, spa: 60, spd: 65, spe: 130},
		abilities: {0: "Pressure", H: "Tough Claws"},
		heightm: 0.9,
		weightkg: 24,
		color: "Blue",
		prevo: "Eevee",
		evoType: "trade",
		evoItem: "Dragon Scale",
		eggGroups: ["Field"],
	},
	melmetal: {
		inherit: true,
		num: 5,
		baseStats: {hp: 125, atk: 123, def: 123, spa: 80, spd: 65, spe: 84},
	},
	melmetalgmax: {
		inherit: true,
		num: 5,
		baseStats: {hp: 125, atk: 133, def: 133, spa: 80, spd: 65, spe: 114},
	},
	kokovoir: {
		fusion: ['Gardevoir', 'Tapu Koko'],
		num: 6,
		name: "Kokovoir",
		types: ["Fairy"],
		baseStats: {hp: 69, atk: 110, def: 75, spa: 110, spd: 100, spe: 120},
		abilities: {0: "E-Copy"},
		weightkg: 34.45,
		otherFormes: ["Kokovoir-Mega"],
		formeOrder: ["Kokovoir", "Kokovoir-Mega"],
	},
	kokovoirmega: {
		fusion: ['Gardevoir', 'Tapu Koko'],
		num: 6,
		name: "Kokovoir-Mega",
		baseSpecies: "Kokovoir",
		forme: "Mega",
		types: ["Fairy"],
		baseStats: {hp: 69, atk: 130, def: 75, spa: 150, spd: 120, spe: 140},
		abilities: {0: "Pixilate"},
		weightkg: 34.45,
		requiredItem: "Gardevoirite",
		battleOnly: "Kokovoir",
	},
	salaos: {
		num: 7,
		name: "Salaos",
		types: ["Dark"],
		baseStats: {hp: 75, atk: 85, def: 90, spa: 110, spd: 130, spe: 90},
		abilities: {0: "Heatproof"},
		weightkg: 59,
		eggGroups: ["Undiscovered"],
	},
	machamp: {
		inherit: true,
		num: 8,
		otherFormes: ["Machamp-Mega"],
		formeOrder: ["Machamp", "Machamp-Mega"],
	},
	machampmega: {
		num: 8,
		name: "Machamp-Mega",
		baseSpecies: "Machamp",
		forme: "Mega",
		types: ["Fighting"],
		baseStats: {hp: 90, atk: 160, def: 115, spa: 65, spd: 130, spe: 45},
		abilities: {0: "Technician"},
		heightm: 2.0,
		weightkg: 250,
		eggGroups: ["Human-Like"],
		requiredItem: "Machampite",
	},
	machampindia: {
		num: 9,
		name: "Machamp-India",
		types: ["Psychic"],
		baseStats: {hp: 80, atk: 120, def: 80, spa: 65, spd: 85, spe: 75},
		abilities: {0: "Sheer Force", 1: "No Guard", H: "Serene Grace"},
		heightm: 2.0,
		weightkg: 102.9,
		eggGroups: ["Human-Like"],
	},
	sandaconda: {
		num: 10,
		name: "Sandaconda",
		baseForme: "Coiled",
		types: ["Ground"],
		baseStats: {hp: 92, atk: 107, def: 125, spa: 65, spd: 70, spe: 51},
		abilities: {0: "Sand Spit", 1: "Shed Skin", H: "Natural Cure"},
		heightm: 3.8,
		weightkg: 65.5,
		color: "Green",
		prevo: "Silicobra",
		evoLevel: 36,
		eggGroups: ["Field", "Dragon"],
		otherFormes: ["Sandaconda-Uncoiled"],
		formeOrder: ["Sandaconda", "Sandaconda-Uncoiled"],
	},
	sandacondauncoiled: {
		num: 10,
		name: "Sandaconda-Uncoiled",
		baseSpecies: "Sandaconda",
		forme: "Uncoiled",
		types: ["Ground"],
		baseStats: {hp: 92, atk: 127, def: 71, spa: 65, spd: 70, spe: 125},
		abilities: {0: "Sand Spit", 1: "Shed Skin", H: "Natural Cure"},
		heightm: 22,
		weightkg: 0,
		color: "Green",
		eggGroups: ["Field", "Dragon"],
		changesFrom: "Sandaconda",
	},
	cummulus: {
		num: 11,
		name: "Cummulus",
		types: ["Flying"],
		gender: "M",
		baseStats: {hp: 130, atk: 60, def: 60, spa: 90, spd: 100, spe: 100},
		abilities: {0: "Natural Cure"},
		heightm: 1.4,
		weightkg: 63,
		eggGroups: ["Undiscovered"],
	},
	silvallyrock: {
		num: 12,
		name: "Silvally-Rock",
		types: ["Rock"],
		gender: "N",
		baseStats: {hp: 95, atk: 105, def: 95, spa: 95, spd: 95, spe: 115},
		abilities: {0: "RKS System"},
		heightm: 2.3,
		weightkg: 100.5,
	},
	pincurchin: {
		num: 13,
		name: "Pincurchin",
		types: ["Electric"],
		baseStats: {hp: 111, atk: 72, def: 75, spa: 98, spd: 108, spe: 51},
		abilities: {0: "Iron Barbs", H: "Lightning Rod"},
		weightkg: 1,
	},
	spectrier: {
		num: 14,
		name: "Spectrier",
		types: ["Ghost"],
		gender: "N",
		baseStats: {hp: 90, atk: 90, def: 85, spa: 90, spd: 95, spe: 130},
		abilities: {0: "Grim Neigh"},
		heightm: 2,
		weightkg: 44.5,
		eggGroups: ["Undiscovered"],
	},
	chillyte: {
		num: 15,
		name: "Chillyte",
		types: ["Ice"],
		baseStats: {hp: 95, atk: 110, def: 135, spa: 101, spd: 75, spe: 84},
		abilities: {0: "Grassy Surge", 1: "Natural Cure", H: "Slush Rush"},
		weightkg: 75,
		otherFormes: ["Chillyte-Mega"],
		formeOrder: ["Chillyte", "Chillyte-Mega"],
		eggGroups: ["Undiscovered"],
	},
	chillytemega: {
		num: 15,
		name: "Chillyte-Mega",
		baseSpecies: "Chillyte",
		forme: "Mega",
		types: ["Ice"],
		baseStats: {hp: 95, atk: 101, def: 192, spa: 134, spd: 79, spe: 99},
		abilities: {0: "Dauntless Shield"},
		weightkg: 150,
		requiredItem: "Chillyte",
		eggGroups: ["Undiscovered"],
	},
	magroach: {
		num: 16,
		name: "Magroach",
		types: ["Bug"],
		baseStats: {hp: 90, atk: 110, def: 85, spa: 85, spd: 110, spe: 90},
		abilities: {0: "Magic Guard", 1: "Illuminate", H: "Rattled"},
		heightm: 3.5,
		weightkg: 135,
	},
	exploud: {
		inherit: true,
		num: 17,
		otherFormes: ["Exploud-Meow"],
		formeOrder: ["Exploud", "Exploud-Meow"],
	},
	exploudmeow: {
		num: 17,
		name: "Exploud-Meow",
		baseSpecies: "Exploud",
		breedingVariant: "Persian",
		forme: "Meow",
		types: ["Normal"],
		baseStats: {hp: 104, atk: 91, def: 63, spa: 91, spd: 73, spe: 91},
		abilities: {0: "Soundproof", 1: "Technician", H: "Scrappy"},
		heightm: 1.2,
		weightkg: 58,
		prevo: "loudred",
		eggGroups: ["Field"],
	},
	garbodor: {
		inherit: true,
		otherFormes: ["Garbodor-Gmax"],
		formeOrder: ["Garbodor", "Garbodor-Gmax"],
	},
	garbodorgmax: {
		num: 18,
		name: "Garbodor-Gmax",
		baseSpecies: "Garbodor",
		forme: "Gmax",
		types: ["Poison"],
		baseStats: {hp: 80, atk: 105, def: 137, spa: 60, spd: 137, spe: 55},
		abilities: {0: "Neutralizing Gas"},
		heightm: 1.9,
		weightkg: 107.3,
		eggGroups: ["Mineral"],
		requiredItem: "Garbodite",
		gen: 8,
	},
	grimmsnarl: {
		inherit: true,
		otherFormes: ["Grimmsnarl-Alola"],
		formeOrder: ["Grimmsnarl", "Grimmsnarl-Alola"],
	},
	grimmsnarlalola: {
		num: 19,
		name: "Grimmsnarl-Alola",
		baseSpecies: "Grimmsnarl",
		forme: "Alola",
		types: ["Dark", "Fighting"],
		gender: "M",
		baseStats: {hp: 95, atk: 120, def: 80, spa: 60, spd: 65, spe: 90},
		abilities: {0: "Moxie", 1: "Intimidate", H: "Mold Breaker"},
		heightm: 1.5,
		weightkg: 61,
		eggGroups: ["Fairy", "Human-Like"],
	},
	peasmaker: {
		num: 20,
		name: "Peasmaker",
		types: ["Grass", "Flying"],
		baseStats: {hp: 83, atk: 80, def: 75, spa: 70, spd: 70, spe: 101},
		abilities: {0: "Tangled Feet", 1: "Grassy Surge", H: "Skill Link"},
		heightm: 1.5,
		weightkg: 39.5,
		eggGroups: ["Flying"],
		otherFormes: ["Peasmaker-Mega"],
		formeOrder: ["Peasmaker", "Peasmaker-Mega"],
	},
	peasmakermega: {
		num: 20,
		name: "Peasmaker-Mega",
		baseSpecies: "Peasmaker",
		forme: "Mega",
		types: ["Grass", "Flying"],
		baseStats: {hp: 83, atk: 80, def: 80, spa: 135, spd: 80, spe: 121},
		abilities: {0: "Drought"},
		heightm: 2.2,
		weightkg: 50.5,
		eggGroups: ["Flying"],
		requiredItem: "Pidgeotite",
	},
	cofazor: {
		fusion: ['Cofagrigus', 'Scizor'],
		num: 21,
		name: "Cofazor",
		types: ["Ghost", "Steel"],
		baseStats: {hp: 65, atk: 90, def: 125, spa: 88, spd: 95, spe: 67},
		abilities: {0: "Teaching Tech"},
		weightkg: 97.25,
		otherFormes: ["Cofazor-Mega"],
		formeOrder: ["Cofazor", "Cofazor-Mega"],
	},
	cofazormega: {
		fusion: ['Cofagrigus', 'Scizor'],
		num: 21,
		name: "Cofazor-Mega",
		baseSpecies: "Cofazor",
		forme: "Mega",
		types: ["Ghost", "Steel"],
		baseStats: {hp: 65, atk: 110, def: 165, spa: 98, spd: 115, spe: 77},
		abilities: {0: "Technician"},
		weightkg: 100.75,
		requiredItem: "Scizorite",
		battleOnly: "Cofazor",
	},
	corsola: {
		num: 22,
		name: "Corsola",
		types: ["Rock", "Fairy"],
		genderRatio: {M: 0.25, F: 0.75},
		baseStats: {hp: 75, atk: 85, def: 105, spa: 145, spd: 105, spe: 45},
		abilities: {0: "Hustle", H: "Immunity"},
		heightm: 0.6,
		weightkg: 5,
		eggGroups: ["Water 1", "Water 3"],
	},
	algalisk: {
		num: 23,
		name: "Algalisk",
		types: ["Poison", "Dragon"],
		baseStats: {hp: 85, atk: 75, def: 110, spa: 97, spd: 103, spe: 69},
		abilities: {0: "Poison Point", 1: "Poison Touch", H: "Adaptability"},
		weightkg: 130,
	},
	ringoando: {
		num: 24,
		name: "Ringo Ando", /* Puyo Puyo */
		types: ["Electric", "Water"],
		gender: "F",
		baseStats: {hp: 80, atk: 100, def: 80, spa: 100, spd: 120, spe: 60},
		abilities: {0: "Analytic", 1: "Rattled", H: "Harvest"},
		heightm: 1.5,
		weightkg: 48,
	},
	arcanine: {
		inherit: true,
		num: 25,
		types: ["Fire", "Normal"],
		abilities: {0: "Intimidate", 1: "Flash Fire", H: "Justified (Sylve)"},
	},
	frosmoth: {
		num: 26,
		name: "Frosmoth",
		types: ["Ice", "Bug"],
		baseStats: {hp: 70, atk: 65, def: 60, spa: 125, spd: 90, spe: 65},
		abilities: {0: "Shield Dust", H: "Ice Scales"},
		heightm: 1.3,
		weightkg: 42,
		otherFormes: ["Frosmoth-Mega"],
		formeOrder: ["Frosmoth", "Frosmoth-Mega"],
	},
	frosmothmega: {
		num: 26,
		name: "Frosmoth-Mega",
		baseSpecies: "Frosmoth",
		forme: "Mega",
		types: ["Ice", "Bug"],
		baseStats: {hp: 70, atk: 65, def: 90, spa: 155, spd: 100, spe: 95},
		abilities: {0: "Ice Scales"},
		heightm: 1.3,
		weightkg: 42,
		requiredItem: "Frosmothite",
		battleOnly: "Frosmoth",
	},
	lunatoneapple: {
		num: 27,
		name: "Lunatone-Apple",
		baseSpecies: "Lunatone",
		forme: "Apple",
		types: ["Ground", "Psychic"],
		baseStats: {hp: 105, atk: 65, def: 80, spa: 120, spd: 100, spe: 70},
		abilities: {0: "Hydration", 1: "Mirror Armor", H: "Psychic Surge"},
		weightkg: 999,
		changesFrom: "Lunatone",
	},
	bastiodactyl: {
		num: 28,
		name: "Bastiodactyl",
		types: ["Flying", "Steel"],
		baseStats: {hp: 90, atk: 85, def: 90, spa: 90, spd: 65, spe: 85},
		abilities: {0: "Rock Head", 1: "Pressure", H: "Soundproof"},
		weightkg: 104.25,
	},
	gengar: {
		inherit: true,
		num: 29,
	},
	gengarmega: {
		inherit: true,
		num: 29,
		baseStats: {hp: 60, atk: 95, def: 90, spa: 155, spd: 90, spe: 110},
	},
	ribombeeprimarina: {
		num: 30,
		name: "Ribombee-Primarina",
		types: ["Water", "Fairy"],
		baseStats: {hp: 69, atk: 62, def: 68, spa: 109, spd: 80, spe: 142},
		abilities: {0: "Torrent", H: "Liquid Voice"},
		heightm: 0.2,
		weightkg: 0.5,
	},
	beetilient: {
		num: 31,
		name: "Beetilient",
		types: ["Bug", "Fighting"],
		baseStats: {hp: 75, atk: 110, def: 135, spa: 40, spd: 75, spe: 75},
		abilities: {0: "Shell Armor", 1: "Stamina", H: "Mirror Armor"},
		weightkg: 65.4,
	},
	cadbunny: {
		num: 32,
		name: "Cadbunny",
		types: ["Normal", "Dark"],
		baseStats: {hp: 90, atk: 50, def: 90, spa: 110, spd: 90, spe: 90},
		abilities: {0: "Pickup", H: "Regenerator"},
		heightm: 5,
		weightkg: 5,
	},
	peccarious: {
		num: 33,
		name: "Peccarious",
		types: ["Ground", "Grass"],
		baseStats: {hp: 80, atk: 135, def: 94, spa: 50, spd: 86, spe: 40},
		abilities: {0: "Reckless", 1: "Vigilante", H: "Grass Pelt"},
		weightkg: 25,
	},
	regielekisaboteur: {
		num: 34,
		name: "Regieleki-Saboteur",
		types: ["Electric", "Fire"],
		gender: "N",
		baseStats: {hp: 75, atk: 115, def: 80, spa: 70, spd: 115, spe: 85},
		abilities: {0: "Flash Fire", H: "Static"},
		heightm: 1.2,
		weightkg: 145,
	},
	kyuremblack: {
		num: 35,
		inherit: true,
		baseStats: {hp: 125, atk: 135, def: 105, spa: 85, spd: 65, spe: 85},
	},
	lunatone: {
		num: 36,
		name: "Lunatone",
		types: ["Rock", "Psychic"],
		gender: "N",
		baseStats: {hp: 90, atk: 55, def: 75, spa: 105, spd: 85, spe: 80},
		abilities: {0: "Levitate", H: "Unburden"},
		heightm: 1,
		weightkg: 168,
		color: "Yellow",
		eggGroups: ["Mineral"],
	},
	miemie: {
		fusion: ['Mienshao', 'Starmie'],
		num: 37,
		name: "Miemie",
		types: ["Fighting", "Psychic"],
		baseStats: {hp: 69, atk: 109, def: 72, spa: 109, spd: 72, spe: 122},
		abilities: {0: "Natural Heal"},
		weightkg: 57.8,
	},
	shadowing: {
		num: 38,
		name: "Shadowing",
		types: ["Dark", "Flying"],
		genderRatio: {M: 0.5, F: 0.5},
		baseStats: {hp: 100, atk: 115, def: 100, spa: 80, spd: 80, spe: 70},
		abilities: {0: "Big Pecks", 1: "Pickpocket", H: "Dark Aura"},
		weightkg: 70,
	},
	ludicolo: {
		inherit: true,
		num: 39,
		name: "Ludicolo",
		types: ["Water", "Grass"],
		baseStats: {hp: 80, atk: 60, def: 70, spa: 100, spd: 100, spe: 75},
		abilities: {0: "Swift Swim", 1: "Rain Dish", H: "Thick Fat"},
		prevo: null,
	},
	shototodoroki: {
		num: 40,
		name: "Shoto Todoroki", /* My Hero Academia */
		types: ["Ice", "Fire"],
		baseStats: {hp: 90, atk: 65, def: 75, spa: 130, spd: 80, spe: 100},
		abilities: {0: "Ice Body", H: "Flame Body"},
		heightm: 1.7,
		weightkg: 67,
	},
	cinnastar: {
		num: 41,
		name: "Cinnastar",
		types: ["Rock", "Poison"],
		baseStats: {hp: 110, atk: 95, def: 80, spa: 95, spd: 80, spe: 80},
		abilities: {0: "Regenerator", 1: "Mold Breaker", H: "Liquid Ooze"},
		weightkg: 52,
	},
	shedinja: {
		num: 42,
		name: "Shedinja",
		types: ["Bug", "Ghost"],
		gender: "N",
		baseStats: {hp: 1, atk: 101, def: 49, spa: 101, spd: 50, spe: 98},
		maxHP: 1,
		abilities: {0: "Wonder Guard"},
		heightm: 0.8,
		weightkg: 1.2,
		color: "Brown",
		prevo: "Nincada",
		evoLevel: 20,
		eggGroups: ["Mineral"],
	},
	gallade: {
		inherit: true,
		otherFormes: ["Gallade-Kalos", "Gallade-Mega", "Gallade-Kalos-Mega"],
		formeOrder: ["Gallade", "Gallade-Kalos", "Gallade-Mega", "Gallade-Kalos-Mega"],
	},
	galladekalos: {
		num: 43,
		name: "Gallade-Kalos",
		baseSpecies: "Gallade",
		forme: "Kalos",
		types: ["Fairy", "Steel"],
		gender: "M",
		baseStats: {hp: 68, atk: 125, def: 105, spa: 65, spd: 75, spe: 80},
		abilities: {0: "Sturdy", H: "Overcoat"},
		heightm: 1.6,
		weightkg: 52,
	},
	galladekalosmega: {
		num: 43,
		name: "Gallade-Kalos-Mega",
		baseSpecies: "Gallade",
		forme: "Mega-Kalos",
		types: ["Fairy", "Steel"],
		gender: "M",
		baseStats: {hp: 68, atk: 165, def: 125, spa: 65, spd: 95, spe: 100},
		abilities: {0: "Pixilate"},
		heightm: 1.6,
		weightkg: 56.4,
		requiredItem: "Galladite",
		battleOnly: "Gallade-Kalos",
	},
	stunfisk: {
		inherit: true,
		num: 44,
		abilities: {0: "Static", 1: "Regenerator", H: "Sand Veil"},
	},
	kommotot: {
		fusion: ['Kommo-o', 'Chatot'],
		num: 45,
		name: "Kommo-tot",
		types: ["Normal", "Dragon"],
		baseStats: {hp: 90, atk: 90, def: 85, spa: 96, spd: 90, spe: 90},
		abilities: {0: "Bulletpecks"},
		weightkg: 40.1,
	},
	toxily: {
		num: 46,
		name: "Toxily",
		types: ["Grass", "Poison"],
		baseStats: {hp: 110, atk: 70, def: 90, spa: 115, spd: 95, spe: 30},
		abilities: {0: "Ignorant"},
		weightkg: 36,
	},
	corundell: {
		num: 47,
		name: "Corundell",
		types: ["Electric", "Rock"],
		baseStats: {hp: 50, atk: 100, def: 150, spa: 50, spd: 100, spe: 105},
		abilities: {0: "Prankster", 1: "Rough Skin", H: "Sand Force"},
		weightkg: 89,
	},
	crazefly: {
		num: 48,
		name: "Crazefly",
		types: ["Bug", "Psychic"],
		baseStats: {hp: 115, atk: 115, def: 31, spa: 112, spd: 137, spe: 90},
		abilities: {0: "Galvanize", H: "Gooey"},
		weightkg: 17,
		eggGroups: ["Undiscovered"],
	},
	bisharp: {
		inherit: true,
		num: 49,
		otherFormes: ["Bisharp-Mega"],
		formeOrder: ["Bisharp", "Bisharp-Mega"],
	},
	bisharpmega: {
		num: 49,
		name: "Bisharp-Mega",
		baseSpecies: "Bisharp",
		forme: "Mega",
		types: ["Dark", "Steel"],
		baseStats: {hp: 65, atk: 155, def: 110, spa: 60, spd: 86, spe: 114},
		abilities: {0: "Executioner"},
		heightm: 1.6,
		weightkg: 70,
		color: "Red",
		eggGroups: ["Human-Like"],
		requiredItem: "Bisharpite",
	},
	zangoose: {
		inherit: true,
		evos: ["Undangoose"],
	},
	undangoose: {
		num: 50,
		name: "Undangoose",
		types: ["Normal", "Fighting"],
		baseStats: {hp: 83, atk: 130, def: 75, spa: 65, spd: 95, spe: 90},
		abilities: {0: "Poison Heal", H: "Toxic Boost"},
		heightm: 1.5,
		weightkg: 40.3,
		prevo: "Zangoose",
	},
	boreastra: {
		num: 51,
		name: "Boreastra",
		types: ["Ice", "Fairy"],
		baseStats: {hp: 77, atk: 111, def: 77, spa: 99, spd: 55, spe: 111},
		abilities: {0: "Illuminate", 1: "Levitate", H: "Victory Star"},
		weightkg: 0.1,
	},
	matsuru: {
		num: 52,
		name: "Matsuru",
		types: ["Flying", "Ghost"],
		baseStats: {hp: 70, atk: 55, def: 81, spa: 111, spd: 65, spe: 106},
		abilities: {0: "Intimidate", 1: "Big Pecks", H: "Serene Grace", S: "Low Flight"},
		weightkg: 24.5,
		eggGroups: ["Flying"],
	},
	dolphena: {
		num: 53,
		name: "Dolphena",
		types: ["Water", "Dragon"],
		baseStats: {hp: 79, atk: 60, def: 95, spa: 125, spd: 100, spe: 81},
		abilities: {0: "Hydration", H: "Mythical Presence"},
	},
	typhlosion: {
		inherit: true,
		num: 54,
		types: ["Fire", "Ground"],
		abilities: {0: "Blaze", H: "Neuroforce"},
	},
	hydreigon: {
		inherit: true,
		num: 55,
		baseStats: {hp: 92, atk: 105, def: 90, spa: 65, spd: 90, spe: 98},
		abilities: {0: "Bulletproof"},
	},
	froslass: {
		inherit: true,
		num: 56,
		baseStats: {hp: 70, atk: 100, def: 80, spa: 85, spd: 80, spe: 120},
		abilities: {0: "Snow Cloak", 1: "Regenerator", H: "Cursed Body"},
	},
	vespiquen: {
		inherit: true,
		otherFormes: ["vespiquenterra"],
	},
	vespiquenterra: {
		num: 57,
		name: "Vespiquen-Terra",
		baseSpecies: "Vespiquen",
		breedingVariant: "Gliscor",
		forme: "Terra",
		types: ["Bug", "Ground"],
		gender: "F",
		baseStats: {hp: 70, atk: 80, def: 102, spa: 80, spd: 102, spe: 67},
		abilities: {0: "Pressure", H: "Poison Heal"},
		height: 1.2,
		weightkg: 38.5,
		prevo: "combee",
		eggGroups: ["Bug"],
	},
	milotic: {
		inherit: true,
		otherFormes: ["Milotic-Alola"],
		formeOrder: ["Milotic", "Milotic-Alola"],
	},
	miloticalola: {
		num: 58,
		name: "Milotic-Alola",
		baseSpecies: "Milotic",
		forme: "Alola",
		types: ["Poison", "Electric"],
		baseStats: {hp: 95, atk: 60, def: 79, spa: 125, spd: 100, spe: 81},
		abilities: {0: "Levitate"},
		heightm: 6.2,
		weightkg: 162,
		color: "Pink",
		eggGroups: ["Water 1", "Dragon"],
	},
	enamorustherian: {
		num: 59,
		name: "Enamorus-Therian",
		types: ["Fairy", "Flying"],
		gender: "F",
		baseStats: {hp: 74, atk: 115, def: 110, spa: 135, spd: 100, spe: 46},
		abilities: {0: "Overcoat"},
		heightm: 1.6,
		weightkg: 48,
		color: "Brown",
		eggGroups: ["Undiscovered"],
	},
	grapploct: {
		inherit: true,
		num: 60,
		types: ["Fighting", "Water"],
		baseStats: {hp: 115, atk: 118, def: 90, spa: 70, spd: 80, spe: 42},
		abilities: {0: "Technician", H: "Poison Heal"},
	},
	highpriest: {
		num: 61,
		name: "High Priest",
		types: ["Psychic", "Steel"],
		gender: "N",
		baseStats: {hp: 73, atk: 77, def: 76, spa: 122, spd: 114, spe: 108},
		abilities: {0: "No Guard", H: "Kaliber's Fury"},
		color: "Red",
		heightm: 2,
		weightkg: 69,
	},
	firerock: {
		num: 62,
		name: "Firerock",
		types: ["Fire", "Rock"],
		baseStats: {hp: 70, atk: 85, def: 80, spa: 85, spd: 80, spe: 125},
		abilities: {0: "Blaze", H: "Magic Guard"},
		heightm: 3.8,
		weightkg: 199,
	},
	jungape: {
		num: 63,
		name: "Jungape",
		types: ["Normal", "Grass"],
		baseStats: {hp: 82, atk: 90, def: 116, spa: 67, spd: 76, spe: 79},
		abilities: {0: "Own Tempo", H: "Gorilla Tactics"},
		weightkg: 189,
	},
	dinodily: {
		num: 64,
		name: "Dinodily",
		types: ["Steel", "Dragon"],
		baseStats: {hp: 125, atk: 102, def: 74, spa: 90, spd: 61, spe: 148},
		abilities: {0: "Shell Armor", 1: "Delta Stream", H: "Battery"},
	},
	hatterene: {
		inherit: true,
		num: 65,
		otherFormes: ["Hatterene-Gmax"],
		formeOrder: ["Hatterene", "Hatterene-Gmax"],
	},
	hatterenegmax: {
		num: 65,
		name: "Hatterene-Gmax",
		baseSpecies: "Hatterene",
		forme: "Gmax",
		types: ["Psychic", "Fairy"],
		gender: "F",
		baseStats: {hp: 57, atk: 110, def: 110, spa: 151, spd: 153, spe: 29},
		abilities: {0: "Persistent"},
		heightm: 2.1,
		weightkg: 5.1,
		color: "Pink",
		eggGroups: ["Fairy"],
		requiredItem: "Hatterenite",
		gen: 8,
	},
	primeape: {
		inherit: true,
		num: 66,
		types: ["Fighting", "Ground"],
		baseStats: {hp: 75, atk: 115, def: 80, spa: 55, spd: 70, spe: 105},
		abilities: {0: "Vital Spirit", 1: "Anger Point", H: "Defiant"},
	},
	teslaple: {
		num: 67,
		name: "Teslaple",
		types: ["Electric", "Grass"],
		baseStats: {hp: 80, atk: 40, def: 120, spa: 120, spd: 40, spe: 120},
		abilities: {0: "Grass Pelt", 1: "Flower Veil", H: "Competitive"},
		weightkg: 0.1,
	},
	octapex: {
		fusion: ['Octillery', 'Toxapex'],
		num: 68,
		name: "Octapex",
		types: ["Water", "Poison"],
		baseStats: {hp: 72,	atk: 94, def: 123, spa: 89,	spd: 118, spe: 50},
		abilities: {0: "Veteran"},
		color: "Blue",
		heightm: 0.8,
		weightkg: 21.5,
		eggGroups: ["Water 1"],
	},
	idk: {
		num: 69,
		name: "idk",
		types: ["Dark", "Ghost"],
		baseStats: {hp: 90, atk: 72, def: 85, spa: 128, spd: 95, spe: 110},
		abilities: {0: "Mythic Swordsman"},
	},
	articlaus: {
		num: 70,
		name: "Articlaus",
		types: ["Ice", "Flying"],
		baseStats: {hp: 85, atk: 90, def: 80, spa: 65, spd: 80, spe: 120},
		abilities: {0: "Vital Spirit", 1: "Hustle", H: "Snow Warning"},
		heightm: 0.9,
		weightkg: 16,
		prevo: "Delibird",
		eggGroups: ["Water 1", "Field"],
	},
	mothim: {
		num: 71,
		inherit: true,
		types: ["Bug", "Fire"],
		gender: "M",
		baseStats: {hp: 80, atk: 110, def: 70, spa: 80, spd: 70, spe: 120},
		abilities: {0: "Swarm", H: "Tinted Lens"},
	},
	rampardos: {
		inherit: true,
		otherFormes: ["Rampardos-Cretaceous"],
		formeOrder: ["Rampardos", "Rampardos-Cretaceous"],
	},
	rampardoscretaceous: {
		num: 72,
		name: "Rampardos-Cretaceous",
		baseSpecies: "Rampardos",
		forme: "Cretaceous",
		types: ["Rock", "Normal"],
		baseStats: {hp: 107, atk: 125, def: 83, spa: 74, spd: 73, spe: 78},
		abilities: {0: "Rock Head", H: "Mold Breaker"},
		weightkg: 102.5,
	},
	borassa: {
		num: 73,
		name: "Borassa",
		types: ["Dark", "Grass"],
		baseStats: {hp: 136, atk: 76, def: 118, spa: 88, spd: 95, spe: 87},
		abilities: {0: "Thick Fat", 1: "Chlorophyll", H: "Anger Point"},
		weightkg: 143,
	},
	panthee: {
		num: 74,
		name: "Panthee",
		types: ["Steel", "Fighting"],
		baseStats: {hp: 78, atk: 83, def: 95, spa: 118, spd: 121, spe: 105},
		abilities: {0: "Sand Spit", H: "White Smoke"},
		weightkg: 300,
		eggGroups: ["Undiscovered"],
	},
	abomasnow: {
		inherit: true,
		num: 75,
		name: "Abomasnow",
		types: ["Ice", "Ground"],
		baseStats: {hp: 120, atk: 90, def: 120, spa: 130, spd: 120, spe: 60},
		abilities: {0: "Snow Warning", H: "Soundproof"},
	},
	cramorantalola: {
		num: 76,
		name: "Cramorant-Alola",
		types: ["Flying", "Poison"],
		baseStats: {hp: 75, atk: 85, def: 75, spa: 85, spd: 95, spe: 65},
		abilities: {0: "Gunk Missile"},
		heightm: 0.8,
		weightkg: 18,
		otherFormes: ["Cramorant-Gulping", "Cramorant-Gorging"],
		formeOrder: ["Cramorant", "Cramorant-Gulping", "Cramorant-Gorging"],
	},
	cramorantalolagulping: {
		num: 76,
		name: "Cramorant-Alola-Gulping",
		baseSpecies: "Cramorant-Alola",
		forme: "Gulping",
		types: ["Flying", "Poison"],
		baseStats: {hp: 75, atk: 85, def: 75, spa: 85, spd: 95, spe: 65},
		abilities: {0: "Gunk Missile"},
		heightm: 0.8,
		weightkg: 18,
		requiredAbility: "Gunk Missile",
		battleOnly: "Cramorant-Alola",
	},
	cramorantalolagorging: {
		num: 76,
		name: "Cramorant-Alola-Gorging",
		baseSpecies: "Cramorant-Alola",
		forme: "Gorging",
		types: ["Flying", "Poison"],
		baseStats: {hp: 75, atk: 85, def: 75, spa: 85, spd: 95, spe: 65},
		abilities: {0: "Gunk Missile"},
		heightm: 0.8,
		weightkg: 18,
		requiredAbility: "Gunk Missile",
		battleOnly: "Cramorant-Alola",
	},
	drednaw: {
		inherit: true,
		num: 77,
		otherFormes: ["Drednaw-Gmax"],
		formeOrder: ["Drednaw", "Drednaw-Gmax"],
	},
	drednawgmax: {
		num: 77,
		name: "Drednaw-Gmax",
		baseSpecies: "Drednaw",
		forme: "Gmax",
		types: ["Water", "Rock"],
		baseStats: {hp: 90, atk: 150, def: 115, spa: 58, spd: 78, spe: 94},
		abilities: {0: "Drizzle"},
		heightm: 1,
		weightkg: 115.5,
		color: "Green",
		eggGroups: ["Monster", "Water 1"],
		requiredItem: "Drednite",
		gen: 8,
	},
	xurkirat: {
		fusion: ['Xurkitree', 'Raticate'],
		num: 78,
		name: "Xurkirat",
		types: ["Electric", "Normal"],
		baseStats: {hp: 71, atk: 103, def: 73, spa: 113, spd: 73, spe: 97},
		abilities: {0: "Ultra Impulse"},
		weightkg: 59.3,
	},
	mesflame: {
		fusion: ['Mesprit', 'Talonflame'],
		num: 79,
		name: "Mesflame",
		types: ["Fire", "Psychic"],
		baseStats: {hp: 95, atk: 95, def: 95, spa: 95, spd: 95, spe: 104},
		abilities: {0: "Leviflame"},
		weightkg: 12.4,
	},
	gourgeistfae: {
		num: 80,
		name: "Gourgeist-Fae",
		types: ["Ghost", "Fairy"],
		baseStats: {hp: 90, atk: 80, def: 85, spa: 95, spd: 80, spe: 105},
		abilities: {0: "Prankster", H: "Magic Guard"},
		heightm: 0.7,
		weightkg: 9.5,
		eggGroups: ["Amorphous"],
	},
	odonaga: {
		num: 81,
		name: "Odonaga",
		types: ["Bug", "Dragon"],
		baseStats: {hp: 90, atk: 80, def: 90, spa: 130, spd: 110, spe: 100},
		abilities: {0: "Shell Armor", 1: "Sniper", H: "Compound Eyes"},
		weightkg: 50,
	},
	swampertanti: {
		num: 82,
		name: "Swampert-Anti",
		types: ["Grass", "Fairy"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 100, atk: 105, def: 95, spa: 80, spd: 85, spe: 65},
		abilities: {0: "Aroma Veil"},
		heightm: 1.5,
		weightkg: 81.9,
	},
	banjoandkazooie: {
		num: 83,
		name: "Banjo and Kazooie",
		types: ["Normal", "Flying"],
		baseStats: {hp: 90, atk: 120, def: 90, spa: 60, spd: 90, spe: 100},
		abilities: {0: "Honey Gather", 1: "Big Pecks", H: "Thick Fat"},
		heightm: 1.3,
		weightkg: 80,
	},
	polbearab: {
		num: 84,
		name: "Polbearab",
		types: ["Ice", "Fighting"],
		baseStats: {hp: 95, atk: 98, def: 130, spa: 55, spd: 101, spe: 101},
		abilities: {0: "Poison Heal"},
		weightkg: 135,
	},
	stalagmitar: {
		num: 85,
		name: "Stalagmitar",
		types: ["Rock","Ground"],
		baseStats: {hp: 100, atk: 100, def: 95, spa: 134, spd: 120, spe: 51},
		abilities: {0: "Sand Stream", H: "Sturdy"},
		heightm: 2.5,
		weightkg: 255,
		prevo: "pupitar",
	},
	psychicdragon: {
		num: 86,
		name: "psychicdragon",
		types: ["Psychic", "Dragon"],
		baseStats: {hp: 99, atk: 107, def: 75, spa: 81, spd: 75, spe: 113},
		abilities: {0: "Strong Jaw"},
	},
	elichric: {
		num: 87,
		name: "Elichric",
		types: ["Electric", "Dark"],
		baseStats: {hp: 95, atk: 52, def: 111, spa: 93, spd: 126, spe: 78},
		abilities: {0: "Levitate", 1: "Cursed Body", H: "Flash Fire"},
	},
	escavaliereiscue: {
		num: 88,
		name: "Escavalier-Eiscue",
		types: ["Bug", "Steel"],
		baseStats: {hp: 66, atk: 128, def: 100, spa: 57, spd: 100, spe: 19},
		abilities: {0: "Ice Face"},
		heightm: 1,
		weightkg: 33,
		otherFormes: ["Escavalier-Eiscue-Noice"],
		formeOrder: ["Escavalier-Eiscue", "Escavalier-Eiscue-Noice"],
	},
	escavaliereiscuenoice: {
		num: 88,
		name: "Escavalier-Eiscue-Noice",
		baseSpecies: "Escavalier-Eiscue",
		forme: "Noice",
		types: ["Bug", "Steel"],
		baseStats: {hp: 66, atk: 128, def: 60, spa: 57, spd: 60, spe: 99},
		abilities: {0: "Ice Face"},
		heightm: 1,
		weightkg: 33,
		requiredAbility: "Ice Face",
		battleOnly: "Eiscue",
	},
	waterghost: {
		num: 89,
		name: "waterghost",
		types: ["Water", "Ghost"],
		baseStats: {hp: 90, atk: 85, def: 70, spa: 105, spd: 105, spe: 70},
		abilities: {0: "Torrent", H: "Prankster"},
	},
	toxicargo: {
		fusion: ['Toxicroak', 'Magcargo'],
		num: 90,
		name: "Toxicargo",
		types: ["Fire", "Poison"],
		baseStats: {hp: 90, atk: 78, def: 92, spa: 89, spd: 92, spe: 57},
		abilities: {0: "Flaming Skin"},
		weightkg: 49.7,
	},
	heatloom: {
		fusion: ['Heatran', 'Breloom'],
		num: 91,
		species: "Heatloom",
		types: ["Steel", "Grass"],
		baseStats: {hp: 95, atk: 130, def: 93, spa: 95, spd: 83, spe: 73 },
		abilities: {0: "From Ashes"},
		heightm: 1.445,
		weightkg: 234.6,
	},
	drampaschroedinger: {
		num: 92,
		name: "Drampa-Schroedinger",
		baseSpecies: "Drampa",
		breedingVariant: "Dragapult",
		forme: "Schroedinger",
		types: ["Normal", "Ghost"],
		baseStats: {hp: 78, atk: 60, def: 85, spa: 135, spd: 91, spe: 89},
		abilities: {0: "Berserk", 1: "Sap Sipper", H: "Infiltrator"},
		weightkg: 185,
	},
	gigacrab: {
		fusion: ['Gigalith', 'Crabominable'],
		num: 93,
		name: "Gigacrab",
		types: ["Fighting", "Rock"],
		baseStats: {hp: 105, atk: 150, def: 105, spa: 65, spd: 75, spe: 35},
		abilities: {0: "Sand Bubbler"},
		weightkg: 220,
	},
	cougaquil: {
		num: 94,
		name: "Cougaquil",
		types: ["Ice", "Electric"],
		baseStats: {hp: 70, atk: 112, def: 70, spa: 90, spd: 60, spe: 113},
		abilities: {0: "Snow Cloak", 1: "Slush Rush", H: "Moxie"},
		weightkg: 60,
	},
	latias: {
		num: 95,
		inherit: true,
		types: ["Dragon", "Fairy"],
	},
	landorustherian: {
		num: 96,
		inherit: true,
	},
	golisopod: {
		num: 97,
		inherit: true,
		baseStats: {hp: 75, atk: 125, def: 140, spa: 60, spd: 110, spe: 40},
	},
	chatot: {
		num: 98,
		inherit: true,
		types: ["Dark", "Fire"],
		baseStats: {hp: 80, atk: 102, def: 75, spa: 100, spd: 72, spe: 101},
		abilities: {0: "Soundproof", 1: "Prankster", H: "Debilitate"},
	},
	gastrodon: {
		num: 99,
		inherit: true,
		otherFormes: ["Gastrodon-Entity-East"],
		formeOrder: ["Gastrodon", "Gastrodon-East", "Gastrodon-Entity-East"],
	},
	gastrodonentityeast: {
		num: 99,
		name: "Gastrodon-Entity-East",
		baseSpecies: "Gastrodon",
		forme: "Entity-East",
		types: ["Poison", "Psychic"],
		baseStats: {hp: 100, atk: 55, def: 90, spa: 100, spd: 80, spe: 50},
		abilities: {0: "Gooey", H: "Neuroforce"},
		weightkg: 29.9,
		prevo: "Shellos-Entity",
	},
	lycanperiordusk: {
        fusion: ['Lycanroc-Dusk', 'Serperior'],
		num: 100,
		name: "Lycanperior-Dusk",
		types: ["Rock", "Grass"],
		genderRatio: {M: 0.75, F: 0.25},
		baseStats: {hp: 85, atk: 106, def: 90, spa: 75, spd: 90, spe: 121},
		abilities: {0: "Lethal Leafage"},
		heightm: 2.0,
		weightkg: 44.0,
    },
	yoshiblaze: {
		num: 101,
		name: "Yoshiblaze",
		types: ["Fire", "Fighting"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 60, atk: 85, def: 60, spa: 85, spd: 60, spe: 55},
		abilities: {0: "Blaze", H: "Speed Boost"},
		heightm: 0.9,
		weightkg: 19.5,
		evos: ["Blaziken"],
		otherFormes: ["Yoshiblaze-Mega"],
		formeOrder: ["Yoshiblaze", "Yoshiblaze-Mega"],
	},
	yoshiblazemega: {
		num: 101,
		name: "Yoshiblaze-Mega",
		baseSpecies: "Yoshiblaze",
		forme: "Mega",
		types: ["Fire", "Fighting"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 60, atk: 115, def: 70, spa: 105, spd: 60, spe: 95},
		abilities: {0: "Evolution Burst"},
		heightm: 1.9,
		weightkg: 52,
		requiredMove: "Yoshi Shield",
	},
	xataskewda: {
		fusion: ["Xatu", "Barraskewda"],
		num: 102,
		name: "Xataskewda",
		types:["Psychic", "Water"],
		baseStats: {hp: 65, atk: 100, def: 72, spa: 95, spd: 72, spe: 115},
		abilities: {0: "Wet Reflection"},
		weightkg: 22.5,
	},
	skuntank: {
		num: 103,
		inherit: true,
		name: "Skuntank",
		types: ["Poison", "Dark"],
		baseStats: {hp: 103, atk: 93, def: 87, spa: 71, spd: 87, spe: 94},
		abilities: {0: "Neutralizing Gas", 1: "Aftermath", H: "Merciless"},
	},
	garchomp: {
		num: 104,
		inherit: true,
		abilities: {0: "Sand Veil (Jolte)", H: "Rough Skin"},
	},
	munchlax: {
		num: 105,
		inherit: true,
		types: ["Normal", "Fairy"],
		baseStats: {hp: 135, atk: 100, def: 80, spa: 60, spd: 100, spe: 65},
		evos: null,
	},
	vi: {
		num: 106,
		name: "Vi", /* Bug Fables */
		types: ["Bug", "Flying"],
		gender: "F",
		baseStats: {hp: 78, atk: 117, def: 65, spa: 55, spd: 70, spe: 115},
		abilities: {0: "Skill Link", 1: "Harvest", H: "Long Reach"},
		heightm: 0.1,
		weightkg: 0.1,
	},
	ninetalesalola: {
		num: 107,
		name: "Ninetales-Alola",
		types: ["Ice", "Steel"],
		genderRatio: {M: 0.25, F: 0.75},
		baseStats: {hp: 80, atk: 90, def: 85, spa: 120, spd: 85, spe: 100},
		abilities: {0: "Slush Rush", 1: "Air Lock", H: "Snow Warning"},
		heightm: 1.1,
		weightkg: 19.9,
		eggGroups: ["Field"],
		inherit: true,
	},
  porygonz: {
    inherit: true,
	 num: 108,
    types: ["Electric", "Ghost"],
  },
	firefairy: {
		num: 109,
		name: "firefairy",
		types: ["Fire", "Fairy"],
		baseStats: {hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100},
		abilities: {0: "Divine Grace"},
		weightkg: 1,
	},
	vulclairis: {
		num: 110,
		name: "Vulclairis",
		types: ["Normal", "Psychic"],
		baseStats: {hp: 100, atk: 50, def: 100, spa: 100, spd: 100, spe: 50},
		abilities: {0: "Immunity", 1: "Water Absorb", H: "All-Seeing Eye"},
		weightkg: 1,
	},
	thunjust: {
		num: 111,
		name: "Thunjust",
		types: ["Electric", "Flying"],
		baseStats: {hp: 90, atk: 86, def: 120, spa: 82, spd: 78, spe: 74},
		abilities: {0: "Static", 1: "Justified", H: "Retribution"},
		weightkg: 1,
		otherFormes: ["Thunjust-Super"],
		formeOrder: ["Thunjust", "Thunjust", "Thunjust-Super"],
	},
	thunjustsuper: {
		num: 111,
		name: "Thunjust-Super",
		baseSpecies: "Thunjust",
		forme: "Super",
		types: ["Electric", "Flying"],
		baseStats: {hp: 90, atk: 136, def: 120, spa: 132, spd: 78, spe: 84},
		abilities: {0: "Retribution"},
		weightkg: 1,
		requiredAbility: "Retribution",
		battleOnly: "Thunjust",
	},
	ninjoth: {
		num: 112,
		name: "Ninjoth",
		types: ["Ice", "Dark"],
		baseStats: {hp: 88, atk: 132, def: 56, spa: 66, spd: 159, spe: 99},
		abilities: {0: "Rattled", 1: "Reckless", H: "Liquid Ooze"},
		weightkg: 75,
		eggGroups: ["Undiscovered"],
	},
	croakorrode: {
		num: 113,
		name: "Croakorrode",
		types: ["Poison", "Fighting"],
		baseStats: {hp: 93, atk: 116, def: 75, spa: 86, spd: 75, spe: 95},
		abilities: {0: "Dry Skin", 1: "Solid Rock", H: "Tough Claws"},
		heightm: 2,
		weightkg: 65,
		prevo: "Toxicroak",
	},
	yellowwollywog: {
		num: 114,
		name: "Yellow Wollywog",
		types: ["Water", "Ground"],
		baseStats: {hp: 100, atk: 110, def: 75, spa: 65, spd: 90, spe: 80},
		abilities: {0: "Thick Fat", 1: "Hydration", H: "Simple"},
		weightkg: 1,
	},
	serpaint: {
		num: 115,
		name: "Serpaint",
		types: ["Dragon", "Ghost"],
		baseStats: {hp: 86, atk: 94, def: 60, spa: 123, spd: 90, spe: 72},
		abilities: {0: "Infiltrator", H: "Shadow Shield"},
		weightkg: 4,
	},
	salamalix: {
		num: 116,
		name: "Salamalix",
		types: ["Rock", "Steel"],
		baseStats: {hp: 70, atk: 120, def: 120, spa: 45, spd: 65, spe: 90},
		abilities: {0: "No Guard", 1: "Sand Force", H: "Intimidate"},
		weightkg: 85,
	},
	butterfree: {
    	inherit: true,
		num: 117,
		name: "Butterfree",
		types: ["Bug", "Grass"],
		baseStats: {hp: 75, atk: 90, def: 90, spa: 90, spd: 110, spe: 100},
		abilities: {0: "Compound Eyes", H: "Triage"},
		weightkg: 32,
	},
	draxplosion: {
		num: 120,
		name: "Draxplosion",
		types: ["Fire", "Dragon"],
		baseStats: {hp: 70, atk: 120, def: 107, spa: 60, spd: 70, spe: 92},
		abilities: {0: "Illuminate", H: "Mold Breaker"},
		weightkg: 87,
	}, 
	aegislashancient: {
		num: 118,
		name: "Aegislash-Ancient",
		baseSpecies: "Aegislash",
		forme: "Ancient",
		types: ["Grass", "Ghost"],
		baseStats: {hp: 70, atk: 50, def: 110, spa: 50, spd: 110, spe: 110},
		abilities: {0: "Tactics Change"},
		weightkg: 53,
	},
	aegislashancienthunter: {
		num: 118,
		name: "Aegislash-Ancient-Hunter",
		baseSpecies: "Aegislash",
		forme: "Ancient-Hunter",
		types: ["Grass", "Ghost"],
		baseStats: {hp: 70, atk: 110, def: 50, spa: 110, spd: 50, spe: 110},
		abilities: {0: "Tactics Change"},
		weightkg: 53,
		requiredAbility: "Tactics Change",
		battleOnly: "Aegislash-Ancient",
	},
	pepsiman: {
		num: 119,
		name: "Pepsiman",
		types: ["Water", "Steel"],
		baseStats: {hp: 95, atk: 90, def: 115, spa: 70, spd: 70, spe: 125},
		abilities: {0: "Klutz", 1: "Dry Skin", H: "Refreshment"},
		weightkg: 79,
	}, 
	blastor: {
		num: 120,
		name: "Blastor",
		types: ["Bug", "Electric"],
		baseStats: {hp: 70, atk: 70, def: 95, spa: 115, spd: 55, spe: 95},
		abilities: {0: "Battery", H: "Mega Launcher"},
		weightkg: 118,
	}, 
	valcondor: {
		num: 121,
		name: "Valcondor",
		types: ["Flying", "Fighting"],
		baseStats: {hp: 75, atk: 110, def: 85, spa: 88, spd: 138, spe: 59},
		abilities: {0: "Big Pecks", H: "Sheer Force"},
		weightkg: 72.2,
	},
	sylveon: {
		inherit: true,
		num: 122,
	   types: ["Fairy", "Ground"],
		baseStats: {hp: 95, atk: 65, def: 80, spa: 110, spd: 130, spe: 60},
	},
	norn: { //done
		//fusion: ['Porygon2', 'Dragalge'],
		num: 123,
		name: "Norn",
		types: ["Normal", "Poison"],
		baseStats: {hp: 90, atk: 90, def: 90, spa: 110, spd: 110, spe: 54},
		abilities: {0: "Nocturnal Flash"},
		weightkg: 57,
	},
	orceyeofgruumsh: {
		num: 124,
		name: "Orc Eye of Gruumsh",
		types: ["Dark", "Psychic"],
		baseStats: {hp: 80, atk: 130, def: 100, spa: 50, spd: 80, spe: 75},
		abilities: {0: "Intimidate", H: "Long Reach"},
		weightkg: 200,
	},
	aurorus: {
		inherit: true,
		num: 125,
		baseStats: {hp: 123, atk: 90, def: 85, spa: 101, spd: 100, spe: 58},
		abilities: {0: "Long Reach", 1: "Refrigerate", H: "Snow Warning"},
	},
	abhornet: {
		num: 126,
		name: "Abhornet",
		types: ["Bug","Poison"],
		baseStats: {hp: 65, atk: 120, def: 50, spa: 15, spd: 80, spe: 135},
		abilities: {0: "Adaptability", H: "Sniper"},
		heightm: 1.4,
		weightkg: 40.5,
		prevo: "beedrill",
	},
	breloom: {
		inherit: true,
		num: 127,
		abilities: {0: "Toxic Boost (Jolte)", 1: "Technician", H: "Poison Heal"},
	},
	aquazelle: {
		num: 128,
		name: "Aquazelle",
		types: ["Normal", "Water"],
		baseStats: {hp: 107, atk: 53, def: 83, spa: 123, spd: 97, spe: 137},
		abilities: {0: "Heatproof", 1: "Aerilate", H: "Corrosion"},
		weightkg: 5,
		eggGroups: ["Undiscovered"],
	},
	yaciancrowned: {
		// fusion: ['Yamask-Galar', 'Zacian'],
		num: 129,
		name: "Yacian-Crowned",
		types: ["Ground", "Steel"],
		baseStats: {hp: 67, atk: 130, def: 100, spa: 55, spd: 100, spe: 99},
		abilities: {0: "Pillage"},
		weightkg: 178.3,
	},
	golevishalola: {
		// fusion: ['Golem-Alola', 'Dracovish'],
		num: 130,
		name: "Golevish-Alola",
		types: ["Electric", "Dragon"],
		baseStats: {hp: 100, atk: 110, def: 123, spa: 62, spd: 75, spe: 60},
		abilities: {0: "Terabyte"},
		weightkg: 265.5,
	},
	balammit: {
		num: 131,
		name: "Balammit",
		types: ["Ghost", "Rock"],
		baseStats: {hp: 120, atk: 100, def: 80, spa: 115, spd: 85, spe: 80},
		abilities: {0: "Soul-Heart"},
		weightkg: 200,
	},
	manicunogalar: {
		fusion: ['Articuno-Galar', 'Darmanitan-Galar'],
		num: 132,
		name: "Manicuno-Galar",
		types: ["Ice", "Psychic"],
		baseStats: {hp: 100, atk: 112, def: 74, spa: 97, spd: 88, spe: 97},
		abilities: {0: "Fowl Behavior"},
		weightkg: 85.5,
	},
	dragapult: {
		inherit: true,
		num: 133,
		otherFormes: ["Dragapult-Anti"],
		formeOrder: ["Dragapult", "Dragapult-Anti"],
	},
	dragapultanti: {
		num: 133,
		name: "Dragapult-Anti",
		baseSpecies: "Dragapult",
		forme: "Anti",
		types: ["Dark", "Fairy"],
		baseStats: {hp: 89, atk: 100, def: 105, spa: 100, spd: 111, spe: 95},
		abilities: {0: "Bad Dreams", 1: "Suction Cups", 2: "Skill Link"},
		weightkg: 50,
	},
	talonflame: {
		inherit: true,
		num: 134,
		name: "Talonflame",
		baseStats: {hp: 90, atk: 85, def: 75, spa: 115, spd: 100, spe: 115},
	},
	nihilego: {
		inherit: true,
		num: 135,
		name: "Nihilego",
		types: ["Steel", "Poison"],
		baseStats: {hp: 79, atk: 53, def: 131, spa: 97, spd: 67, spe: 113},
		abilities: {0: "Clear Body", H: "Short Circuit"},
	},
	frozalisk: {
		num: 14,
		name: "Frozalisk",
		types: ["Ice", "Grass"],
		baseStats: {hp: 100, atk: 110, def: 85, spa: 65, spd: 112, spe: 91},
		abilities: {0: "Soundproof", 1: "Slush Rush", H: "Speed Boost"},
	},
	mimikyu: {
		num: 778,
		name: "Mimikyu",
		types: ["Electric", "Fairy"],
		baseStats: {hp: 60, atk: 70, def: 110, spa: 90, spd: 145, spe: 75},
		abilities: {0: "Dazzling", H: "Regenerator"},
		heightm: 0.2,
		weightkg: 0.7,
		eggGroups: ["Amorphous"],
	},
};
