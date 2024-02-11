const ALPHABET_SIZE = 26;
export const RANK_START_POSITION = "aaaaa";
export const RANK_END_POSITION = "zzzzz";
const TASK_FOR_PROJECT_LIMIT_TOTAL = 10;

export function getDefaultRank(forNumOfTasks = TASK_FOR_PROJECT_LIMIT_TOTAL) {
	const startPos = RANK_START_POSITION;
	const endPos = RANK_END_POSITION;

	const startCode = startPos.charCodeAt(0);
	const endCode = endPos.charCodeAt(0);

	const diffInOneSymb = endCode - startCode;

	const totalDiff =
		diffInOneSymb +
		diffInOneSymb * ALPHABET_SIZE +
		diffInOneSymb * ALPHABET_SIZE * ALPHABET_SIZE;
	const diffForOneItem = Math.floor(totalDiff / (forNumOfTasks + 1));

	const diffForSymbols = [
		diffForOneItem % ALPHABET_SIZE,
		Math.floor(diffForOneItem / ALPHABET_SIZE) % ALPHABET_SIZE,
		Math.floor(diffForOneItem / ALPHABET_SIZE ** 2) % ALPHABET_SIZE
	];

	const positions = [];
	let lastAddedElement = startPos;
	for (let ind = 0; ind < forNumOfTasks; ind++) {
		let offset = 0;
		let newElement = "";
		for (let index = 0; index < 3; index++) {
			const diffInSymbols = diffForSymbols[index];

			let newElementCode =
				lastAddedElement.charCodeAt(2 - index) + diffInSymbols;
			if (offset !== 0) {
				newElementCode += 1;
				offset = 0;
			}

			if (newElementCode > "z".charCodeAt(0)) {
				offset += 1;
				newElementCode -= ALPHABET_SIZE;
			}

			const symbol = String.fromCharCode(newElementCode);
			newElement += symbol;
		}

		newElement = newElement.split("").reverse().join("");
		positions.push(newElement);
		lastAddedElement = newElement;
	}

	positions.sort();
	positions.forEach((p) => console.log(p));
	return positions;
}

export function getRankBetween(firstRank, secondRank) {
	if (firstRank.localeCompare(secondRank) >= 0) {
		throw new Error(
			`First position must be lower than second. Got firstRank ${firstRank} and second rank ${secondRank}`
		);
	}

	while (firstRank.length !== secondRank.length) {
		if (firstRank.length > secondRank.length) {
			secondRank += "a";
		} else {
			firstRank += "a";
		}
	}

	let firstPositionCodes = [];
	firstPositionCodes = Array.from(firstRank, (c: string) => c.charCodeAt(0));

	let secondPositionCodes = [];
	secondPositionCodes = Array.from(secondRank, (c: string) => c.charCodeAt(0));

	let difference = 0;

	for (let index = firstPositionCodes.length - 1; index >= 0; index--) {
		const firstCode = firstPositionCodes[index];
		let secondCode = secondPositionCodes[index];

		if (secondCode < firstCode) {
			secondCode += 26; // ALPHABET_SIZE = 26 for now
			secondPositionCodes[index - 1] -= 1;
		}

		const powRes = Math.pow(26, firstRank.length - index - 1);
		difference += (secondCode - firstCode) * powRes;
	}

	let newElement = "";
	if (difference <= 1) {
		newElement =
			firstRank + String.fromCharCode("a".charCodeAt(0) + Math.floor(26 / 2));
	} else {
		difference = Math.floor(difference / 2);

		let offset = 0;
		for (let index = 0; index < firstRank.length; index++) {
			const diffInSymbols = Math.floor(difference / Math.pow(26, index)) % 26;

			let newElementCode =
				firstRank.charCodeAt(secondRank.length - index - 1) +
				diffInSymbols +
				offset;
			offset = 0;

			if (newElementCode > "z".charCodeAt(0)) {
				offset++;
				newElementCode -= 26; // ALPHABET_SIZE = 26 for now
			}

			newElement += String.fromCharCode(newElementCode);
		}

		newElement = newElement.split("").reverse().join("");
	}

	return newElement;
}

export function getNextRank(previousRank) {
	return previousRank + "z";
}
