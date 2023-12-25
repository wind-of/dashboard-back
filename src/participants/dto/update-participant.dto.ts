import { ParticipantRolesEnum } from "src/participants/enums/roles.enum";

export class UpdateParticipantDto {
	projectId: number;
	userId: number;
	role: ParticipantRolesEnum;
}
