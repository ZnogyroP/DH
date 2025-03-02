/* eslint max-len: ["error", 240] */

import {Dex, toID} from '../../../sim/dex';
import {PRNG, PRNGSeed} from '../../../sim/prng';

export interface TeamData {
	typeCount: {[k: string]: number};
	typeComboCount: {[k: string]: number};
	baseFormes: {[k: string]: number};
	megaCount: number;
	zCount?: number;
	has: {[k: string]: number};
	forceResult: boolean;
	weaknesses: {[k: string]: number};
	resistances: {[k: string]: number};
	weather?: string;
	eeveeLimCount?: number;
}

export class RandomTeams {
	dex: ModdedDex;
	gen: number;
	factoryTier: string;
	format: Format;
	prng: PRNG;

	constructor(format: Format | string, prng: PRNG | PRNGSeed | null) {
		format = Dex.getFormat(format);
		this.dex = Dex.forFormat(format);
		this.gen = this.dex.gen;

		this.factoryTier = '';
		this.format = format;
		this.prng = prng && !Array.isArray(prng) ? prng : new PRNG(prng);
	}

	setSeed(prng?: PRNG | PRNGSeed) {
		this.prng = prng && !Array.isArray(prng) ? prng : new PRNG(prng);
	}

	getTeam(options?: PlayerOptions | null): PokemonSet[] {
		const generatorName = typeof this.format.team === 'string' && this.format.team.startsWith('random') ? this.format.team + 'Team' : '';
		// @ts-ignore
		return this[generatorName || 'randomTeam'](options);
	}

	randomChance(numerator: number, denominator: number) {
		return this.prng.randomChance(numerator, denominator);
	}

	sample<T>(items: readonly T[]): T {
		return this.prng.sample(items);
	}

	random(m?: number, n?: number) {
		return this.prng.next(m, n);
	}

	/**
	 * Remove an element from an unsorted array significantly faster
	 * than .splice
	 */
	fastPop(list: any[], index: number) {
		// If an array doesn't need to be in order, replacing the
		// element at the given index with the removed element
		// is much, much faster than using list.splice(index, 1).
		const length = list.length;
		const element = list[index];
		list[index] = list[length - 1];
		list.pop();
		return element;
	}

	/**
	 * Remove a random element from an unsorted array and return it.
	 * Uses the battle's RNG if in a battle.
	 */
	sampleNoReplace(list: any[]) {
		const length = list.length;
		const index = this.random(length);
		return this.fastPop(list, index);
	}

	// checkAbilities(selectedAbilities, defaultAbilities) {
	// 	if (!selectedAbilities.length) return true;
	// 	const selectedAbility = selectedAbilities.pop();
	// 	const isValid = false;
	// 	for (const i = 0; i < defaultAbilities.length; i++) {
	// 		const defaultAbility = defaultAbilities[i];
	// 		if (!defaultAbility) break;
	// 		if (defaultAbility.includes(selectedAbility)) {
	// 			defaultAbilities.splice(i, 1);
	// 			isValid = this.checkAbilities(selectedAbilities, defaultAbilities);
	// 			if (isValid) break;
	// 			defaultAbilities.splice(i, 0, defaultAbility);
	// 		}
	// 	}
	// 	if (!isValid) selectedAbilities.push(selectedAbility);
	// 	return isValid;
	// }
	// hasMegaEvo(species) {
	// 	if (!species.otherFormes) return false;
	// 	const firstForme = this.dex.getSpecies(species.otherFormes[0]);
	// 	return !!firstForme.isMega;
	// }
	randomCCTeam(): RandomTeamsTypes.RandomSet[] {
		const dex = this.dex;
		const team = [];

		const natures = Object.keys(this.dex.data.Natures);
		const items = Object.keys(this.dex.data.Items);

		const random6 = this.random6Pokemon();

		for (let i = 0; i < 6; i++) {
			let forme = random6[i];
			let species = dex.getSpecies(forme);
			if (species.isNonstandard) species = dex.getSpecies(species.baseSpecies);

			// Random legal item
			let item = '';
			if (this.gen >= 2) {
				do {
					item = this.sample(items);
				} while (this.dex.getItem(item).gen > this.gen || this.dex.data.Items[item].isNonstandard);
			}

			// Make sure forme is legal
			if (species.battleOnly) {
				if (typeof species.battleOnly === 'string') {
					species = dex.getSpecies(species.battleOnly);
				} else {
					species = dex.getSpecies(this.sample(species.battleOnly));
				}
				forme = species.name;
			} else if (species.requiredItems && !species.requiredItems.some(req => toID(req) === item)) {
				if (!species.changesFrom) throw new Error(`${species.name} needs a changesFrom value`);
				species = dex.getSpecies(species.changesFrom);
				forme = species.name;
			}

			// Make sure that a base forme does not hold any forme-modifier items.
			let itemData = this.dex.getItem(item);
			if (itemData.forcedForme && forme === this.dex.getSpecies(itemData.forcedForme).baseSpecies) {
				do {
					item = this.sample(items);
					itemData = this.dex.getItem(item);
				} while (itemData.gen > this.gen || itemData.isNonstandard || itemData.forcedForme && forme === this.dex.getSpecies(itemData.forcedForme).baseSpecies);
			}

			// Random legal ability
			const abilities = Object.values(species.abilities).filter(a => this.dex.getAbility(a).gen <= this.gen);
			const ability: string = this.gen <= 2 ? 'None' : this.sample(abilities);

			// Four random unique moves from the movepool
			let moves;
			let pool = ['struggle'];
			if (forme === 'Smeargle') {
				pool = Object.keys(this.dex.data.Moves).filter(moveid => {
					const move = this.dex.data.Moves[moveid];
					return !(move.isNonstandard || move.isZ || move.isMax || move.realMove);
				});
			} else {
				let learnset = this.dex.data.Learnsets[species.id] && this.dex.data.Learnsets[species.id].learnset && !['gastrodoneast', 'pumpkaboosuper', 'zygarde10'].includes(species.id) ?
					this.dex.data.Learnsets[species.id].learnset :
					this.dex.data.Learnsets[this.dex.getSpecies(species.baseSpecies).id].learnset;
				if (learnset) {
					pool = Object.keys(learnset).filter(
						moveid => learnset![moveid].find(learned => learned.startsWith(String(this.gen)))
					);
				}
				if (species.changesFrom) {
					learnset = this.dex.data.Learnsets[toID(species.changesFrom)].learnset;
					const basePool = Object.keys(learnset!).filter(
						moveid => learnset![moveid].find(learned => learned.startsWith(String(this.gen)))
					);
					pool = [...new Set(pool.concat(basePool))];
				}
			}
			if (pool.length <= 4) {
				moves = pool;
			} else {
				moves = [this.sampleNoReplace(pool), this.sampleNoReplace(pool), this.sampleNoReplace(pool), this.sampleNoReplace(pool)];
			}

			// Random EVs
			const evs: StatsTable = {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0};
			const s: StatName[] = ["hp", "atk", "def", "spa", "spd", "spe"];
			let evpool = 510;
			do {
				const x = this.sample(s);
				const y = this.random(Math.min(256 - evs[x], evpool + 1));
				evs[x] += y;
				evpool -= y;
			} while (evpool > 0);

			// Random IVs
			const ivs = {hp: this.random(32), atk: this.random(32), def: this.random(32), spa: this.random(32), spd: this.random(32), spe: this.random(32)};

			// Random nature
			const nature = this.sample(natures);

			// Level balance--calculate directly from stats rather than using some silly lookup table
			const mbstmin = 1307; // Sunkern has the lowest modified base stat total, and that total is 807

			let stats = species.baseStats;
			// If Wishiwashi, use the school-forme's much higher stats
			if (species.baseSpecies === 'Wishiwashi') stats = Dex.getSpecies('wishiwashischool').baseStats;

			// Modified base stat total assumes 31 IVs, 85 EVs in every stat
			let mbst = (stats["hp"] * 2 + 31 + 21 + 100) + 10;
			mbst += (stats["atk"] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats["def"] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats["spa"] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats["spd"] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats["spe"] * 2 + 31 + 21 + 100) + 5;

			let level = Math.floor(100 * mbstmin / mbst); // Initial level guess will underestimate

			while (level < 100) {
				mbst = Math.floor((stats["hp"] * 2 + 31 + 21 + 100) * level / 100 + 10);
				mbst += Math.floor(((stats["atk"] * 2 + 31 + 21 + 100) * level / 100 + 5) * level / 100); // Since damage is roughly proportional to level
				mbst += Math.floor((stats["def"] * 2 + 31 + 21 + 100) * level / 100 + 5);
				mbst += Math.floor(((stats["spa"] * 2 + 31 + 21 + 100) * level / 100 + 5) * level / 100);
				mbst += Math.floor((stats["spd"] * 2 + 31 + 21 + 100) * level / 100 + 5);
				mbst += Math.floor((stats["spe"] * 2 + 31 + 21 + 100) * level / 100 + 5);

				if (mbst >= mbstmin) break;
				level++;
			}

			// Random happiness
			const happiness = this.random(256);

			// Random shininess
			const shiny = this.randomChance(1, 256);

			team.push({
				name: species.baseSpecies,
				species: species.name,
				gender: species.gender,
				item: item,
				ability: ability,
				moves: moves,
				evs: evs,
				ivs: ivs,
				nature: nature,
				level: level,
				happiness: happiness,
				shiny: shiny,
			});
		}

		return team;
	}

	random6Pokemon() {
		// Pick six random pokemon--no repeats, even among formes
		// Also need to either normalize for formes or select formes at random
		// Unreleased are okay but no CAP
		const last = [0, 151, 251, 386, 493, 649, 721, 807, 890][this.gen];

		const pool: number[] = [];
		for (const id in this.dex.data.FormatsData) {
			if (!this.dex.data.Pokedex[id] || this.dex.data.FormatsData[id].isNonstandard && this.dex.data.FormatsData[id].isNonstandard !== 'Unobtainable') continue;
			const num = this.dex.data.Pokedex[id].num;
			if (num <= 0 || pool.includes(num)) continue;
			if (num > last) break;
			pool.push(num);
		}

		const hasDexNumber: {[k: string]: number} = {};
		for (let i = 0; i < 6; i++) {
			const num = this.sampleNoReplace(pool);
			hasDexNumber[num] = i;
		}

		const formes: string[][] = [[], [], [], [], [], []];
		for (const id in this.dex.data.Pokedex) {
			if (!(this.dex.data.Pokedex[id].num in hasDexNumber)) continue;
			const species = this.dex.getSpecies(id);
			if (species.gen <= this.gen && (!species.isNonstandard || species.isNonstandard === 'Unobtainable')) {
				formes[hasDexNumber[species.num]].push(species.name);
			}
		}

		const sixPokemon = [];
		for (let i = 0; i < 6; i++) {
			if (!formes[i].length) {
				throw new Error("Invalid pokemon gen " + this.gen + ": " + JSON.stringify(formes) + " numbers " + JSON.stringify(hasDexNumber));
			}
			sixPokemon.push(this.sample(formes[i]));
		}
		return sixPokemon;
	}

