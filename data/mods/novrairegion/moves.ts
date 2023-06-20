export const Moves: {[moveid: string]: MoveData} = {
	allergypollen: {
		accuracy: 75,
		basePower: 0,
		category: "Status",
		name: "Allergy Pollen",
		pp: 10,
		priority: 0,
		flags: {powder: 1, protect: 1, reflectable: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Stun Spore', target);
		},
		status: 'brn',
		secondary: null,
		target: "normal",
		type: "Grass",
		shortDesc: "Burns the target. Powder-based.",
	},
	amberwave: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Amber Wave",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Muddy Water', target);
		},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			},
		},
		target: "normal",
		type: "Rock",
		shortDesc: "Traps the target.",
	},
	anticoagulant: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Anticoagulant",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Acid Spray', target);
		},
		boosts: {
			spd: -3,
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		zMove: {boost: {spa: 1}},
		shortDesc: "Drastically lowers the target's Sp. Def.",
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
		shortDesc: "10% chance to flinch.",
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
		shortDesc: "Hits twice.",
	},
	battleroar: {
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Battle Roar",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Hyper Voice', target);
		},
		secondary: {
			chance: 30,
			boosts: {
				atk: -1,
			},
		},
		target: "normal",
		type: "Fighting",
		shortDesc: "30% chance to lower target's Attack.",
	},
	beachtide: {
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Beach Tide",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Surf', target);
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Water",
		shortDesc: "50% boost in harsh sunlight.",
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
		shortDesc: "Boosts user's Speed.",
	},
	cloudcrash: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Cloud Crash",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Body Slam', target);
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		shortDesc: "Deals damage.",
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
		shortDesc: "50% chance to lower target's Attack.",
	},
	curseofash: {
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Curse of Ash",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Inferno', target);
		},
		self: {
			volatileStatus: 'curse',
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		shortDesc: "Curses the user.",
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
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Present', target);
		},
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
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		shortDesc: "Hits in two turns.",
	},
	cyclone: {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Cyclone",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Bleakwind Storm', target);
		},
		secondary: null,
		target: "allAdjacent",
		type: "Flying",
		shortDesc: "Hits all adjacent targets.",
	},
	dragonfang: {
		accuracy: 95,
		basePower: 65,
		category: "Physical",
		name: "Dragon Fang",
		pp: 15,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Crunch', target);
		},
		onModifyMove: function(move, pokemon) {
			if (pokemon.species.name === 'Huntail-Novrai' || pokemon.species.name === 'huntailnovrai') {
				move.ignoreImmunity = {
					Dragon: true
				};
			}
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
		shortDesc: "10% chance to flinch or raise the user's Attack. Huntail-Novrai: neutral on Fairy-types.",
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
		type: "Electric",
		shortDesc: "Raises ally's Sp. Atk and Speed.",
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
		shortDesc: "Incomplete. Ends field effects and prevents their activation.",
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
			onDamage(damage, target, source, effect) {
				if (effect && (effect.id === 'psn' || effect.id === 'tox') && target.isGrounded()) {
					return damage * 2;
				}
			},
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Filthy Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Filthy Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd() {
				this.add('-fieldend', 'move: Filthy Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Poison",
		shortDesc: "Boosts Poison moves and doubles poison status damage for five turns.",
	},
	flurrypeck: {
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		name: "Flurry Peck",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Drill Peck', target);
		},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Flying",
		shortDesc: "Hits 2-5 times.",
	},
	fruitmunch: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Fruit Munch",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Stuff Cheeks', target);
		},
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
		shortDesc: "Eats held Berry, then restores 50% HP.",
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
		shortDesc: "Confuses target.",
	},
	honeybomb: {
		accuracy: 95,
		basePower: 70,
		category: "Special",
		name: "Honey Bomb",
		pp: 15,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Mud Bomb', target);
		},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Bug",
		shortDesc: "Lowers target's Speed.",
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
		shortDesc: "Lowers target's Speed and makes it weaker to Bug moves.",
	},
	icycharge: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Icy Charge",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Ice Ball', target);
		},
		onModifyMove(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'hail': case 'snow':
				move.basePower *= 2;
				break;
			}
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		shortDesc: "Doubles power during snow.",
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
		shortDesc: "30% chance to lower target's accuracy.",
	},
	jumpstart: {
		accuracy: 100,
		basePower: 110,
		category: "Physical",
		name: "Jumpstart",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Thunder Fang', target);
		},
		secondary: {
			chance: 100,
			boosts: {
				spe: 1,
			},
		},
		target: "normal",
		type: "Electric",
		shortDesc: "Raises target's Speed.",
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
		shortDesc: "Doubles power after being hit.",
	},
	lightup: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Light Up",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Tail Glow', target);
		},
		boosts: {
			spa: 1,
			accuracy: 1,
		},
		secondary: null,
		target: "self",
		type: "Fire",
		shortDesc: "Raises Sp. Atk and accuracy.",
	},
	lovelariat: {
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Love Lariat",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Return', target);
		},
		onBasePower(basePower, pokemon, target) {
			if (target.volatiles['attract']) {
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		shortDesc: "Doubles power if target is infatuated.",
	},
	magnetlaunch: {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Magnet Launch",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Magnet Bomb', target);
		},
		self: {
			boosts: {
				def: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		shortDesc: "Lowers user's Defense.",
	},
	meteorshower: {
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Meteor Shower",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Draco Meteor', target);
		},
		secondary: {
			chance: 10,
			status: 'slp',
		},
		target: "allAdjacentFoes",
		type: "Rock",
		shortDesc: "10% chance to put targets to sleep.",
	},
	mysticsong: {
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Mystic Song",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Relic Song', target);
		},
		secondary: {
			chance: 20,
			boosts: {
				spa: -1,
			},
		},
		target: "normal",
		type: "Dragon",
		shortDesc: "20% chance to raise Sp. Def.",
	},
	nuggetfling: {
		accuracy: 100,
		basePower: 25,
		category: "Steel",
		name: "Nugget Fling",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon, target) {
			if (pokemon.species.name === 'Mizevaris' || pokemon.species.name === 'mizevaris') {
				move.multihit = 5;
			} else if (pokemon.species.name === 'Rasgold' || pokemon.species.name === 'rasgold') {
				move.multihit = [4, 5];
			}
		},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Steel",
		shortDesc: "Hits 2-5 times. Rasgold: hits 4-5 times. Mizevaris: hits 5 times.",
	},
	oilfire: {
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Oil Fire",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Incinerate', target);
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		shortDesc: "50% boost during rain.",
	},
	pixiedust: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Pixie Dust",
		pp: 15,
		priority: 0,
		flags: {powder: 1, protect: 1, reflectable: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Magic Powder', target);
		},
		onModifyMove (move) {
			const result = this.random(3);
			if (result === 0) {
				move.status = 'par';
			} else if (result === 1) {
				move.status = 'slp';
			} else {
				move.volatileStatus = 'confusion';
			}
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		shortDesc: "Inflicts sleep, paralysis, or confusion.",
	},
	psibullet: {
		accuracy: 95,
		basePower: 60,
		category: "Special",
		name: "Psi Bullet",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Mist Ball', target);
		},
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "Psychic",
		shortDesc: "Always crits.",
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
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Cosmic Power', target);
		},
		secondary: null,
		target: "allies",
		type: "Ghost",
		shortDesc: "Heals 25% and cures status.",
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
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Silver Wind', target);
		},
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
		shortDesc: "10% chance to raise all stats.",
	},
	reservoir: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Reservoir",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1, bypasssub: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Life Dew', target);
		},
		onHit(pokemon) {
			if (pokemon.hp >= pokemon.maxhp) return false;
			let factor = 0.5;
			if (this.field.isWeather('raindance')) {
				factor = 0.667;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
		secondary: null,
		target: "allies",
		type: "Water",
		shortDesc: "50% heal. 66% heal during rain.",
	},
	rollingpress: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Rolling Press",
		pp: 20,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Steamroller', target);
		},
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Fighting",
		shortDesc: "20% chance to confuse.",
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
		shortDesc: "Incomplete. Prevents opposing side from raising stats for five turns.",
	},
	royalflush: {
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Royal Flush",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Trump Card', target);
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		shortDesc: "Uses Attack or Sp. Atk, whichever is higher.",
	},
	sandshot: {
		accuracy: 90,
		basePower: 90,
		category: "Physical",
		name: "Sand Shot",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Sand Attack', target);
		},
		self: {
			onHit(source) {
				if (source.species.name !== 'Trapinch' && source.species.name !== 'Vibrava' && source.species.name !== 'Flygon') return;
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
		shortDesc: "30% chance to reduce target's accuracy. Flygon line: whips up a sandstorm.",
	},
	selfrepair: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Self-Repair",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Shift Gear', target);
		},
		onHit(pokemon) {
			if (pokemon.hp >= pokemon.maxhp) return false;
			return !!this.heal(this.modify(pokemon.maxhp, 0.5));
		},
		secondary: null,
		target: "self",
		type: "Steel",
		shortDesc: "50% heal.",
	},
	shadowdance: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Shadow Dance",
		pp: 20,
		priority: 0,
		flags: {snatch: 1, dance: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Curse', target);
		},
		onModifyMove(move, pokemon) {
			if (pokemon.species.name === 'Entomortis' || pokemon.species.name === 'entomortis') move.boosts = {atk: 1, spd: 1, spe: 1};
		},
		boosts: {
			spd: 1,
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Ghost",
		shortDesc: "Boosts Sp. Def and Speed. Entomortis: boosts Attack, Sp. Def, and Speed.",
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
		shortDesc: "Doubles power if target can evolve.",
	},
	skydive: {
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Sky Dive",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Aerial Ace', target);
		},
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			pokemon.side.removeSideCondition('reflect');
			pokemon.side.removeSideCondition('lightscreen');
			pokemon.side.removeSideCondition('auroraveil');
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		shortDesc: "Breaks screens.",
	},
	slipup: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Slip Up",
		pp: 15,
		priority: 4,
		flags: {powder: 1, protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		volatileStatus: 'slipup',
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Slip Up');
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
		target: "normal",
		type: "Grass",
		shortDesc: "If the target would use a contact move, it fails and takes damage.",
	},
	snowballpelt: {
		accuracy: 90,
		basePower: 15,
		category: "Physical",
		name: "Snowball Pelt",
		pp: 5,
		priority: 1,
		flags: {bullet: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Ice Ball', target);
		},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Ice",
		shortDesc: "Hits 2-5 times. +1 priority.",
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
			if (['sunnyday', 'desolateland'].includes(attacker.effectiveWeather()) || attacker.ability === 'clairvoyance') {
				this.attrLastMove('[still]');
				this.addMove('-anim', attacker, 'Solar Beam', defender);
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
		shortDesc: "Charges turn 1 unless in harsh sunlight. 50% chance to burn.",
	},
	solidkick: {
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Solid Kick",
		pp: 20,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Mega Kick', target);
		},
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Fighting",
		shortDesc: "Deals damage.",
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
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Jaw Lock', target);
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		shortDesc: "Uses target's Sp. Def.",
	},
	starstream: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Starstream",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Swift', target);
		},
		secondary: {
			chance: 10,
			status: 'slp',
		},
		target: "allAdjacentFoes",
		type: "Psychic",
		shortDesc: "10% chance to put targets to sleep.",
	},
	stridentecho: {
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Strident Echo",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Screech', target);
		},
		multihit: 2,
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Dark",
		zMove: {basePower: 140},
		maxMove: {basePower: 120},
		shortDesc: "Hits twice. 10% chance to confuse.",
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
			onStart(battle, source, effect) {
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
					if (pokemon.isGrounded() && this.dex.getMove(moveSlot.id).flags['heal'] && this.dex.getMove(moveSlot.id).id !== 'healorder') {
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
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd() {
				this.add('-fieldend', 'move: Swarming Terrain');
			},
			onTryHeal(damage, target, source, effect) {
				if ((effect?.id === 'zpower') || this.effectData.isZ || (effect?.id === 'healorder')) return damage;
				return false;
			},
		},
		shortDesc: "Boosts Bug moves by 30% and prevents healing for five turns.",
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
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Strange Steam', target);
		},
		condition: {
			duration: 2,
			onStart(target) {
				this.add('-start', target, 'Sweet Decay', '[silent]');
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.getMove(moveSlot.id).flags['bite']) {
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
		shortDesc: "Disables biting moves for two turns.",
	},
	threadlash: {
		accuracy: 90,
		basePower: 35,
		category: "Physical",
		name: "Thread Lash",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Power Whip', target);
		},
		onModifyMove(move, pokemon, target) {
			if (pokemon.species.name === 'Leavanny') {
				move.multihit = 3;
			}
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
		shortDesc: "Hits twice. 50% chance to lower Speed. Leavanny: hits three times.",
	},
	thunderclap: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		defensiveCategory: "Special",
		name: "Thunderclap",
		pp: 10,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Thunder', target);
		},
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Electric",
		shortDesc: "Uses target's Sp. Def. Sound-based.",
	},
	toxicfumes: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Toxic Fumes",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Gas', target);
		},
		self: {
			onHit(source) {
				if (source.species.name !== 'Splattod' && source.species.name !== 'Vandibal' && source.species.name !== 'splattod' && source.species.name !== 'vandibal') return;
				this.field.setTerrain('filthyterrain');
			},
		},
		onModifyMove(move, pokemon, target) {
			if (!this.field.isTerrain('filthyterrain')) return;
			if (!move.secondaries) move.secondaries = [];
			move.secondaries = move.secondaries.filter(s => s.chance !== 20 && s.status !== 'psn');
			move.secondaries.push({
				chance: 100,
				status: 'psn',
			});
		},
		secondary:
		{
			chance: 20,
			status: 'psn',
		},
		target: "normal",
		type: "Poison",
		shortDesc: "30% chance to poison. 100% chance on Filthy Terrain. Vandibal line: sets Filthy Terrain.",
	},
	twinblade: {
		accuracy: 90,
		basePower: 45,
		category: "Physical",
		name: "Twin Blade",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Behemoth Blade', target);
		},
		multihit: 2,
		secondary: null,
		target: "normal",
		type: "Steel",
		maxMove: {basePower: 130},
		shortDesc: "Hits twice.",
	},
	violentswarm: {
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Violent Swarm",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Heal Order', target);
		},
		onModifyMove(move, pokemon, target) {
			if (this.field.isTerrain('swarmingterrain') && pokemon.isGrounded()) {
				move.target = 'allAdjacentFoes';
				move.willCrit = true;
			}
		},
		secondary: null,
		target: "normal",
		type: "Bug",
		shortDesc: "Always crits and hits all opponents on Swarming Terrain.",
	},
	wardance: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "War Dance",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, dance: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Victory Dance', target);
		},
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
		shortDesc: "Sharply boosts Attack and Defense. Only works on first turn in battle.",
	},
	warmembrace: {
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		name: "Warm Embrace",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Sizzly Slide', target);
		},
		secondary: {
			chance: 100,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
		shortDesc: "100% chance to burn.",
	},
	windblast: {
		accuracy: 85,
		basePower: 100,
		category: "Special",
		name: "Windblast",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Aeroblast', target);
		},
		secondary: {
			chance: 10,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Flying",
		shortDesc: "10% chance to reduce target's Sp. Def.",
	},
	zapwrap: {
		accuracy: 75,
		basePower: 100,
		category: "Physical",
		name: "Zap Wrap",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Wring Out', target);
		},
		volatileStatus: 'partiallytrapped',
		secondary: null,
		target: "normal",
		type: "Electric",
		shortDesc: "Binds target for 4-5 turns.",
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
			if (pokemon.species.name !== 'Crobat') return;
			if (!move.secondaries) move.secondaries = [];
			move.secondaries = move.secondaries.filter(s => s.chance !== 10 && s.status !== 'psn');
			move.secondaries.push({
				chance: 100,
				status: 'psn',
			});
		},
		shortDesc: "High crit ratio. 10% chance to poison. Crobat: always poisons.",
	},
	defog: {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1, wind: 1},
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
	icehammer: {
		inherit: true,
		accuracy: 100,
	},
	lastrespects: {
		num: 854,
		accuracy: 100,
		basePower: 50,
		basePowerCallback(pokemon, target, move) {
			return 50 + 20 * pokemon.side.totalFainted;
		},
		category: "Physical",
		shortDesc: "+20 power for each time a party member fainted.",
		name: "Last Respects",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Ghost",
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
		shortDesc: "Puts target to sleep. Noctowl line: never misses.",
		onModifyMove(move, pokemon, target) {
			if (pokemon.species.name === 'Noctowl' || pokemon.species.name === 'Hoothoot') {
				move.accuracy = true;
			}
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
				if (target.species.name === 'Gourmaggot' || target.species.name === 'Pheromage' || target.species.name === 'gourmaggot' || target.species.name === 'pheromage') {
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
				if (target.species.name === 'Gourmaggot' || target.species.name === 'Pheromage' || target.species.name === 'gourmaggot' || target.species.name === 'pheromage') {
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
		shortDesc: "Raises Defense and Sp. Def. Pheromage line: sharply raises Defense and raises Sp. Def.",
	},
	leechlife: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (pokemon.species.name === 'Memosquito' || pokemon.species.name === 'memosquito') {
				move.category = 'Special';
			}
		},
		shortDesc: "50% HP drain. Memosquito: special.",
	},
	gigadrain: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (pokemon.species.name === 'Nectair' || pokemon.species.name === 'Soarup' || pokemon.species.name === 'nectair' || pokemon.species.name === 'soarup') {
				move.drain = [3, 4];
			}
		},
		shortDesc: "50% HP drain. Soarup line: 75% HP drain.",
	},
	counter: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (pokemon.species.name === 'Sockback' || pokemon.species.name === 'Blockstack' || pokemon.species.name === 'sockback' || pokemon.species.name === 'blockstack') {
				if (!move.drain) move.drain = [];
				move.drain = [1, 2];
			}
		},
		shortDesc: "Returns twice as much physical attack damage. Blockstack line: 50% HP drain.",
	},
	dreameater: {
		inherit: true,
		onTryImmunity(target, source) {
			return target.status === 'slp' || target.hasAbility('comatose') || source.species.name === 'Munna' || source.species.name === 'Musharna';
		},
		shortDesc: "Only works if target is asleep. Musharna line: always works.",
	},
	irontail: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (pokemon.species.name === 'Steelix') {
				move.accuracy = true;
			}
		},
		shortDesc: "30% chance to lower target's Defense. Steelix: never misses.",
	},
	poisonfang: {
		inherit: true,
		onBasePower(basePower, source) {
			if (source.species.name === 'Horrendible' || source.species.name === 'horrendible') {
				this.debug('favoured move buff');
				return this.chainModify(1.5);
			}
		},
		shortDesc: "50% chance to badly poison. Horrendible: 50% damage boost.",
	},
	disarmingvoice: {
		inherit: true,
		onModifyPriority(priority, source, target, move) {
			if (source.species.name === 'Kitterwaul' || source.species.name === 'Impawzible' || source.species.name === 'kitterwaul' || source.species.name === 'impawzible') {
				return priority + 1;
			}
		},
		desc: "This move does not check accuracy. Impawzible line: +1 priority.",
	},
	flamewheel: {
		inherit: true,
		onBasePower(basePower, source) {
			if (source.species.name === 'Jalopig' || source.species.name === 'Hotrog' || source.species.name === 'jalopig' || source.species.name === 'hotrog') {
				this.debug('favoured move buff');
				return this.chainModify(1.5);
			}
		},
		shortDesc: "10% chance to burn. Hotrog line: 50% damage boost.",
	},
	explosion: {
		inherit: true,
		onModifyType(move, pokemon) {
			if (pokemon.species.name === 'Grenaize' || pokemon.species.name === 'Blastalk' || pokemon.species.name === 'Coboom' ||
				pokemon.species.name === 'grenaize' || pokemon.species.name === 'blastalk' || pokemon.species.name === 'coboom') {
				move.type = 'Fire';
			}
		},
		shortDesc: "KOs the user. Coboom line: Fire-type.",
	},
	lightscreen: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem('lightclay') && (source.species.name === 'Dimwatt' || source.species.name === 'Bulbright' || source.species.name === 'Brillumint' || 
				source.species.name === 'dimwatt' || source.species.name === 'bulbright' || source.species.name === 'brillumint')) {
					return 11;
				} else if (source?.hasItem('lightclay') || source.species.name === 'Dimwatt' || source.species.name === 'Bulbright' || source.species.name === 'Brillumint' ||
				source.species.name === 'dimwatt' || source.species.name === 'bulbright' || source.species.name === 'brillumint') {
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
		shortDesc: "Halves special damage for five turns. Brillumint line: lasts three more turns.",
	},
	thunderpunch: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (pokemon.species.name === 'Alkaalite' || pokemon.species.name === 'Oblittery' || pokemon.species.name === 'Durassault' ||
			source.species.name === 'alkaalite' || pokemon.species.name === 'oblittery' || pokemon.species.name === 'durassault') {
				if (!move.drain) move.drain = [];
				move.drain = [1, 2];
			}
		},
		shortDesc: "10% chance to paralyze. Durassault line: 50% HP drain.",
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
		shortDesc: "Restores 50% HP at the end of next turn. Togekiss line: restores 75% HP.",
	},
	powerwhip: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (pokemon.species.name === 'Tangela' || pokemon.species.name === 'Tangrowth') {
				move.accuracy = true;
			}
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
			if (source.species.name === 'Toupe\u0301ary' || source.species.name === 'toupe\u0301ary') {
				for (const pokemon of targets) {
					this.boost({atk: 2, spa: 2}, pokemon, source);
				}
			} else {
				for (const pokemon of targets) {
					this.boost({atk: 1, spa: 1}, pokemon, source);
				}
			}
		},
		shortDesc: "Boosts Attack and Sp. Atk of Grass-types. Toupe\u0301ary: sharply boosts Attack and Sp. Atk of Grass-types.",
	},
	facade: {
		inherit: true,
		onModifyType(move, pokemon) {
			if (pokemon.species.name === 'Sacretary' || pokemon.species.name === 'sacretary') {
				move.type = 'Dragon';
			}
		},
		shortDesc: "Doubles power if statused. Sacretary: Dragon-type.",
	},
	crunch: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (pokemon.species.name === 'Wrassassin' || pokemon.species.name === 'wrassassin') {
				if (!move.drain) move.drain = [];
				move.drain = [1, 2];
			}
		},
		shortDesc: "20% chance to lower target's Defense. Wrassassin: 50% HP drain.",
	},
	waterpulse: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (pokemon.species.name === 'Clauncher' || pokemon.species.name === 'Clawitzer') {
				move.willCrit = true;
			}
		},
		shortDesc: "20% chance to confuse. Clawitzer line: always crits.",
	},
	magnetrise: {
		inherit: true,
		onModifyPriority(priority, source, target, move) {
			if (source.species.name === 'Magnemite' || source.species.name === 'Magneton' || source.species.name === 'Magnezone') {
				return priority + 1;
			}
		},
		shortDesc: "Immune to Ground moves for five turns. Magnezone line: +1 priority.",
	},
	poltergeist: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (pokemon.species.name === 'Rotom' || pokemon.species.name === 'Rotom-Wash' || pokemon.species.name === 'Rotom-Heat' ||
				pokemon.species.name === 'Rotom-Frost' || pokemon.species.name === 'Rotom-Fan' || pokemon.species.name === 'Rotom-Mow') {
				move.category = 'Special';
			}
		},
		shortDesc: "Fails if target doesn't have an item. Rotom: special.",
	},
	rockblast: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (pokemon.species.name === 'Rhyperior') {
				move.multihit = [4, 5];
			}
		},
		shortDesc: "Hits 2-5 times. Rhyperior: hits 4-5 times.",
	},
	sludgewave: {
		inherit: true,
		onModifyMove: function(move, pokemon) {
			if (pokemon.species.name === 'Grimer-Novrai' || pokemon.species.name === 'Muk-Novrai' || 
				pokemon.species.name === 'grimernovrai' || pokemon.species.name === 'muknovrai') {
				move.onEffectiveness = function(typeMod, target, type) {
					if (type === 'Water') return 1;
				};
			}
		},
		shortDesc: "10% chance to poison. Muk-Novrai line: Supereffective on Water types.",
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
		shortDesc: "Fails if target is not attacking. Cacturne line: never fails.",
	},
	headsmash: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (pokemon.species.name === 'Cranidos-Novrai' || pokemon.species.name === 'Rampardos-Novrai' || pokemon.species.name === 'cranidosnovrai' || pokemon.species.name === 'rampardosnovrai') {
				move.recoil = [1, 4];
			}
		},
		shortDesc: "50% recoil. Rampardos-Novrai line: 25% recoil.",
	},
	powergem: {
		inherit: true,
		onBasePower(basePower, source) {
			if (source.species.name === 'Omanyte-Novrai' || source.species.name === 'Omastar-Novrai' || source.species.name === 'omanytenovrai' || source.species.name === 'omastarnovrai') {
				this.debug('favoured move buff');
				return this.chainModify(1.5);
			}
		},
		shortDesc: "Omastar-Novrai line: 50% damage boost.",
	},
	hiddenpower: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (pokemon.species.name === 'Intellibee' || pokemon.species.name === 'intellibee') {
				move.willCrit = true;
			}
		},
		shortDesc: "Changes type based on IVs. Intellibee: always crits.",
	},
	lifedew: {
		inherit: true,
		onHit(pokemon) {
			const success = !!this.heal(this.modify(pokemon.maxhp, 0.25));
			if (pokemon.species.name === 'Haloe' || pokemon.species.name === 'Aloverity' || 
				pokemon.species.name === 'haloe' || pokemon.species.name === 'aloverity') {
				return pokemon.cureStatus() || success;
			}
			return success;
		},
		heal: null,
		shortDesc: "Heals 25% HP. Aloverity line: cures status.",
	},
	acrobatics: {
		inherit: true,
		basePowerCallback(pokemon, target, move) {
			if (!pokemon.item || pokemon.species.name === 'Ghostage' || pokemon.species.name === 'Paranormail' || pokemon.species.name === 'Deliveerie'
				 || pokemon.species.name === 'ghostage' || pokemon.species.name === 'paranormail' || pokemon.species.name === 'deliveerie') {
				this.debug("Power doubled for no item");
				return move.basePower * 2;
			}
			return move.basePower;
		},
		shortDesc: "Doubles power without a held item. Deliveerie line: always doubles power.",
	},
	glare: {
		inherit: true,
		onHit(target, source) {
			if (source.species.name === 'Meduzap' || source.species.name === 'Gorgowatt' || source.species.name === 'meduzap' || source.species.name === 'gorgowatt') {
				if (target.getTypes().join() === 'Rock' || !target.setType('Rock')) {
					return false;
				}
				this.add('-start', target, 'typechange', 'Rock');
			}
		},
		shortDesc: "Paralyzes target. Gorgowatt line: changes target's type to Rock.",
	},
	dracometeor: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (pokemon.species.name === 'Protauri' || pokemon.species.name === 'Stargazaur' || pokemon.species.name === 'Kaijupiter' ||
				pokemon.species.name === 'protauri' || pokemon.species.name === 'stargazaur' || pokemon.species.name === 'kaijupiter') {
				move.self.boosts = {spa: -1}
			}
		},
		shortDesc: "Harshly lowers user's Sp. Atk. Kaijupiter line: lowers user's Sp. Atk.",
	},
	thief: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (!pokemon.species.name === 'Underhandit' && !pokemon.species.name === 'underhandit') return;
			move.secondaries = [];
			move.secondaries.push({
				chance: 100,
				status: 'brn',
			});
		},
		shortDesc: "Steals target's held item. Underhandit: burns target.",
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
		shortDesc: "Heals fully and sleeps for two turns. Snorlax: sleeps for one turn.",
	},
	reversal: {
		inherit: true,
		onModifyPriority(priority, source, target, move) {
			if (source.species.name === 'Dodojo' || source.species.name === 'Taekwondodo' || source.species.name === 'dodojo' || source.species.name === 'taekwondodo') {
				return priority + 1;
			}
		},
		shortDesc: "Powers up with less HP. Taekwondodo line: +1 priority.",
	},
	bellydrum: {
		inherit: true,
		onHit(target) {
			if ((target.hp <= target.maxhp / 2 && (target.species.name !== 'Percusshell' && target.species.name !== 'percusshell')) || target.boosts.atk >= 6 ||
			target.maxhp === 1 || ((target.species.name === 'Percusshell' || target.species.name === 'percusshell') && target.hp <= target.maxhp / 4)) { // Shedinja clause
				return false;
			}
			if (target.species.name === 'Percusshell' || target.species.name === 'percusshell') {
				this.directDamage(target.maxhp / 4);
			} else {
				this.directDamage(target.maxhp / 2);
			}
			this.boost({atk: 12}, target);
		},
		shortDesc: "Uses 50% HP to maximize Attack. Percusshell: uses 25% HP.",
	},
	drillpeck: {
		inherit: true,
		onBasePower(basePower, source) {
			if (source.species.name === 'Foolmingo' || source.species.name === 'foolmingo') {
				this.debug('favoured move buff');
				return this.chainModify(1.5);
			}
		},
		shortDesc: "Foolmingo: 50% damage boost.",
	},
	firelash: {
		inherit: true,
		onBasePower(basePower, source) {
			if (source.species.name === 'Pitcharade' || source.species.name === 'pitcharade') {
				this.debug('favoured move buff');
				return this.chainModify(1.5);
			}
		},
		shortDesc: "Lowers target's Defense. Pitcharade: 50% damage boost.",
	},
	dragonbreath: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (pokemon.species.name === 'Varanox' || pokemon.species.name === 'Halitox' || pokemon.species.name === 'Juroxic' || 
				pokemon.species.name === 'varanox' || pokemon.species.name === 'halitox' || pokemon.species.name === 'juroxic') {
				move.willCrit = true;
			}
		},
		shortDesc: "30% chance to paralyze. Juroxic line: always crits.",
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
		shortDesc: "Flies up turn 1, attacks turn 2. Salamence: attacks in one turn.",
	},
	icefang: {
		inherit: true,
		onBasePower(basePower, source) {
			if (source.species.name === 'Walrein') {
				this.debug('favoured move buff');
				return this.chainModify(1.5);
			}
		},
		shortDesc: "10% chance to flinch or freeze. Walrein: 50% damage boost.",
	},
	perishsong: {
		inherit: true,
		onHitField(target, source, move) {
			let result = false;
			let message = false;
			for (const pokemon of this.getAllActive()) {
				if (this.runEvent('Invulnerability', pokemon, source, move) === false) {
					this.add('-miss', source, pokemon);
					result = true;
				} else if (this.runEvent('TryHit', pokemon, source, move) === null) {
					result = true;
				} else if (!pokemon.volatiles['perishsong'] && (source.species.name === 'Sirenaut' || source.species.name === 'sirenaut')) {
					pokemon.addVolatile('perishsong');
					this.add('-start', pokemon, 'perish2', '[silent]');
					result = true;
					message = true;
				} else if (!pokemon.volatiles['perishsong']) {
					pokemon.addVolatile('perishsong');
					this.add('-start', pokemon, 'perish3', '[silent]');
					result = true;
					message = true;
				}
			}
			if (!result) return false;
			if (message) this.add('-fieldactivate', 'move: Perish Song');
		},
		condition: {
			duration: 4,
			durationCallback(target, source, effect) {
				if (source.species.name === 'Sirenaut' || source.species.name === 'sirenaut') {
					return 3;
				}
				return 4;
			},
			onEnd(target) {
				this.add('-start', target, 'perish0');
				target.faint();
			},
			onResidualOrder: 20,
			onResidual(pokemon) {
				const duration = pokemon.volatiles['perishsong'].duration;
				this.add('-start', pokemon, 'perish' + duration);
			},
		},
		shortDesc: "Affected targets faint in three turns. Sirenaut: faint in two turns.",
	},
	drainingkiss: {
		inherit: true,
		onBasePower(basePower, source) {
			if (source.species.name === 'Gorebyss-Novrai' || source.species.name === 'gorebyssnovrai') {
				this.debug('favoured move buff');
				return this.chainModify(1.5);
			}
		},
		shortDesc: "75% HP drain. Gorebyss-Novrai: 50% damage boost.",
	},
