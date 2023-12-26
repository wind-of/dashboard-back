import { ParticipantRolesEnum } from "src/participants/enums/roles.enum";

export type ParticipantUpdateData = {
	readonly projectId: number;
	readonly userId: number;
	readonly role: ParticipantRolesEnum;
};
