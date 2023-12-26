import {
	Injectable,
	CanActivate,
	ExecutionContext,
	BadRequestException
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/decorators/project-roles.decorator";
import { ParticipantRolesEnum } from "src/participants/enums/roles.enum";
import { ParticipantsService } from "src/participants/participants.service";

@Injectable()
export class ProjectRolesGuard implements CanActivate {
	constructor(
		private participantsService: ParticipantsService,
		private reflector: Reflector
	) {}

	async canActivate(context: ExecutionContext) {
		const requiredRoles = this.reflector.getAllAndOverride<
			ParticipantRolesEnum[]
		>(ROLES_KEY, [context.getHandler(), context.getClass()]);
		if (!requiredRoles) {
			return true;
		}
		const request = context.switchToHttp().getRequest();
		const projectId = request.params?.projectId || request.body?.projectId;
		if (!projectId) throw new BadRequestException("Project ID is required");
		const participant = await this.participantsService.findBy({
			userId: request.user.id,
			projectId
		});
		return requiredRoles.includes(participant?.role);
	}
}
