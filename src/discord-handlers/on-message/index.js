import diceRollChannelMessageHandler from './dice-rolling-channel';

/**
 * Discord message handler
 * @param {Object} msg Discord message object
 */
function gotMessage(msg) {
	// ignore messages from a bot
	if (msg.author.bot) return;

	// Quirk-A-Bot reads every message in the Discord server (but not in a creepy way)

	switch (msg.channel.id) {
		case process.env.DICE_ROLLING_CHANNEL:
			return diceRollChannelMessageHandler(msg);
		default:
			return;
	}

	// ignore messages not from Dice Rolling channel
	// Note that future intentions might need this to swap back.
	// msg.channel.id in array of channels, continue vs not in
	// I'm not sure of the optimal way round atm
	// if (msg.channel.id !== process.env.DICE_ROLLING_CHANNEL) return;

	
}

export default gotMessage;
