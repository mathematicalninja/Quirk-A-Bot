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
 