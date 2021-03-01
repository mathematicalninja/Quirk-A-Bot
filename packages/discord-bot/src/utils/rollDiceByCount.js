import rollAd10 from './rollAd10.js';

/**
 * Rolls a specified number of dice
 * @param {number} diceCount the number of dice to roll
 * @returns {Array<number>} the resulting dice rolls
 */
export default function rollDiceByCount(diceCount) {
	const results = [];

	// roll number of dice based on dice count
	for (let i = 0; i < diceCount; i++) results.push(rollAd10());

	return results;
}
