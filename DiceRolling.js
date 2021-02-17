import { Client } from 'discord.js';
import dotenv from 'dotenv';

import onReady from './src/discord-handlers/on-ready.js';
import gotMessage from './src/discord-handlers/on-message/index.js';

// Setting the .env file to a locally accessible form
dotenv.config();

const client = new Client();

// logging in as a bot
client.login(process.env.DISCORD_BOT_TOKEN);

// Hello ^-^
console.log('Hello');

// handle on Discord client ready
client.on('ready', onReady);

// handle on Discord message received
client.on('message', gotMessage);
