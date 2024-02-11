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

	const currentTaskLexorank = !replacingTask
		? !previousTask
			? RANK_START_POSITION
			: getNextRank(previousTask.lexorank)
		: !previousTask
		? replacingTask.lexorank
		: nextTask
		? nextTask.id === Number(currentTaskId) ||
		  (!isSameColumn && !shouldInsertAfter)
			? getRankBetween(previousTask.lexorank, replacingTask.lexorank)
			: getRankBetween(replacingTask.lexorank, nextTask.lexorank)
		: shouldInsertAfter && isSameColumn
		? getNextRank(replacingTask.lexorank)
		: getRankBetween(previousTask.lexorank, replacingTask.lexorank);
	const replacingTaskLexorank =
		replacingTask && !previousTask
			? getRankBetween(
					currentTaskLexorank,
					nextTask?.lexorank || getNextRank(currentTaskLexorank)
			  )
			: undefined;
	return { currentTaskLexorank, replacingTaskLexorank };
}
