import regexToDice from '../../utils/regexToDice.js';
import rollVampire from '../../utils/rollVampire.js';
import rollRouse from '../../utils/rollRouse.js';
import { DICE_ROLL_REGEX, ROUSE_REGEX } from '../../constants.js';

// rerolls up to 3 dice the player asks for, and keeps the rest.
// reroll ((\d){1,3})\w*(keep\D*(\d)+)?(\w*(hunger)\D*(\d)+)?

/**
 * Parses non-bot messages in Dice Rolling channel
 * @param {Object} msg Discord message object
 */
export default function handleDiceRollingChannelMessage(msg) {
	// variable to hold regex result to prevent repeated executions
	let regexMatch;

	// handle dice roll
	regexMatch = msg.content.match(DICE_ROLL_REGEX);
	if (regexMatch) {
		// Add in a roll 3d10 style roller (with multi support "roll 3d4, 2d6")
		const playerDice = regexToDice(regexMatch);
		return msg.reply(rollVampire(playerDice));
	}

	// handle player asked to rouse the blood.
	regexMatch = msg.content.match(ROUSE_REGEX);
	if (regexMatch) {
		const rouseDice = parseInt(regexMatch[1]) || 1;
		return msg.reply(rollRouse(rouseDice));
	}

	// provide feedback, even if command is not recognised
	// return msg.reply(`Sorry, I dont know what "${msg.content}" means`);
}