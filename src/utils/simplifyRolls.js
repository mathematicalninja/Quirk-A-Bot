/**
 *
 */

export default function(msg) {
	// let atBotRegex = "/<@!804930790122979328>/i"
	let atBotRegex = "/simple/i"
	console.log(atBotRegex);
	console.log(msg.content)
	console.log(msg.content.match(atBotRegex))

	if (msg.content.match(atBotRegex)) {
		return true;
	} else {
		return false;
	};
};