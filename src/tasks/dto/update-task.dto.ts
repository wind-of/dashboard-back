import { CreateTagDto } from "src/tags/dto/create-tag.dto";

export class UpdateTaskDto {
	readonly title?: string;
	readonly shortDescription?: string;
	readonly start?: Date;
	readonly end?: Date;
	readonly attachment?: string;
	readonly tags?: CreateTagDto[];
	readonly columnId?: number;
	readonly projectId: number;
}
