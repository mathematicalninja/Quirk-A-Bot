import gotMessage from './src/discord-handlers/on-message';
import onReady from './src/discord-handlers/on-ready';

// Setting the .env file to a locally accessible form
require('dotenv').config();

// loading discord interactive JavaScript
const Discord = require('discord.js');

const client = new Discord.Client();

// logging in as a bot
client.login(process.env.DISCORD_BOT_TOKEN);

// Hello ^-^
console.log('Hello');

client.on('ready', onReady);

client.on('message', gotMessage);

// __________________________________________________________________________
// matches Roll and it's easiest typos followed by two numbers, sperating all three parts by anything other than digits (e.g. roll532 makes no sense, but RoL5 2 does) Matches a one or two numbers, if the second number exists
const DICE_ROLL_REGEX = /[Rr]+[Oo]+[Ll]+\D*(\d+)\D*(\d*)/i;

// matches if a player asks to rouse, or rouse <n>.
const ROUSE_REGEX = /(?:[Rr]+[Oo]+[Us]*[Ss]+[Ee]*\D*(\d+))|(?:[Rr]ouse)/i;


// rerolls up to 3 dice the player asks for, and keeps the rest.
// reroll ((\d){1,3})\w*(keep\D*(\d)+)?(\w*(hunger)\D*(\d)+)?

/**
 * Discord message handler
 * @param {Object} msg Discord message object
 */
function gotMessage(msg) {
	// Quirk-A-Bot reads every message in the Discord server (but not in a creepy way)

	// ignore messages from a bot
	if (msg.author.bot) return;

	if (msg.channel.id == process.env.DICE_ROLLING_CHANNEL) {
		// If this is the dicerolling Channel, then we roll some dice.

		// Handle message requesting hungry and/or Clean Dice rolls
		if (msg.content.match(DICE_ROLL_REGEX)) {
			// Add in a roll 3d10 style roller (with multi support "roll 3d4, 2d6")
			const playerDice = regexToDice(msg.content.match(DICE_ROLL_REGEX));
			msg.reply(doTheRolling(playerDice));
		} else if (msg.content.match(ROUSE_REGEX)) {
			// player asked to rouse the blood.
			const rouseDice = parseInt(msg.content.match(ROUSE_REGEX)[1]) || 1;
			msg.reply(rollRouse(rouseDice));
		};
	};

	if (msg.channel.id == process.env.TEST_CHANNEL_ID) {
		// Code to be tested.
		TestTextOutput(msg);
	};
};




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
	let successText = "Your hunger...remains unchanged.";
	let failText = "Your hunger...increases after this action.";
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

function TestTextOutput(msg) {

}
