import { TagProto } from "src/tags/types/tag-proto";

export class UpdateTaskDto {
	readonly title?: string;
	readonly shortDescription?: string;
	readonly start?: Date;
	readonly end?: Date;
	readonly attachment?: string;
	readonly tags?: TagProto[];
	readonly columnId: number;
	readonly projectId: number;
}
