export class CreateCommentDto {
	readonly content: string;
	readonly attachment?: string;
	readonly taskId: number;
	readonly projectId: number;
}
