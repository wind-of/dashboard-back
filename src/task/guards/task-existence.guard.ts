import {
	BadRequestException,
	CanActivate,
	ExecutionContext,
	Inject,
	Injectable
} from "@nestjs/common";
import { TaskService } from "src/task/task.service";

@Injectable()
export class TaskExistenceGuard implements CanActivate {
	constructor(@Inject(TaskService) private taskService: TaskService) {}
	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		const taskId = request.params?.taskId;
		const columnId = request.body?.columnId;
		if (!taskId) throw new BadRequestException("Task ID is required");
		if (!columnId) throw new BadRequestException("Column ID is required");
		const task = await this.taskService.findBy({ id: taskId, columnId });
		if (!task) throw new BadRequestException("Task not found");
		return true;
	}
}
