import {
	Body,
	Controller,
	Delete,
	Param,
	Post,
	Request,
	UseGuards,
	Patch,
	Get
} from "@nestjs/common";
import { ProjectService } from "src/project/project.service";
import { CreateProjectDto } from "src/project/dto/create-project.dto";
import { AuthenticatedGuard } from "src/guards/authentication.guard";
import { UpdateProjectDto } from "src/project/dto/update-project.dto";
import { ProjectParticipantRoles as Roles } from "src/decorators/project-roles.decorator";
import { ProjectRolesGuard } from "src/guards/project-roles.guard";
import { ProjectExistenceGuard } from "src/guards/project-existence.guard";
import { AddColumnDto } from "src/project/dto/add-column.dto";
import { ColumnsService } from "src/columns/columns.service";
import { UpdateColumnDto } from "src/columns/dto/update-column.dto";
import { TaskService } from "src/task/task.service";
import { AddTaskDto } from "./dto/add-task.dto";
import { UpdateTaskDto } from "src/task/dto/update-task.dto";
import { ColumnExistenceGuard } from "./guards/column-existence.guard";
import { TaskExistenceGuard } from "./guards/task-existence.guard";
import { ParticipantsService } from "src/participants/participants.service";
import { ParticipantRolesEnum as RolesEnum } from "src/participants/enums/roles.enum";

@Controller("projects")
@UseGuards(AuthenticatedGuard, ProjectRolesGuard)
export class ProjectController {
	constructor(
		private readonly projectService: ProjectService,
		private readonly columnsService: ColumnsService,
		private readonly taskService: TaskService,
		private readonly participantsService: ParticipantsService
	) {}

	@Get()
	async getAllProjects(@Request() req) {
		return this.projectService.findAllBy({ ownerId: req.user.id });
	}

	@UseGuards(ProjectExistenceGuard)
	@Get(":projectId")
	async getProject(@Param("projectId") id: number) {
		return this.projectService.findBy({ id });
	}

	@Post()
	async createProject(
		@Request() req,
		@Body() createProjectDto: CreateProjectDto
	) {
		const project = await this.projectService.create({
			...createProjectDto,
			ownerId: req.user.id
		});
		await this.participantsService.create({
			projectId: project.id,
			userId: req.user.id,
			role: RolesEnum.Owner
		});
		return project;
	}

	@UseGuards(ProjectExistenceGuard)
	@Patch(":projectId")
	@Roles(RolesEnum.Owner, RolesEnum.Admin)
	async updateProject(
		@Param("projectId") id: number,
		@Body() updateProjectDto: UpdateProjectDto
	) {
		return this.projectService.update(id, updateProjectDto);
	}

	@UseGuards(ProjectExistenceGuard)
	@Delete(":projectId")
	@Roles(RolesEnum.Owner)
	async remove(@Param("projectId") id: number) {
		await this.projectService.remove(id);
	}

	@Get(":projectId/columns")
	@UseGuards(ProjectExistenceGuard)
	@Roles(RolesEnum.Owner, RolesEnum.Admin, RolesEnum.Member)
	async getColumns(@Param("projectId") projectId: number) {
		return this.columnsService.findAllBy({ projectId });
	}

	@Post(":projectId/columns")
	@UseGuards(ProjectExistenceGuard)
	@Roles(RolesEnum.Owner, RolesEnum.Admin, RolesEnum.Member)
	async createColumn(
		@Param("projectId") projectId: number,
		@Body() column: AddColumnDto
	) {
		return this.columnsService.create({
			projectId,
			title: column.title
		});
	}

	@Patch(":projectId/columns/:columnId")
	@UseGuards(ProjectExistenceGuard, ColumnExistenceGuard)
	@Roles(RolesEnum.Owner, RolesEnum.Admin, RolesEnum.Member)
	async updateColumn(
		@Param("columnId") columnId: number,
		@Body() column: UpdateColumnDto
	) {
		return this.columnsService.update(columnId, column);
	}

	@Delete(":projectId/columns/:columnId")
	@UseGuards(ProjectExistenceGuard, ColumnExistenceGuard)
	@Roles(RolesEnum.Owner, RolesEnum.Admin, RolesEnum.Member)
	async deleteColumn(@Param("columnId") columnId: number) {
		return this.columnsService.remove(columnId);
	}

	@Get(":projectId/columns/:columnId/task")
	@UseGuards(ProjectExistenceGuard, ColumnExistenceGuard)
	async getTasks(@Param("columnId") columnId: number) {
		return this.taskService.findAllBy({ columnId });
	}

	@Post(":projectId/columns/:columnId/task")
	@UseGuards(ProjectExistenceGuard, ColumnExistenceGuard)
	@Roles(RolesEnum.Owner, RolesEnum.Admin, RolesEnum.Member)
	async createTask(
		@Param("columnId") columnId: number,
		@Body() task: AddTaskDto
	) {
		return this.taskService.create({
			columnId,
			...task
		});
	}

	@Patch(":projectId/columns/:columnId/task/:taskId")
	@UseGuards(ProjectExistenceGuard, ColumnExistenceGuard, TaskExistenceGuard)
	@Roles(RolesEnum.Owner, RolesEnum.Admin, RolesEnum.Member)
	async updateTask(
		@Param("taskId") taskId: number,
		@Body() task: UpdateTaskDto
	) {
		return this.taskService.update(taskId, task);
	}

	@Delete(":projectId/columns/:columnId/task/:taskId")
	@UseGuards(ProjectExistenceGuard, ColumnExistenceGuard, TaskExistenceGuard)
	@Roles(RolesEnum.Owner, RolesEnum.Admin, RolesEnum.Member)
	async deleteTask(@Param("taskId") taskId: number) {
		return this.taskService.remove(taskId);
	}
}
