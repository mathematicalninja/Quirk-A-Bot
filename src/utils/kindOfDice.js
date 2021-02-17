/**
 * Takes in a pool and hunger dice (in any order) and returns the clean and hungry dice numbers
 * @param {Array<number>} input the input numbers to parse
 * @returns {Array<number>} a number array tuple of [cleanDice, hungerDice]
 */
export default function kindOfDice([A, B]) {
	let pool = Math.max(A, B);
	let hungerDice = Math.min(A, B);
	let cleanDice = pool - hungerDice;
	return [cleanDice, hungerDice];
}
