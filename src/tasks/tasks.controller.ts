import {
	Body,
	Controller,
	Delete,
	Param,
	Post,
	UseGuards,
	Patch
} from "@nestjs/common";
import { AuthenticatedGuard } from "src/auth/guards/authentication.guard";
import { ProjectParticipantRoles as Roles } from "src/decorators/project-roles.decorator";
import { ParticipantRolesEnum as RolesEnum } from "src/participants/enums/roles.enum";
import { ParticipantRolesGuard } from "src/participants/guards/participant-roles.guard";
import { TaskService } from "src/tasks/tasks.service";
import { UpdateTaskDto } from "src/tasks/dto/update-task.dto";
import { CreateTaskDto } from "src/tasks/dto/create-task.dto";
import { DeleteTaskDto } from "src/tasks/dto/delete-task.dto";
import { TaskExistenceGuard } from "src/tasks/guards/task-existence.guard";
import { ColumnExistenceGuard } from "src/columns/guard/column-existence.guard";

@Controller("tasks")
@UseGuards(AuthenticatedGuard, ParticipantRolesGuard, ColumnExistenceGuard)
export class TaskController {
	constructor(private taskService: TaskService) {}

	@Post()
	@Roles(RolesEnum.Owner, RolesEnum.Admin, RolesEnum.Member)
	async createTask(@Body() task: CreateTaskDto) {
		return this.taskService.create(task);
	}

	@UseGuards(TaskExistenceGuard)
	@Patch(":taskId")
	@Roles(RolesEnum.Owner, RolesEnum.Admin, RolesEnum.Member)
	async updateTask(
		@Param("taskId") taskId: number,
		@Body() task: UpdateTaskDto
	) {
		return this.taskService.update(taskId, task);
	}

	@UseGuards(TaskExistenceGuard)
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
