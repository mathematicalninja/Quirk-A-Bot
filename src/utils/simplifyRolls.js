/**
 * used to check if the user wants a simplified dice-roll (i.e. emote only and explination)
 * @param {Object} msg Discord message object
 * @returns {Boolean}
 */

export default function(message) {
	let Bot_id = process.env.BOT_IDENTITY_DIGITS;
	let simplifyRegex = new RegExp("(easy|simp)");

	if (message.author.bot) return false;

	if (message.mentions.users.get(Bot_id)) {
		if (message.mentions.users.get(Bot_id).id == Bot_id) return true;
	};

	if (message.content.match(simplifyRegex)) {
		return true;
	};

	return false;

};