import { TaskRelations } from "src/tasks/types/task.relations";

export type ColumnRelations = {
	tasks?: boolean | TaskRelations;
};
