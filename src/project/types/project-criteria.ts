import { FindOptionsWhere } from "typeorm";
import { Comments as CommentsEntity } from "src/entities/comments.entity";

export type SingleProjectSearchCriteria = {
	readonly ownerId?: number;
	readonly id?: number;
	readonly participants?: FindOptionsWhere<CommentsEntity>;
};

export type ProjectSearchCriteria =
	| SingleProjectSearchCriteria
	| SingleProjectSearchCriteria[];
