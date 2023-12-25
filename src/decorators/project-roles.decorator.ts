import { SetMetadata } from "@nestjs/common";
import { ParticipantRolesEnum } from "src/participants/enums/roles.enum";

export const ROLES_KEY = "roles";
export const ProjectParticipantRoles = (...roles: ParticipantRolesEnum[]) =>
	SetMetadata(ROLES_KEY, roles);
