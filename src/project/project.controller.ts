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

@Controller("projects")
@UseGuards(ProjectRolesGuard)
export class ProjectController {
	constructor(
		private readonly projectService: ProjectService,
		private readonly rolesService: RolesService
	) {}

	@UseGuards(AuthenticatedGuard)
	@Get()
	async getAllProjects(@Request() req) {
		return this.projectService.findAllByOwnerId(req.user.id);
	}

	@UseGuards(AuthenticatedGuard, ProjectExistenceGuard)
	@Get(":projectId")
	async getProject(@Param("projectId") id: number) {
		return this.projectService.findOneById(id);
	}

	@UseGuards(AuthenticatedGuard)
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

	@UseGuards(AuthenticatedGuard, ProjectExistenceGuard)
	@Patch(":projectId")
	@Roles(MemberRoles.Owner, MemberRoles.Admin)
	async updateProject(
		@Param("projectId") id: number,
		@Body() updateProjectDto: UpdateProjectDto
	) {
		return this.projectService.update(id, updateProjectDto);
	}

	@UseGuards(AuthenticatedGuard, ProjectExistenceGuard)
	@Delete(":projectId")
	@Roles(MemberRoles.Owner)
	async remove(@Param("projectId") id: number) {
		await this.projectService.remove(id);
	}

	@UseGuards(AuthenticatedGuard, ProjectExistenceGuard)
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

	@UseGuards(AuthenticatedGuard, ProjectExistenceGuard)
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

	// TODO: admin тоже может удалять пользователей
	@UseGuards(AuthenticatedGuard, ProjectExistenceGuard)
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
}
