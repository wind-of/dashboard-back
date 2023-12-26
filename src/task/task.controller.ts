import {
	Body,
	Controller,
	Delete,
	Param,
	Post,
	UseGuards,
	Patch
} from "@nestjs/common";
import { AuthenticatedGuard } from "src/guards/authentication.guard";
import { ProjectParticipantRoles as Roles } from "src/decorators/project-roles.decorator";
import { ParticipantRolesEnum as RolesEnum } from "src/participants/enums/roles.enum";
import { ProjectRolesGuard } from "src/guards/project-roles.guard";
import { TaskService } from "src/task/task.service";
import { UpdateTaskDto } from "src/task/dto/update-task.dto";
import { CreateTaskDto } from "src/task/dto/create-task.dto";
import { DeleteTaskDto } from "src/task/dto/delete-task.dto";

@Controller("tasks")
@UseGuards(AuthenticatedGuard, ProjectRolesGuard)
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@Post()
	@Roles(RolesEnum.Owner, RolesEnum.Admin, RolesEnum.Member)
	async createTask(@Body() task: CreateTaskDto) {
		return this.taskService.create(task);
	}

	@Patch(":taskId")
	@Roles(RolesEnum.Owner, RolesEnum.Admin, RolesEnum.Member)
	async updateTask(
		@Param("taskId") taskId: number,
		@Body() task: UpdateTaskDto
	) {
		return this.taskService.update(taskId, task);
	}

	@Delete(":taskId")
	@Roles(RolesEnum.Owner, RolesEnum.Admin, RolesEnum.Member)
	async deleteTask(
		@Param("taskId") taskId: number,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		@Body() deleteTaskDto: DeleteTaskDto
	) {
		return this.taskService.remove(taskId);
	}
}
