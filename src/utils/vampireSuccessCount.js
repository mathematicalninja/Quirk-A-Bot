export default function vampireSuccessCount(cleanResults, hungryResults) {
	let diceRolls = cleanResults.concat(hungryResults)

	let tens = 0;
	let suc = 0;

	let Skulls = -1
	let Crits = -1

	for (let res of cleanResults) {
		if (res == 10) {
			tens += 1
			Crits = 0
		}
		if (res > 5) {
			suc += 1
		}
		if (res == 1) {
			console.log(res, Skulls)

			Skulls = 0
			console.log(res, Skulls)
		}
	}

	console.log("red")
	for (let res of hungryResults) {
		console.log(res)
		if (res == 10) {
			tens += 1
			if (Crits == 0) {
				Crits = 1
			}
		}
		if (res > 5) {
			suc += 1
		}
		if (res == 1) {
			console.log("red", res, Skulls)
			if (Skulls == 0) {
				Skulls = 1
			}
		}
	}


	if (tens > 1) {
		suc += tens
	}
	let messyText = ""
	if (Crits == 1) {
		messyText = "\n" + process.env.HUNGRY_CRIT + "Possible messy critical" + process.env.HUNGRY_CRIT
	};
	let beastText = ""
	if (Skulls == 1) {
		beastText = "\n" + process.env.HUNGRY_FAIL + "Possible beastial failure" + process.env.HUNGRY_FAIL
	}
	return "\nSuccesses = " + suc + messyText + beastText
}