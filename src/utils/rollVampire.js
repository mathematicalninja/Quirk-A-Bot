import kindOfDice from './kindOfDice.js';
import rollDiceByCount from './rollDiceByCount.js';
import describeVampireRolls from './describeVampireRolls.js';

/**
 * The wrapper function to do the actual rolling
 * @param {Array<number>} playerDice array of numbers from the user
 * @returns {string} Message tooutput
 */
export default function rollVampire(playerDice) {
	// make sure atleast pool dice were defined
	if (!playerDice[0] && !playerDice[1]) return 'Please define the number of pool dice to roll atleast (greater than 0).';

	const [cleanDiceCount, hungerDiceCount] = kindOfDice(playerDice);
	const RESULTS = [rollDiceByCount(cleanDiceCount), rollDiceByCount(hungerDiceCount)];
	const WHAT_TO_WRITE = describeVampireRolls(RESULTS);
	return WHAT_TO_WRITE;
}
