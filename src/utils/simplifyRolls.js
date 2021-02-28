/**
 *
 */

export default function(message) {
	let Bot_id = process.env.BOT_IDENTITY_DIGITS;
	// return true;
	if (message.author.bot) return false;

	if (message.mentions.users.get(Bot_id)) {
		if (message.mentions.users.get(Bot_id).id == Bot_id) return true;
	}


	return false;

	// let obj = message.mentions.users.keys()
	// for (var variable in obj) {
	// 	if (obj.hasOwnProperty(variable)) {
	// 		console.log(obj.variable)
	// 		console.log(Bot_id)
	// 		console.log(obj.variable == Bot_id)
	// 	}
	// }

};