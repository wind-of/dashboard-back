import {
	BadRequestException,
	CanActivate,
	ExecutionContext,
	Injectable
} from "@nestjs/common";
import { ProjectService } from "src/project/project.service";

@Injectable()
export class ProjectExistenceGuard implements CanActivate {
	constructor(private projectService: ProjectService) {}
	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		const projectId = request.params?.projectId || request.body?.projectId;
		if (!projectId) throw new BadRequestException("Project ID is required");
		const project = await this.projectService.findBy({ id: projectId });
		if (!project) throw new BadRequestException("Project not found");
		return true;
	}
}