// for Nutrient Runoff
	healorder: {
		inherit: true,
		pp: 5,
		onHit(pokemon) {
			if (pokemon.hp >= pokemon.maxhp) return false;
			return !!this.heal(this.modify(pokemon.maxhp, 0.5));
		},
		heal: null,
	},
	junglehealing: {
		inherit: true,
		onHit(pokemon) {
			const success = !!this.heal(this.modify(pokemon.maxhp, 0.25));
			return pokemon.cureStatus() || success;
		},
		heal: null,
	},
	milkdrink: {
		inherit: true,
		onHit(pokemon) {
			if (pokemon.hp >= pokemon.maxhp) return false;
			return !!this.heal(this.modify(pokemon.maxhp, 0.5));
		},
		heal: null,
	},
	recover: {
		inherit: true,
		onHit(pokemon) {
			if (pokemon.hp >= pokemon.maxhp) return false;
			return !!this.heal(this.modify(pokemon.maxhp, 0.5));
		},
		heal: null,
	},
	roost: {
		inherit: true,
		onHit(pokemon) {
			if (pokemon.hp >= pokemon.maxhp) return false;
			return !!this.heal(this.modify(pokemon.maxhp, 0.5));
		},
		heal: null,
	},
	slackoff: {
		inherit: true,
		onHit(pokemon) {
			if (pokemon.hp >= pokemon.maxhp) return false;
			return !!this.heal(this.modify(pokemon.maxhp, 0.5));
		},
		heal: null,
	},
	softboiled: {
		inherit: true,
		onHit(pokemon) {
			if (pokemon.hp >= pokemon.maxhp) return false;
			return !!this.heal(this.modify(pokemon.maxhp, 0.5));
		},
		heal: null,
	},
};
