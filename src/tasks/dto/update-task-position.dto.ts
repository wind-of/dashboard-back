export class UpdateTaskPositionDto {
	readonly projectId: number;
	readonly columnId: number;
	readonly position: number;
	readonly shouldInsertAfter: boolean;
}
