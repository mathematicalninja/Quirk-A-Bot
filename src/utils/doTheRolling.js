import kindOfDice from './kindOfDice'

/**
 * The wrapper function to do the actuall rolling
 * @param {Array<number>} playerDice array of numbers from the user
 * @returns {string} Message tooutput
 */
export default function doTheRolling(playerDice) {
	//respec to "vampireRolling" when other rolls are implemented
	const [cleanDiceCount, hungerDiceCount] = kindOfDice(playerDice);
	const RESULTS = [rollDice(cleanDiceCount), rollDice(hungerDiceCount)];
	const WHAT_TO_WRITE = showRolls(RESULTS);
	return WHAT_TO_WRITE;
}
