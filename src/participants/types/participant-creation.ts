import { ParticipantRolesEnum } from "src/participants/enums/roles.enum";

export type ParticipantCreationData = {
	projectId: number;
	userId: number;
	role: ParticipantRolesEnum;
};
