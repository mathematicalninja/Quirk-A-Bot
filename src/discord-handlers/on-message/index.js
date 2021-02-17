import diceRollChannelMessageHandler from './dice-rolling-channel.js';

/**
 * Discord message handler
 * @param {Object} msg Discord message object
 */
export default function gotMessage(msg) {
	// ignore messages from a bot
	if (msg.author.bot) return;

	console.log('Received human message');
	// Quirk-A-Bot reads every message in the Discord server (but not in a creepy way)
	// handle messages from different channels
	switch (msg.channel.id) {
		case process.env.DICE_ROLLING_CHANNEL:
			return diceRollChannelMessageHandler(msg);
		default:
			return null;
	}
}

// export default gotMessage;
