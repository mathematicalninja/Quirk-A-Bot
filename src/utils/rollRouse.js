/**
 * @param {number} rouseDice number of dice to be used in rouse check
 * @returns {string} The results of the rouse check, and a brief explination.
 */
export default function rollRouse(rouseDice) {
	let successText = 'Your hunger remains unchanged.';
	let failText = 'Your hunger increases after this action.';
	let rouseResults = [];
	let win = false;

	for (i = 0; i < rouseDice; i++) {
		// on rolling each die, checks if it's 6+, then the rouse was a success.
		let die = rollAd10();
		if (die > 5) {
			win = true;
		}
		rouseResults.push(die);
	}

	// Shows the player their dice, followed by the result.
	let text = `\nRouse Dice: ${rouseResults.join(', ')}\n`;
	if (win) {
		text += successText;
	} else {
		text += failText;
	}
	return text;
}
