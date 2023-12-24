import {
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
		const task = await this.taskService.findBy(request.params.taskId);
		return !!task;
	}
}
