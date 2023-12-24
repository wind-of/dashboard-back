import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards
} from "@nestjs/common";
import { TaskService } from "src/task/task.service";
import { CreateTaskDto } from "src/task/dto/create-task.dto";
import { UpdateTaskDto } from "src/task/dto/update-task.dto";
import { AuthenticatedGuard } from "src/guards/authentication.guard";

@Controller("task")
@UseGuards(AuthenticatedGuard)
export class TaskController {
	constructor(private taskService: TaskService) {}

	@Get(":taskId")
	getTasks(@Param("taskId") taskId: number) {
		return this.taskService.findBy({ id: taskId });
	}

	@Post()
	async createTask(@Body() createTaskDto: CreateTaskDto) {
		return this.taskService.create(createTaskDto);
	}

	@Patch(":taskId")
	async updateTask(
		@Param("taskId") taskId: number,
		@Body() updateTaskDto: UpdateTaskDto
	) {
		return this.taskService.update(taskId, updateTaskDto);
	}

	@Delete(":taskId")
	async deleteTask(@Param("taskId") taskId: number) {
		return this.taskService.remove(taskId);
	}
}
