export class CreateTaskDto {
	readonly title: string;
	readonly shortDescription?: string;
	readonly start?: Date;
	readonly end?: Date;
	readonly attachment?: string;
	readonly columnId: number;
	readonly projectId: number;
}
