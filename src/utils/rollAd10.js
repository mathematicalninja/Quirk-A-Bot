/**
 * Rolls a ten sided dice and returns an integer of the result
 * @returns {number} result of dice roll
 */
export default function rollAd10() {
	return 1 + Math.floor(Math.random() * 10);
};