import {
	Body,
	Controller,
	Delete,
	Param,
	Post,
	Request,
	UseGuards,
	Patch
} from "@nestjs/common";
import { ProjectService } from "src/project/project.service";
import { CreateProjectDto } from "src/project/dto/create-project.dto";
import { AuthenticatedGuard } from "src/guards/authentication.guard";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { ProjectUpdateGuard } from "src/guards/project-update.guard";

@Controller("project")
export class ProjectController {
	constructor(private readonly projectService: ProjectService) {}

	@UseGuards(AuthenticatedGuard)
	@Post()
	async createProject(
		@Request() req,
		@Body() createProjectDto: CreateProjectDto
	) {
		return this.projectService.create({
			...createProjectDto,
			ownerId: req.user.id
		});
	}

	@UseGuards(AuthenticatedGuard, ProjectUpdateGuard)
	@Patch(":projectId")
	async updateProject(
		@Param("projectId") id: number,
		@Body() updateProjectDto: UpdateProjectDto
	) {
		return this.projectService.update(id, updateProjectDto);
	}

	@UseGuards(AuthenticatedGuard, ProjectUpdateGuard)
	@Delete(":projectId")
	async remove(@Param("projectId") id: number) {
		await this.projectService.remove(id);
	}
}
