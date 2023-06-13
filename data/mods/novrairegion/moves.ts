export const Moves: {[moveid: string]: MoveData} = {
	allergypollen: {
		accuracy: 75,
		basePower: 0,
		category: "Status",
		name: "Allergy Pollen",
		pp: 10,
		priority: 0,
		flags: {powder: 1, protect: 1, reflectable: 1, mirror: 1},
		status: 'brn',
		secondary: null,
		target: "normal",
		type: "Grass",
	},
	amberwave: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Amber Wave",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			},
		},
		target: "normal",
		type: "Rock",
	},
	anticoagulant: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Anticoagulant",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		boosts: {
			spd: -3,
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		zMove: {boost: {spa: 1}},
	},
	aquaslap: {
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Aqua Slap",
		pp: 25,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Water",
	},
	bananarang: {
		accuracy: 90,
		basePower: 50,
		category: "Physical",
		name: "Bananarang",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: 2,
		secondary: null,
		target: "normal",
		type: "Grass",
	},
	battleroar: {
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Battle Roar",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		secondary: {
			chance: 30,
			boosts: {
				atk: -1,
			},
		},
		target: "normal",
		type: "Fighting",
	},
	beachtide: {
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Beach Tide",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		onModifyMove(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.basePower *= 3;
				break;
			}
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Water",
	},
	boltin: {
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Bolt In",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Steel",
	},
	cloudcrash: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Cloud Crash",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Flying",
	},
	cuddle: {
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Cuddle",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 50,
			boosts: {
				atk: -1,
			},
		},
		target: "normal",
		type: "Fairy",
	},
	curseofash: {
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Curse of Ash",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			volatileStatus: 'curse',
		},
		secondary: null,
		target: "normal",
		type: "Fire",
	},
	cursedpackage: {
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Cursed Package",
		pp: 10,
		priority: 0,
		flags: {},
		ignoreImmunity: true,
		isFutureMove: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 3,
				move: 'cursedpackage',
				source: source,
				moveData: {
					id: 'cursedpackage',
					name: "Cursed Package",
					accuracy: 100,
					basePower: 120,
					category: "Special",
					priority: 0,
					flags: {},
					ignoreImmunity: false,
					effectType: 'Move',
					isFutureMove: true,
					type: 'Ghost',
				},
			});
			this.add('-start', source, 'move: Cursed Package');
			return this.NOT_FAIL;
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Clever",
	},
	cyclone: {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Cloud Crash",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "allAdjacent",
		type: "Flying",
	},
	dragonfang: {
		accuracy: 95,
		basePower: 65,
		category: "Physical",
		name: "Dragon Fang",
		pp: 15,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		onEffectiveness(typeMod, target, type, source) {
			if (type === 'Fairy' && source.species.name === 'Huntail-Novrai') return 0;
		},
		secondaries: [
			{
				chance: 10,
				self: {
					boosts: {
						atk: 1,
					},
				},
			}, {
				chance: 10,
				volatileStatus: 'flinch',
			},
		],
		target: "normal",
		type: "Dragon",
	},
	electriccheer: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Electric Cheer",
		pp: 10,
		priority: 0,
		flags: {bypasssub: 1, allyanim: 1},
		secondary: null,
		boosts: {
			spa: 1,
			spe: 1,
		},
		target: "adjacentAlly",
		type: "Fighting",
	},
	epilogue: { //TODO
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Epilogue",
		pp: 5,
		priority: 0,
		flags: {},
		boosts: {
			atk: -1,
		},
		secondary: null,
		target: "all",
		type: "Normal",
	},
	filthyterrain: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Filthy Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'filthyterrain',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Poison' && attacker.isGrounded()) {
					this.debug('filthy terrain boost');
					return this.chainModify([5325, 4096]);
				}
			},
			onDamage(damage, attacker, defender, effect) {
				if (effect && (effect.id === 'psn' || effect.id === 'tox') && defender.isGrounded()) {
					return damage * 2;
				}
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Filthy Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Filthy Terrain');
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Filthy Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Poison",
	},
	flurrypeck: {
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		name: "Flurry Peck",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Flying",
	},
	fruitmunch: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Fruit Munch",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		onTry(source) {
			const item = source.getItem();
			if (item.isBerry && source.eatItem(true)) {
				this.heal(Math.ceil(source.maxhp * 0.5), source);
			} else {
				return false;
			}
		},
		secondary: null,
		target: "self",
		type: "Grass",
	},
	glowsignal: {
		accuracy: 100,
		basePower: 30,
		category: "Special",
		name: "Glow Signal",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Psychic",
	},
	honeybomb: {
		accuracy: 95,
		basePower: 70,
		category: "Special",
		name: "Honey Bomb",
		pp: 15,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Bug",
	},
	honeypour: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Honey Pour",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		volatileStatus: 'honeypour',
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Honey Pour');
			},
			onEffectivenessPriority: -2,
			onEffectiveness(typeMod, target, type, move) {
				if (move.type !== 'Bug') return;
				if (!target) return;
				if (type !== target.getTypes()[0]) return;
				return typeMod + 1;
			},
		},
		boosts: {
			spe: -1,
		},
		secondary: null,
		target: "normal",
		type: "Bug",
	},
	icycharge: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Icy Charge",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'hail':
			case 'snow':
				move.basePower *= 2;
				break;
			}
		},
		secondary: null,
		target: "normal",
		type: "Ice",
	},
	juicespray: {
		accuracy: 100,
		basePower: 35,
		category: "Special",
		name: "Juice Spray",
		pp: 35,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			boosts: {
				accuracy: -1,
			},
		},
		target: "normal",
		type: "Grass",
	},
	jumpstart: {
		accuracy: 100,
		basePower: 110,
		category: "Physical",
		name: "Jumpstart",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				spe: 1,
			},
		},
		target: "normal",
		type: "Electric",
	},
	landslide: {
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			const damagedByTarget = pokemon.attackedBy.some(
				p => p.source === target && p.damage > 0 && p.thisTurn
			);
			if (damagedByTarget) {
				this.debug('Boosted for getting hit by ' + target);
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
		name: "Landslide",
		pp: 10,
		priority: -4,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Ground",
	},
	lightup: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Light Up",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			spa: 1,
			accuracy: 1,
		},
		secondary: null,
		target: "self",
		type: "Fire",
	},
	lovelariat: {
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Love Lariat",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onBasePower(basePower, pokemon, target) {
			if (target.volatiles['attract']) {
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
	},
	magnetlaunch: {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Magnet Launch",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				def: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	meteorshower: {
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Meteor Shower",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			status: 'slp',
		},
		target: "allAdjacentFoes",
		type: "Rock",
	},
	mysticsong: {
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Mystic Song",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		secondary: {
			chance: 20,
			boosts: {
				spa: -1,
			},
		},
		target: "normal",
		type: "Dragon",
	},
	nuggetfling: {
		accuracy: 100,
		basePower: 25,
		category: "Steel",
		name: "Nugget Fling",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.species.name === 'Rasgold') move.multihit = [4, 5];
			else if (pokemon.species.name === 'Mizevaris') move.multihit = [5];
		},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	oilfire: {
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Oil Fire",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'raindance':
			case 'primordialsea':
				move.basePower *= 3;
				break;
			}
		},
		secondary: null,
		target: "normal",
		type: "Fire",
	},
	pixiedust: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Pixie Dust",
		pp: 15,
		priority: 0,
		flags: {powder: 1, protect: 1, reflectable: 1, mirror: 1},
		const result = this.random(3);
		if (result === 0) {
			status: 'par',
		} else if (result === 1) {
			status: 'slp',
		} else {
			volatileStatus: 'confusion',
		}
		secondary: null,
		target: "normal",
		type: "Fairy",
	},
	psibullet: {
		accuracy: 95,
		basePower: 60,
		category: "Special",
		name: "Psi Bullet",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "Psychic",
	},
	quietrepose: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Quiet Repose",
		pp: 10,
		priority: 0,
		flags: {heal: 1, bypasssub: 1, allyanim: 1},
		onHit(pokemon) {
			const success = !!this.heal(this.modify(pokemon.maxhp, 0.25));
			return pokemon.cureStatus() || success;
		},
		secondary: null,
		target: "allies",
		type: "Ghost",
	},
	rainbowgust: {
		num: 859,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Rainbow Gust",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		secondary: {
			chance: 10,
			self: {
				boosts: {
					atk: 1,
					def: 1,
					spa: 1,
					spd: 1,
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Fairy",
	},
	reservoir: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Reservoir",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1, bypasssub: 1},
		onHit(pokemon) {
			let factor = 0.5;
			if (this.field.isWeather('raindance')) {
				factor = 0.667;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
		secondary: null,
		target: "allies",
		type: "Water",
	},
	rollingpress: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Rolling Press",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Fighting",
	},
	royaldecree: { //TODO
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Royal Decree",
		pp: 10,
		priority: 0,
		flags: {},
		boosts: {
			atk: -1,
		},
		secondary: null,
		target: "all",
		type: "Normal",
	},
	royalflush: {
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Royal Flush",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
	},
	rundown: {
		accuracy: 100,
		basePower: 65,
		category: "Physical",
		name: "Run Down",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, nonsky: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Steel",
	},
	sandshot: {
		accuracy: 90,
		basePower: 90,
		category: "Physical",
		name: "Sand Shot",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			onHit(source) {
				if (!source.species.name === 'Flygon') return;
				this.field.setWeather('sandstorm');
			},
		},
		secondary: {
			chance: 30,
			boosts: {
				accuracy: -1,
			},
		},
		target: "normal",
		type: "Ground",
	},
	selfrepair: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Self-Repair",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		secondary: null,
		target: "self",
		type: "Steel",
	},
	shadowdance: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Shadow Dance",
		pp: 20,
		priority: 0,
		flags: {snatch: 1, dance: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.species.name === 'Entomortis') move.boosts = {atk: 1, spd: 1, spe: 1};
		},
		boosts: {
			spd: 1,
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Ghost",
	},
	shoveoff: {
		accuracy: 100,
		basePower: 55,
		basePowerCallback(pokemon, target, move) {
			if (target.baseSpecies.nfe) {
				this.debug('Shove Off boost');
				return move.basePower * 2;
			}
		},
		category: "Physical",
		name: "Shove Off",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	skydive: {
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Sky Dive",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			pokemon.side.removeSideCondition('reflect');
			pokemon.side.removeSideCondition('lightscreen');
			pokemon.side.removeSideCondition('auroraveil');
		},
		secondary: null,
		target: "normal",
		type: "Flying",
	},
	slipup: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Slip Up",
		pp: 15,
		priority: 4,
		flags: {snatch: 1},
		volatileStatus: 'slipup',
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'Slip Up');
			},
			onTryMovePriority: -1,
			onTryMove(pokemon, target, move) {
				if (move.flags['contact']) {
					this.add('-activate', pokemon, 'move: Slip Up');
					this.damage(this.clampIntRange(Math.round(pokemon.maxhp / 4), 1));
					return false;
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Grass",
	},
	snowballpelt: {
		accuracy: 90,
		basePower: 15,
		category: "Physical",
		name: "Snowball Pelt",
		pp: 5,
		priority: 1,
		flags: {bullet: 1, protect: 1, mirror: 1},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Ice",
	},
	solarflare: {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Solar Flare",
		pp: 10,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (['sunnyday', 'desolateland'].includes(attacker.effectiveWeather())) {
				this.attrLastMove('[still]');
				this.addMove('-anim', attacker, move.name, defender);
				return;
			}
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		onBasePower(basePower, pokemon, target) {
			if (['raindance', 'primordialsea', 'sandstorm', 'hail'].includes(pokemon.effectiveWeather())) {
				this.debug('weakened by weather');
				return this.chainModify(0.5);
			}
		},
		secondary: {
			chance: 50,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
	},
	solidkick: {
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Solid Kick",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Fighting",
	},
	soulchomp: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		defensiveCategory: "Special",
		name: "Soul Chomp",
		pp: 10,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Ghost",
	},
	starstream: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Starstream",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			status: 'slp',
		},
		target: "allAdjacentFoes",
		type: "Psychic",
	},
	stridentecho: {
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Strident Echo",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		multihit: 2,
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Dark",
		zMove: {basePower: 140},
		maxMove: {basePower: 120},
	},
	swarmingterrain: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Swarming Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'swarmingterrain',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Bug' && attacker.isGrounded()) {
					this.debug('swarming terrain boost');
					return this.chainModify([5325, 4096]);
				}
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Swarming Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Swarming Terrain');
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Swarming Terrain');
			},

			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (pokemon.isGrounded() && this.dex.moves.get(moveSlot.id).flags['heal'] && this.dex.moves.get(moveSlot.id) !== 'healorder') {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 6,
			onBeforeMove(pokemon, target, move) {
				if (pokemon.isGrounded() && move.flags['heal'] && move.id !== 'healorder' && !move.isZ && !move.isMax) {
					this.add('cant', pokemon, 'move: Swarming Terrain', move);
					return false;
				}
			},
			onModifyMove(move, pokemon, target) {
				if (pokemon.isGrounded() && move.flags['heal'] && move.id !== 'healorder' && !move.isZ && !move.isMax) {
					this.add('cant', pokemon, 'move: Swarming Terrain', move);
					return false;
				}
			},
			onResidualOrder: 20,
			onEnd(pokemon) {
				this.add('-end', pokemon, 'move: Swarming Terrain');
			},
			onTryHeal(damage, target, source, effect) {
				if ((effect?.id === 'zpower') || this.effectState.isZ) return damage;
				return false;
			},
		},
		secondary: null,
		target: "all",
		type: "Bug",
	},
	sweetdecay: {
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Sweet Decay",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		condition: {
			duration: 2,
			onStart(target) {
				this.add('-start', target, 'Sweet Decay', '[silent]');
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.moves.get(moveSlot.id).flags['bite']) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 6,
			onBeforeMove(pokemon, target, move) {
				if (!move.isZ && !move.isMax && move.flags['bite']) {
					this.add('cant', pokemon, 'move: Sweet Decay');
					return false;
				}
			},
			onModifyMove(move, pokemon, target) {
				if (!move.isZ && !move.isMax && move.flags['bite']) {
					this.add('cant', pokemon, 'move: Sweet Decay');
					return false;
				}
			},
			onResidualOrder: 22,
			onEnd(target) {
				this.add('-end', target, 'Sweet Decay', '[silent]');
			},
		},
		secondary: {
			chance: 100,
			onHit(target) {
				target.addVolatile('sweetdecay');
			},
		},
		target: "normal",
		type: "Fairy",
	},
	threadlash: {
		accuracy: 90,
		basePower: 35,
		category: "Physical",
		name: "Thread Lash",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.species.name === 'Leavanny') move.multihit = 3;
		},
		multihit: 2,
		secondary: {
			chance: 50,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Bug",
	},
	thunderclap: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		defensiveCategory: "Special",
		name: "Thunderclap",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Electric",
	},
	toxicfumes: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Toxic Fumes",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			onHit(source) {
				if (!source.species.name === 'Splattod' && !source.species.name === 'Vandibal') return;
				this.field.setTerrain('filthyterrain');
			},
		},
		onModifyMove(move, pokemon, target) {
			if (!this.field.isTerrain('filthyterrain')) return;
			if (!move.secondaries) move.secondaries = [];
			move.secondaries = move.secondaries.filter(s => s.chance !== 30 && s.status !== 'psn');
			move.secondaries.push({
				chance: 100,
				status: 'psn',
			});
		},
		secondary:
		{
			chance: 30,
			status: 'psn',
		},
		target: "normal",
		type: "Poison",
	},
	twinblade: {
		accuracy: 90,
		basePower: 45,
		category: "Physical",
		name: "Twin Blade",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		multihit: 2,
		secondary: null,
		target: "normal",
		type: "Steel",
		maxMove: {basePower: 130},
	},
	violentswarm: {
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Violent Swarm",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyCritRatio(critRatio, source, target) {
			if (this.field.isTerrain('swarmingterrain') && source.isGrounded()) return 5;
		},
		onModifyMove(move, pokemon, target) {
			if (this.field.isTerrain('swarmingterrain') && source.isGrounded()) {
				move.target = 'allAdjacentFoes';
			}
		},
		secondary: null,
		target: "normal",
		type: "Bug",
	},
	wardance: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "War Dance",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, dance: 1},
		onTry(source) {
			if (source.activeMoveActions > 1) {
				this.hint("War Dance only works on your first turn out.");
				return false;
			}
		},
		boosts: {
			atk: 2,
			def: 2,
		},
		secondary: null,
		target: "self",
		type: "Fighting",
	},
	warmembrace: {
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		name: "Warm Embrace",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
	},
	windblast: {
		accuracy: 90,
		basePower: 100,
		category: "Special",
		name: "Windblast",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		secondary: {
			chance: 10,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Flying",
	},
	zapwrap: {
		accuracy: 75,
		basePower: 100,
		category: "Physical",
		name: "Zap Wrap",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		volatileStatus: 'partiallytrapped',
		secondary: null,
		target: "normal",
		type: "Electric",
	},
	// modified moves
	ancientpower: {
		inherit: true,
		pp: 10,
	},
	attract: {
		inherit: true,
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(pokemon, source, effect) {
				if (!(pokemon.gender === 'M' && source.gender === 'F') && !(pokemon.gender === 'F' && source.gender === 'M') && source.ability !== 'romantic') {
					this.debug('incompatible gender');
					return false;
				}
				if (!this.runEvent('Attract', pokemon, source)) {
					this.debug('Attract event failed');
					return false;
				}

				if (effect.id === 'cutecharm') {
					this.add('-start', pokemon, 'Attract', '[from] ability: Cute Charm', '[of] ' + source);
				} else if (effect.id === 'destinyknot') {
					this.add('-start', pokemon, 'Attract', '[from] item: Destiny Knot', '[of] ' + source);
				} else {
					this.add('-start', pokemon, 'Attract');
				}
			},
			onUpdate(pokemon) {
				if (this.effectData.source && !this.effectData.source.isActive && pokemon.volatiles['attract']) {
					this.debug('Removing Attract volatile on ' + pokemon);
					pokemon.removeVolatile('attract');
				}
			},
			onBeforeMovePriority: 2,
			onBeforeMove(pokemon, target, move) {
				this.add('-activate', pokemon, 'move: Attract', '[of] ' + this.effectData.source);
				if (this.randomChance(1, 2)) {
					this.add('cant', pokemon, 'Attract');
					return false;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Attract', '[silent]');
			},
		},
	},
	blazekick: {
		inherit: true,
		accuracy: 100,
		basePower: 90,
	},
	burningjealousy: {
		inherit: true,
		pp: 15,
	},
	captivate: {
		inherit: true,
		onTryImmunity(pokemon, source) {
			return (pokemon.gender === 'M' && source.gender === 'F') || (pokemon.gender === 'F' && source.gender === 'M') || source.ability === 'romantic';
		},
	},
	crosspoison: {
		inherit: true,
		basePower: 90,
		onModifyMove(move, pokemon, target) {
			if (!pokemon.species.name === 'Crobat') return;
			if (!move.secondaries) move.secondaries = [];
			move.secondaries = move.secondaries.filter(s => s.chance !== 10 && s.status !== 'psn');
			move.secondaries.push({
				chance: 100,
				status: 'psn',
			});
		},
	},
	defog: {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
	},
	direclaw: {
		inherit: true,
		secondary: {
			chance: 20,
			onHit(target, source) {
				const result = this.random(3);
				if (result === 0) {
					target.trySetStatus('psn', source);
				} else if (result === 1) {
					target.trySetStatus('par', source);
				} else {
					target.trySetStatus('slp', source);
				}
			},
		},
	},
	hammerarm: {
		inherit: true,
		accuracy: 100,
	},
	lastrespects: {
		inherit: true,
		basePower: 25,
		basePowerCallback(pokemon, target, move) {
			return 25 + 25 * pokemon.side.totalFainted;
		},
	},
	luminacrash: {
		inherit: true,
		secondary: {
			chance: 100,
			boosts: {
				spd: -1,
			},
		},
	},
	lusterpurge: {
		inherit: true,
		pp: 15,
	},
	mistball: {
		inherit: true,
		pp: 15,
	},
	mysticalpower: {
		inherit: true,
		accuracy: 100,
	},
	ominouswind: {
		inherit: true,
		pp: 10,
		flags: {protect: 1, mirror: 1, wind: 1},
	},
	psyshieldbash: {
		inherit: true,
		accuracy: 100,
	},
	scald: {
		inherit: true,
		secondary: {
			chance: 20,
			status: 'brn',
		},
	},
	silverwind: {
		inherit: true,
		pp: 10,
		flags: {protect: 1, mirror: 1, wind: 1},
	},
	spinout: {
		inherit: true,
		self: {
			boosts: {
				spe: -1,
			},
		},
	},
	submission: {
		inherit: true,
		accuracy: 100,
		basePower: 90,
		pp: 15,
	},
	technoblast: {
		inherit: true,
		basePower: 100,
	},
	// other favoured moves
	hypnosis: {
		inherit: true,
		onAccuracyPriority: -1,
		onAccuracy(accuracy, target, source, move) {
			if (source.species.name === 'Hoothoot' || source.species.name === 'Noctowl') return true;
		},
	},
	stockpile: {
		inherit: true,
		condition: {
			noCopy: true,
			onStart(target) {
				this.effectData.layers = 1;
				this.effectData.def = 0;
				this.effectData.spd = 0;
				this.add('-start', target, 'stockpile' + this.effectData.layers);
				const [curDef, curSpD] = [target.boosts.def, target.boosts.spd];
				if (target.species.name === 'Gourmaggot' || target.species.name === 'Pheromage') {
					this.boost({def: 2, spd: 1}, target, target);
				} else {
					this.boost({def: 1, spd: 1}, target, target);
				}
				if (curDef !== target.boosts.def) this.effectData.def--;
				if (curSpD !== target.boosts.spd) this.effectData.spd--;
			},
			onRestart(target) {
				if (this.effectData.layers >= 3) return false;
				this.effectData.layers++;
				this.add('-start', target, 'stockpile' + this.effectData.layers);
				const curDef = target.boosts.def;
				const curSpD = target.boosts.spd;
				if (target.species.name === 'Gourmaggot' || target.species.name === 'Pheromage') {
					this.boost({def: 2, spd: 1}, target, target);
				} else {
					this.boost({def: 1, spd: 1}, target, target);
				}
				if (curDef !== target.boosts.def) this.effectData.def--;
				if (curSpD !== target.boosts.spd) this.effectData.spd--;
			},
			onEnd(target) {
				if (this.effectData.def || this.effectData.spd) {
					const boosts: SparseBoostsTable = {};
					if (this.effectData.def) boosts.def = this.effectData.def;
					if (this.effectData.spd) boosts.spd = this.effectData.spd;
					this.boost(boosts, target, target);
				}
				this.add('-end', target, 'Stockpile');
				if (this.effectData.def !== this.effectData.layers * -1 || this.effectData.spd !== this.effectData.layers * -1) {
					this.hint("In Gen 7, Stockpile keeps track of how many times it successfully altered each stat individually.");
				}
			},
		},
	},
	leechlife: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (pokemon.species.name === 'Memosquito') {
				move.category = 'Special';
			}
		},
	},
	gigadrain: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (pokemon.species.name === 'Nectair' || pokemon.species.name === 'Soarup') {
				move.drain = [3, 4];
			}
		},
	},
	counter: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (pokemon.species.name === 'Sockback' || pokemon.species.name === 'Blockstack') {
				if (!move.drain) move.drain = [];
				move.drain = [1, 2];
			}
		},
	},
	dreameater: {
		inherit: true,
		onTryImmunity(target, source) {
			return target.status === 'slp' || target.hasAbility('comatose') || source.species.name === 'Munna' || source.species.name === 'Musharna';
		},
	},
	irontail: {
		inherit: true,
		onAccuracyPriority: -1,
		onAccuracy(accuracy, target, source, move) {
			if (source.species.name === 'Steelix') return true;
		},
	},
	poisonfang: {
		inherit: true,
		onBasePower(basePower, source) {
			if (source.species.name === 'Horrendible') {
				this.debug('favoured move buff');
				return this.chainModify(1.5);
			}
		},
	},
	disarmingvoice: {
		inherit: true,
		onModifyPriority(priority, source, target, move) {
			if (source.species.name === 'Kitterwaul' || source.species.name === 'Impawzible') {
				return priority + 1;
			}
		},
	},
	flamewheel: {
		inherit: true,
		onBasePower(basePower, source) {
			if (source.species.name === 'Jalopig' || source.species.name === 'Hotrog') {
				this.debug('favoured move buff');
				return this.chainModify(1.5);
			}
		},
	},
	explosion: {
		inherit: true,
		onModifyType(move, pokemon) {
			if (pokemon.species.name === 'Grenaize' || pokemon.species.name === 'Blastalk' || pokemon.species.name === 'Coboom') {
				move.type = 'Fire';
			}
		},
	},
	lightscreen: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem('lightclay') && (source.species.name === 'Dimwatt' || source.species.name === 'Bulbright' || source.species.name === 'Brillumint')) {
					return 11;
				} else if (source?.hasItem('lightclay') || source.species.name === 'Dimwatt' || source.species.name === 'Bulbright' || source.species.name === 'Brillumint') {
					return 8;
				}
				return 5;
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && target.side === this.effectData.target && this.getCategory(move) === 'Special') {
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Light Screen weaken');
						if (target.side.active.length > 1) return this.chainModify([0xAAC, 0x1000]);
						return this.chainModify(0.5);
					}
				}
			},
			onStart(side) {
				this.add('-sidestart', side, 'move: Light Screen');
			},
			onResidualOrder: 21,
			onResidualSubOrder: 1,
			onEnd(side) {
				this.add('-sideend', side, 'move: Light Screen');
			},
		},
	},
	thunderpunch: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (pokemon.species.name === 'Alkaalite' || pokemon.species.name === 'Oblittery' || pokemon.species.name === 'Durassault') {
				if (!move.drain) move.drain = [];
				move.drain = [1, 2];
			}
		},
	},
	wish: {
		inherit: true,
		condition: {
			duration: 2,
			onStart(pokemon, source) {
				if (source.species.name === 'Togepi' || source.species.name === 'Togetic' || source.species.name === 'Togekiss') {
					this.effectData.hp = source.maxhp * 3 / 4;
				} else {
					this.effectData.hp = source.maxhp / 2;
				}
			},
			onResidualOrder: 4,
			onEnd(target) {
				if (target && !target.fainted) {
					const damage = this.heal(this.effectData.hp, target, target);
					if (damage) this.add('-heal', target, target.getHealth, '[from] move: Wish', '[wisher] ' + this.effectData.source.name);
				}
			},
		},
	},
	powerwhip: {
		inherit: true,
		onAccuracyPriority: -1,
		onAccuracy(accuracy, target, source, move) {
			if (source.species.name === 'Tangela' || source.species.name === 'Tangrowth') return true;
		},
	},
	rototiller: {
		inherit: true,
		onHitField(target, source) {
			const targets: Pokemon[] = [];
			let anyAirborne = false;
			for (const pokemon of this.getAllActive()) {
				if (!pokemon.runImmunity('Ground')) {
					this.add('-immune', pokemon);
					anyAirborne = true;
					continue;
				}
				if (pokemon.hasType('Grass')) {
					// This move affects every grounded Grass-type Pokemon in play.
					targets.push(pokemon);
				}
			}
			if (!targets.length && !anyAirborne) return false; // Fails when there are no grounded Grass types or airborne Pokemon
			if (source.species.name === 'Toupe\u0301ary') {
				for (const pokemon of targets) {
					this.boost({atk: 2, spa: 2}, pokemon, source);
				}
			} else {
				for (const pokemon of targets) {
					this.boost({atk: 1, spa: 1}, pokemon, source);
				}
			}
		},
	},
	facade: {
		inherit: true,
		onModifyType(move, pokemon) {
			if (pokemon.species.name === 'Sacretary') {
				move.type = 'Dragon';
			}
		},
	},
	crunch: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (pokemon.species.name === 'Wrassassin') {
				if (!move.drain) move.drain = [];
				move.drain = [1, 2];
			}
		},
	},
	waterpulse: {
		inherit: true,
		onModifyCritRatio(critRatio, source, target) {
			if (source.species.name === 'Clauncher' || source.species.name === 'Clawitzer') return 5;
		},
	},
	magnetrise: {
		inherit: true,
		onModifyPriority(priority, source, target, move) {
			if (source.species.name === 'Magnemite' || source.species.name === 'Magneton' || source.species.name === 'Magnezone') {
				return priority + 1;
			}
		},
	},
	poltergeist: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (pokemon.baseSpecies === 'Rotom') {
				move.category = 'Special';
			}
		},
	},
	rockblast: {
		inherit: true,
		onModifyMove(move, pokemon) {
			if (pokemon.species.name === 'Rhyperior') move.multihit = [4, 5];
		},
	},
	sludgewave: {
		inherit: true,
		onEffectiveness(typeMod, target, type, source) {
			if (type === 'Water' && (source.species.name === 'Grimer-Novrai' || source.species.name === 'Muk-Novrai')) return 1;
		},
	},
	suckerpunch: {
		inherit: true,
		onTry(source, target) {
			const action = this.queue.willMove(target);
			const move = action?.choice === 'move' ? action.move : null;
			if ((!move || (move.category === 'Status' && move.id !== 'mefirst') || target.volatiles['mustrecharge']) && source.species.name !== 'Cacnea' && source.species.name !== 'Cacturne') {
				this.add('-fail', source);
				this.attrLastMove('[still]');
				return null;
			}
		},
	},
	headsmash: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (pokemon.species.name === 'Cranidos-Novrai' || pokemon.species.name === 'Rampardos-Novrai') {
				move.recoil = [1, 4];
			}
		},
	},
	powergem: {
		inherit: true,
		onBasePower(basePower, source) {
			if (source.species.name === 'Omanyte-Novrai' || source.species.name === 'Omastar-Novrai') {
				this.debug('favoured move buff');
				return this.chainModify(1.5);
			}
		},
	},
	hiddenpower: {
		inherit: true,
		onModifyCritRatio(critRatio, source, target) {
			if (source.species.name === 'Intellibee') return 5;
		},
	},
	lifedew: {
		inherit: true,
		onHit(pokemon) {
			if (['', 'slp', 'frz'].includes(pokemon.status) || (pokemon.species.name !== 'Haloe' && pokemon.species.name !== 'Aloverity')) return false;
			pokemon.cureStatus();
		},
	},
	acrobatics: {
		inherit: true,
		basePowerCallback(pokemon, target, move) {
			if (!pokemon.item || pokemon.species.name === 'Ghostage' || pokemon.species.name === 'Paranormail' || pokemon.species.name === 'Deliveerie') {
				this.debug("Power doubled for no item");
				return move.basePower * 2;
			}
			return move.basePower;
		},
	},
	glare: {
		inherit: true,
		onHit(target, source) {
			if (source.species.name === 'Meduzap' || source.species.name === 'Gorgowatt') {
				if (target.getTypes().join() === 'Rock' || !target.setType('Rock')) {
					return false;
				}
				this.add('-start', target, 'typechange', 'Rock');
			}
		},
	},
	dracometeor: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (pokemon.species.name === 'Protauri' || pokemon.species.name === 'Stargazaur' || pokemon.species.name === 'Kaijupiter') {
				move.self.boosts = {spa: -1}
			}
		},
	},
	thief: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (!pokemon.species.name === 'Underhandit') return;
			move.secondaries = [];
			move.secondaries.push({
				chance: 100,
				status: 'brn',
			});
		},
	},
	rest: {
		inherit: true,
		onHit(target, source, move) {
			if (!target.setStatus('slp', source, move)) return false;
			if (target.species.name === 'Snorlax') {
				target.statusData.time = 2;
				target.statusData.startTime = 2;
			} else {
				target.statusData.time = 3;
				target.statusData.startTime = 3;
			}
			this.heal(target.maxhp); // Aesthetic only as the healing happens after you fall asleep in-game
		},
	},
	reversal: {
		inherit: true,
		onModifyPriority(priority, source, target, move) {
			if (source.species.name === 'Dodojo' || source.species.name === 'Taekwondodo') {
				return priority + 1;
			}
		},
	},
	bellydrum: {
		inherit: true,
		onHit(target) {
			if ((target.hp <= target.maxhp / 2 && target.species.name !== 'Percusshell') || target.boosts.atk >= 6 || target.maxhp === 1 || (target.species.name === 'Percusshell' && target.hp <= target.maxhp / 4)) { // Shedinja clause
				return false;
			}
			if (target.species.name === 'Percusshell') {
				this.directDamage(target.maxhp / 4);
			} else {
				this.directDamage(target.maxhp / 2);
			}
			this.boost({atk: 12}, target);
		},
	},
	drillpeck: {
		inherit: true,
		onBasePower(basePower, source) {
			if (source.species.name === 'Foolmingo') {
				this.debug('favoured move buff');
				return this.chainModify(1.5);
			}
		},
	},
	firelash: {
		inherit: true,
		onBasePower(basePower, source) {
			if (source.species.name === 'Pitcharade') {
				this.debug('favoured move buff');
				return this.chainModify(1.5);
			}
		},
	},
	dragonbreath: {
		inherit: true,
		onModifyCritRatio(critRatio, source, target) {
			if (source.species.name === 'Varanox' || source.species.name === 'Halitox' || source.species.name === 'Juroxic') return 5;
		},
	},
	fly: {
		inherit: true,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (attacker.species.name === 'Salamence') {
				this.attrLastMove('[still]');
				this.addMove('-anim', attacker, move.name, defender);
				return;
			}
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
	},
	icefang: {
		inherit: true,
		onBasePower(basePower, source) {
			if (source.species.name === 'Walrein') {
				this.debug('favoured move buff');
				return this.chainModify(1.5);
			}
		},
	},
	perishsong: {
		inherit: true,
		onModifyMove(move, pokemon) {
			if (pokemon.species.name === 'Sirenaut') {
				move.condition.duration = 3;
			}
		},
	},
	drainingkiss: {
		inherit: true,
		onBasePower(basePower, source) {
			if (source.species.name === 'Gorebyss-Novrai') {
				this.debug('favoured move buff');
				return this.chainModify(1.5);
			}
		},
	},
};