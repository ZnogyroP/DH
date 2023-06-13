export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	adhesive: {
		onDamagingHit(damage, target, source, move) {
			if (!this.checkMoveMakesContact(move, source, target)) return;
			if (source.volatiles['trapped']) return;
			if (this.randomChance(3, 10)) {
				source.addVolatile('trapped', this.effectState.target);
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
			const bestStat = target.getBestStat(true, true);
			if (
				target.isActive && move.effectType === 'Move' && move.category !== 'Status' &&
				type !== '???' && target.hasType(type)
			) {
			this.boost({[bestStat]: 1}, target);
			}
		}
		name: "Arcane Overload",
		rating: 3.5,
		shortDesc: "Boosts most proficient stat when hit with a move that matches its type.",
	},
	avarice: {
		onSetStatus(status, target, source, effect) {
			if ((effect as Move)?.status && target.item === 'Big Nugget') {
				this.add('-immune', target, '[from] ability: Avarice');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn' && target.item === 'Big Nugget') {
				this.add('-immune', target, '[from] ability: Avarice');
				return null;
			}
		},
		onAfterUseItem(item, pokemon) {
			if (pokemon !== this.effectData.target || pokemon.item !== 'Big Nugget') return;
			pokemon.addVolatile('avariceboost');
		},
		onTakeItem(item, pokemon) {
			if (pokemon.item !== 'Big Nugget') return;
			pokemon.addVolatile('avariceboost');
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('avariceboost');
		},
		condition: {
			onModifyAtk(atk, pokemon) {
				if (!pokemon.item) {
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
		rating: 3,
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
			return this.getEffectiveness(move.type, 'Fire');
		},
		name: "False Fire", //TEST
		rating: 2,
		shortDesc: "Takes direct damage like a pure Fire-type.",
	},
	falseflier: {
		onEffectiveness: function(typeMod, target, type, move) {
			return this.getEffectiveness(move.type, 'Flying');
		},
		name: "False Flier", //TEST
		rating: 2,
		shortDesc: "Takes direct damage like a pure Flying-type.",
	},
	ferocious: {
		onFoeBoost(boost, target, source, effect) {
			if (boost.atk && boost.atk > 0) {
				delete boost.atk;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "boost", "Attack", "[from] ability: Ferocious", "[of] " + source);
				}
			}
			if (boost.spa && boost.spa > 0) {
				delete boost.spa;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "boost", "Sp. Atk", "[from] ability: Ferocious", "[of] " + source);
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
			if (this.checkMoveMakesContact(move, source, target) && (!spikes || spikes.layers < 3)) {
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
					if (this.dex.items.get(pokemon.lastItem) == ['Power Herb', 'White Herb', 'Mental Herb', 'Mirror Herb']) {
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
			if (pokemon.boosts.atk <= -6 && pokemon.boosts.def <= -6 && pokemon.boosts.spa <= -6 && pokemon.boosts.spd <= -6 && pokemon.boosts.spe <= -6) return;
			for (const target of pokemon.foes()) {
				if (target.status === 'psn' || target.status === 'tox') {	
					let stats: BoostID[] = [];
					const boost: SparseBoostsTable = {};
					let statMinus: BoostID;
					for (statMinus in pokemon.boosts) {
						if (statMinus === 'accuracy' || statMinus === 'evasion') continue;
						if (pokemon.boosts[statMinus] > -6 && statMinus !== randomStat) {
							stats.push(statMinus);
						}
					}
					randomStat = stats.length ? this.sample(stats) : undefined;
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
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (target.getMoveHitData(move).crit) {
				let stats: BoostID[] = [];
				const boost: SparseBoostsTable = {};
				let statPlus: BoostID;
				for (statPlus in pokemon.boosts) {
					if (statPlus === 'accuracy' || statPlus === 'evasion') continue;
					if (pokemon.boosts[statPlus] < 6) {
						stats.push(statPlus);
					}
				}
				let randomStat: BoostID | undefined = stats.length ? this.sample(stats) : undefined;
				if (randomStat) boost[randomStat] = 1;
				this.boost(boost);
			}
		},
		name: "Jackpot",
		rating: 2,
		shortDesc: "Raises a random stat after a critical hit.",
	},
	lunarphase: {
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Astroyatlas' || pokemon.transformed) {
				return;
			}
			if (pokemon.hp <= pokemon.maxhp / 2 && pokemon.hp > pokemon.maxhp / 4 && !['Cocoon'].includes(pokemon.species.forme)) {
				pokemon.addVolatile('lunarphaselarva');
				pokemon.removeVolatile('lunarphaselarva');
				pokemon.addVolatile('lunarphasecocoon');
			} else if (pokemon.hp <= pokemon.maxhp / 4 && !['Larva'].includes(pokemon.species.forme)) {
				pokemon.addVolatile('lunarphasecocoon');
				pokemon.removeVolatile('lunarphasecocoon');
				pokemon.addVolatile('lunarphaselarva');
			} else if (pokemon.hp > pokemon.maxhp / 2 && ['Cocoon', 'Larva'].includes(pokemon.species.forme)) {
				pokemon.addVolatile('lunarphasecocoon'); // in case of base Astroyatlas-Cocoon
				pokemon.removeVolatile('lunarphasecocoon');
				pokemon.addVolatile('lunarphaselarva'); // in case of base Astroyatlas-Larva
				pokemon.removeVolatile('lunarphaselarva');
			}
		},
		onEnd(pokemon) {
			if (!pokemon.volatiles['lunarphasecocoon'] || !pokemon.volatiles['lunarphaselarva'] || !pokemon.hp) return;
			pokemon.transformed = false;
			delete pokemon.volatiles['lunarphasecocoon'];
			delete pokemon.volatiles['lunarphaselarva'];
			if (pokemon.species.baseSpecies === 'Astroyatlas' && pokemon.species.battleOnly) {
				pokemon.formeChange(pokemon.species.battleOnly as string, this.effect, false, '[silent]');
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
		onSwap(target) {
			if (!target.fainted && target.status) {
				target.setStatus('');
			}
		},
		name: "Nurturer",
		rating: 3,
		shortDesc: "Cures an incoming ally's status.",
	},
	nutrientrunoff: {
		onFoeTryHeal(relayVar, target, source, effect){
			relayVar = (relayVar / 2);
			source.heal(relayVar);
		},
		name: "Nutrient Runoff", //NEEDS TESTING, NO WAY THIS WORKS
		rating: 3,
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
			const sourceAbility = source.getAbility();
			if (sourceAbility.isPermanent || sourceAbility.id === 'pathogenic') {
				return;
			}
			if (this.checkMoveMakesContact(move, source, target, !source.isAlly(target))) {
				const oldAbility = source.setAbility('pathogenic', target);
				if (oldAbility) {
					this.add('-activate', target, 'ability: Pathogenic', this.dex.abilities.get(oldAbility).name, '[of] ' + source);
				}
			}
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
			if (this.checkMoveMakesContact(move, source, target)) {
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
				if (move && !this.getImmunity(move, type)) return 1;
				return -typeMod;
			},
		name: "Reality Warp",
		rating: 3.5,
		shortDesc: "Inverts incoming attack matchups.",
	},
	reelin: {
		onFoeTrapPokemon(pokemon) {
			if (pokemon.hasType('Water') && pokemon.isAdjacent(this.effectState.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectState.target;
			if (!source || !pokemon.isAdjacent(source)) return;
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
				this.heal(source.baseMaxhp / 4);
			}
		},
		name: "Scavenge",
		rating: 3,
		shortDesc: "Heals 25% after a KO.",
	},
	secondwind: {
		onDamage(damage, target, source, effect) {
			if (
				effect.effectType === "Move" &&
				!effect.multihit &&
				(!effect.negateSecondary && !(effect.hasSheerForce && source.hasAbility('sheerforce')))
			) {
				target.abilityState.checkedBerserk = false;
			} else {
				target.abilityState.checkedBerserk = true;
			}
		},
		onTryEatItem(item, pokemon) {
			const healingItems = [
				'aguavberry', 'enigmaberry', 'figyberry', 'iapapaberry', 'magoberry', 'sitrusberry', 'wikiberry', 'oranberry', 'berryjuice',
			];
			if (healingItems.includes(item.id)) {
				return pokemon.abilityState.checkedBerserk;
			}
			return true;
		},
		onAfterMoveSecondary(target, source, move) {
			target.abilityState.checkedBerserk = true;
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.side.addSideCondition('tailwind');
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
			if (effect.name === 'Berry Juice') {
				this.add('-activate', target, 'ability: Super Taste');
			}
			if ((effect as Item).isBerry || effect.name === 'Leftovers') return this.chainModify(2);
		},
		onChangeBoost(boost, target, source, effect) {
			if (effect && (effect as Item).isBerry) {
				let b: BoostID;
				for (b in boost) {
					boost[b]! *= 2;
				}
			}
		},
		onSourceModifyDamagePriority: -1,
		onSourceModifyDamage(damage, source, target, move) {
			if (target.abilityState.berryWeaken) {
				target.abilityState.berryWeaken = false;
				return this.chainModify(0.5);
			}
		},
		onTryEatItemPriority: -1,
		onTryEatItem(item, pokemon) {
			this.add('-activate', pokemon, 'ability: Super Taste');
		},
		onEatItem(item, pokemon) {
			const weakenBerries = [
				'Babiri Berry', 'Charti Berry', 'Chilan Berry', 'Chople Berry', 'Coba Berry', 'Colbur Berry', 'Haban Berry', 'Kasib Berry', 'Kebia Berry', 'Occa Berry', 'Passho Berry', 'Payapa Berry', 'Rindo Berry', 'Roseli Berry', 'Shuca Berry', 'Tanga Berry', 'Wacan Berry', 'Yache Berry',
			];
			// Record if the pokemon ate a berry to resist the attack
			pokemon.abilityState.berryWeaken = weakenBerries.includes(item.name);
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
		}
		name: "Traffic Jam",
		rating: 3,
		shortDesc: "Incoming opponents have their Speed lowered.",
	},
	trample: {
		onStart(pokemon) {
			let activated = false;
			for (const sideCondition of ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge']) {
				for (const side of [pokemon.side, ...pokemon.side.foeSidesWithConditions()]) {
					if (side.getSideCondition(sideCondition)) {
						if (!activated) {
							this.add('-activate', pokemon, 'ability: Trample');
							activated = true;
						}
						side.removeSideCondition(sideCondition);
					}
				}
			}
			this.field.clearTerrain();
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
		rating: 2,
		shortDesc: "First move used in battle will not miss.",
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
		rating: 3,
	},
};
