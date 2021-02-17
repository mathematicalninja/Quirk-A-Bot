import rollAd10 from './rollAd10.js';

/**
 * Rolls a rouse check
 * @param {number} rouseDice number of dice to be used in rouse check
 * @returns {string} The results of the rouse check, and a brief explination.
 */
export default function rollRouse(rouseDice) {
	const successText = 'Your hunger remains unchanged.';
	const failText = 'Your hunger increases after this action.';
	const rouseResults = [];
	let win = false;

	for (let i = 0; i < rouseDice; i++) {
		// on rolling each die, checks if it's 6+, then the rouse was a success.
		// ? does it only take one dice being above 5 to succeed?
		const die = rollAd10();
		if (die > 5) win = true;

		rouseResults.push(die);
	}

	// select appropriate result text
	const resultText = win ? successText : failText;

	// Shows the player their dice, followed by the result.
	return `\nRouse Dice: ${rouseResults.join(', ')}\n${resultText}`;
}
