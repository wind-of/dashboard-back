import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { RolesService } from "src/roles/roles.service";

@Injectable()
export class ProjectParticipantGuard implements CanActivate {
	constructor(private rolesService: RolesService) {}
	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		const projectId = request.params?.projectId || request.body?.projectId;
		const membership = await this.rolesService.findBy({
			userId: request.user.id,
			projectId
		});
		return !!membership;
	}
}
