export const Items: {[itemid: string]: ModdedItemData} = {
	bignugget: {
		name: "Big Nugget",
		fling: {
			basePower: 30,
		},
		num: -1001,
		gen: 5,
		desc: "Highly valuable item.", 
	},
	itchypollen: {
		name: "Itchy Pollen",
		fling: {
			basePower: 30,
		},
		onResidualOrder: 5,
		onResidualSubOrder: 5,
		onResidual(pokemon) {
			if (this.field.isTerrain('grassyterrain')) return;
			if (pokemon.hasType('Bug') || pokemon.hasType('Grass')) {
				this.heal(pokemon.baseMaxhp / 16);
			} else {
				this.damage(pokemon.baseMaxhp / 8);
			}
		},
		onTerrain(pokemon) {
			if (!this.field.isTerrain('grassyterrain')) return;
			if (pokemon.hasType('Bug') || pokemon.hasType('Grass')) {
				this.heal(pokemon.baseMaxhp / 16);
			} else {
				this.damage(pokemon.baseMaxhp / 8);
			}
		},
		num: -1002,
		gen: 9,
	},
	ragecandybar: {
		name: "Rage Candy Bar",
		fling: {
			basePower: 20,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.baseSpecies.num === 555 && (move.type === 'Fire' || move.type === 'Psychic')) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 555) || pokemon.baseSpecies.num === 555) {
				return false;
			}
			return true;
		},
		forcedForme: "Darmanitan-Zen",
		itemUser: ["Darmanitan-Zen"],
		num: -1003,
		gen: 9,
		desc: "Turns Darmanitan into Darmanitan-Zen. Boosts Fire and Psychic attacks by 20%.",
	},
	filthyseed: {
		name: "Filthy Seed",
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isTerrain('filthyterrain')) {
				pokemon.useItem();
			}
		},
		onAnyTerrainStart() {
			const pokemon = this.effectData.target;
			if (this.field.isTerrain('filthyterrain')) {
				pokemon.useItem();
			}
		},
		boosts: {
			def: 1,
		},
		num: -1004,
		gen: 9,
	},
	swarmingseed: {
		name: "Swarming Seed",
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isTerrain('swarmingterrain')) {
				pokemon.useItem();
			}
		},
		onAnyTerrainStart() {
			const pokemon = this.effectData.target;
			if (this.field.isTerrain('swarmingterrain')) {
				pokemon.useItem();
			}
		},
		boosts: {
			spd: 1,
		},
		num: -1005,
		gen: 9,
	},
	whippeddream: {
		inherit: true,
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Swirlix' || pokemon.baseSpecies.baseSpecies === 'Slurpuff') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Slurpuff", "Swirlix"],
	},
	dapperglove: {
		name: "Dapper Glove",
		fling: {
			basePower: 30,
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Fistiscuff' || pokemon.baseSpecies.baseSpecies === 'Elegent' ||
				pokemon.baseSpecies.baseSpecies === 'fistiscuff' || pokemon.baseSpecies.baseSpecies === 'elegent') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Elegent", "Fistiscuff"],
		num: -1006,
		gen: 9,
	},
	strangerunes: {
		name: "Strange Runes",
		fling: {
			basePower: 60,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.baseSpecies.num === 201 && (move.id === 'hiddenpower')) {
				return this.chainModify(1.5);
			}
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 201) || pokemon.baseSpecies.num === 201) {
				return false;
			}
			return true;
		},
		forcedForme: "Unown-Omega",
		itemUser: ["Unown-Omega"],
		num: -1007,
		gen: 9,
	},
	oddkeystone: {
		name: "Odd Keystone",
		fling: {
			basePower: 40,
		},
		onModifyCritRatio(critRatio, user) {
			if (user.baseSpecies.name === 'Spiritomb') {
				return critRatio + 2;
			}
		},
		itemUser: ["Spiritomb"],
		num: -1008,
		gen: 9,
	},
	primscissors: {
		name: "Prim Scissors",
		fling: {
			basePower: 30,
		},
		onModifySpePriority: 2,
		onModifySpe(spe, pokemon) {
			if (pokemon.baseSpecies.name === 'Morostache' || pokemon.baseSpecies.name === 'morostache') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Morostache"],
		num: -1009,
		gen: 9,
	},
	hairtonic: {
		name: "Hair Tonic",
		fling: {
			basePower: 30,
		},
		onModifyDefPriority: 1,
		onModifyDef(def, pokemon) {
			if (pokemon.baseSpecies.name === 'Morostache' || pokemon.baseSpecies.name === 'morostache') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Morostache"],
		num: -1010,
		gen: 9,
	},
	palette: {
		name: "Palette",
		fling: {
			basePower: 30,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.baseSpecies.num === 235 && (move.type !== 'Normal')) {
				return this.chainModify(1.5);
			}
		},
		itemUser: ["Smeargle"],
		num: -1011,
		gen: 9,
	},
	weathervane: {
		name: "Weather Vane",
		fling: {
			basePower: 30,
		},
		onAfterMoveSecondarySelf(target, source, move) {
			if (move.id === 'sunnyday' || move.id === 'raindance' || move.id === 'sandstorm' || move.id === 'snowscape') {
				target.useItem();
			}
		},
		boosts: {
			spe: 1,
			accuracy: 1,
		},
		num: -1012,
		gen: 9,
		desc: "Raises holder's Speed and accuracy after using a weather-setting move. Single use.",
	},
	punchingglove: {
		inherit: true,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Punching Glove boost');
				return this.chainModify(1.2);
			}
		},
	},
	razorclaw: {
		name: "Razor Claw",
		spritenum: 382,
		fling: {
			basePower: 80,
		},
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['slicing']) {
				this.debug('Razor Claw boost');
				return this.chainModify(1.2);
			}
		},
		onModifyMovePriority: 1,
		onModifyMove(move) {
			if (move.flags['slicing']) delete move.flags['contact'];
		},
		num: 326,
		gen: 4,
		desc: "Holder's slicing moves are boosted by 20% and don't make contact. Evolves Sneasel into Weavile when held and leveled up during the night.",
		shortDesc: "Holder's slicing moves are boosted by 20% and don't make contact.",
	},
	razorfang: {
		name: "Razor Fang",
		spritenum: 383,
		fling: {
			basePower: 30,
		},
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bite']) {
				this.debug('Razor Fang boost');
				return this.chainModify(1.2);
			}
		},
		onModifyMovePriority: 1,
		onModifyMove(move) {
			if (move.flags['bite']) delete move.flags['contact'];
		},
		num: 327,
		gen: 4,
		desc: "Holder's biting moves are boosted by 20% and don't make contact. Evolves Gligar into Gliscor when held and leveled up during the night.",
		shortDesc: "Holder's biting moves are boosted by 20% and don't make contact.",
	},
};