import { ColumnRelations } from "src/columns/types/columns.relations";

export type ProjectRelations = {
	participants?: boolean;
	columns?: boolean | ColumnRelations;
};
