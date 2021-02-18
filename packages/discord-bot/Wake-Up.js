const Discord = require('discord.js');
const Enviroment = require("dotenv").config();
const client = new Discord.Client();
client.login(Enviroment.DISCORD_BOT_TOKEN);

console.log("Hello")

client.on("ready", () => {
	console.log("loged on ok");
	//the typo is intentional
});