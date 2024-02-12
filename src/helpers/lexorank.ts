export const ALPHABET_SIZE = 26 as const; // for now
export const RANK_START_POSITION = "aaaaa" as const;
export const RANK_END_POSITION = "zzzzz" as const;

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
			secondCode += ALPHABET_SIZE;
			secondPositionCodes[index - 1] -= 1;
		}

		const powRes = Math.pow(ALPHABET_SIZE, firstRank.length - index - 1);
		difference += (secondCode - firstCode) * powRes;
	}

	let newElement = "";
	if (difference <= 1) {
		newElement =
			firstRank +
			String.fromCharCode("a".charCodeAt(0) + Math.floor(ALPHABET_SIZE / 2));
	} else {
		difference = Math.floor(difference / 2);

		let offset = 0;
		for (let index = 0; index < firstRank.length; index++) {
			const diffInSymbols =
				Math.floor(difference / Math.pow(ALPHABET_SIZE, index)) % ALPHABET_SIZE;

			let newElementCode =
				firstRank.charCodeAt(secondRank.length - index - 1) +
				diffInSymbols +
				offset;
			offset = 0;

			if (newElementCode > "z".charCodeAt(0)) {
				offset++;
				newElementCode -= ALPHABET_SIZE; // ALPHABET_SIZE = ALPHABET_SIZE for now
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
