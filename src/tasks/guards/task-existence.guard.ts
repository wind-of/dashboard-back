import {
	BadRequestException,
	CanActivate,
	ExecutionContext,
	Injectable
} from "@nestjs/common";
import { TaskService } from "src/tasks/tasks.service";

@Injectable()
export class TaskExistenceGuard implements CanActivate {
	constructor(private taskService: TaskService) {}
	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		const taskId = request.params?.taskId;
		if (!taskId) throw new BadRequestException("Task ID is required");
		const task = await this.taskService.findBy({ id: taskId });
		if (!task) throw new BadRequestException("Task not found");
		return true;
	}
}
