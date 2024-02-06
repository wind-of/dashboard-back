import { ParticipantRolesEnum } from "src/participants/enums/roles.enum";

export function isAllowedToUpdateRole(
	updatedRole: ParticipantRolesEnum,
	commiterRole: ParticipantRolesEnum
) {
	return !(
		commiterRole === ParticipantRolesEnum.Member ||
		(updatedRole === ParticipantRolesEnum.Owner &&
			commiterRole !== ParticipantRolesEnum.Owner) ||
		(updatedRole === ParticipantRolesEnum.Member &&
			commiterRole === ParticipantRolesEnum.Admin)
	);
}
