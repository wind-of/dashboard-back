import {
	Body,
	Controller,
	Delete,
	ForbiddenException,
	Param,
	Post,
	Request,
	UseGuards,
	BadRequestException
} from "@nestjs/common";
import { ProjectService } from "src/project/project.service";
import { CreateProjectDto } from "src/project/dto/create-project.dto";
import { AuthenticatedGuard } from "src/guards/authentication.guard";
import { UpdateProjectDto } from "./dto/update-project.dto";

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

	@UseGuards(AuthenticatedGuard)
	@Post(":id")
	async updateProject(
		@Request() req,
		@Param("id") id: number,
		@Body() updateProjectDto: UpdateProjectDto
	) {
		// TODO: что-то можно было сделать с повторяющимися проверками, осталось вспомнить [Guard?].
		const project = await this.projectService.findOneById(id);
		if (!project) {
			throw new BadRequestException("There is no project with the passed id");
		}
		if (req.user.id !== project.ownerId) {
			throw new ForbiddenException(
				"You are not allowed to perform the action on this project"
			);
		}
		return this.projectService.update(id, updateProjectDto);
	}

	@UseGuards(AuthenticatedGuard)
	@Delete(":id")
	async remove(@Request() req, @Param("id") id: number) {
		const project = await this.projectService.findOneById(id);
		if (!project) {
			throw new BadRequestException("There is no project with the passed id");
		}
		if (req.user.id !== project.ownerId) {
			throw new ForbiddenException(
				"You are not allowed to perform the action on this project"
			);
		}
		await this.projectService.remove(req.user.id);
	}
}
