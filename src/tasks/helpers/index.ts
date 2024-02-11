import { Tasks as TaskEntity } from "src/entities/tasks.entity";
import {
	RANK_START_POSITION,
	getNextRank,
	getRankBetween
} from "src/helpers/lexorank";

export function computeLexoranks(
	currentTask: TaskEntity,
	nearbyTasks: TaskEntity[],
	targetColumnId: number,
	shouldInsertAfter = false
) {
	const currentTaskId = currentTask.id;
	const isSameColumn = currentTask.columnId === targetColumnId;
	const [previousTask, replacingTask, nextTask] = nearbyTasks;

	let currentTaskLexorank;
	let replacingTaskLexorank;

	if (!replacingTask) {
		// Если элемент не занимает ни чьё место, nо есть два возможных случая:
		if (!previousTask) {
			// Когда в группе нет элементов, и мы вставляем первый
			currentTaskLexorank = RANK_START_POSITION;
		} else {
			// Когда в группе есть один единственный элемент, и мы вставляем после него
			currentTaskLexorank = getNextRank(previousTask.lexorank);
		}
	} else if (!previousTask) {
		// Если же элемент занимает место другого элемента, то это либо начало списка:
		currentTaskLexorank = replacingTask.lexorank;
	} else if (nextTask) {
		// Либо же это середина списка:
		if (
			nextTask.id === Number(currentTaskId) ||
			(!isSameColumn && !shouldInsertAfter)
		) {
			// Тогда, если перетаскиваемый элемент идёт после элемента, на позицию которого мы его перекладываем.
			// Или же если перетаскиваемый элемент не в другой колонке и не вставляем после элемента.
			currentTaskLexorank = getRankBetween(
				previousTask.lexorank,
				replacingTask.lexorank
			);
		} else {
			// Иначе, если перетаскиваемый элемент в другой колонке или вставляем после элемента
			currentTaskLexorank = getRankBetween(
				replacingTask.lexorank,
				nextTask.lexorank
			);
		}
	} else {
		// Либо же это конец списка.
		// Почему здесь именно следующее разделение? - Особенность библиотеки на фронте
		if (shouldInsertAfter && isSameColumn) {
			// Когда вставляем после последнего в той же колонке
			currentTaskLexorank = getNextRank(replacingTask.lexorank);
		} else {
			// В остальных случаях.
			currentTaskLexorank = getRankBetween(
				previousTask.lexorank,
				replacingTask.lexorank
			);
		}
	}

	if (replacingTask && !previousTask) {
		replacingTaskLexorank = getRankBetween(
			currentTaskLexorank,
			nextTask?.lexorank || getNextRank(currentTaskLexorank)
		);
	} else {
		replacingTaskLexorank = undefined;
	}

	return { currentTaskLexorank, replacingTaskLexorank };
}
