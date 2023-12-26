import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Param,
	Patch,
	Post,
	UseGuards
} from "@nestjs/common";
import { AuthenticatedGuard } from "src/auth/guards/authentication.guard";
import { ParticipantsService } from "src/participants/participants.service";
import { CreateParticipantDto } from "src/participants/dto/create-patricipant.dto";
import { ParticipantRolesEnum } from "src/participants/enums/roles.enum";
import { UpdateParticipantDto } from "src/participants/dto/update-participant.dto";
import { DeleteParticipantDto } from "src/participants/dto/delete-participants.dto";
import { ParticipantRolesGuard } from "src/participants/guards/participant-roles.guard";
import { ProjectParticipantRoles as Roles } from "src/decorators/project-roles.decorator";

@Controller("participants")
@UseGuards(AuthenticatedGuard, ParticipantRolesGuard)
export class ParticipantsController {
	constructor(private participantsService: ParticipantsService) {}

	@Post()
	@Roles(ParticipantRolesEnum.Owner, ParticipantRolesEnum.Admin)
	async addParticipant(@Body() createParticipantDto: CreateParticipantDto) {
		return this.participantsService.create({
			role: ParticipantRolesEnum.Member,
			...createParticipantDto
		});
	}

	@Patch(":participantId")
	@Roles(ParticipantRolesEnum.Owner, ParticipantRolesEnum.Admin)
	async updateParticipant(
		@Param("participantId") participantId: number,
		@Body() updateParticipantDto: UpdateParticipantDto
	) {
		return this.participantsService.update({
			userId: participantId,
			...updateParticipantDto
		});
	}

	@Delete(":participantId")
	@Roles(ParticipantRolesEnum.Owner, ParticipantRolesEnum.Admin)
	async deleteParticipant(
		@Param("participantId") participantId: number,
		@Body() deleteParticipantDto: DeleteParticipantDto
	) {
		const isOwner = await this.participantsService.isOwner(
			participantId,
			deleteParticipantDto.projectId
		);
		if (isOwner) {
			throw new BadRequestException("Can't delete owner.");
		}
		return this.participantsService.remove({
			userId: participantId,
			projectId: deleteParticipantDto.projectId
		});
	}
}
