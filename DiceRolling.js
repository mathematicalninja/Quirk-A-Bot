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
	const [cleanDice, hungerDice] = kindOfDice(playerDice);
	const RESULTS = rollDice(cleanDice, hungerDice);
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

function rollDice(cleanDice, hungryDice) {
	// Rolls clean and Hungry dice, returning an array of two arrays ([[Clean], [Hungry]])
	let cleanResults = [];
	let hungryResults = [];
 
	for (let i = 0; i < cleanDice; i++) {
		cleanResults.push(rollAd10());
	}
	for (let i = 0; i < hungryDice; i++) {
		hungryResults.push(rollAd10());
	} 

	return [cleanResults, hungryResults];
}

function showRolls([cleanResults, hungryResults]) {
	// respec to Vampire something when the distinction matters.
	// console.log(Results)

	let cleanString = '';
	let hungryString = '';

	if (!(cleanResults[0] == undefined)) {
		//Checks if the clean result's first element defined

		let Len = cleanResults.length; //number of Clean Dice results
		cleanString = 'Clean Dice: ';

		for (let i in cleanResults) {
			if (i != Len - 1) {
				// this isn't the final of the clean dice
				cleanString += cleanResults[i].toString() + ', ';
			} else {
				cleanString += cleanResults[i].toString();
				// last entry doen't end in a comma and a space
			}
		}
	}

	if (!(hungryResults[0] == undefined)) {
		//Checks if the hungry result's first element defined

		let Len = hungryResults.length;
		console.log(Len);

		if (cleanString != '') {
			//if there are clean dice, newline before the Hungry dice
			hungryString = '\nHungry Dice: ';
		} else {
			hungryString = 'Hungry Dice: ';
		}
		for (let i in hungryResults) {
			if (i != Len - 1) {
				// this isn't the final of the hungry dice
				hungryString += hungryResults[i].toString() + ', ';
			} else {
				// last entry doen't end in a comma and a space
				hungryString += hungryResults[i].toString();
			}
		}
	}
	if (cleanResults.length + hungryResults.length == 0) {
		//nothing was rolled
		return 'please be sensible.';
	}
	return cleanString + hungryString;
}
