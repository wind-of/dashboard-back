export class CreateCommentDto {
	readonly content: string;
	readonly userId: number;
	readonly taskId: number;
	readonly attachment?: string;
}
