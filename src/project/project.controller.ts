import { Controller, Post, Request } from "@nestjs/common";
import { ProjectService } from "src/project/project.service";

@Controller("project")
export class ProjectController {
	constructor(private readonly projectService: ProjectService) {}

	@Post()
	async createUser(@Request() req) {
		return this.projectService.create(req.body);
	}
}
