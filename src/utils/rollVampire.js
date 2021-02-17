import kindOfDice from './kindOfDice.js';
import rollDice from './rollDice.js';
import showRolls from './showRolls.js';

/**
 * The wrapper function to do the actual rolling
 * @param {Array<number>} playerDice array of numbers from the user
 * @returns {string} Message tooutput
 */
export default function rollVampire(playerDice) {
	// make sure atleast pool dice were defined
	if (!playerDice[0] && !playerDice[1]) return 'Please define the number of pool dice to roll atleast (greater than 0).';

	const [cleanDiceCount, hungerDiceCount] = kindOfDice(playerDice);
	const RESULTS = [rollDice(cleanDiceCount), rollDice(hungerDiceCount)];
	const WHAT_TO_WRITE = showRolls(RESULTS);
	return WHAT_TO_WRITE;
}
