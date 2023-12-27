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
import { AuthenticatedGuard } from "src/auth/guards/authentication.guard";
import { UpdateProjectDto } from "src/project/dto/update-project.dto";
import { ProjectParticipantRoles as Roles } from "src/decorators/project-roles.decorator";
import { ParticipantRolesGuard } from "src/participants/guards/participant-roles.guard";
import { ProjectExistenceGuard } from "src/project/guards/project-existence.guard";
import { ColumnsService } from "src/columns/columns.service";
import { TaskService } from "src/tasks/tasks.service";
import { ColumnExistenceGuard } from "../columns/guard/column-existence.guard";
import { ParticipantsService } from "src/participants/participants.service";
import { ParticipantRolesEnum as RolesEnum } from "src/participants/enums/roles.enum";

@Controller("projects")
@UseGuards(AuthenticatedGuard, ParticipantRolesGuard)
export class ProjectController {
	constructor(
		private projectService: ProjectService,
		private columnsService: ColumnsService,
		private taskService: TaskService,
		private participantsService: ParticipantsService
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

	@UseGuards(ProjectExistenceGuard)
	@Get(":projectId/columns")
	@Roles(RolesEnum.Owner, RolesEnum.Admin, RolesEnum.Member)
	async getColumns(@Param("projectId") projectId: number) {
		return this.columnsService.findAllBy({ projectId });
	}

	@UseGuards(ProjectExistenceGuard)
	@Get(":projectId/columns/:columnId")
	@Roles(RolesEnum.Owner, RolesEnum.Admin, RolesEnum.Member)
	async getColumn(
		@Param("projectId") projectId: number,
		@Param("columnId") columnId: number
	) {
		return this.columnsService.findBy({ projectId, id: columnId });
	}

	@UseGuards(ProjectExistenceGuard, ColumnExistenceGuard)
	@Get(":projectId/columns/:columnId/tasks")
	async getTasks(@Param("columnId") columnId: number) {
		return this.taskService.findAllBy({ columnId });
	}
}
