import { ParticipantRolesEnum } from "src/participants/enums/roles.enum";

export class UpdateMemberDto {
	readonly role: ParticipantRolesEnum;
}
