/**
 * Produces a description of vampire roll results
 */
export default function describeVampireRolls([cleanResults, hungryResults]) {
	// prevent unecessary work if nothing was rolled
	if (cleanResults.length + hungryResults.length === 0) return 'please be sensible.';

	let cleanString = '';
	let cleanArray = [];
	let hungryString = '';
	let hungryArray = [];

	//Add clean result text if there are any clean dice
	if (cleanResults.length) {

		// roll number of dice based on dice count
		for (let i = 0; i < cleanResults.length - 1; i++) {
			let die = cleanResults[i];
			if (die === 1) {
				die = process.env.CLEAN_FAIL;
			} else if (die === 10) {
				die = process.env.CLEAN_CRIT;
			} else if (die > 5) {
				die = `**${die}**`;
			};
			cleanArray.push(die)

		};
		cleanString = `\nClean Dice: ${cleanArray.join(', ')}`
	}
	//Add hungry result text if there are any hungry dice
	//if there are clean dice, newline before the Hungry dice
	if (hungryResults.length) {

		for (let i = 0; i < hungryResults.length - 1; i++) {
			let die = hungryResults[i];
			if (die === 1) {
				die = process.env.HUNGRY_FAIL;
			} else if (die === 10) {
				die = process.env.HUNGRY_CRIT;
			} else if (die > 5) {
				die = `**${die}**`;
			}
			hungryArray.push(die);
		}

		hungryString = `\nHungry Dice: ${hungryArray.join(', ')}`
	};

	return cleanString + hungryString;
}