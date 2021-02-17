// matches Roll and it's easiest typos followed by two numbers, sperating all three parts by anything other than digits (e.g. roll532 makes no sense, but RoL5 2 does) Matches a one or two numbers, if the second number exists
export const DICE_ROLL_REGEX = /[Rr]+[Oo]+[Ll]+\D*(\d+)\D*(\d*)/i;

// matches if a player asks to rouse, or rouse <n>.
export const ROUSE_REGEX = /(?:[Rr]+[Oo]+[Us]*[Ss]+[Ee]*\D*(\d+))|(?:[Rr]ouse)/i;
