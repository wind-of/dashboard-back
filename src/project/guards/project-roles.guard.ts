import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/project/decorators/project.roles.decorator";
import { RolesService } from "src/roles/roles.service";
import { ProjectService } from "src/project/project.service";
import { MemberRoles } from "src/roles/enums/roles.enum";

@Injectable()
export class ProjectRolesGuard implements CanActivate {
	constructor(
		private projectService: ProjectService,
		private rolesService: RolesService,
		private reflector: Reflector
	) {}

	async canActivate(context: ExecutionContext) {
		const requiredRoles = this.reflector.getAllAndOverride<MemberRoles[]>(
			ROLES_KEY,
			[context.getHandler(), context.getClass()]
		);
		if (!requiredRoles) {
			return true;
		}
		const request = context.switchToHttp().getRequest();
		const project = await this.projectService.findOneById(
			request.params.projectId
		);
		const member = await this.rolesService.findBy({
			userId: request.user.id,
			projectId: project.id
		});
		return requiredRoles.includes(member.role as MemberRoles);
	}
}
