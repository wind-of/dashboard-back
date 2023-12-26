import {
	BadRequestException,
	CanActivate,
	ExecutionContext,
	Injectable
} from "@nestjs/common";
import { ParticipantsService } from "src/participants/participants.service";

@Injectable()
export class ParticipantGuard implements CanActivate {
	constructor(private participantsService: ParticipantsService) {}
	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		const projectId = request.params?.projectId || request.body?.projectId;
		if (!projectId) throw new BadRequestException("Project ID is required");
		const participant = await this.participantsService.findBy({
			userId: request.user.id,
			projectId
		});
		if (!participant)
			throw new BadRequestException("User is not a participant of the project");
		return true;
	}
}
