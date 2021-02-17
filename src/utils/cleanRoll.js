import rollAd10 from './rollAd10.js';

/**
 * Rolls a specified number of dice
 * @param {number} diceCount the number of dice to roll
 * @returns {Array<number>} the resulting dice rolls with clean symbols on 10 and 1's
 */
export default function cleanRoll(diceCount) {
	const results = [];

	// roll number of dice based on dice count
	for (let i = 0; i < diceCount; i++) {
		let die = rollAd10();
		if (die === 1) {
			die = process.env.CLEAN_FAIL;
		} else if (die === 10) {
			die = process.env.CLEAN_CRIT;
		} else if (die > 5) {
			die = `** ${die} **`;
		}
		results.push(die);
	}

	return results;
}
