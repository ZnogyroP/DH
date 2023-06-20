export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	adhesive: {
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				if (source.volatiles['trapped']) return;
				if (this.randomChance(3, 10)) {
					source.addVolatile('trapped', this.effectData.target);
				}
			}
		},
		name: "Adhesive",
		rating: 3,
		shortDesc: "30% chance to trap on contact.",
	},
	arcaneoverload: {
		onAfterMoveSecondary(target, source, move) {
			if (!target.hp) return;
			const type = move.type;
			if (
				target.isActive && move.effectType === 'Move' && move.category !== 'Status' &&
				type !== '???' && target.hasType(type)
			) {
				let statName = 'atk';
				let bestStat = 0;
				let s: StatNameExceptHP;
				for (s in target.storedStats) {
					if (target.storedStats[s] > bestStat) {
						statName = s;
						bestStat = target.storedStats[s];
					}
				}
				this.boost({[statName]: 1}, target);
			}
		},
		name: "Arcane Overload",
		rating: 3.5,
		shortDesc: "Boosts most proficient stat when hit with a move that matches its type.",
	},
	avarice: {
		onSetStatus(status, target, source, effect) {
			if (target.item !== 'Big Nugget') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Avarice');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if (target.item !== 'Big Nugget') return;
			if (status.id === 'yawn') {
				this.add('-immune', target, '[from] ability: Avarice');
				return null;
			}
		},
		onTakeItem(item, pokemon) {
			pokemon.addVolatile('avariceboost');
		},
		condition: {
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker, defender, move) {
				if (!pokemon.item) {
					this.debug('Avarice boost');
					return this.chainModify(1.5);
				}
			},
		},
		name: "Avarice", //TEST
		rating: 3,
		shortDesc: "Immune to status when holding Big Nugget. Boosts Attack if item is lost.",
	},
	bananasplit: {
		onPrepareHit(source, target, move) {
			if (move.category === 'Status' || move.selfdestruct || move.multihit) return;
			if (move.type !== 'Grass') return;
			if (['endeavor', 'fling', 'iceball', 'rollout'].includes(move.id)) return;
			if (!move.flags['charge'] && !move.spreadHit && !move.isZ && !move.isMax) {
				move.multihit = 2;
				move.multihitType = 'bananasplit';
			}
		},
		onBasePowerPriority: 7,
		onBasePower(basePower, pokemon, target, move) {
			if (move.multihitType === 'bananasplit' && move.hit > 1) return this.chainModify(0.5);
		},
		onSourceModifySecondaries(secondaries, target, source, move) {
			if (move.multihitType === 'bananasplit' && move.id === 'secretpower' && move.hit < 2) {
				// hack to prevent accidentally suppressing King's Rock/Razor Fang
				return secondaries.filter(effect => effect.volatileStatus === 'flinch');
			}
		},
		name: "Banana Split",
		rating: 4,
		shortDesc: "Grass moves hit twice. Second hit has half power.",
	},
	clairvoyance: {
		onChargeMove(pokemon, target, move) {
			this.debug('Clairvoyance - remove charge turn for ' + move.id);
			this.attrLastMove('[still]');
			this.addMove('-anim', pokemon, move.name, target);
			return false; // skip charge turn
		},
		name: "Clairvoyance",
		rating: 4,
		shortDesc: "Skips charge turns.",
	},
	courageous: {
		onSourceModifyDamage(damage, source, target, move) {
			if (!target.activeTurns) {
				this.debug('Courageous neutralize');
				return this.chainModify(0.5);
			}
		},
		isBreakable: true,
		name: "Courageous",
		rating: 3,
		shortDesc: "Halves damage while switching in.",
	},
	falsefire: {
		onEffectiveness: function(typeMod, target, type, move) {
			return this.dex.getEffectiveness(move.type, 'Fire');
		},
		name: "False Fire",
		rating: 2,
		shortDesc: "Takes direct damage like a pure Fire-type.",
	},
	falseflier: {
		onTryHit(pokemon, target, move) {
			if (move.type === 'Ground') {
				this.add('-immune', pokemon, '[from] ability: False Flier');
				return null;
			}
		},
		onEffectiveness: function(typeMod, target, type, move) {
			return this.dex.getEffectiveness(move.type, 'Flying');
		},
		name: "False Flier",
		rating: 2,
		shortDesc: "Takes direct damage like a pure Flying-type.",
	},
	ferocious: {
		onFoeBoost(boost, target, source, effect) {
			const feroUser = this.effectData.target;
			if (boost.atk && boost.atk > 0) {
				delete boost.atk;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", source, "boost", "Attack", "[from] ability: Ferocious", "[of] " + feroUser);
				}
			}
			if (boost.spa && boost.spa > 0) {
				delete boost.spa;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", source, "boost", "Sp. Atk", "[from] ability: Ferocious", "[of] " + feroUser);
				}
			}
		},
		name: "Ferocious",
		rating: 2,
		shortDesc: "Opponents cannot raise Attack or Sp. Atk.",
	},
	fieryspirit: {
		onModifyCritRatio(critRatio, source, target) {
			if (target && ['brn'].includes(target.status)) return 5;
		},
		name: "Fiery Spirit",
		rating: 1.5,
		shortDesc: "Gets critical hits on burned targets.",
	},
	filthysurge: {
		onStart(source) {
			this.field.setTerrain('filthyterrain');
		},
		name: "Filthy Surge",
		rating: 4,
		shortDesc: "Sets Filthy Terrain. Boosts Poison moves by 30% and doubles poison status damage.",
	},
	finale: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fighting' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Finale boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fighting' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Finale boost');
				return this.chainModify(1.5);
			}
		},
		name: "Finale",
		rating: 2,
		shortDesc: "Boosts Fighting moves at low HP.",
	},
	fracture: {
		onDamagingHit(damage, target, source, move) {
			const side = source.isAlly(target) ? source.side.foe : source.side;
			const spikes = side.sideConditions['spikes'];
			if ((move.flags['contact']) && (!spikes || spikes.layers < 3)) {
				if (this.randomChance(3, 10)) {
					this.add('-activate', target, 'ability: Fracture');
					side.addSideCondition('spikes', target);
				}
			}
		},
		name: "Fracture",
		rating: 3.5,
		shortDesc: "30% chance to set Spikes on contact.",
	},
	greenthumb: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Grass') {
				if (!this.boost({spa: 1})) {
					this.add('-immune', target, '[from] ability: Green Thumb');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Grass' || ['firepledge', 'grasspledge', 'waterpledge'].includes(move.id)) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectState.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectState.target !== target) {
					this.add('-activate', this.effectState.target, 'ability: Green Thumb');
				}
				return this.effectState.target;
			}
		},
		isBreakable: true,
		name: "Green Thumb",
		rating: 3.5,
		shortDesc: "Redirects and absorbs Grass moves to raise Sp. Atk.",
	},
	herbalist: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (this.field.isWeather(['sunnyday', 'desolateland']) || this.randomChance(1, 2)) {
				if (pokemon.hp && !pokemon.item) {
					if (this.dex.getItem(pokemon.lastItem) == ['Power Herb', 'White Herb', 'Mental Herb', 'Mirror Herb']) {
						pokemon.setItem(pokemon.lastItem);
						pokemon.lastItem = '';
						this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Herbalist');
					}
				}
			}
		},
		name: "Herbalist",
		rating: 2.5,
		shortDesc: "Regenerates used Herbs.",
	},
	illwill: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			for (const target of pokemon.foes()) {
				if ((target.status === 'psn' || target.status === 'tox') &&
				(target.boosts.atk > -6 || target.boosts.def > -6 || target.boosts.spa > -6 || target.boosts.spd > -6 || target.boosts.spe > -6)) {
					let stats: BoostName[] = [];
					const boost: SparseBoostsTable = {};
					let statMinus: BoostName;
					for (statMinus in target.boosts) {
						if (statPlus === 'accuracy' || statPlus === 'evasion') continue;
						if (target.boosts[statMinus] > -6) {
							stats.push(statMinus);
						}
					}
					let randomStat: BoostName | undefined = stats.length ? this.sample(stats) : undefined;
					if (randomStat) boost[randomStat] = -1;

					this.boost(boost);
				}
			}
		},
		name: "Ill Will",
		rating: 2.5,
		shortDesc: "Lowers stats of poisoned targets each turn.",
	},
	jackpot: {
		onSourceHit(target, source, move) {
			if (target.getMoveHitData(move).crit && (source.boosts.atk < 6 || source.boosts.def < 6 || source.boosts.spa < 6 || source.boosts.spd < 6 || source.boosts.spe <6)) {
				let stats: BoostID[] = [];
				const boost: SparseBoostsTable = {};
				let statPlus: BoostID;
				for (statPlus in source.boosts) {
					if (statPlus === 'accuracy' || statPlus === 'evasion') continue;
					if (source.boosts[statPlus] < 6) {
						stats.push(statPlus);
					}
				}
				let randomStat: BoostID | undefined = stats.length ? this.sample(stats) : undefined;
				if (randomStat) boost[randomStat] = 1;
				this.add('-ability', source, 'Jackpot');
				this.boost(boost, source, source, null, true);
			}
		},
		name: "Jackpot",
		rating: 1.5,
		shortDesc: "Raises a random stat after a critical hit.",
	},
	lunarphase: {
		onStart(pokemon) {
			if ((pokemon.baseSpecies.baseSpecies !== 'Astroyatlas' && pokemon.baseSpecies.baseSpecies !== 'astroyatlas') || pokemon.transformed) return;
			if (pokemon.hp < pokemon.maxhp / 4) {
				if (pokemon.species.forme !== 'Larval') {
					pokemon.formeChange('Astroyatlas-Larval');
				}
			} else if (pokemon.hp >= pokemon.maxhp / 4 && pokemon.hp < pokemon.maxhp / 2) {
				if (pokemon.species.forme !== 'Cocoon') {
					pokemon.formeChange('Astroyatlas-Cocoon');
				}
			} else {
				if (pokemon.species.forme === 'Cocoon' || pokemon.species.forme === 'Larval') {
					pokemon.formeChange('Astroyatlas');
				}
			}
		},
		onResidualOrder: 27,
		onResidual(pokemon) {
			if ((pokemon.baseSpecies.baseSpecies !== 'Astroyatlas' && pokemon.baseSpecies.baseSpecies !== 'astroyatlas') || pokemon.transformed || !pokemon.hp) return;
			if (pokemon.hp < pokemon.maxhp / 4) {
				if (pokemon.species.forme !== 'Larval') {
					pokemon.formeChange('Astroyatlas-Larval');
				}
			} else if (pokemon.hp >= pokemon.maxhp / 4 && pokemon.hp < pokemon.maxhp / 2) {
				if (pokemon.species.forme !== 'Cocoon') {
					pokemon.formeChange('Astroyatlas-Cocoon');
				}
			} else {
				if (pokemon.species.forme === 'Cocoon' || pokemon.species.forme === 'Larval') {
					pokemon.formeChange('Astroyatlas');
				}
			}
		},
		isPermanent: true,
		name: "Lunar Phase",
		rating: 0,
		shortDesc: "Changes Astroyatlas's form.",
	},
	malice: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({spa: length}, source);
			}
		},
		name: "Malice",
		rating: 3,
		shortDesc: "Raises Sp. Atk after a KO.",
	},
	mountaineer: {
		onDamage(damage, target, source, effect) {
			if (effect && effect.id === 'stealthrock') {
				return false;
			}
		},
		onTryHit(target, source, move) {
			if (move.type === 'Rock') {
				this.add('-immune', target, '[from] ability: Mountaineer');
				return null;
			}
		},
		isBreakable: true,
		name: "Mountaineer",
		rating: 3,
		shortDesc: "Immune to Rock moves.",
	},
	nurturer: {
		onSwitchOut(pokemon) {
            if (pokemon.side.addSlotCondition(pokemon, 'nurturer')) {
                Object.assign(pokemon.side.slotConditions[pokemon.position]['nurturer']);
            }
        },
        condition: {
            onSwap(target) {
                target.side.removeSlotCondition(target, 'nurturer');
				if (!target.fainted && target.status) {
					this.add('-ability', this.effectData.source, 'Nurturer');
					target.setStatus('');
				}
            },
        },
		name: "Nurturer",
		rating: 3,
		shortDesc: "Cures an incoming ally's status.",
	},
	nutrientrunoff: {
		onFoeTryHeal(damage, target, source, effect) {
			const runoffUser = this.effectData.target;
			const canRunoff = ['drain', 'strengthsap', 'wish', 'morningsun', 'moonlight', 'synthesis', 'lifedew', 'quietrepose', 'junglehealing', 'floralhealing', 'healpulse',
				'purify', 'pollenpuff', 'healorder', 'milkdrink', 'recover', 'roost', 'selfrepair', 'reservoir', 'shoreup', 'slackoff', 'softboiled', 'swallow', 'fruitmunch'];
			if (canRunoff.includes(effect.id)) {
				damage = damage / 2;
				this.add('-activate', runoffUser, 'ability: Nutrient Runoff');
				this.heal(damage, runoffUser);
				return damage;
			}
		},
		name: "Nutrient Runoff", //NEEDS TESTING, NO WAY THIS WORKS
		rating: 2.5,
		shortDesc: "Steals half of an opponent's healing.",
	},
	parasitic: {
		onModifyMove(move) {
			if (!move?.flags['contact'] || move.target === 'self') return;
			move.stealsBoosts = true;
		},
		name: "Parasitic",
		rating: 5,
		shortDesc: "Steals target's stat boosts on contact.",
	},
	pathogenic: {
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact'] && source.ability !== 'pathogenic') {
				const oldAbility = source.setAbility('pathogenic', target);
				if (oldAbility) {
					this.add('-activate', target, 'ability: Pathogenic', this.dex.getAbility(oldAbility).name, '[of] ' + source);
				}
			}
		},
		onBasePower(basePower, pokemon, target, move) {
			if (move.multihitType === 'parentalbond' && move.hit > 1) return this.chainModify(0.25);
			if (move.multihitType === 'bananasplit' && move.hit > 1) return this.chainModify(0.5);
		},
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (!pokemon.hasType('Poison')) {
				this.damage(pokemon.baseMaxhp / 8);
			}
		},
		name: "Pathogenic",
		rating: 3,
		shortDesc: "Spreads on contact. Hurts non-Poison-types.",
	},
	perplexing: {
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('confusion', target);
				}
			}
		},
		name: "Perplexing",
		rating: 2,
		shortDesc: "30% chance to confuse on contact.",
	},
	plottwist: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fairy') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Plot Twist');
				}
				return null;
			}
		},
		isBreakable: true,
		name: "Plot Twist",
		rating: 3.5,
		shortDesc: "Heals 25% when hit with a Fairy move.",
	},
	pridefulstance: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if ((defender.hasType('Normal') && this.dex.getEffectiveness('Normal', attacker) > 0) ||
			(defender.hasType('Fighting') && this.dex.getEffectiveness('Fighting', attacker) > 0) ||
			(defender.hasType('Flying') && this.dex.getEffectiveness('Flying', attacker) > 0) ||
			(defender.hasType('Poison') && this.dex.getEffectiveness('Poison', attacker) > 0) ||
			(defender.hasType('Ground') && this.dex.getEffectiveness('Ground', attacker) > 0) ||
			(defender.hasType('Rock') && this.dex.getEffectiveness('Rock', attacker) > 0) ||
			(defender.hasType('Bug') && this.dex.getEffectiveness('Bug', attacker) > 0) ||
			(defender.hasType('Ghost') && this.dex.getEffectiveness('Ghost', attacker) > 0) ||
			(defender.hasType('Steel') && this.dex.getEffectiveness('Steel', attacker) > 0) ||
			(defender.hasType('Fire') && this.dex.getEffectiveness('Fire', attacker) > 0) ||
			(defender.hasType('Water') && this.dex.getEffectiveness('Water', attacker) > 0) ||
			(defender.hasType('Grass') && this.dex.getEffectiveness('Grass', attacker) > 0) ||
			(defender.hasType('Electric') && this.dex.getEffectiveness('Electric', attacker) > 0) ||
			(defender.hasType('Psychic') && this.dex.getEffectiveness('Psychic', attacker) > 0) ||
			(defender.hasType('Ice') && this.dex.getEffectiveness('Ice', attacker) > 0) ||
			(defender.hasType('Dragon') && this.dex.getEffectiveness('Dragon', attacker) > 0) ||
			(defender.hasType('Dark') && this.dex.getEffectiveness('Dark', attacker) > 0) ||
			(defender.hasType('Fairy') && this.dex.getEffectiveness('Fairy', attacker) > 0)) {
				this.debug('Prideful Stance boost');
				return this.chainModify(1.3);
			}
		},
		name: "Prideful Stance",
		rating: 3,
		shortDesc: "30% Attack boost if target has a type advantage.",
	},
	realitywarp: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Reality Warp');
		},
		onEffectiveness: function(typeMod, target, type, move) {
			if (move && !this.dex.getImmunity(move, type)) return 1;
			return -typeMod;
		},
		name: "Reality Warp",
		rating: 3.5,
		shortDesc: "Inverts incoming attack matchups.",
	},
	reelin: {
		onFoeTrapPokemon(pokemon) {
			if (pokemon.hasType('Water') && this.isAdjacent(pokemon, this.effectData.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectData.target;
			if (!source || !this.isAdjacent(pokemon, source)) return;
			if (!pokemon.knownType || pokemon.hasType('Water')) {
				pokemon.maybeTrapped = true;
			}
		},
		name: "Reel In",
		rating: 4,
		shortDesc: "Traps opposing Water-types.",
	},
	regurgitation: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (attacker.ateBerry) {
				this.debug('Regurgitation boost');
				return this.chainModify(1.3);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (attacker.ateBerry) {
				this.debug('Regurgitation boost');
				return this.chainModify(1.3);
			}
		},
		name: "Regurgitation",
		rating: 3,
		shortDesc: "Boosts moves by 30% after eating a Berry.",
	},
	relentless: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({spe: length}, source);
			}
		},
		name: "Relentless",
		rating: 3,
		shortDesc: "Boosts Speed after a KO.",
	},
	romantic: {
		// implemented in the corresponding moves
		name: "Romantic",
		rating: 3,
		shortDesc: "Can infatuate any target.",
	},
	rubberbody: {
		onTryHit(pokemon, target, move) {
			if (move.type === 'Electric') {
				this.add('-immune', pokemon, '[from] ability: Rubber Body');
				return null;
			}
		},
		isBreakable: true,
		name: "Rubber Body",
		rating: 4,
		shortDesc: "Immune to Electric moves.",
	},
	scavenge: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.add('-activate', source, 'ability: Scavenge'); 
				this.heal(source.baseMaxhp / 4, source, source, effect);
			}
		},
		name: "Scavenge",
		rating: 3.5,
		shortDesc: "Heals 25% after a KO.",
	},
	secondwind: {
		onAfterMoveSecondary(target, source, move) {
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const side = source.isAlly(target) ? source.side : source.side.foe;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.add('-activate', target, 'ability: Second Wind');
				side.addSideCondition('tailwind');
			}
		},
		name: "Second Wind",
		rating: 3.5,
		shortDesc: "Starts a Tailwind when knocked under 50% HP.",
	},
	snowplow: {
		onImmunity(type, pokemon) {
		if (type === 'hail') return false;
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (['hail', 'snow'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.3);
			}
		},
		name: "Snow Plow",
		rating: 1.5,
		shortDesc: "30% Attack boost in snow.",
	},
	sunscreen: {
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'sunnyday' || effect.id === 'desolateland') {
				this.heal(target.baseMaxhp / 8);
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Sunscreen');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Sunscreen');
			}
			return false;
		},
		isBreakable: true,
		name: "Sunscreen",
		rating: 1.5,
		shortDesc: "Heals each turn in sun. Immune to burns.",
	},
	supertaste: {
		onTryHeal(damage, target, source, effect) {
			if (!effect) return;
			if (effect.id === 'berryjuice') {
				this.add('-activate', target, 'ability: Super Taste');
			}
			if ((effect as Item).isBerry || effect.id === 'leftovers') return this.chainModify(2);
		},
		onBoost(boost, target, source, effect) {
			if (effect && (effect as Item).isBerry) {
				let b: BoostName;
				for (b in boost) {
					boost[b]! *= 2;
				}
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (target.abilityData.berryWeaken) {
				target.abilityData.berryWeaken = "";
				// Not sure if this is the correct multiplier to get 3/4 total, assuming its taking 1/2 of 1/2 (3/4)
				return this.chainModify(0.5);
			}
		},
		onTryEatItemPriority: -1,
		onTryEatItem(item, pokemon) {
			this.add('-activate', pokemon, 'ability: Super Taste');
		},
		onEatItem(item, pokemon) {
			const weakenBerries = [
				'Babiri Berry', 'Charti Berry', 'Chilan Berry', 'Chople Berry', 'Coba Berry', 'Colbur Berry', 'Haban Berry', 'Kasib Berry', 'Kebia Berry', 'Occa Berry', 'Passho Berry', 
				'Payapa Berry', 'Rindo Berry', 'Roseli Berry', 'Shuca Berry', 'Tanga Berry', 'Wacan Berry', 'Yache Berry',
			];
			if (weakenBerries.includes(item.name)) {
				// Record that the pokemon ate a berry to resist an attack
				pokemon.abilityData.berryWeaken = "true";
			}
		},
		name: "Super Taste",
		rating: 2,
		shortDesc: "Doubles effect of Berries and Leftovers.",
	},
	swarmingsurge: {
		onStart(source) {
			this.field.setTerrain('swarmingterrain');
		},
		name: "Swarming Surge",
		rating: 4,
		shortDesc: "Sets Swarming Terrain. Boosts Bug moves by 30% and prevents healing.",
	},
	trafficjam: {
		onAnySwitchIn(pokemon) {
			const source = this.effectData.target;
			if (pokemon === source) return;
			for (const target of source.side.foe.active) {
				if (!target || target.fainted) continue;
				this.add('-ability', source, 'Traffic Jam', 'boost');
				this.boost({spe: -1}, pokemon, source, null, true);
				return;
			}
		},
		name: "Traffic Jam",
		rating: 3.5,
		shortDesc: "Incoming opponents have their Speed lowered.",
	},
	trample: {
		onSwitchInPriority: 6,
		onSwitchIn(pokemon, target, source) {
			this.field.clearTerrain();
         const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
         for (const condition of sideConditions) {
            if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
               this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] ability: Trample', '[of] ' + pokemon);
            }
          }
		},
		name: "Trample",
		rating: 4,
		shortDesc: "Destroys hazards and terrain on switch-in.",
	},
	// Modified or canon Abilities
	galewings: {
		inherit: true,
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.type === 'Flying' && pokemon.hp >= (pokemon.maxhp / 2)) return priority + 1;
		},
	},
	icebody: {
		inherit: true,
		onWeather(target, source, effect) {
			if (effect.id === 'hail' || effect.id === 'snow') {
				this.heal(target.baseMaxhp / 8);
			}
		},
	},
	illuminate: {
		inherit: true,
		onAnyAccuracy(accuracy, target, source, move) {
			if (move && source === this.effectData.target && source.activeMoveActions <= 1) {
				return true;
			}
			return accuracy;
		},
		rating: 2.5,
		shortDesc: "First move used in battle will not miss.",
	},
	mummy: {
		inherit: true,
		onBasePower(basePower, pokemon, target, move) {
			if (move.multihitType === 'parentalbond' && move.hit > 1) return this.chainModify(0.25);
			if (move.multihitType === 'bananasplit' && move.hit > 1) return this.chainModify(0.5);
		},
	},
	protean: {
		desc: "This Pokemon's type changes to match the type of the move it is about to use. This effect comes after all effects that change a move's type.",
		shortDesc: "This Pokemon's type changes to match the type of the move it is about to use.",
		onPrepareHit(source, target, move) {
			if (move.hasBounced) return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] ability: Protean');
			}
		},
		name: "Protean",
		rating: 4.5,
		num: 168,
	},
	raindish: {
		inherit: true,
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'raindance' || effect.id === 'primordialsea') {
				this.heal(target.baseMaxhp / 8);
			}
		},
	},
	sandveil: {
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (this.field.isWeather('sandstorm')) {
				this.debug('Sand Veil neutralize');
				return this.chainModify(0.75);
			}
		},
		name: "Sand Veil",
		rating: 1.5,
		num: 8,
		shortDesc: "Reduces damage taken in a sandstorm.",
	},
	snowcloak: {
		onImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (this.field.isWeather('hail') || this.field.isWeather('snow')) {
				this.debug('Snow Cloak neutralize');
				return this.chainModify(0.75);
			}
		},
		name: "Snow Cloak",
		rating: 1.5,
		num: 81,
		shortDesc: "Reduces damage taken in snow.",
	},
	watercompaction: {
		inherit: true,
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				this.debug('Water Compaction weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				this.debug('Water Compaction weaken');
				return this.chainModify(0.5);
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Water') {
				this.boost({def: 1});
			}
		},
		shortDesc: "Halves Water damage. Boosts Defense when hit by a Water move.",
	},
	windpower: {
		onStart(pokemon) {
			if (pokemon.side.sideConditions['tailwind']) {
				this.boost({spa: 1}, pokemon, pokemon);
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.flags['wind']) {
				if (!this.boost({spa: 1}, target, target)) {
					this.add('-immune', target, '[from] ability: Wind Power');
				}
				return null;
			}
		},
		onAllySideConditionStart(target, source, sideCondition) {
			const pokemon = this.effectState.target;
			if (sideCondition.id === 'tailwind') {
				this.boost({spa: 1}, pokemon, pokemon);
			}
		},
		name: "Wind Power",
		shortDesc: "Sp. Atk raised by 1 if hit by a wind move or Tailwind begins. Wind move immunity.",
		rating: 2,
	},
};