	randomHCTeam(): PokemonSet[] {
		const team = [];

		const itemPool = Object.keys(this.dex.data.Items);
		const abilityPool = Object.keys(this.dex.data.Abilities);
		const movePool = Object.keys(this.dex.data.Moves);
		const naturePool = Object.keys(this.dex.data.Natures);

		const random6 = this.random6Pokemon();

		for (let i = 0; i < 6; i++) {
			// Choose forme
			const species = this.dex.getSpecies(random6[i]);

			// Random unique item
			let item = '';
			if (this.gen >= 2) {
				do {
					item = this.sampleNoReplace(itemPool);
				} while (this.dex.getItem(item).gen > this.gen || this.dex.data.Items[item].isNonstandard);
			}

			// Random unique ability
			let ability = 'None';
			if (this.gen >= 3) {
				do {
					ability = this.sampleNoReplace(abilityPool);
				} while (this.dex.getAbility(ability).gen > this.gen || this.dex.data.Abilities[ability].isNonstandard);
			}

			// Random unique moves
			const m = [];
			do {
				const moveid = this.sampleNoReplace(movePool);
				const move = this.dex.getMove(moveid);
				if (move.gen <= this.gen && !move.isNonstandard && !move.name.startsWith('Hidden Power ')) {
					m.push(moveid);
				}
			} while (m.length < 4);

			// Random EVs
			const evs = {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0};
			const s: StatName[] = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'];
			if (this.gen === 6) {
				let evpool = 510;
				do {
					const x = this.sample(s);
					const y = this.random(Math.min(256 - evs[x], evpool + 1));
					evs[x] += y;
					evpool -= y;
				} while (evpool > 0);
			} else {
				for (const x of s) {
					evs[x] = this.random(256);
				}
			}

			// Random IVs
			const ivs: StatsTable = {
				hp: this.random(32),
				atk: this.random(32),
				def: this.random(32),
				spa: this.random(32),
				spd: this.random(32),
				spe: this.random(32),
			};

			// Random nature
			const nature = this.sample(naturePool);

			// Level balance
			const mbstmin = 1307;
			const stats = species.baseStats;
			let mbst = (stats['hp'] * 2 + 31 + 21 + 100) + 10;
			mbst += (stats['atk'] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats['def'] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats['spa'] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats['spd'] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats['spe'] * 2 + 31 + 21 + 100) + 5;
			let level = Math.floor(100 * mbstmin / mbst);
			while (level < 100) {
				mbst = Math.floor((stats['hp'] * 2 + 31 + 21 + 100) * level / 100 + 10);
				mbst += Math.floor(((stats['atk'] * 2 + 31 + 21 + 100) * level / 100 + 5) * level / 100);
				mbst += Math.floor((stats['def'] * 2 + 31 + 21 + 100) * level / 100 + 5);
				mbst += Math.floor(((stats['spa'] * 2 + 31 + 21 + 100) * level / 100 + 5) * level / 100);
				mbst += Math.floor((stats['spd'] * 2 + 31 + 21 + 100) * level / 100 + 5);
				mbst += Math.floor((stats['spe'] * 2 + 31 + 21 + 100) * level / 100 + 5);
				if (mbst >= mbstmin) break;
				level++;
			}

			// Random happiness
			const happiness = this.random(256);

			// Random shininess
			const shiny = this.randomChance(1, 256);

			team.push({
				name: species.baseSpecies,
				species: species.name,
				gender: species.gender,
				item: item,
				ability: ability,
				moves: m,
				evs: evs,
				ivs: ivs,
				nature: nature,
				level: level,
				happiness: happiness,
				shiny: shiny,
			});
		}

		return team;
	}

	queryMoves(moves: string[] | null, hasType: {[k: string]: boolean} = {}, hasAbility: {[k: string]: boolean} = {}, movePool: string[] = []) {
		// This is primarily a helper function for random setbuilder functions.
		const counter: {[k: string]: any} = {
			Physical: 0, Special: 0, Status: 0, damage: 0, recovery: 0, stab: 0, inaccurate: 0, priority: 0, recoil: 0, drain: 0, sound: 0,
			adaptability: 0, contrary: 0, ironfist: 0, serenegrace: 0, sheerforce: 0, skilllink: 0, strongjaw: 0, technician: 0,
			physicalsetup: 0, specialsetup: 0, mixedsetup: 0, speedsetup: 0, physicalpool: 0, specialpool: 0, hazards: 0,
			damagingMoves: [],
			damagingMoveIndex: {},
			setupType: '',
			Bug: 0, Dark: 0, Dragon: 0, Electric: 0, Fairy: 0, Fighting: 0, Fire: 0, Flying: 0, Ghost: 0, Grass: 0, Ground: 0,
			Ice: 0, Normal: 0, Poison: 0, Psychic: 0, Rock: 0, Steel: 0, Water: 0,
		};

		let typeDef: string;
		for (typeDef in this.dex.data.TypeChart) {
			counter[typeDef] = 0;
		}

		if (!moves || !moves.length) return counter;

		// Moves that restore HP:
		const RecoveryMove = [
			'healorder', 'milkdrink', 'moonlight', 'morningsun', 'recover', 'reservoir', 'roost', 'shoreup', 'slackoff', 'softboiled', 'strengthsap', 'synthesis', 'quietrepose', 'selfrepair',
		];
		// Moves which drop stats:
		const ContraryMove = [
			'closecombat', 'leafstorm', 'overheat', 'superpower', 'vcreate', 'dracometeor', 'spinout', 'icehammer',
		];
		// Moves that boost Attack:
		const PhysicalSetup = [
			'bellydrum', 'bulkup', 'coil', 'curse', 'dragondance', 'honeclaws', 'howl', 'meditate', 'poweruppunch', 'swordsdance', 'tidyup', 'victorydance', 'wardance', 'shadowdance'
		];
		// Moves which boost Special Attack:
		const SpecialSetup = [
			'calmmind', 'chargebeam', 'geomancy', 'nastyplot', 'quiverdance', 'tailglow', 'torchsong', 'lightup',
		];
		// Moves which boost Attack AND Special Attack:
		const MixedSetup = [
			'clangoroussoul', 'growth', 'happyhour', 'holdhands', 'noretreat', 'shellsmash', 'workup',
		];
		// Moves which boost Speed:
		const SpeedSetup = [
			'agility', 'autotomize', 'flamecharge', 'rockpolish', 'shiftgear', 'trailblaze', 'boltin',
		];
		// Moves that shouldn't be the only STAB moves:
		const NoStab = [
			'accelerock', 'aquajet', 'beakblast', 'bounce', 'breakingswipe', 'chatter', 'chloroblast', 'clearsmog', 'dragontail', 'eruption',
			'explosion', 'fakeout', 'flamecharge', 'flipturn', 'iceshard', 'icywind', 'incinerate', 'machpunch', 'meteorbeam',
			'mortalspin', 'nuzzle', 'pluck', 'pursuit', 'quickattack', 'rapidspin', 'reversal', 'selfdestruct', 'shadowsneak',
			'skydrop', 'snarl', 'suckerpunch', 'uturn', 'watershuriken', 'vacuumwave', 'voltswitch', 'waterspout',
			'trailblaze', 'warmembrace', 'boltin', 
		];

		// Iterate through all moves we've chosen so far and keep track of what they do:
		for (const [k, moveId] of moves.entries()) {
			const move = this.dex.getMove(moveId);
			const moveid = move.id;
			let movetype = move.type;
			if (['judgment', 'multiattack', 'revelationdance'].includes(moveid)) movetype = Object.keys(hasType)[0];
			if (move.damage || move.damageCallback) {
				// Moves that do a set amount of damage:
				counter['damage']++;
				counter.damagingMoves.push(move);
				counter.damagingMoveIndex[moveid] = k;
			} else {
				// Are Physical/Special/Status moves:
				counter[move.category]++;
			}
			// Moves that have a low base power:
			if (moveid === 'lowkick' || (move.basePower && move.basePower <= 60 && moveid !== 'rapidspin')) counter['technician']++;
			// Moves that hit up to 5 times:
			if (move.multihit && Array.isArray(move.multihit) && move.multihit[1] === 5) counter['skilllink']++;
			if (move.recoil || move.hasCrashDamage) counter['recoil']++;
			if (move.drain) counter['drain']++;
			// Moves which have a base power, but aren't super-weak like Rapid Spin:
			if (move.basePower > 30 || move.multihit || move.basePowerCallback || moveid === 'infestation' || moveid === 'naturepower') {
				counter[movetype]++;
				if (hasType[movetype]) {
					counter['adaptability']++;
					// STAB:
					// Certain moves aren't acceptable as a Pokemon's only STAB attack
					if (!NoStab.includes(moveid) && (moveid !== 'hiddenpower' || Object.keys(hasType).length === 1)) {
						counter['stab']++;
						// Ties between Physical and Special setup should broken in favor of STABs
						counter[move.category] += 0.1;
					}
				} else if (movetype === 'Normal' && (hasAbility['Aerilate'] || hasAbility['Galvanize'] || hasAbility['Pixilate'] || hasAbility['Refrigerate'])) {
					counter['stab']++;
				} else if (move.priority === 0 && (hasAbility['Libero'] || hasAbility['Protean']) && !NoStab.includes(moveid)) {
					counter['stab']++;
				} else if (movetype === 'Steel' && hasAbility['Steelworker']) {
					counter['stab']++;
				}
				if (move.flags['bite']) counter['strongjaw']++;
				if (move.flags['punch']) counter['ironfist']++;
				if (move.flags['sound']) counter['sound']++;
				if (move.flags['slicing']) counter['sharpness']++;
				counter.damagingMoves.push(move);
				counter.damagingMoveIndex[moveid] = k;
			}
			// Moves with secondary effects:
			if (move.secondary) {
				counter['sheerforce']++;
				if (move.secondary.chance && move.secondary.chance >= 20 && move.secondary.chance < 100) {
					counter['serenegrace']++;
				}
			}
			// Moves with low accuracy:
			if (move.accuracy && move.accuracy !== true && move.accuracy < 90) counter['inaccurate']++;
			// Moves with non-zero priority:
			if (move.category !== 'Status' && (move.priority !== 0 || (moveid === 'grassyglide' && hasAbility['Grassy Surge']))) {
				counter['priority']++;
			}

			// Moves that change stats:
			if (RecoveryMove.includes(moveid)) counter['recovery']++;
			if (ContraryMove.includes(moveid)) counter['contrary']++;
			if (PhysicalSetup.includes(moveid)) {
				counter['physicalsetup']++;
				counter.setupType = 'Physical';
			} else if (SpecialSetup.includes(moveid)) {
				counter['specialsetup']++;
				counter.setupType = 'Special';
			}
			if (MixedSetup.includes(moveid)) counter['mixedsetup']++;
			if (SpeedSetup.includes(moveid)) counter['speedsetup']++;
			if (['spikes', 'stealthrock', 'stickyweb', 'toxicspikes'].includes(moveid)) counter['hazards']++;
		}

		// Keep track of the available moves
		for (const moveid of movePool) {
			const move = this.dex.getMove(moveid);
			if (move.damageCallback) continue;
			if (move.category === 'Physical') counter['physicalpool']++;
			if (move.category === 'Special') counter['specialpool']++;
		}

		// Choose a setup type:
		if (counter['mixedsetup']) {
			counter.setupType = 'Mixed';
		} else if (counter['physicalsetup'] && counter['specialsetup']) {
			const pool = {
				Physical: counter.Physical + counter['physicalpool'],
				Special: counter.Special + counter['specialpool'],
			};
			if (pool.Physical === pool.Special) {
				if (counter.Physical > counter.Special) counter.setupType = 'Physical';
				if (counter.Special > counter.Physical) counter.setupType = 'Special';
			} else {
				counter.setupType = pool.Physical > pool.Special ? 'Physical' : 'Special';
			}
		} else if (counter.setupType === 'Physical') {
			if ((counter.Physical < 2 && (!counter.stab || !counter['physicalpool'])) && (!moves.includes('rest') || !moves.includes('sleeptalk'))) {
				counter.setupType = '';
			}
		} else if (counter.setupType === 'Special') {
			if ((counter.Special < 2 && (!counter.stab || !counter['specialpool'])) && (!moves.includes('rest') || !moves.includes('sleeptalk')) && (!moves.includes('wish') || !moves.includes('protect'))) {
				counter.setupType = '';
			}
		}

		counter['Physical'] = Math.floor(counter['Physical']);
		counter['Special'] = Math.floor(counter['Special']);

		return counter;
	}

