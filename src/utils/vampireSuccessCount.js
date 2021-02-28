/**
 * Counts successes (and double for crits), checks for messy/bestial, and returns printable string
 * @param {Array<number>} cleanResults - the results of the player's clean dice.
 * @param {Array<number>} hungryResults - the results of the player's hungry dice.
 * @returns {string} number of successes, if there's a messy critical, if there's a bestial failure. Seperated by newlines.
 */

export default function vampireSuccessCount(cleanResults, hungryResults) {

	let tens = 0;
	let suc = 0;
	let skulls = -1;
	let crits = -1;

	for (let res of cleanResults) { // Checking the clean results
		if (res == 10) { //10's might count for double
			tens += 1;
			crits = 0;
		};
		if (res > 5) { // 6+ is a success
			suc += 1;
		};
		if (res == 1) { // 1's might be bestial failures
			skulls = 0;
		};
	};

	for (let res of hungryResults) {
		if (res == 10) { //10's might count for double
			tens += 1;
			if (crits == 0) { // There's a 10 in clean and in hungry => messy
				crits = 1;
			};
		};
		if (res > 5) { // 6+ is a success
			suc += 1;
		};
		if (res == 1) {
			if (skulls == 0) { // There's a 1 in clean and in hungry => bestial
				skulls = 1;
			};
		};
	};


	if (tens > 1) { // There's multiple 10's, so they are counted twice.
		suc += tens;
	};

	let messyText = "";
	if (crits == 1) { // clean and hungry 10's => explination text added.
		messyText = "\n" + process.env.HUNGRY_CRIT_LEFT + "possible messy critical" + process.env.HUNGRY_CRIT_RIGHT;
	};

	let beastText = "";
	if (skulls == 1) { // clean and hungry 1's => explination text added.
		beastText = "\n" + process.env.HUNGRY_FAIL_LEFT + "possible beastial failure" + process.env.HUNGRY_FAIL_RIGHT;
	};

	// Success count, messy explination, beastial explination.
	return "\nSuccesses = " + suc + messyText + beastText;
};