import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ParticipantsService } from "src/participants/participants.service";

@Injectable()
export class ProjectParticipantGuard implements CanActivate {
	constructor(private participantsService: ParticipantsService) {}
	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		const projectId = request.params?.projectId || request.body?.projectId;
		const membership = await this.participantsService.findBy({
			userId: request.user.id,
			projectId
		});
		return !!membership;
	}
}
