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















