import { ParticipantRolesEnum } from "src/participants/enums/roles.enum";

export type ParticipantCreationData = {
	readonly projectId: number;
	readonly email?: string;
	readonly userId?: number;
	readonly role: ParticipantRolesEnum;
};
