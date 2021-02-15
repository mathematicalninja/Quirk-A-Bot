// loading discord interactive JavaScript
const Discord = require('discord.js');
const client = new Discord.Client();

// Setting the .env file to a locally accessible form
require('dotenv').config();
// const Enviromet = require('dotenv').config();

// logging in as a bot
client.login(process.env.DISCORD_BOT_TOKEN);

// Hello ^-^
console.log('Hello');

client.on('ready', () => {
	console.log('logged on ok');
});

client.on('message', gotMessage);

// __________________________________________________________________________
//matches Roll and it's easiest typos followed by two numbers, sperating all three parts by anything other than digits (e.g. roll532 makes no sense, but RoL5 2 does)
// const DICE_ROLL_REGEX = new RegExp('[Rr]+[oO]+[lL]+[^\\d]*(\\d+)[^\\d]+(\\d*)');
const DICE_ROLL_REGEX = /r+o+l+\D*(\d+)\D*(\d*)/i;

// not required
// matches a single number rolled (to be just clean dice)
// const DICE_SINGLE_ROLL_REGEX = new RegExp('[Rr]+[oO]+[lL]+[^\\d]*(\\d+)');
// const DICE_SINGLE_ROLL_REGEX = /r+o+l+\D*(\d+)/i;

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

function regexToDice(RegexMatch) {
	// turns the regex's text into js integers, defaults to 0 if hunger dice not defined
	return [parseInt(RegexMatch[1]), parseInt(RegexMatch[2]) || 0];
}

function doTheRolling(playerDice) {
	// The wrapper function to do the actuall rolling
	//respec to "vampireRolling" when other rolls are implemented
	const [cleanDiceCount, hungerDiceCount] = kindOfDice(playerDice);
	const RESULTS = [rollDice(cleanDiceCount), rollDice(hungerDiceCount)];
	const WHAT_TO_WRITE = showRolls(RESULTS);
	return WHAT_TO_WRITE;
}

function rollAd10() {
	return 1 + Math.floor(Math.random() * 10);
}

function kindOfDice([A, B]) {
	// takes in a pool and hunger dice (in any order) and returns the clean and hungry dice numbers
	let pool = Math.max(A, B);
	let hungerDice = Math.min(A, B);
	let cleanDice = pool - hungerDice;
	return [cleanDice, hungerDice];
}

function rollDice(diceCount) {
	// Rolls clean and Hungry dice, returning an array of two arrays ([[Clean], [Hungry]])
	let results = [];

	for (let i = 0; i < diceCount; i++) {
		results.push(rollAd10());
	}

	return results;
}

function showRolls([cleanResults, hungryResults]) {
	// respec to Vampire something when the distinction matters.
	// console.log(Results)

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
