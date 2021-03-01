import kindOfDice from './kindOfDice.js';
import rollDiceByCount from './rollDiceByCount.js';
import describeVampireRolls from './describeVampireRolls.js';
import cleanRoll from './cleanRoll.js';
import hungryRoll from './hungryRoll.js';

/**
 * The wrapper function to do the actual rolling
 * @param {Array<number>} playerDice array of numbers from the user
 * @returns {string} Message tooutput
 */
export default function rollVampire(playerDice) {
	// make sure atleast pool dice were defined
	if (!playerDice[0] && !playerDice[1])
		return 'Please define the number of pool dice to roll atleast (greater than 0).';

	const [cleanDiceCount, hungerDiceCount] = kindOfDice(playerDice);
	// todo does this need 2 different roll functions, or should it be 2 different roll interpreters?
	const RESULTS = [cleanRoll(cleanDiceCount), hungryRoll(hungerDiceCount)];
	const WHAT_TO_WRITE = describeVampireRolls(RESULTS);
	return WHAT_TO_WRITE;
}
