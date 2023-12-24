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
import { RolesService } from "src/roles/roles.service";
import { MemberRoles } from "src/roles/enums/roles.enum";
import { AddMemberDto } from "src/project/dto/add-member.dto";
import { UpdateMemberDto } from "src/project/dto/update-member.dto";
import { ProjectMemberRoles as Roles } from "src/project/decorators/project.roles.decorator";
import { ProjectRolesGuard } from "src/project/guards/project-roles.guard";
import { ProjectExistenceGuard } from "src/project/guards/project-existence.guard";
import { AddColumnDto } from "src/project/dto/add-column.dto";
import { ColumnsService } from "src/columns/columns.service";
import { UpdateColumnDto } from "src/columns/dto/update-column.dto";
import { TaskService } from "src/task/task.service";
import { AddTaskDto } from "./dto/add-task.dto";
import { UpdateTaskDto } from "src/task/dto/update-task.dto";
import { ColumnExistenceGuard } from "./guards/column-existence.guard";
import { TaskExistenceGuard } from "./guards/task-existence.guard";

@Controller("projects")
@UseGuards(AuthenticatedGuard, ProjectRolesGuard)
export class ProjectController {
	constructor(
		private readonly projectService: ProjectService,
		private readonly columnsService: ColumnsService,
		private readonly taskService: TaskService,
		private readonly rolesService: RolesService
	) {}

	@Get()
	async getAllProjects(@Request() req) {
		return this.projectService.findAllByOwnerId(req.user.id);
	}

	@UseGuards(ProjectExistenceGuard)
	@Get(":projectId")
	async getProject(@Param("projectId") id: number) {
		return this.projectService.findOneById(id);
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
		await this.rolesService.create({
			projectId: project.id,
			userId: req.user.id,
			role: MemberRoles.Owner
		});
		return project;
	}

	@UseGuards(ProjectExistenceGuard)
	@Patch(":projectId")
	@Roles(MemberRoles.Owner, MemberRoles.Admin)
	async updateProject(
		@Param("projectId") id: number,
		@Body() updateProjectDto: UpdateProjectDto
	) {
		return this.projectService.update(id, updateProjectDto);
	}

	@UseGuards(ProjectExistenceGuard)
	@Delete(":projectId")
	@Roles(MemberRoles.Owner)
	async remove(@Param("projectId") id: number) {
		await this.projectService.remove(id);
	}

	@UseGuards(ProjectExistenceGuard)
	@Post(":projectId/member")
	@Roles(MemberRoles.Owner, MemberRoles.Admin)
	async addMember(
		@Param("projectId") projectId: number,
		@Body() addMemberDto: AddMemberDto
	) {
		await this.rolesService.create({
			projectId,
			userId: addMemberDto.userId,
			role: MemberRoles.Member
		});
		return this.projectService.findOneById(projectId);
	}

	@UseGuards(ProjectExistenceGuard)
	@Post(":projectId/member/:memberId")
	@Roles(MemberRoles.Owner, MemberRoles.Admin)
	async updateMember(
		@Param("projectId") projectId: number,
		@Param("memberId") memberId: number,
		@Body() updateMemberDto: UpdateMemberDto
	) {
		await this.rolesService.updateById(memberId, updateMemberDto);
		return this.projectService.findOneById(projectId);
	}

	@UseGuards(ProjectExistenceGuard)
	@Delete(":projectId/member/:memberId")
	@Roles(MemberRoles.Owner, MemberRoles.Admin)
	async deleteMember(
		@Param("projectId") projectId: number,
		@Param("memberId") memberId: number
	) {
		const isOwner = await this.projectService.isAdmin(memberId, projectId);
		if (isOwner) {
			return false;
		}
		await this.rolesService.remove(memberId);
		return this.projectService.findOneById(projectId);
	}

	@Get(":projectId/columns")
	@UseGuards(ProjectExistenceGuard)
	async getColumns(@Param("projectId") projectId: number) {
		return this.columnsService.findAllBy({ projectId });
	}

	@Post(":projectId/columns")
	@UseGuards(ProjectExistenceGuard)
	@Roles(MemberRoles.Owner, MemberRoles.Admin, MemberRoles.Member)
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
	@Roles(MemberRoles.Owner, MemberRoles.Admin, MemberRoles.Member)
	async updateColumn(
		@Param("columnId") columnId: number,
		@Body() column: UpdateColumnDto
	) {
		return this.columnsService.update(columnId, column);
	}

	@Delete(":projectId/columns/:columnId")
	@UseGuards(ProjectExistenceGuard, ColumnExistenceGuard)
	@Roles(MemberRoles.Owner, MemberRoles.Admin, MemberRoles.Member)
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
	@Roles(MemberRoles.Owner, MemberRoles.Admin, MemberRoles.Member)
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
	@Roles(MemberRoles.Owner, MemberRoles.Admin, MemberRoles.Member)
	async updateTask(
		@Param("taskId") taskId: number,
		@Body() task: UpdateTaskDto
	) {
		return this.taskService.update(taskId, task);
	}

	@Delete(":projectId/columns/:columnId/task/:taskId")
	@UseGuards(ProjectExistenceGuard, ColumnExistenceGuard, TaskExistenceGuard)
	@Roles(MemberRoles.Owner, MemberRoles.Admin, MemberRoles.Member)
	async deleteTask(@Param("taskId") taskId: number) {
		return this.taskService.remove(taskId);
	}
}
