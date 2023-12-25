import { ParticipantRolesEnum } from "src/participants/enums/roles.enum";

export class CreateParticipantDto {
	projectId: number;
	userId: number;
	role?: ParticipantRolesEnum;
}
