import regexToDice from '../../utils/regexToDice.js';
import rollVampire from '../../utils/rollVampire.js';
import rollRouse from '../../utils/rollRouse.js';
import simplifyRolls from '../../utils/simplifyRolls.js';
import {
	DICE_ROLL_REGEX,
	ROUSE_REGEX
} from '../../constants.js';

/**
 * Parses non-bot messages in Dice Rolling channel
 * @param {Object} msg Discord message object
 * @returns {Object} msg.reply replying to the message with the desired dice roll.
 */
export default function handleDiceRollingChannelMessage(msg) {
	// Variable to hold regex result to prevent repeated executions.
	let regexMatch;
	// Checks the message to see if the user wants a simplified response.
	let simplifyResults = simplifyRolls(msg);

	// handle dice roll
	regexMatch = msg.content.match(DICE_ROLL_REGEX);
	if (regexMatch) {
		// Add in a roll 3d10 style roller (with multi support "roll 3d4, 2d6")
		const playerDice = regexToDice(regexMatch);
		return msg.reply(rollVampire(playerDice, simplifyResults));
	};

	// handle player asked to rouse the blood.
	regexMatch = msg.content.match(ROUSE_REGEX);
	if (regexMatch) {
		const rouseDice = parseInt(regexMatch[1]) || 1;
		return msg.reply(rollRouse(rouseDice));
	};

};