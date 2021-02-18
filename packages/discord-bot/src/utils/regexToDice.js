/**
 * Turns the regex's text into js integers, defaults to 0 if hunger dice not defined
 * @param {Array<number>} RegexMatch result of regex, including capture groups
 * @returns the first and/or second number if defined (otherwise defaults to 0)
 */
export default function regexToDice(RegexMatch) {
	return [parseInt(RegexMatch[1]) || 0, parseInt(RegexMatch[2]) || 0];
}
