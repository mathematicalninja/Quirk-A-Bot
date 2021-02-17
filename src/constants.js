// NOTE for regex, flags are defined a the end ie /{regex}/{flags}. The 'i' flag is for case-insensitivity, ie you dont need to account for upper and lower case to match letters. I use this tool to test regex https://regexr.com/

// todo handle case when user just types "rol" without numbers
/**
 * matches Roll and it's easiest typos followed by two numbers, sperating all three parts by anything other than digits (e.g. roll532 makes no sense, but RoL5 2 does) Matches a one or two numbers, if the second number exists
 */
export const DICE_ROLL_REGEX = /r+o+l+\D*(\d*)\D*(\d*)/i;

// todo dont need to match "rouse" separately
/**
 * matches if a player asks to rou[se], or rou[se] <n>.
 */
export const ROUSE_REGEX = /r+o+u+s*e*\D*(\d*)/i;
