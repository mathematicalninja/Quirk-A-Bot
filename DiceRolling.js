// loading discord interactive JavaScript
const Discord = require('discord.js');
const client = new Discord.Client();

// Setting the .env file to a locally accessible form
require('dotenv').config();

// logging in as a bot
client.login(process.env.DISCORD_BOT_TOKEN);

// Hello ^-^
console.log('Hello');


client.on("ready", () => {
	console.log("loged on ok");
}); //the typo is intentional.

client.on('message', gotMessage);

// __________________________________________________________________________
// matches Roll and it's easiest typos followed by two numbers, sperating all three parts by anything other than digits (e.g. roll532 makes no sense, but RoL5 2 does) Matches a one or two numbers, if the second number exists
const DICE_ROLL_REGEX = /[Rr]+[Oo]+[Ll]+\D*(\d+)\D*(\d*)/i;

// matches if a player asks to rouse, or rouse <n>.
const ROUSE_REGEX = /(?:[Rr]+[Oo]+[Us]*[Ss]+[Ee]*\D*(\d+))|(?:[Rr]ouse)/i;






/**
 * The wrapper function to do the actuall rolling
 * @param {Array<number>} playerDice array of numbers from the user
 * @returns {string} Message tooutput
 */
function doTheRolling(playerDice) {
	//respec to "vampireRolling" when other rolls are implemented
	const [cleanDiceCount, hungerDiceCount] = kindOfDice(playerDice);
	const RESULTS = [rollDice(cleanDiceCount), rollDice(hungerDiceCount)];
	const WHAT_TO_WRITE = showRolls(RESULTS);
	return WHAT_TO_WRITE;
}

/**
 * Rolls a ten sided dice and returns an integer of the result
 * @returns {number} result of dice roll
 */
function rollAd10() {
	return 1 + Math.floor(Math.random() * 10);
}

/**
 * Takes in a pool and hunger dice (in any order) and returns the clean and hungry dice numbers
 * @param {Array<number>} input the input numbers to parse
 * @returns {Array<number>} a number array tuple of [cleanDice, hungerDice]
 */
function kindOfDice([A, B]) {
	let pool = Math.max(A, B);
	let hungerDice = Math.min(A, B);
	let cleanDice = pool - hungerDice;
	return [cleanDice, hungerDice];
}

/**
 * Rolls a specified number of dice
 * @param {number} diceCount the number of dice to roll
 * @returns {Array<number>} the resulting dice rolls
 */
function rollDice(diceCount) {
	let results = [];

	// roll number of dice based on dice count
	for (let i = 0; i < diceCount; i++) results.push(rollAd10());

	return results;
}

/**
 * Produces a description of roll results
 */
function showRolls([cleanResults, hungryResults]) {
	// respec to Vampire something when the distinction matters.

	// prevent unecessary work if nothing was rolled
	if (cleanResults.length + hungryResults.length == 0) return 'please be sensible.';

	let cleanString = '';
	let hungryString = '';

	//Add clean result text if there are any clean dice
	if (cleanResults.length) cleanString = `\nClean Dice: ${cleanResults.join(', ')}`;

	//Add hungry result text if there are any hungry dice
	//if there are clean dice, newline before the Hungry dice
	if (hungryResults.length) hungryString = `\nHungry Dice: ${hungryResults.join(', ')}`;

	return cleanString + hungryString;
};
/**
 * @param {number} rouseDice number of dice to be used in rouse check
 * @returns {string} The results of the rouse check, and a brief explination.
 */

function rollRouse(rouseDice) {
	let successText = "Your hunger remains unchanged.";
	let failText = "Your hunger increases after this action.";
	let rouseResults = [];
	let win = false

	for (i = 0; i < rouseDice; i++) {
		// on rolling each die, checks if it's 6+, then the rouse was a success.
		let die = rollAd10();
		if (die > 5) {
			win = true;
		};
		rouseResults.push(die);
	};

	// Shows the player their dice, followed by the result.
	let text = `\nRouse Dice: ${rouseResults.join(', ')}\n`;
	if (win) {
		text += successText;
	} else {
		text += failText;
	};
	return text;
};