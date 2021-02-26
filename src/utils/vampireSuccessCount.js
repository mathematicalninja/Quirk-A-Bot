export default function vampireSuccessCount(diceRolls) {
	let tens = 0;
	let suc = 0;
	for (let res of diceRolls) {
		if (res == 10) {
			tens += 1
		}
		if (res > 5) {
			suc += 1
		}
	}
	if (tens > 1) {
		suc += tens
	}
	return suc
}