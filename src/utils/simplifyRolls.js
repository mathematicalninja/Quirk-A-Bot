/**
 *
 */

export default function(message) {
	let Bot_id = process.env.BOT_IDENTITY_DIGITS;

	if (message.author.bot) return false;

	if (message.mentions.users.get(Bot_id)) {
		if (message.mentions.users.get(Bot_id).id == Bot_id) return true;
	}

	let simplifyRegex = new RegExp("(easy|simp)")
	if (message.content.match(simplifyRegex)) {
		return true;
	};

	return false;

};