import handleDiceRollingChannelMessage from './handleDiceRollingChannelMessage.js';

/**
 * Discord message handler
 * @param {Object} msg Discord message object
 */
export default function handleMessage(msg) {
	// ignore messages from a bot
	if (msg.author.bot) return;

	// Quirk-A-Bot reads every message in the Discord server (but not in a creepy way)
	// handle messages from different channels
	switch (msg.channel.id) {
		case process.env.DICE_ROLLING_CHANNEL:
			return handleDiceRollingChannelMessage(msg);
		default:
			// do nothing
			return null;
	}
}