	randomSet(species: string | Species, teamDetails: RandomTeamsTypes.TeamDetails = {}, isLead = false, isDoubles = false): RandomTeamsTypes.RandomSet {
		species = this.dex.getSpecies(species);
		let forme = species.name;
		let gmax = false;

		if (typeof species.battleOnly === 'string') {
			// Only change the forme. The species has custom moves, and may have different typing and requirements.
			forme = species.battleOnly;
		}
/*		if (species.cosmeticFormes) {
			forme = this.sample([species.name].concat(species.cosmeticFormes));
		} */ // Commenting this out for now to stop the Tatsugiri-Stretchy crash
		if (species.name.endsWith('-Gmax')) {
			forme = species.name.slice(0, -5);
			gmax = true;
		}
		
		let randSet = 0;
		if (this.randomChance(1, 2)) {
			randSet = 1;
		}
		const randMoves = (randSet === 1) ? species.randomDoubleBattleMoves : species.randomBattleMoves; // This is a cheat to have two separate movepools to improve sets
		const movePool = (randMoves || Object.keys(this.dex.data.Learnsets[species.id]!.learnset!)).slice();
		const rejectedPool = [];
		const moves: string[] = [];
		let ability = '';
		let item = '';
		const evs = {
			hp: 85, atk: 85, def: 85, spa: 85, spd: 85, spe: 85,
		};
		const ivs = {
			hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31,
		};
		const hasType: {[k: string]: true} = {};
		hasType[species.types[0]] = true;
		if (species.types[1]) {
			hasType[species.types[1]] = true;
		}
		const hasAbility: {[k: string]: true} = {};
		hasAbility[species.abilities[0]] = true;
		if (species.abilities[1]) {
			hasAbility[species.abilities[1]] = true;
		}
		if (species.abilities['H']) {
			hasAbility[species.abilities['H']] = true;
		}
		let availableHP = 0;
		for (const moveid of movePool) {
			if (moveid.startsWith('hiddenpower')) availableHP++;
		}

		let hasMove: {[k: string]: boolean} = {};
		let counter;

		do {
			// Keep track of all moves we have:
			hasMove = {};
			for (const moveid of moves) {
				if (moveid.startsWith('hiddenpower')) {
					hasMove['hiddenpower'] = true;
				} else {
					hasMove[moveid] = true;
				}
			}

			// Choose next 4 moves from learnset/viable moves and add them to moves list:
			const pool = (movePool.length ? movePool : rejectedPool);
			while (moves.length < 4 && pool.length) {
				const moveid = this.sampleNoReplace(pool);
				if (moveid.startsWith('hiddenpower')) {
					availableHP--;
					if (hasMove['hiddenpower']) continue;
					hasMove['hiddenpower'] = true;
				} else {
					hasMove[moveid] = true;
				}
				moves.push(moveid);
			}

			counter = this.queryMoves(moves, hasType, hasAbility, movePool);

			// Iterate through the moves again, this time to cull them:
			for (const [k, moveId] of moves.entries()) {
				const move = this.dex.getMove(moveId);
				const moveid = move.id;
				let rejected = false;
				let isSetup = false;

				switch (moveid) {
				// Not very useful without their supporting moves
//				case 'acrobatics': case 'junglehealing':
//					if (!counter.setupType && !isDoubles) rejected = true;
//					break;
				case 'destinybond': case 'healbell':
					if (movePool.includes('protect') || movePool.includes('wish')) rejected = true;
					break;
				case 'fireblast':
					if (hasAbility['Serene Grace'] && (!hasMove['trick'] || counter.Status > 1)) rejected = true;
					break;
				case 'firepunch':
					if (movePool.includes('bellydrum') || hasMove['earthquake'] && movePool.includes('substitute')) rejected = true;
					break;
				case 'flamecharge': // case 'sacredsword':
					if (counter.damagingMoves.length < 3 && !counter.setupType) rejected = true;
					if (!hasType['Grass'] && movePool.includes('swordsdance')) rejected = true;
					break;
				/*case 'fly':*/ case 'storedpower':
					if (!counter.setupType) rejected = true;
					break;
				case 'futuresight':
					if (!counter.Status || !hasMove['teleport']) rejected = true;
					break;
				case 'payback': case 'psychocut':
					if (!counter.Status || hasMove['rest'] && hasMove['sleeptalk']) rejected = true;
					break;
				case 'rest':
					if (movePool.includes('sleeptalk')) rejected = true;
					if (!hasMove['sleeptalk'] && (movePool.includes('bulkup') || movePool.includes('calmmind') || movePool.includes('coil') || movePool.includes('curse'))) rejected = true;
					break;
				case 'bulkup':
					if (hasMove['wardance']) rejected = true;
					break;
				case 'bulkup': case 'wardance':
					if (hasMove['dragondance']) rejected = true;
					break;
				case 'reflect':
					if (!hasMove['lightscreen']) rejected = true;
				case 'sleeptalk':
					if (!hasMove['rest']) rejected = true;
					if (movePool.length > 1 && !hasAbility['Contrary']) {
						const rest = movePool.indexOf('rest');
						if (rest >= 0) this.fastPop(movePool, rest);
					}
					break;
				case 'switcheroo': case 'trick':
					if (counter.Physical + counter.Special < 3 || hasMove['futuresight'] || hasMove['rapidspin']) rejected = true;
					break;
				case 'trickroom':
					if (counter.damagingMoves.length < 2 || movePool.includes('nastyplot') || isLead || teamDetails.stickyWeb) rejected = true;
					break;
				case 'zenheadbutt':
					if (movePool.includes('boltstrike')) rejected = true;
					break;

				// Set up once and only if we have the moves for it
				case 'bellydrum': case 'bulkup': case 'coil': case 'curse': case 'dragondance': case 'honeclaws': case 'swordsdance': case 'shadowdance': case 'victorydance':
					if (counter.setupType !== 'Physical') rejected = true;
					if (counter.Physical + counter['physicalpool'] < 2 && (!hasMove['rest'] || !hasMove['sleeptalk'])) rejected = true;
					if (moveid === 'swordsdance' && (hasMove['dragondance'] || hasMove['wardance'])) rejected = true;
					isSetup = true;
					break;
				case 'calmmind': case 'nastyplot': case 'tailglow': case 'lightup':
					if (counter.setupType !== 'Special') rejected = true;
					if (counter.Special + counter['specialpool'] < 2 && (!hasMove['rest'] || !hasMove['sleeptalk']) && (!hasMove['wish'] || !hasMove['protect'])) rejected = true;
					if (hasMove['healpulse'] || moveid === 'calmmind' && hasMove['trickroom']) rejected = true;
					isSetup = true;
					break;
				case 'quiverdance':
					isSetup = true;
					break;
				case 'clangoroussoul': case 'shellsmash': case 'workup':
					if (counter.setupType !== 'Mixed') rejected = true;
					if (hasMove['quiverdance']) rejected = true;
					if (counter.damagingMoves.length + counter['physicalpool'] + counter['specialpool'] < 3) rejected = true;
					isSetup = true;
					break;
				case 'agility': case 'autotomize': case 'rockpolish': case 'shiftgear':
					if (counter.damagingMoves.length < 2 || hasMove['rest']) rejected = true;
					if (movePool.includes('calmmind') || movePool.includes('nastyplot')) rejected = true;
					if (!counter.setupType) isSetup = true;
					break;

				// Bad after setup
				case 'counter': case 'reversal':
					if (counter.setupType) rejected = true;
					break;
				case 'firstimpression': case 'glare': case 'icywind': case 'tailwind': case 'waterspout':
					if ((counter.setupType && !isDoubles) || !!counter['speedsetup'] || hasMove['rest']) rejected = true;
					break;
				case 'bulletpunch': case 'rockblast':
					if (!!counter['speedsetup'] || counter.damagingMoves.length < 2) rejected = true;
					break;
				case 'closecombat': case 'flashcannon': case 'pollenpuff':
					if ((hasMove['substitute'] && !hasType['Fighting']) || hasMove['toxic'] && movePool.includes('substitute')) rejected = true;
					if (moveid === 'closecombat' && (hasMove['highjumpkick'] || movePool.includes('highjumpkick')) && !counter.setupType) rejected = true;
					break;
				case 'defog':
					if (counter.setupType || hasMove['healbell'] || hasMove['stealthrock'] || hasMove['toxicspikes'] || teamDetails.defog) rejected = true;
					break;
				case 'fakeout':
					if (counter.setupType || hasMove['protect'] || hasMove['rapidspin'] || hasMove['substitute'] || hasMove['uturn']) rejected = true;
					break;
				case 'healingwish': case 'memento':
					if (counter.setupType || !!counter['recovery'] || hasMove['substitute'] || hasMove['uturn']) rejected = true;
					break;
				case 'highjumpkick': case 'machpunch':
					if (hasMove['curse']) rejected = true;
					break;
				case 'leechseed': case 'teleport':
					if (counter.setupType || !!counter['speedsetup']) rejected = true;
					break;
				case 'partingshot':
					if (!!counter['speedsetup'] || hasMove['bulkup'] || hasMove['uturn']) rejected = true;
					break;
				case 'protect':
					if ((counter.setupType && !hasMove['wish'] && !isDoubles) || hasMove['rest'] && hasMove['sleeptalk']) rejected = true;
					if (counter.Status < 2 && !hasAbility['Hunger Switch'] && !hasAbility['Speed Boost'] && !isDoubles) rejected = true;
					if (movePool.includes('leechseed') || movePool.includes('toxic') && !hasMove['wish']) rejected = true;
					if (isDoubles && (movePool.includes('fakeout') || movePool.includes('shellsmash') || movePool.includes('spore') || hasMove['tailwind'] || hasMove['waterspout'])) rejected = true;
					break;
				case 'rapidspin':
					if (hasMove['curse'] || /*hasMove['nastyplot'] || */hasMove['shellsmash'] || teamDetails.rapidSpin) rejected = true;
					if (counter.setupType && counter['Fighting'] >= 2) rejected = true;
					break;
				case 'shadowsneak':
					if (hasMove['substitute'] || hasMove['trickroom']) rejected = true;
					if (hasMove['dualwingbeat'] || hasMove['toxic'] || hasMove['rest'] && hasMove['sleeptalk']) rejected = true;
					break;
				case 'spikes':
					if (counter.setupType || teamDetails.spikes && teamDetails.spikes > 1) rejected = true;
					break;
				case 'stealthrock':
					if (counter.setupType || !!counter['speedsetup'] || hasMove['rest'] || hasMove['substitute'] || hasMove['trickroom'] || teamDetails.stealthRock) rejected = true;
					break;
				case 'stickyweb':
					if (counter.setupType === 'Special' || teamDetails.stickyWeb) rejected = true;
					break;
				case 'taunt':
					if (hasMove['nastyplot'] || hasMove['swordsdance']) rejected = true;
					break;
				case 'thunderwave': case 'voltswitch':
					if (counter.setupType || !!counter['speedsetup'] || hasMove['raindance']) rejected = true;
					if (isDoubles && (hasMove['electroweb'] || hasMove['nuzzle'])) rejected = true;
					break;
				case 'toxic':
					if (counter.setupType || hasMove['sludgewave'] || hasMove['thunderwave'] || hasMove['willowisp']) rejected = true;
					break;
				case 'toxicspikes':
					if (counter.setupType || teamDetails.toxicSpikes) rejected = true;
					break;
				case 'uturn':
					if (!!counter['speedsetup'] || (counter.setupType && (!hasType['Bug'] || !counter.recovery))) rejected = true;
					if (isDoubles && hasMove['leechlife']) rejected = true;
					break;

				// Ineffective having both
				// Attacks:
				case 'explosion':
					if (!!counter['recovery'] || hasMove['painsplit'] || hasMove['wish']) rejected = true;
					if (!!counter['speedsetup'] || hasMove['curse'] || hasMove['drainpunch'] || hasMove['rockblast']) rejected = true;
					break;
				case 'facade':
					if (!!counter['recovery'] || movePool.includes('doubleedge')) rejected = true;
					break;
				case 'quickattack':
					if (!!counter['speedsetup'] || hasType['Rock'] && !!counter.Status) rejected = true;
					if (counter.Physical > 3 && movePool.includes('uturn')) rejected = true;
					break;
				case 'blazekick':
					if (counter.Special >= 1) rejected = true;
					break;
				case 'firefang': case 'flamethrower':
					if (hasMove['heatwave'] || hasMove['overheat'] || hasMove['fireblast'] && counter.setupType !== 'Physical') rejected = true;
					break;
				case 'overheat':
					if (hasMove['flareblitz'] || isDoubles && hasMove['calmmind']) rejected = true;
					break;
				case 'aquajet': case 'psychicfangs':
					if (hasMove['rapidspin'] || hasMove['taunt']) rejected = true;
					break;
				case 'aquatail': case 'flipturn': case 'retaliate':
					if (hasMove['aquajet'] || !!counter.Status) rejected = true;
					break;
				case 'hydropump':
					if (hasMove['scald'] && ((counter.Special < 4 && !hasMove['uturn']) || (species.types.length > 1 && counter.stab < 3))) rejected = true;
					break;
				case 'scald':
					if (hasMove['waterpulse']) rejected = true;
					break;
				case 'thunderbolt':
					if (hasMove['powerwhip']) rejected = true;
					break;
				case 'gigadrain':
					if (hasMove['uturn'] || hasType['Poison'] && !counter['Poison']) rejected = true;
					break;
				case 'leafblade':
					if ((hasMove['leafstorm'] || movePool.includes('leafstorm')) && counter.setupType !== 'Physical') rejected = true;
					break;
				case 'leafstorm':
					if (hasMove['gigadrain'] && !!counter.Status) rejected = true;
					if (isDoubles && hasMove['energyball']) rejected = true;
					break;
				case 'powerwhip':
					if (hasMove['leechlife'] || !hasType['Grass'] && counter.Physical > 3 && movePool.includes('uturn')) rejected = true;
					break;
				case 'woodhammer':
					if (hasMove['hornleech'] && counter.Physical < 4) rejected = true;
					break;
				case 'freezedry':
					if ((hasMove['blizzard'] && counter.setupType) || hasMove['icebeam'] && counter.Special < 4) rejected = true;
					if (movePool.includes('bodyslam') || movePool.includes('thunderwave') && hasType['Electric']) rejected = true;
					break;
				case 'bodypress':
					if (hasMove['mirrorcoat'] || hasMove['whirlwind']) rejected = true;
					if (hasMove['shellsmash'] || hasMove['earthquake'] && movePool.includes('shellsmash')) rejected = true;
					break;
				case 'circlethrow':
					if (hasMove['stormthrow'] && !hasMove['rest']) rejected = true;
					break;
				case 'drainpunch':
					if (hasMove['closecombat'] || !hasType['Fighting'] && movePool.includes('swordsdance')) rejected = true;
					break;
				case 'dynamicpunch': case 'thunderouskick':
					if (hasMove['closecombat'] || hasMove['facade']) rejected = true;
					break;
				case 'focusblast':
					if (movePool.includes('shellsmash') || hasMove['rest'] && hasMove['sleeptalk']) rejected = true;
					break;
				case 'hammerarm':
					if (hasMove['fakeout']) rejected = true;
					break;
				case 'seismictoss':
					if (hasMove['protect'] && hasType['Water']) rejected = true;
					break;
				case 'stormthrow':
					if (hasMove['rest'] && hasMove['sleeptalk']) rejected = true;
					break;
				case 'superpower':
					if (hasMove['hydropump'] || counter.Physical >= 4 && movePool.includes('uturn')) rejected = true;
					if (hasMove['substitute'] && !hasAbility['Contrary']) rejected = true;
					if (hasAbility['Contrary']) isSetup = true;
					break;
				case 'poisonjab':
					if ((!hasType['Poison'] && counter.Status >= 2) || hasMove['gunkshot']) rejected = true;
					break;
				case 'earthquake':
					if (hasMove['bonemerang'] || hasMove['substitute'] && movePool.includes('toxic')) rejected = true;
					if (movePool.includes('bodypress') && movePool.includes('shellsmash')) rejected = true;
					if (isDoubles && (hasMove['earthpower'] || hasMove['highhorsepower'])) rejected = true;
					break;
				case 'scorchingsands':
					if (hasMove['earthpower'] || hasMove['toxic'] && movePool.includes('earthpower')) rejected = true;
					if (hasMove['willowisp']) rejected = true;
					break;
				case 'airslash':
					if ((hasMove['hurricane'] && !counter.setupType) || hasMove['rest'] && hasMove['sleeptalk']) rejected = true;
					if (movePool.includes('flamethrower') || hasAbility['Simple'] && !!counter['recovery']) rejected = true;
					break;
/*				case 'bravebird':
					if (hasMove['dragondance']) rejected = true;
					break;
				case 'hurricane':
					if (hasAbility['Tinted Lens'] && counter.setupType && !isDoubles) rejected = true;
					break;*/
				case 'photongeyser':
					if (hasMove['morningsun']) rejected = true;
					break;
				case 'psychic':
					if (hasMove['expandingforce']) rejected = true;
					break;
				case 'psyshock':
					if (hasMove['psychic']) rejected = true;
					if (hasAbility['Multiscale'] && !counter.setupType) rejected = true;
					if (isDoubles && hasMove['psychic']) rejected = true;
					break;
				case 'bugbuzz':
					if (hasMove['uturn'] && !counter.setupType) rejected = true;
					break;
				case 'leechlife':
					if (isDoubles && hasMove['lunge']) rejected = true;
					if (movePool.includes('firstimpression') || movePool.includes('spikes')) rejected = true;
					break;
				case 'stoneedge':
					if (hasMove['rockblast'] || hasMove['rockslide'] || !!counter.Status && movePool.includes('rockslide')) rejected = true;
					if (hasAbility['Guts'] && (!hasMove['dynamicpunch'] || hasMove['spikes'])) rejected = true;
					break;
				case 'poltergeist':
					if (hasMove['knockoff']) rejected = true;
					break;
				case 'shadowball':
					if (hasAbility['Pixilate'] && (counter.setupType || counter.Status > 1)) rejected = true;
					if (isDoubles && hasMove ['phantomforce']) rejected = true;
					break;
				case 'shadowclaw':
					if (hasType['Steel'] && hasMove['shadowsneak'] && counter.Physical < 4) rejected = true;
					break;
				case 'dragonpulse': case 'spacialrend': case 'mysticsong':
					if (hasMove['dracometeor'] && counter.Special < 4) rejected = true;
					break;
				case 'darkpulse':
					if ((hasMove['foulplay'] || hasMove['knockoff'] || hasMove['suckerpunch'] || hasMove['defog']) && counter.setupType !== 'Special') rejected = true;
					break;
				case 'knockoff':
					if (hasMove['darkestlariat']) rejected = true;
					break;
				case 'suckerpunch':
					if (counter.damagingMoves.length < 2 || counter['Dark'] > 1 && !hasType['Dark']) rejected = true;
					if (hasMove['rest']) rejected = true;
					break;
				case 'meteormash':
					if (movePool.includes('extremespeed')) rejected = true;
					break;
				case 'dazzlinggleam':
					if (hasMove['fleurcannon'] || hasMove['moonblast'] || hasMove['petaldance']) rejected = true;
					break;
				case 'scald': case 'hydropump':
					if (hasMove['weatherball']) rejected = true;
					break;
				case 'lavaplume':
					if (hasMove['magmastorm']) rejected = true;
					break;
				case 'moonblast':
					if (hasMove['drainingkiss']) rejected = true;
					break;
				case 'dracometeor':
					if (hasMove['outrage']) rejected = true;
					break;
				case 'hurricane':
					if (hasMove['cloudcrash']) rejected = true;
					break;
				case 'recover':
					if (hasMove['strengthsap']) rejected = true;
					break;

				// Status:
				case 'bodyslam': case 'clearsmog':
					if (hasMove['sludgebomb'] || hasMove['toxic'] && !hasType['Normal']) rejected = true;
					if (hasMove['trick'] || movePool.includes('recover')) rejected = true;
					break;
				case 'haze':
					if ((hasMove['stealthrock'] || movePool.includes('stealthrock')) && !teamDetails.stealthRock) rejected = true;
					break;
				case 'hypnosis':
					if (hasMove['voltswitch']) rejected = true;
					break;
				case 'willowisp': case 'yawn': case 'allergypollen': case 'lovelykiss':
					if (hasMove['thunderwave'] || hasMove['toxic']) rejected = true;
					break;
				case 'painsplit': case 'recover': case 'synthesis':
					if (hasMove['rest'] || hasMove['wish']) rejected = true;
					if (moveid === 'synthesis' && hasMove['gigadrain']) rejected = true;
					break;
				case 'roost':
					if (hasMove['throatchop'] || hasMove['stoneedge'] && !hasType['Rock']) rejected = true;
					break;
				case 'reflect': case 'lightscreen':
					if (teamDetails.screens) rejected = true;
					break;
				case 'substitute':
					if (hasMove['facade'] || hasMove['rest'] || hasMove['uturn']) rejected = true;
					if (movePool.includes('bulkup') || movePool.includes('painsplit') || movePool.includes('roost') || movePool.includes('calmmind') && !counter['recovery']) rejected = true;
					if (isDoubles && movePool.includes('powerwhip')) rejected = true;
					break;
				case 'helpinghand':
					if (hasMove['acupressure']) rejected = true;
					break;
				case 'wideguard':
					if (hasMove['protect']) rejected = true;
					break;
				}

				// This move doesn't satisfy our setup requirements:
				if (((move.category === 'Physical' && counter.setupType === 'Special') || (move.category === 'Special' && counter.setupType === 'Physical')) && moveid !== 'photongeyser') {
					// Reject STABs last in case the setup type changes later on
					const stabs: number = counter[species.types[0]] + (counter[species.types[1]] || 0);
					if (!hasType[move.type] || stabs > 1 || counter[move.category] < 2) rejected = true;
				}

				// Pokemon should have moves that benefit their types, stats, or ability
				if (!rejected && !move.damage && !isSetup && !move.weather && !move.stallingMove &&
					(isDoubles || (!['facade', 'lightscreen', 'reflect', 'sleeptalk', 'spore', 'substitute', 'toxic', 'whirlpool'].includes(moveid) && (move.category !== 'Status' || !move.flags.heal))) &&
					(!counter.setupType || counter.setupType === 'Mixed' || (move.category !== counter.setupType && move.category !== 'Status') || (counter[counter.setupType] + counter.Status > 3 && !counter.hazards)) &&
				(
					(!counter.stab && counter['physicalpool'] + counter['specialpool'] > 0) ||
					(hasType['Bug'] && (movePool.includes('megahorn') || movePool.includes('violentswarm'))) ||
					(hasType['Dark'] && (!counter['Dark'] || (hasMove['suckerpunch'] && (movePool.includes('knockoff') || movePool.includes('wickedblow'))))) ||
					(hasType['Dragon'] && !counter['Dragon'] && !(hasMove['fly'] && hasMove['roost']) && !hasMove['substitute'] && !(hasMove['rest'] && hasMove['sleeptalk'])) ||
					(hasType['Electric'] && (!counter['Electric'])) ||
					(hasType['Fairy'] && !counter['Fairy'] && (movePool.includes('dazzlinggleam') || movePool.includes('sweetdecay') || movePool.includes('moonblast') || movePool.includes('playrough'))) ||
					(hasType['Fighting'] && (!counter['Fighting'] || !counter.stab || movePool.includes('closecombat'))) ||
					(hasType['Fire'] && (!counter['Fire'] || movePool.includes('flareblitz') || movePool.includes('weatherball')) && !hasMove['bellydrum']) ||
					((hasType['Flying'] || hasMove['swordsdance']) && !counter['Flying'] && (movePool.includes('airslash') || movePool.includes('bravebird') || movePool.includes('dualwingbeat') || movePool.includes('fly') || movePool.includes('cyclone') || movePool.includes('windblast'))) ||
					(hasType['Ghost'] && (!counter['Ghost'] || movePool.includes('poltergeist') || movePool.includes('spectralthief') || movePool.includes('lastrespects')) && !counter['Dark']) ||
					(hasType['Grass'] && !counter['Grass'] && (species.baseStats.atk >= 100 || movePool.includes('leafstorm'))) ||
					(hasType['Ground'] && !counter['Ground']) ||
					(hasType['Ice'] && (!counter['Ice'] || movePool.includes('iciclecrash') || movePool.includes('mountaingale') ||  movePool.includes('freezedry') || (hasAbility['Snow Warning'] && movePool.includes('blizzard')))) ||
					((hasType['Normal'] && hasAbility['Guts'] && movePool.includes('facade')) || (hasAbility['Pixilate'] && !counter['Normal'])) ||
					(hasType['Poison'] && !counter['Poison'] && (counter.setupType || hasAbility['Sheer Force'] || movePool.includes('gunkshot') || movePool.includes('poisonfang'))) ||
					(hasType['Psychic'] && !counter['Psychic'] && !hasType['Ghost'] && !hasType['Steel'] && (counter.setupType || hasAbility['Psychic Surge'] || movePool.includes('psychicfangs'))) ||
					(hasType['Rock'] && !counter['Rock'] && (species.baseStats.atk >= 80 || (hasType['Dragon'] && movePool.includes('powergem')))) ||
					((hasType['Steel'] || hasAbility['Steelworker']) && (!counter['Steel'] || (hasMove['bulletpunch'] && counter.stab < 2)) && (species.baseStats.atk >= 95 || hasType['Fairy'])) ||
					(hasType['Water'] && ((!counter['Water'] && !hasMove['hypervoice']) || movePool.includes('hypervoice'))) ||
					((hasAbility['Moody'] || hasMove['wish']) && movePool.includes('protect')) ||
					(((hasMove['lightscreen'] && movePool.includes('reflect')) || (hasMove['reflect'] && movePool.includes('lightscreen'))) && !teamDetails.screens) ||
					((movePool.includes('morningsun') || movePool.includes('recover') || movePool.includes('roost') || movePool.includes('slackoff') || movePool.includes('softboiled')) &&
						!!counter.Status && !counter.setupType && !hasMove['healingwish'] && !hasMove['switcheroo'] && !hasMove['trick'] && !hasMove['trickroom'] && !isDoubles) ||
					(movePool.includes('milkdrink') || movePool.includes('quiverdance') || movePool.includes('stickyweb') && !counter.setupType && !teamDetails.stickyWeb) ||
					(isLead && movePool.includes('stealthrock') && !!counter.Status && !counter.setupType && !counter['speedsetup'] && !hasMove['substitute']) ||
					(isDoubles && species.baseStats.def >= 140 && movePool.includes('bodypress'))
				)) {
					// Reject Status, non-STAB, or low basepower moves
					if (move.category === 'Status' || !hasType[move.type] || move.basePower && move.basePower < 50 && !move.multihit && !hasAbility['Technician']) {
						rejected = true;
					}
				}

				// Sleep Talk shouldn't be selected without Rest
				if (moveid === 'rest' && rejected) {
					const sleeptalk = movePool.indexOf('sleeptalk');
					if (sleeptalk >= 0) {
						if (movePool.length < 2) {
							rejected = false;
						} else {
							this.fastPop(movePool, sleeptalk);
						}
					}
				}
				if (moveid === 'reflect' && rejected) {
					const lightscreen = movePool.indexOf('lightscreen');
					if (lightscreen >= 0) {
						if (movePool.length < 2) {
							rejected = false;
						} else {
							this.fastPop(movePool, lightscreen);
						}
					}
				}

				// Remove rejected moves from the move list
				if (rejected && movePool.length) {
					if (move.category !== 'Status' && !move.damage) rejectedPool.push(moves[k]);
					moves.splice(k, 1);
					break;
				}
				if (rejected && rejectedPool.length) {
					moves.splice(k, 1);
					break;
				}
			}
		} while (moves.length < 4 && (movePool.length || rejectedPool.length));

		// const baseSpecies: Species = species.battleOnly && !species.requiredAbility ? this.dex.getSpecies(species.battleOnly as string) : species;
		const abilities: string[] = Object.values(species.abilities);
		abilities.sort((a, b) => this.dex.getAbility(b).rating - this.dex.getAbility(a).rating);
		let ability0 = this.dex.getAbility(abilities[0]);
		let ability1 = this.dex.getAbility(abilities[1]);
		let ability2 = this.dex.getAbility(abilities[2]);
		if (abilities[1]) {
			if (abilities[2] && ability1.rating <= ability2.rating && this.randomChance(1, 2)) {
				[ability1, ability2] = [ability2, ability1];
			}
			if (ability0.rating <= ability1.rating && this.randomChance(1, 2)) {
				[ability0, ability1] = [ability1, ability0];
			} else if (ability0.rating - 0.6 <= ability1.rating && this.randomChance(2, 3)) {
				[ability0, ability1] = [ability1, ability0];
			}
			ability = ability0.name;

			let rejectAbility: boolean;
			do {
				rejectAbility = false;
				if (['Cloud Nine', 'Damp', 'Effect Spore', 'Flare Boost', 'Hydration', 'Ice Body', 'Innards Out', 'Insomnia', 'Quick Feet', 'Rain Dish', 'Snow Cloak', 'Steadfast', 'Steam Engine'].includes(ability)) {
					rejectAbility = true;
				} else if (['Serene Grace', 'Skill Link', 'Strong Jaw', 'Sharpness'].includes(ability)) {
					rejectAbility = !counter[toID(ability)];
				} else if (ability === 'Analytic') {
					rejectAbility = (hasMove['rapidspin'] || hasMove['watershuriken'] || species.nfe || isDoubles);
				} else if (ability === 'Blaze') {
					rejectAbility = (isDoubles && hasAbility['Solar Power']);
				} else if (ability === 'Bulletproof' || ability === 'Overcoat') {
					rejectAbility = (counter.setupType && hasAbility['Soundproof']);
				} else if (ability === 'Chlorophyll') {
					rejectAbility = (species.baseStats.spe > 100 || !counter['Fire'] && !hasMove['sunnyday'] && !teamDetails['sun']);
				} else if (ability === 'Competitive') {
					rejectAbility = (counter['Special'] < 2 || hasMove['rest'] && hasMove['sleeptalk'] || hasMove['fierydance']);
				} else if (ability === 'Compound Eyes' || ability === 'No Guard' || ability === 'Illuminate') {
					rejectAbility = !counter['inaccurate'];
				} else if (ability === 'Cursed Body') {
					rejectAbility = hasAbility['Infiltrator'] || hasAbility['Defiant'];
				} else if (ability === 'Defiant') {
					rejectAbility = !counter['Physical'];
				} else if (ability === 'Download') {
					rejectAbility = (counter.damagingMoves.length < 3 || hasAbility['Trace'] || hasAbility ['Electric Surge']);
				} else if (ability === 'Early Bird') {
					rejectAbility = (hasType['Grass'] && isDoubles);
				} else if (ability === 'Flash Fire') {
					rejectAbility = (this.dex.getEffectiveness('Fire', species) < 0 || hasAbility['Drought']);
				} else if (ability === 'Gluttony') {
					rejectAbility = !hasMove['bellydrum'];
				} else if (ability === 'Guts') {
					rejectAbility = (!hasMove['facade'] && !hasMove['sleeptalk'] && !species.nfe);
				} else if (ability === 'Harvest') {
					rejectAbility = (hasAbility['Banana Split'] && hasMove['gravapple']);
				} else if (ability === 'Hustle' || ability === 'Inner Focus') {
					rejectAbility = (counter.Physical < 2 || hasAbility['Iron Fist']);
				} else if (ability === 'Infiltrator') {
					rejectAbility = ((hasMove['rest'] && hasMove['sleeptalk']) || isDoubles && hasAbility['Clear Body']);
				} else if (ability === 'Intimidate') {
					rejectAbility = (hasMove['bodyslam'] || hasMove['bounce'] || hasMove['tripleaxel']);
				} else if (ability === 'Iron Fist') {
					rejectAbility = (counter['ironfist'] < 2 || hasMove['dynamicpunch']);
				} else if (ability === 'Justified') {
					rejectAbility = (isDoubles && hasAbility['Inner Focus']);
				} else if (ability === 'Lightning Rod') {
					rejectAbility = (species.types.includes('Ground'));
				} else if (ability === 'Limber') {
					rejectAbility = species.types.includes('Electric');
				} else if (ability === 'Liquid Voice') {
					rejectAbility = !hasMove['boomburst'];
				} else if (ability === 'Magic Guard') {
					rejectAbility = ((hasAbility['Drought'] && (hasMove['weatherball'] || hasMove['solarbeam'])) || (hasAbility['Snow Warning'] && hasMove['auroraveil']));
				} else if (ability === 'Mold Breaker') {
					rejectAbility = (hasAbility['Adaptability'] || hasAbility['Scrappy'] || (hasAbility['Sheer Force'] && !!counter['sheerforce']) || hasAbility['Unburden'] && counter.setupType);
				} else if (ability === 'Moxie') {
					rejectAbility = (counter.Physical < 2 || hasMove['stealthrock']);
				} else if (ability === 'Overgrow') {
					rejectAbility = !counter['Grass'];
				} else if (ability === 'Own Tempo') {
					rejectAbility = !hasMove['petaldance'];
				} else if (ability === 'Power Construct') {
					rejectAbility = (species.forme === '10%' && !isDoubles);
				} else if (ability === 'Prankster') {
					rejectAbility = !counter['Status'];
				} else if (ability === 'Pressure') {
					rejectAbility = (counter.setupType || counter.Status < 2 || isDoubles);
				} else if (ability === 'Refrigerate') {
					rejectAbility = !counter['Normal'];
				} else if (ability === 'Regenerator') {
					rejectAbility = (hasAbility['Magic Guard'] || hasMove['cottonguard']);
				} else if (ability === 'Reckless' || ability === 'Rock Head') {
					rejectAbility = !counter['recoil'];
				} else if (ability === 'Sand Force' || ability === 'Sand Veil') {
					rejectAbility = !teamDetails['sand'];
				} else if (ability === 'Sand Rush') {
					rejectAbility = (!teamDetails['sand'] && (!counter.setupType || !counter['Rock'] || hasMove['rapidspin']));
				} else if (ability === 'Sap Sipper') {
					rejectAbility = (hasAbility['Gale Wings'] || hasAbility['Simple']);
				} else if (ability === 'Scrappy') {
					rejectAbility = (hasMove['earthquake'] && hasMove['milkdrink']);
				} else if (ability === 'Screen Cleaner') {
					rejectAbility = !!teamDetails['screens'];
				} else if (ability === 'Shadow Tag') {
					rejectAbility = (species.name === 'Gothitelle' && !isDoubles);
				} else if (ability === 'Shed Skin') {
					rejectAbility = hasMove['dragondance'];
				} else if (ability === 'Sheer Force') {
					rejectAbility = (!counter['sheerforce'] || hasAbility['Guts']);
				} else if (ability === 'Slush Rush') {
					rejectAbility = (!teamDetails['hail'] && !teamDetails['snow'] && !hasAbility['Swift Swim']);
				} else if (ability === 'Sniper') {
					rejectAbility = (counter['Water'] > 1 && !hasMove['focusenergy']);
				} else if (ability === 'Steely Spirit') {
					rejectAbility = (!counter['Steel']);
				} else if (ability === 'Sturdy') {
					rejectAbility = (hasMove['bulkup'] || !!counter['recoil'] || hasAbility['Solid Rock']);
				} else if (ability === 'Swarm') {
					rejectAbility = (!counter['Bug'] || !!counter['recovery']);
				} else if (ability === 'Sweet Veil') {
					rejectAbility = hasType['Grass'];
				} else if (ability === 'Swift Swim') {
					rejectAbility = (!hasMove['raindance'] && (hasAbility['Intimidate'] || hasAbility['Illuminate'] || (hasAbility['Lightning Rod'] && !counter.setupType) || hasAbility['Rock Head'] || hasAbility['Slush Rush'] || hasAbility['Sheer Force'] || hasAbility['Water Absorb']));
				} else if (ability === 'Synchronize') {
					rejectAbility = (counter.setupType || counter.Status < 2);
				} else if (ability === 'Technician') {
					rejectAbility = (!counter['technician'] || hasMove['tailslap'] || hasAbility['Punk Rock'] || movePool.includes('snarl'));
				} else if (ability === 'Tinted Lens') {
					rejectAbility = (hasMove['defog'] || hasMove['hurricane'] || counter.Status > 2 && !counter.setupType);
				} else if (ability === 'Torrent') {
					rejectAbility = (hasMove['focusenergy'] || hasMove['hypervoice']);
				} else if (ability === 'Tough Claws') {
					rejectAbility = (hasType['Steel'] && !hasMove['fakeout']);
				} else if (ability === 'Triage') {
					rejectAbility = !counter['drain'];
				} else if (ability === 'Unaware') {
					rejectAbility = (hasMove['stealthrock']);
				} else if (ability === 'Unburden') {
					rejectAbility = (hasAbility['Prankster'] || !counter.setupType && !isDoubles);
				} else if (ability === 'Volt Absorb') {
					rejectAbility = (this.dex.getEffectiveness('Electric', species) < -1);
				} else if (ability === 'Water Absorb') {
					rejectAbility = (hasMove['raindance'] || hasAbility['Drizzle'] || hasAbility['Strong Jaw'] || hasAbility['Unaware'] || hasAbility['Volt Absorb']);
				} else if (ability === 'Romantic') {
					rejectAbility = !hasMove['attract'];
				} else if (ability === 'Snow Plow') {
					rejectAbility = !teamDetails['hail'] && !teamDetails['snow'];
				} else if (ability === 'Multiscale') {
					rejectAbility = (hasAbility['Ice Scales'] || hasAbility['Strong Jaw']);
				} else if (ability === 'Banana Split' || ability === 'Grassy Surge') {
					rejectAbility = !counter['Grass'] && !hasMove['terrainpulse'];
				} else if (ability === 'Malice') {
					rejectAbility = (counter.Special < 2 || hasMove['partingshot']);
				} else if (ability === 'Weak Armor') {
					rejectAbility = (hasAbility['Banana Split'] || hasAbility['Overcoat']);
				} else if (ability === 'Psychic Surge') {
					rejectAbility = (hasAbility['Neutralizing Gas'] && !hasMove['expandingforce']);
				} else if (ability === 'Ripen') {
					rejectAbility = !hasMove['recycle'];
				} else if (ability === 'Regurgitation') {
					rejectAbility = !hasMove['belch'];
				} else if (ability === 'Relentless') {
					rejectAbility = hasMove['flamecharge'];
				} else if (ability === 'Herbalist') {
					rejectAbility = !hasMove['overheat'];
				} else if (ability === 'Corrosion') {
					rejectAbility = !hasMove['toxic'];
				} else if (ability === 'Surge Surfer') {
					rejectAbility = !teamDetails['electricterrain'];
				} else if (ability === 'Galvanize') {
					rejectAbility = !counter['Normal'];
				} else if (ability === 'Aerilate') {
					rejectAbility = !counter['Normal'];
				} else if (ability === 'Water Veil') {
					rejectAbility = (counter.Physical < 1);
				} else if (ability === 'Poison Heal') {
					rejectAbility = hasMove['shellsmash'];
				} else if (ability === 'Drizzle') {
					rejectAbility = !!counter['Fire'];
				} else if (ability === 'Simple') {
					rejectAbility = !counter.setupType;
				} else if (ability === 'Anger Shell') {
					rejectAbility = (hasMove['warmembrace'] || hasMove['rapidspin']);
				}

				if (rejectAbility) {
					if (ability === ability0.name && ability1.rating >= 1) {
						ability = ability1.name;
					} else if (ability === ability1.name && abilities[2] && ability2.rating >= 1) {
						ability = ability2.name;
					} else {
						// Default to the highest rated ability if all are rejected
						ability = abilities[0];
						rejectAbility = false;
					}
				}
			} while (rejectAbility);

			if (species.name === 'Azumarill') {
				ability = 'Huge Power';
			} else if (forme === 'Copperajah' && gmax) {
				ability = 'Heavy Metal';
			} else if (hasMove['recycle'] && hasAbility['Ripen']) {
				ability = 'Ripen';
			} else if (hasMove['frostbreath'] && hasAbility['Sniper']) {
				ability = 'Sniper';
			} else if (hasAbility['Electromorphosis']) {
				ability = 'Electromorphosis';
			} else if ((species.name === 'X-Lixir' || species.name === 'xlixir') && this.randomChance(1, 2)) {
				ability = 'Arcane Overload';
			} else if (species.name === 'Porygon-Z' && this.randomChance(2, 3)) {
				ability = 'Adaptability';
			} else if (species.name === 'Palossand' && this.randomChance(1, 2)) {
				ability = 'Water Compaction';
			} else if (hasMove['bodypress'] && hasAbility['Stamina']) {
				ability = 'Stamina';
			} else if (hasMove['expandingforce'] && hasAbility['Psychic Surge']) {
				ability = 'Psychic Surge';
			} else if (hasMove['risingvoltage'] && hasAbility['Electric Surge']) {
				ability = 'Electric Surge';
			} else if (hasMove['terrainpulse'] && hasAbility['Grassy Surge']) {
				ability = 'Grassy Surge';
			} else if (hasMove['violentswarm'] && hasAbility['Swarming Surge']) {
				ability = 'Swarming Surge';
			} else if (hasMove['toxicfumes'] && hasAbility['Filthy Surge']) {
				ability = 'Filthy Surge';
			} else if ((hasMove['thunder'] || hasMove['hurricane'] || hasMove['weatherball']) && hasAbility['Drizzle']) {
				ability = 'Drizzle';
			} else if (hasMove['belch'] && hasAbility['Regurgitation']) {
				ability = 'Regurgitation';
			} else if (hasMove['protect'] && hasAbility['Speed Boost']) {
				ability = 'Speed Boost';
			} else if (hasMove['liquidation'] && hasAbility['Sheer Force']) {
				ability = 'Sheer Force';
			} else if (hasMove['dragondance'] && hasAbility['Mountaineer']) {
				ability = 'Mountaineer';
			} else if (hasMove['leechseed'] && hasAbility['Harvest']) {
				ability = 'Harvest';
			} else if (hasMove['raindance'] && hasAbility['Swift Swim']) {
				ability = 'Swift Swim';
			} else if (hasMove['focusenergy'] && hasAbility['Jackpot']) {
				ability = 'Jackpot';
			} else if (hasMove['shellsmash'] && hasAbility['Dazzling']) {
				ability = 'Dazzling';
			} else if (hasMove['return'] && hasAbility['Aerilate']) {
				ability = 'Aerilate';
			} else if (hasMove['bellydrum'] && hasMove['machpunch'] && hasAbility['Iron Fist']) {
				ability = 'Iron Fist';
			} else if ((hasMove['return'] || hasMove['fakeout']) && hasAbility['Galvanize']) {
				ability = 'Galvanize';
			} else if (hasMove['overheat'] && hasAbility['Herbalist']) {
				ability = 'Herbalist';
			} else if (!hasMove['attract'] && (species.name === 'Volentine' || species.name === 'volentine')) {
				ability = 'Pickup';
			} else if (hasMove['sandshot'] && species.name === 'Flygon') {
				ability = 'Sand Rush';
			} else if (hasMove['sweetdecay'] && species.name === 'Slurpuff') {
				ability = 'Sweet Veil';
			} else if ((hasMove['warmembrace'] || hasMove['rapidspin']) && (species.name === 'Kappatoa' || species.name === 'kappatoa')) {
				ability = 'Flash Fire';
			} else if (hasMove['partingshot'] && species.name === 'Houndoom') {
				ability = 'Flash Fire';
			} else if ((hasMove['cottonguard'] || hasMove['swordsdance'] || hasMove['quiverdance']) && hasAbility['Simple']) {
				ability = 'Simple';
			} else if ((hasMove['auroraveil'] || hasMove['icycharge'] || hasMove['blizzard']) && hasAbility['Snow Warning']) {
				ability = 'Snow Warning';
			} else if ((hasMove['sacredsword'] || hasMove['leafblade'] || hasMove['xscissor'] || hasMove['stoneaxe']) && hasAbility['Sharpness']) {
				ability = 'Sharpness';
			} else if (species.name === 'Blockstack' || species.name === 'blockstack') {
				ability = 'Stamina';
			} else if ((species.name === 'Glaborehol' || species.name === 'glaborehol') && hasMove['yawn']) {
				ability = 'Unaware';
			} else if (species.name === 'Ransaxe' || species.name === 'ransaxe') {
				ability = 'Sheer Force';
			} else if (species.name === 'Damastrophe' || species.name === 'damastrophe') {
				ability = 'Technician';
			} else if (species.name === 'Aerodactyl') {
				ability = 'Rock Head';
			} else if (species.name === 'Gronegardian' || species.name === 'gronegardian') {
				ability = 'Flower Veil';
			} else if ((species.name === 'Toupe\u0301ary' || species.name === 'toupe\u0301ary') && this.randomChance(1, 3)) {
				ability = 'Flower Veil';
			} else if ((species.name === 'Toupe\u0301ary' || species.name === 'toupe\u0301ary') && this.randomChance(1, 4)) {
				ability = 'Seed Sower';
			} else if (species.name === 'Skarmory') {
				ability = 'Sturdy';
			} else if (species.name === 'Kaijupiter' || species.name === 'kaijupiter') {
				ability = 'Analytic';
			} else if (hasAbility['Ice Scales']) {
				ability = 'Ice Scales';
			} else if (species.name === 'Exfinguish' || species.name === 'Mattreeze' || species.name === 'exfinguish' || species.name === 'mattreeze') {
				ability = 'Thermal Exchange';
			} else if (hasMove['crosspoison'] && species.name === 'Crobat') {
				ability = 'Merciless';
			} else if (!!counter['recovery'] && hasAbility['Berserk']) {
				ability = 'Berserk';
			} else if (hasMove['shellsmash'] && hasAbility['Magic Bounce']) {
				ability = 'Magic Bounce';
			} else if (hasMove['boomburst'] && hasAbility['Liquid Voice']) {
				ability = 'Liquid Voice';
			} else if (hasMove['sleeppowder'] && !hasMove['tidyup'] && hasAbility['Bad Dreams']) {
				ability = 'Bad Dreams';
			} else if (hasMove['rest'] && hasAbility['Shed Skin']) {
				ability = 'Shed Skin';
			} else if ((hasMove['shellsmash'] || hasMove['bellydrum'] || species.name === 'Nedareap' || species.name === 'nedareap') && hasAbility['Unburden']) {
				ability = 'Unburden';
			} else if (hasAbility['Guts'] && (hasMove['facade'] || (hasMove['rest'] && hasMove['sleeptalk']))) {
				ability = 'Guts';
			} else if (hasAbility['Moxie'] && (counter.Physical > 3 || hasMove['bounce']) && !isDoubles) {
				ability = 'Moxie';
			} else if (hasAbility['Malice'] && counter.Special > 3 && !isDoubles) {
				ability = 'Malice';
			} else if (isDoubles) {
				if (hasAbility['Competitive'] && ability !== 'Shadow Tag' && ability !== 'Strong Jaw') ability = 'Competitive';
				if (hasAbility['Curious Medicine'] && this.randomChance(1, 2)) ability = 'Curious Medicine';
				if (hasAbility['Friend Guard']) ability = 'Friend Guard';
				if (hasAbility['Gluttony'] && hasMove['recycle']) ability = 'Gluttony';
				if (hasAbility['Guts']) ability = 'Guts';
				if (hasAbility['Harvest']) ability = 'Harvest';
				if (hasAbility['Intimidate']) ability = 'Intimidate';
				if (hasAbility['Klutz'] && ability === 'Limber') ability = 'Klutz';
				if (hasAbility['Magic Guard'] && ability !== 'Friend Guard' && ability !== 'Unaware') ability = 'Magic Guard';
				if (hasAbility['Ripen']) ability = 'Ripen';
				if (hasAbility['Stalwart']) ability = 'Stalwart';
				if (hasAbility['Storm Drain']) ability = 'Storm Drain';
				if (hasAbility['Telepathy'] && (ability === 'Pressure' || hasAbility['Analytic'])) ability = 'Telepathy';
				if (hasAbility['Triage']) ability = 'Triage';
			}
		} else {
			ability = ability0.name;
		}

		item = !isDoubles ? 'Leftovers' : 'Sitrus Berry';
		if (species.requiredItems) {
			item = this.sample(species.requiredItems);

		// First, the extra high-priority items
		} else if (species.name === 'Elegent' || species.name === 'elegent') {
			item = 'Dapper Glove';
		} else if (species.name === 'Slurpuff' && hasMove['sweetdecay']) {
			item = 'Whipped Dream';
		} else if (species.name === 'Deliveerie' || species.name === 'deliveerie') {
			item = 'Heavy-Duty Boots';
		} else if (species.name === 'Spiritomb' && !hasMove['rest'] && this.randomChance(1, 2)) {
			item = 'Odd Keystone';
		} else if (species.name === 'Morostache' || species.name === 'morostache') {
			item = this.sample(['Eviolite', 'Hair Tonic']);
		} else if (species.name === 'Nedareap' || species.name === 'nedareap') {
			item = 'Throat Spray';
		} else if (species.name === 'Taekwondodo' || species.name === 'taekwondodo') {
			item = 'Heavy-Duty Boots';
		} else if (species.name === 'Harminth' || species.name === 'harminth') {
			item = 'Air Balloon';
		} else if (species.name === 'Nimbluff' || species.name === 'nimbluff') {
			item = 'Heavy-Duty Boots';
		} else if (species.name === 'Encreech' || species.name === 'encreech') {
			item = 'Heavy-Duty Boots';
		} else if ((species.name === 'Percusshell' || species.name === 'percusshell') && hasMove['bellydrum']) {
			item = 'Leftovers';
		} else if ((species.name === 'Lobstrike' || species.name === 'lobstrike') && hasMove['trailblaze']) {
			item = 'Life Orb';
		} else if ((species.name === 'Morboose' || species.name === 'morboose') && hasMove['trailblaze']) {
			item = 'Razor Fang';
		} else if (hasAbility['Electric Surge'] && hasMove['technoblast']) {
			item = 'Chill Drive';
		} else if (hasMove['populationbomb']) {
			item = 'Wide Lens';
		} else if (species.name === 'Smeargle') {
			item = 'Focus Sash';
		} else if (ability === 'Avarice') {
			item = 'Big Nugget';
		} else if (ability === 'Anger Shell') {
			item = this.sample(['Sitrus Berry', 'Heavy-Duty Boots', 'Passho Berry', 'Chople Berry', 'White Herb']);
		} else if (hasMove['psychoshift']) {
			item = 'Flame Orb';
		} else if (ability === 'Super Taste') {
			item = 'Leftovers';
		} else if (ability === 'Herbalist') {
			item = 'White Herb';
		} else if (hasMove['scaleshot'] || (hasMove['rockblast'] && ability === 'Technician')) {
			item = 'Loaded Dice';
		} else if (hasMove['agility'] && ability === 'Clear Body') {
			item = 'Weakness Policy';
		} else if (ability === 'Regurgitation') {
			item = this.sample(['Sitrus', 'Salac', 'Petaya']) + ' Berry';
		} else if (ability === 'Poison Heal' || ability === 'Toxic Boost') {
			item = 'Toxic Orb';
		} else if (species.baseSpecies === 'Pikachu') {
			item = 'Light Ball';
		} else if (['Corsola', 'Tangrowth'].includes(species.name) && !!counter.Status && !isDoubles) {
			item = 'Rocky Helmet';
		} else if (species.name === 'Unfezant' || hasMove['focusenergy']) {
			item = 'Scope Lens';
		} else if (species.name === 'Wobbuffet' || ['Cheek Pouch', 'Harvest', 'Ripen'].includes(ability)) {
			item = 'Sitrus Berry';
		} else if (ability === 'Gluttony' || hasMove['recycle']) {
			item = this.sample(['Aguav', 'Figy', 'Iapapa', 'Mago', 'Wiki']) + ' Berry';
		} else if (ability === 'Gorilla Tactics' || ability === 'Imposter' || (ability === 'Magnet Pull' && hasMove['bodypress'] && !isDoubles && !hasMove['magnetrise'])) {
			item = 'Choice Scarf';
		} else if (hasMove['trick'] || hasMove['switcheroo'] && !isDoubles) {
			if (species.baseStats.spe >= 60 && species.baseStats.spe <= 108 && !counter['priority']) {
				item = 'Choice Scarf';
			} else {
				item = (counter.Physical > counter.Special) ? 'Choice Band' : 'Choice Specs';
			}
		} else if (species.evos.length && !hasMove['uturn']) {
			item = 'Eviolite';
		} else if (hasMove['bellydrum']) {
			item = (!!counter['priority'] || !hasMove['substitute']) ? 'Sitrus Berry' : 'Salac Berry';
		} else if (hasMove['geomancy'] || hasMove['bounce'] || (hasMove['meteorbeam'] && ability !== 'Clairvoyance')) {
			item = 'Power Herb';
		} else if (hasMove['shellsmash']) {
			item = (ability === 'Sturdy' && !isLead && !isDoubles) ? 'Heavy-Duty Boots' : 'White Herb';
		} else if (ability === 'Guts' && (counter.Physical > 2 || isDoubles)) {
			item = hasType['Fire'] ? 'Toxic Orb' : 'Flame Orb';
		} else if (ability === 'Magic Guard' && counter.damagingMoves.length > 1) {
			item = hasMove['counter'] ? 'Focus Sash' : 'Life Orb';
		} else if (ability === 'Sheer Force' && !!counter['sheerforce']) {
			item = 'Life Orb';
		} else if (ability === 'Unburden') {
			item = (hasMove['closecombat'] || hasMove['curse'] || hasMove['shellsmash']) ? 'White Herb' : 'Sitrus Berry';
		} else if (hasMove['acrobatics']) {
			item = (ability === 'Grassy Surge') ? 'Grassy Seed' : '';
		} else if (hasMove['auroraveil'] || hasMove['lightscreen'] && hasMove['reflect']) {
			item = 'Light Clay';
		} else if (hasMove['rest'] && !hasMove['sleeptalk'] && ability !== 'Shed Skin' && species.name !== 'Snorlax') {
			item = 'Chesto Berry';
		} else if (hasMove['hypnosis'] && ability === 'Beast Boost') {
			item = 'Blunder Policy';
		} else if (hasMove['raindance'] || hasMove['sunnyday']) {
			item = 'Weather Vane';
		} else if (ability === 'Sharpness' && !!counter['sharpness'] && this.randomChance(1, 3)) {
			item = 'Razor Claw';
		} else if (ability === 'Strong Jaw' && !!counter['strongjaw'] && this.randomChance(1, 3)) {
			item = 'Razor Fang';
		} else if (ability === 'Iron Fist' && !!counter['ironfist'] && this.randomChance(1, 3)) {
			item = 'Punching Glove';
		} else if (this.dex.getEffectiveness('Rock', species) >= 2 && !isDoubles) {
			item = 'Heavy-Duty Boots';
		} else if (hasMove['clangingscales'] || hasMove['boomburst'] && !!counter['speedsetup']) {
			item = 'Throat Spray';

		// Doubles
		} else if (isDoubles && (hasMove['dragonenergy'] || hasMove['eruption'] || hasMove['waterspout']) && counter.damagingMoves.length >= 4) {
			item = 'Choice Scarf';
		} else if (isDoubles && hasMove['blizzard'] && ability !== 'Snow Warning' && !teamDetails['hail']) {
			item = 'Blunder Policy';
		} else if (isDoubles && this.dex.getEffectiveness('Rock', species) >= 2 && !hasType['Flying']) {
			item = 'Heavy-Duty Boots';
		} else if (isDoubles && counter.Physical >= 4 && (hasType['Dragon'] || hasType['Fighting'] || hasType['Rock'] || hasMove['flipturn'] || hasMove['uturn']) &&
			!hasMove['fakeout'] && !hasMove['feint'] && !hasMove['rapidspin'] && !hasMove['suckerpunch']
		) {
			item = (!counter['priority'] && !hasAbility['Speed Boost'] && !hasMove['aerialace'] && !hasMove['trailblaze'] && species.baseStats.spe >= 60 && species.baseStats.spe <= 100 && this.randomChance(1, 2)) ? 'Choice Scarf' : 'Choice Band';
		} else if (isDoubles && ((counter.Special >= 4 && (hasType['Dragon'] || hasType ['Fighting'] || hasType['Rock'] || hasMove['voltswitch'])) || (counter.Special >= 3 &&
			(hasMove['flipturn'] || hasMove['uturn'])) && !hasMove['acidspray'] && !hasMove['electroweb'])
		) {
			item = (species.baseStats.spe >= 60 && species.baseStats.spe <= 100 && this.randomChance(1, 2)) ? 'Choice Scarf' : 'Choice Specs';
		} else if (isDoubles && counter.damagingMoves.length >= 4 && species.baseStats.hp + species.baseStats.def + species.baseStats.spd >= 280) {
			item = 'Assault Vest';
		} else if (isDoubles && counter.damagingMoves.length >= 3 && species.baseStats.spe >= 60 && ability !== 'Multiscale' && ability !== 'Sturdy' && !hasMove['acidspray'] && !hasMove['clearsmog'] && !hasMove['electroweb'] &&
			!hasMove['fakeout'] && !hasMove['feint'] && !hasMove['icywind'] && !hasMove['incinerate'] && !hasMove['naturesmadness'] && !hasMove['rapidspin'] && !hasMove['snarl'] && !hasMove['uturn']
		) {
			item = (ability === 'Defeatist' || species.baseStats.hp + species.baseStats.def + species.baseStats.spd >= 275) ? 'Sitrus Berry' : 'Life Orb';

		// Medium priority
		} else if ((counter.Physical >= 4 && ability !== 'Serene Grace' && !hasMove['fakeout'] && !hasMove['flamecharge'] && !hasMove['rapidspin'] && (!hasMove['tailslap'] || hasMove['uturn']) && !isDoubles) && this.randomChance(2, 3)) {
			const scarfReqs = (
				(species.baseStats.atk >= 100 || ability === 'Huge Power') && species.baseStats.spe >= 60 && species.baseStats.spe <= 108 &&
				ability !== 'Speed Boost' && !counter['priority'] && !hasMove['aerialace'] && !hasMove['trailblaze'] && !hasMove['bounce'] && !hasMove['dualwingbeat']
			);
			item = (scarfReqs && this.randomChance(2, 3)) ? 'Choice Scarf' : 'Choice Band';
		} else if ((counter.Physical >= 3 && (hasMove['copycat'] || hasMove['memento'] || hasMove['partingshot']) && !hasMove['rapidspin'] && !hasMove['trailblaze'] && !isDoubles) && this.randomChance(2, 3)) {
			item = 'Choice Band';
		} else if (((counter.Special >= 4 || (counter.Special >= 3 && (hasMove['flipturn'] || hasMove['partingshot'] || hasMove['uturn']))) && !isDoubles) && this.randomChance(2, 3)) {
			const scarfReqs = species.baseStats.spa >= 100 && species.baseStats.spe >= 60 && species.baseStats.spe <= 108 && ability !== 'Tinted Lens' && !counter.Physical;
			item = (scarfReqs && this.randomChance(2, 3)) ? 'Choice Scarf' : 'Choice Specs';
		} else if ((((counter.Physical >= 3 && hasMove['defog']) || (counter.Special >= 3 && hasMove['healingwish'])) && !counter['priority'] && !hasMove['uturn'] && !isDoubles) && this.randomChance(2, 3)) {
			item = 'Choice Scarf';
		} else if (hasMove['raindance'] || hasMove['sunnyday'] || (ability === 'Speed Boost' && !counter['hazards']) || ability === 'Stance Change' && counter.damagingMoves.length >= 3) {
			item = 'Life Orb';
		} else if (this.dex.getEffectiveness('Rock', species) >= 1 && (['Defeatist', 'Emergency Exit', 'Multiscale'].includes(ability) || hasMove['courtchange'] || hasMove['defog'] || hasMove['rapidspin']) && !isDoubles) {
			item = 'Heavy-Duty Boots';
		} else if (species.name === 'Necrozma-Dusk-Mane' || (this.dex.getEffectiveness('Ground', species) < 2 && !!counter['speedsetup'] &&
			counter.damagingMoves.length >= 3 && species.baseStats.hp + species.baseStats.def + species.baseStats.spd >= 300)
		) {
			item = 'Weakness Policy';
		} else if (counter.damagingMoves.length >= 4 && species.baseStats.hp + species.baseStats.def + species.baseStats.spd >= 235) {
			item = 'Assault Vest';
		} else if ((hasMove['clearsmog'] || hasMove['curse'] || hasMove['haze'] || hasMove['healbell'] || hasMove['protect'] || hasMove['sleeptalk'] || hasMove['strangesteam']) && (ability === 'Moody' || !isDoubles)) {
			item = 'Leftovers';

		// Better than Leftovers
		} else if (isLead && !['Disguise', 'Sturdy'].includes(ability) && !hasMove['substitute'] && (hasMove['stealthrock'] || hasMove['spikes'] || hasMove['toxicspikes'] || hasMove['stickyweb']) && !counter['recoil'] && !counter['recovery'] && species.baseStats.hp + species.baseStats.def + species.baseStats.spd < 255 && !isDoubles) {
			item = 'Focus Sash';
		} else if (ability === 'Water Bubble' && !isDoubles) {
			item = 'Mystic Water';
		} else if (((this.dex.getEffectiveness('Rock', species) >= 1 && (!teamDetails.defog || ability === 'Intimidate' || hasMove['uturn'] || hasMove['voltswitch'])) ||
			(hasMove['rapidspin'] && (ability === 'Regenerator' || !!counter['recovery']))) && !isDoubles
		) {
			item = 'Heavy-Duty Boots';
		} else if (this.dex.getEffectiveness('Ground', species) >= 2 && !hasType['Poison'] && !hasMove['magnetrise'] && ability !== 'Levitate' && !hasAbility['Iron Barbs'] && !isDoubles) {
			item = 'Air Balloon';
		} else if (counter.damagingMoves.length >= 3 && !counter['damage'] && ability !== 'Sturdy' && !hasMove['clearsmog'] && !hasMove['foulplay'] && !hasMove['rapidspin'] && !hasMove['substitute'] && !hasMove['uturn'] && !isDoubles &&
			(!!counter['speedsetup'] || hasMove['trickroom'] || !!counter['drain'] || hasMove['psystrike'] || (species.baseStats.spe > 40 && species.baseStats.hp + species.baseStats.def + species.baseStats.spd < 275))
		) {
			item = 'Life Orb';
		} else if (counter.damagingMoves.length >= 4 && !counter['Dragon'] && !counter['Normal'] && !isDoubles) {
			item = 'Expert Belt';
		} else if ((hasMove['dragondance'] || hasMove['swordsdance']) && !isDoubles &&
			(hasMove['outrage'] || !hasType['Bug'] && !hasType['Fire'] && !hasType['Ground'] && !hasType['Normal'] && !hasType['Poison'] && !['Pastel Veil', 'Storm Drain'].includes(ability))
		) {
			item = 'Lum Berry';
		}

		// For Trick / Switcheroo
		if (item === 'Leftovers' && hasType['Poison']) {
			item = 'Black Sludge';
		} else if (item === 'Leftovers' && (hasType['Bug'] || hasType['Grass'])) {
			item = 'Itchy Pollen';
		}

		const level: number = (!isDoubles ? species.randomBattleLevel : species.randomDoubleBattleLevel) || 80;

		// Prepare optimal HP
		const srWeakness = (ability === 'Magic Guard' || ability === 'Trample' || item === 'Heavy-Duty Boots' ? 0 : this.dex.getEffectiveness('Rock', species));
		while (evs.hp > 1) {
			const hp = Math.floor(Math.floor(2 * species.baseStats.hp + ivs.hp + Math.floor(evs.hp / 4) + 100) * level / 100 + 10);
			if (hasMove['substitute'] && (item === 'Sitrus Berry' || ability === 'Power Construct' || (hasMove['bellydrum'] && item === 'Salac Berry'))) {
				// Two Substitutes should activate Sitrus Berry
				if (hp % 4 === 0) break;
			} else if (hasMove['bellydrum'] && (item === 'Sitrus Berry' || ability === 'Gluttony')) {
				// Belly Drum should activate Sitrus Berry
				if (hp % 2 === 0) break;
			} else if (hasMove['substitute'] && hasMove['reversal']) {
				// Reversal users should be able to use four Substitutes
				if (hp % 4 > 0) break;
			} else {
				// Maximize number of Stealth Rock switch-ins
				if (srWeakness <= 0 || hp % (4 / srWeakness) > 0) break;
			}
			evs.hp -= 4;
		}

		if (hasMove['shellsidearm'] && item === 'Choice Specs') evs.atk -= 4;

		// Minimize confusion damage
		if (!counter['Physical'] && !hasMove['transform'] && (!hasMove['shellsidearm'] || !counter.Status)) {
			evs.atk = 0;
			ivs.atk = 0;
		}

		if (hasMove['gyroball'] || hasMove['trickroom']) {
			evs.spe = 0;
			ivs.spe = 0;
		}

		return {
			name: species.baseSpecies,
			species: forme,
			gender: species.gender,
			moves: moves,
			ability: ability,
			evs: evs,
			ivs: ivs,
			item: item,
			level: level,
			shiny: this.randomChance(1, 128),
			gigantamax: gmax,
		};
	}

