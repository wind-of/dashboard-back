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

interface ElementWithLexorank {
	lexorank: string;
}

export function computeLexoranks(
	nearbyElements: ElementWithLexorank[],
	isElementNextItself: boolean,
	isSameGroup: boolean,
	shouldInsertAfter = false
) {
	const [previousElement, replacingElement, nextElement] = nearbyElements;

	let currentElementLexorank;
	let replacingElementLexorank;

	if (!replacingElement) {
		// Если элемент не занимает ни чьё место, nо есть два возможных случая:
		if (!previousElement) {
			// Когда в группе нет элементов, и мы вставляем первый
			currentElementLexorank = RANK_START_POSITION;
		} else {
			// Когда в группе есть один единственный элемент, и мы вставляем после него
			currentElementLexorank = getNextRank(previousElement.lexorank);
		}
	} else if (!previousElement) {
		// Если же элемент занимает место другого элемента, то это либо начало списка:
		currentElementLexorank = replacingElement.lexorank;
	} else if (nextElement) {
		// Либо же это середина списка:
		if (isElementNextItself || (!isSameGroup && !shouldInsertAfter)) {
			// Тогда, если перетаскиваемый элемент сам идёт после элемента, на позицию которого мы его перекладываем (т.е. перекладываем на одну позицию вверх).
			// Или же если перетаскиваемый элемент не в другой колонке и не вставляем после элемента.
			currentElementLexorank = getRankBetween(
				previousElement.lexorank,
				replacingElement.lexorank
			);
		} else {
			// Иначе, если перетаскиваемый элемент в другой колонке или вставляем после элемента
			currentElementLexorank = getRankBetween(
				replacingElement.lexorank,
				nextElement.lexorank
			);
		}
	} else {
		// Либо же это конец списка.
		// Почему здесь именно следующее разделение? - Особенность библиотеки на фронте
		if (shouldInsertAfter && isSameGroup) {
			// Когда вставляем после последнего в той же колонке
			currentElementLexorank = getNextRank(replacingElement.lexorank);
		} else {
			// В остальных случаях.
			currentElementLexorank = getRankBetween(
				previousElement.lexorank,
				replacingElement.lexorank
			);
		}
	}

	if (replacingElement && !previousElement) {
		replacingElementLexorank = getRankBetween(
			currentElementLexorank,
			nextElement?.lexorank || getNextRank(currentElementLexorank)
		);
	} else {
		replacingElementLexorank = undefined;
	}

	return { currentElementLexorank, replacingElementLexorank };
}
