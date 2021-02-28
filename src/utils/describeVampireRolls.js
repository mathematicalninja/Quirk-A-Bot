import vampireSuccessCount from './vampireSuccessCount.js';


/**
 * Produces a description of vampire roll results
 * @param {Array<number>} results - number array tuple [cleanResults, hungryResults] results of the clean dice, results of the hungry dice.
 * @param {Boolean} simplify should a simplified result be displayed.
 * @returns {string} message text to be used in reply to user.
 */
export default function describeVampireRolls([cleanResults, hungryResults], simplify) {
	// prevent unecessary work if nothing was rolled
	if (cleanResults.length + hungryResults.length === 0) return 'please be sensible.';

	let cleanString = '';
	let cleanArray = [];
	let hungryString = '';
	let hungryArray = [];

	//Add clean result text if there are any clean dice
	if (cleanResults.length) {
		// roll number of dice based on dice count
		for (let i = 0; i < cleanResults.length; i++) {
			let die = cleanResults[i];
			if (die === 1) { // replaces 1's with emotes
				die = process.env.CLEAN_FAIL;
			} else if (die === 10) { // replaces 10's with emotes
				die = process.env.CLEAN_CRIT;
			} else if (die > 5) {
				if (simplify) { // optionally replaces successes with emotes
					die = process.env.CLEAN_SUCCESS;
				} else { // bolds emotes
					die = `**${die}**`;
				};
			} else {
				if (simplify) { //optionally replaces fails with emotes
					die = process.env.CLEAN_BLANK;
				};
			};
			cleanArray.push(die);

		};

		// Squishes together the result's array into a printable string
		if (simplify) { // for Future refactoring. Atm. removes "," between emotes
			cleanString = `\nClean Dice: ${cleanArray.join('')}`
		} else {
			cleanString = `\nClean Dice: ${cleanArray.join(', ')}`
		}
	};

	// Add hungry result text if there are any hungry dice
	if (hungryResults.length) {

		for (let i = 0; i < hungryResults.length; i++) {
			let die = hungryResults[i];
			if (die === 1) { // replaces 1's with emotes
				die = process.env.HUNGRY_FAIL;
			} else if (die === 10) { // replaces 10's with emotes
				die = process.env.HUNGRY_CRIT;
			} else if (die > 5) {
				if (simplify) { // optionally replaces successes with emotes
					die = process.env.HUNGRY_SUCCESS
				} else { // bolds emotes
					die = `**${die}**`;
				};
			} else {
				if (simplify) { //optionally replaces fails with emotes
					die = process.env.HUNGRY_BLANK;
				};
			};
			hungryArray.push(die);
		};

		// Squishes together the result's array into a printable string
		if (simplify) { // for Future refactoring. Atm. removes "," between emotes
			hungryString = `\nHungry Dice: ${hungryArray.join('')}`
		} else {
			hungryString = `\nHungry Dice: ${hungryArray.join(', ')}`

		};
	};

	let explain = ''
	if (simplify) { // The simplified explination (Messy Crit/Bestial Failure and Success count) which is added to the end of the message.
		explain = vampireSuccessCount(cleanResults, hungryResults)
	}

	//Clean Dice: \Skull, 4, *8*, \Emote
	//Hungry Dice: \Skull, 2, *7*, \Emote
	//Successes = 6
	//\Emote possible messy crit \Emote
	//\Skull possible bestial failure \Skull
	return cleanString + hungryString + explain;
}