import { ParticipantRolesEnum } from "src/participants/enums/roles.enum";

export type ParticipantUpdateData = {
	projectId: number;
	userId: number;
	role: ParticipantRolesEnum;
};
