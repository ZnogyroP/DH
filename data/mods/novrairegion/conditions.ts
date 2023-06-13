export const Conditions: {[k: string]: ConditionData} = {
	lockedmove: {
		// Outrage, Thrash, Petal Dance...
		name: 'lockedmove',
		duration: 2,
		onResidual(target) {
			if (target.status === 'slp' || target.ability === 'owntempo') {
				// don't lock, and bypass confusion for calming
				delete target.volatiles['lockedmove'];
			}
			this.effectData.trueDuration--;
		},
		onStart(target, source, effect) {
			this.effectData.trueDuration = this.random(2, 4);
			this.effectData.move = effect.id;
		},
		onRestart() {
			if (this.effectData.trueDuration >= 2) {
				this.effectData.duration = 2;
			}
		},
		onEnd(target) {
			if (this.effectData.trueDuration > 1) return;
			target.addVolatile('confusion');
		},
		onLockMove(pokemon) {
			if (pokemon.volatiles['dynamax']) return;
			return this.effectData.move;
		},
	},
};