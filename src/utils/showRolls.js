/**
 * Produces a description of roll results
 */
export default function showRolls([cleanResults, hungryResults]) {
	// TODO respec to Vampire something when the distinction matters.

	// prevent unecessary work if nothing was rolled
	if (cleanResults.length + hungryResults.length === 0) return 'please be sensible.';

	let cleanString = '';
	let hungryString = '';

	//Add clean result text if there are any clean dice
	if (cleanResults.length) cleanString = `\nClean Dice: ${cleanResults.join(', ')}`;

	//Add hungry result text if there are any hungry dice
	//if there are clean dice, newline before the Hungry dice
	if (hungryResults.length) hungryString = `\nHungry Dice: ${hungryResults.join(', ')}`;

	return cleanString + hungryString;
}
