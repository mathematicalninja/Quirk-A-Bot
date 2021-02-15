// loading discord interactive JavaScript
const Discord = require('discord.js');
const client = new Discord.Client();

// Setting the .env file to a locally accessible form
require("dotenv").config();
const Enviromet = require('dotenv').config()

// logging in as a bot
client.login(process.env.DISCORD_BOT_TOKEN);


// Hello ^-^
console.log("Hello")

client.on("ready", () => {
	console.log("loged on ok");
});

client.on("message", gotMessage);

// const DICE_ROLL_REGEX = new RegExp("\\D*(\\d+)\\D+(\\d+)");
// matches two seperated numbers
const DICE_ROLL_REGEX = new RegExp("[Rr]+[oO]+[lL]+[^\\d]*(\\d+)[^\\d]+(\\d*)");
const DICE_SINGLE_ROLL_REGEX = new RegExp("[Rr]+[oO]+[lL]+[^\\d]*(\\d+)");
//matches Roll and it's easiest typos followed by two numbers, sperating all three parts by anything other than digits (e.g. roll532 makes no sense, but RoL5 2 does)

function gotMessage(msg) {
	console.log(msg.channel.id)
	console.log(process.env.DICE_ROLLING_CHANNEL)
	if (msg.channel.id == process.env.DICE_ROLLING_CHANNEL) { //bot testing channel

		// msg.channel.send(msg.content.match(DICE_ROLL_REGEX));
		if (msg.content.match(DICE_ROLL_REGEX)) {
			// console.log(msg.content)
			// console.log(DICE_ROLL_REGEX)
			// console.log(msg.content.match(DICE_ROLL_REGEX))
			// console.log(regexToDice(msg.content.match(DICE_ROLL_REGEX)))
			let playerDice = regexToDice(msg.content.match(DICE_ROLL_REGEX))
			// console.log(playerDice[0], playerDice[1])
			// console.log(msg.content);
			// msg.reply(rollAD10());
			// msg.channel.send(doTheRolling(playerDice[0],playerDice[1]));
			msg.reply(doTheRolling(playerDice[0], playerDice[1]));

		} else if (msg.content.match(DICE_SINGLE_ROLL_REGEX)) {
			msg.reply(doTheRolling(msg.content.match(DICE_SINGLE_ROLL_REGEX)[1], 0))
		};
	};
};

function regexToDice(RegexMatch) {
	return [parseInt(RegexMatch[1]), parseInt(RegexMatch[2])]
}

function doTheRolling(A, B) {
	const DICE = kindOfDice(A, B);
	const RESULTS = rollDice(DICE[0], DICE[1])
	const WHAT_TO_WRITE = showRolls(RESULTS)
	// return ("DICE",DICE, "RESULTS", RESULTS, "WHAT_TO_WRITE", WHAT_TO_WRITE)
	// return ("Done")
	return (WHAT_TO_WRITE)
}

function rollAD10() {
	return 1 + Math.floor(Math.random() * 10);
};

function kindOfDice(A, B) {
	let pool = Math.max(A, B);
	let hunger = Math.min(A, B);
	let cleanDice = pool - hunger;
	return [cleanDice, hunger];
};


function rollDice(cleanDice, hungryDice) {
	let cleanResults = [];
	let hungryResults = [];

	for (let i = 0; i < cleanDice; i++) {
		cleanResults.push(rollAD10());
	};
	for (let i = 0; i < hungryDice; i++) {
		hungryResults.push(rollAD10());
	};

	return ([cleanResults, hungryResults]);
};

function showRolls(Results) {
	console.log(Results)
	let printString = "";
	if (Results[0] !== []) {
		let cleanString = "Clean Dice: ";
		let Len = Results[0].length;
		for (let i in Results[0]) {
			if (i != Len) { // this isn't the final of the clean dice
				cleanString += Results[0][i].toString() + ", ";
			} else {
				cleanString += Results[0][i].toString(); //last entry doen't end in a space
			};
		};
		printString += cleanString;
	};
	let hungryString = "";

	if (!(Results[1][0])) {
		console.log("Boolean", Results[1][0], !Results[1][0])
		hungryString = "Hungry Dice: ";
		console.log("Hungry result", Results[1])
		let Len = Results[1].length;
		for (let i in Results[1]) {
			if (i != Len) { // this isn't the final of the clean dice
				hungryString += Results[1][i].toString() + ", ";
			} else {
				hungryString += Results[1][i].toString(); //last entry doen't end in a space
			};
		};
		if (printString != "") {
			printString += "\n";
		};
		printString += hungryString;
	};
	return printString;
};