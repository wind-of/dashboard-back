import { ParticipantRolesEnum } from "src/participants/enums/roles.enum";

export class UpdateParticipantDto {
	readonly projectId: number;
	readonly role: ParticipantRolesEnum;
}
