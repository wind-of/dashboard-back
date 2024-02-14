import { ParticipantRolesEnum } from "src/participants/enums/roles.enum";

export class CreateParticipantDto {
	readonly projectId: number;
	readonly email: string;
	readonly role?: ParticipantRolesEnum;
}