	getPokemonPool(type: string, pokemon: RandomTeamsTypes.RandomSet[] = [], isMonotype = false) {
		const exclude = pokemon.map(p => toID(p.species));
		const pokemonPool = [];
		for (const id in this.dex.data.FormatsData) {
			let species = this.dex.getSpecies(id);
			if (species.gen > this.gen || exclude.includes(species.id)) continue;
			if (isMonotype) {
				if (!species.types.includes(type)) continue;
				if (typeof species.battleOnly === 'string') {
					species = this.dex.getSpecies(species.battleOnly);
					if (!species.types.includes(type)) continue;
				}
			}
			pokemonPool.push(id);
		}
		return pokemonPool;
	}

	randomTeam() {
		const seed = this.prng.seed;
		const ruleTable = this.dex.getRuleTable(this.format);
		const pokemon = [];

		// For Monotype
		const isMonotype = ruleTable.has('sametypeclause');
		const typePool = Object.keys(this.dex.data.TypeChart);
		const type = this.sample(typePool);

		// PotD stuff
		let potd: Species | false = false;
		if (global.Config && Config.potd && ruleTable.has('potd')) {
			potd = this.dex.getSpecies(Config.potd);
		}

		const baseFormes: {[k: string]: number} = {};

		const tierCount: {[k: string]: number} = {};
		const typeCount: {[k: string]: number} = {};
		const typeComboCount: {[k: string]: number} = {};
		const teamDetails: RandomTeamsTypes.TeamDetails = {};

		// We make at most two passes through the potential Pokemon pool when creating a team - if the first pass doesn't
		// result in a team of six Pokemon we perform a second iteration relaxing as many restrictions as possible.
		for (const restrict of [true, false]) {
			if (pokemon.length >= 6) break;
			const pokemonPool = this.getPokemonPool(type, pokemon, isMonotype);
			while (pokemonPool.length && pokemon.length < 6) {
				let species = this.dex.getSpecies(this.sampleNoReplace(pokemonPool));
				if (!species.exists) continue;

				// Check if the forme has moves for random battle
				if (this.format.gameType === 'singles') {
					if (!species.randomBattleMoves) continue;
				} else {
					if (!species.randomDoubleBattleMoves) continue;
				}

				// Limit to one of each species (Species Clause)
				if (baseFormes[species.baseSpecies]) continue;

				// Adjust rate for species with multiple sets
				switch (species.baseSpecies) {
				case 'Migreat':
					if (this.randomChance(1, 2)) continue;
					break;
				case 'Darmanitan':
					if (this.randomChance(1, 2)) continue;
					break;
				case 'Dektout':
					if (this.randomChance(1, 4)) continue;
					break;
				}

				// Illusion shouldn't be on the last slot
				if (species.name === 'Blendulum' && pokemon.length > 4) continue;
				
				// Make sure only new mons are used
				if (species.tier !== "NovraiRegion" && species.tier !== "NovraiUber" && species.tier !== "NovraiNFE") {
					continue;
				}


				const tier = species.tier;
				const types = species.types;
				const typeCombo = types.slice().sort().join();

				if (restrict) {
					if (!isMonotype) {
						// Limit two of any type
						let skip = false;
						for (const typeName of types) {
							if (typeCount[typeName] > 1) {
								skip = true;
								break;
							}
						}
						if (skip) continue;
					}

					// Limit one of any type combination, two in Monotype
					if (typeComboCount[typeCombo] >= (isMonotype ? 2 : 1)) continue;
				}

				const set = this.randomSet(species, teamDetails, pokemon.length === 0, this.format.gameType !== 'singles');

				// Okay, the set passes, add it to our team
				pokemon.push(set);

				if (pokemon.length === 6) {
					// Set Zoroark's level to be the same as the last Pokemon
					const illusion = teamDetails['illusion'];
					if (illusion) pokemon[illusion - 1].level = pokemon[5].level;

					// Don't bother tracking details for the 6th Pokemon
					break;
				}

				// Now that our Pokemon has passed all checks, we can increment our counters
				baseFormes[species.baseSpecies] = 1;

				// Increment type counters
				for (const typeName of types) {
					if (typeName in typeCount) {
						typeCount[typeName]++;
					} else {
						typeCount[typeName] = 1;
					}
				}
				if (typeCombo in typeComboCount) {
					typeComboCount[typeCombo]++;
				} else {
					typeComboCount[typeCombo] = 1;
				}

				// Track what the team has
				if (set.ability === 'Drizzle' || set.moves.includes('raindance')) teamDetails['rain'] = 1;
				if (set.ability === 'Drought' || set.moves.includes('sunnyday')) teamDetails['sun'] = 1;
				if (set.ability === 'Sand Stream') teamDetails['sand'] = 1;
				if (set.ability === 'Snow Warning') teamDetails['hail'] = 1;
				if (set.ability === 'Snow Warning') teamDetails['snow'] = 1;
				if (set.ability === 'Electric Surge') teamDetails['electricterrain'] = 1;
				if (set.moves.includes('spikes')) teamDetails['spikes'] = (teamDetails['spikes'] || 0) + 1;
				if (set.moves.includes('stealthrock')) teamDetails['stealthRock'] = 1;
				if (set.moves.includes('stickyweb')) teamDetails['stickyWeb'] = 1;
				if (set.moves.includes('toxicspikes')) teamDetails['toxicSpikes'] = 1;
				if (set.moves.includes('defog')) teamDetails['defog'] = 1;
				if (set.moves.includes('rapidspin') || set.moves.includes('mortalspin')) teamDetails['rapidSpin'] = 1;
				if (set.moves.includes('auroraveil') || set.moves.includes('reflect') && set.moves.includes('lightscreen')) teamDetails['screens'] = 1;

				// For setting Zoroark's level
				if (set.ability === 'Illusion') teamDetails['illusion'] = pokemon.length;
			}
		}
		if (pokemon.length < 6) throw new Error(`Could not build a random team for ${this.format} (seed=${seed})`);

		return pokemon;
	}
}

export default RandomTeams;
