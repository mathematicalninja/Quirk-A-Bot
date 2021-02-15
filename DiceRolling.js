// loading discord interactive JavaScript
const Discord = require('discord.js');
const client = new Discord.Client();

// Setting the .env file to a locally accessible form
require('dotenv').config(); 

// logging in as a bot
client.login(process.env.DISCORD_BOT_TOKEN);

// Hello ^-^
console.log('Hello');

client.on('ready', () => {
	console.log('logged on ok');
});

client.on('message', gotMessage);

// __________________________________________________________________________
//matches Roll and it's easiest typos followed by two numbers, sperating all three parts by anything other than digits (e.g. roll532 makes no sense, but RoL5 2 does) Matches a one or two numbers, if the second number exists
const DICE_ROLL_REGEX = /r+o+l+\D*(\d+)\D*(\d*)/i;

/**
 * Discord message handler
 * @param {Object} msg Discord message object 
 */
function gotMessage(msg) {
	// ignore messages from a bot
	if (msg.author.bot) return;

	// Quirk-A-Bot reads every message in the Discord server (but not in a creepy way)
	// ignore messages not from Dice Rolling channel
	if (msg.channel.id !== process.env.DICE_ROLLING_CHANNEL) return;

	// parse non-bot messages in Dice Rolling channel

	// Handle message requesting hungry and/or Clean Dice rolls
	if (msg.content.match(DICE_ROLL_REGEX)) {
		// Add in a roll 3d10 style roller (with multi support "roll 3d4, 2d6")
		const playerDice = regexToDice(msg.content.match(DICE_ROLL_REGEX));
		msg.reply(doTheRolling(playerDice));
	}
}

/**
 * Turns the regex's text into js integers, defaults to 0 if hunger dice not defined
 * @param {Array<number>} RegexMatch result of regex, including capture groups
 * @returns the first and/or second number if defined (otherwise defaults to 0)
 */
function regexToDice(RegexMatch) {
	// 
	return [parseInt(RegexMatch[1]), parseInt(RegexMatch[2]) || 0];
}

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
	if (cleanResults.length) cleanString = `Clean Dice: ${cleanResults.join(', ')}`;

	//Add hungry result text if there are any hungry dice
	//if there are clean dice, newline before the Hungry dice
	if (hungryResults.length) hungryString = `${cleanString ? '\n' : ''}Hungry Dice: ${hungryResults.join(', ')}`;

	return cleanString + hungryString;
}
