import { SetMetadata } from "@nestjs/common";
import { MemberRoles } from "src/roles/enums/roles.enum";

export const ROLES_KEY = "roles";
export const ProjectMemberRoles = (...roles: MemberRoles[]) =>
	SetMetadata(ROLES_KEY, roles);
