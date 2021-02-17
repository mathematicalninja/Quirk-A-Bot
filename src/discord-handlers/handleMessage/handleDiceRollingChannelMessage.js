import regexToDice from '../../utils/regexToDice.js';
import doTheRolling from '../../utils/doTheRolling.js';
import rollRouse from '../../utils/rollRouse.js';
import { DICE_ROLL_REGEX, ROUSE_REGEX } from '../../constants.js';

export default function handleDiceRollingChannelMessage(msg) {
	// parse non-bot messages in Dice Rolling channel
	if (msg.content.match(DICE_ROLL_REGEX)) {
		// Add in a roll 3d10 style roller (with multi support "roll 3d4, 2d6")
		const playerDice = regexToDice(msg.content.match(DICE_ROLL_REGEX));
		msg.reply(doTheRolling(playerDice));
	} else if (msg.content.match(ROUSE_REGEX)) {
		// player asked to rouse the blood.
		const rouseDice = parseInt(msg.content.match(ROUSE_REGEX)[1]) || 1;
		msg.reply(rollRouse(rouseDice));
	}
}
