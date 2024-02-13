import { Users as UserEntity } from "src/entities/users.entity";

export function userWithoutPassword(user: UserEntity) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { password, ...userWithoutPassword } = user;
	return userWithoutPassword;
}

export function userWithourPrivate(user: UserEntity) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { email, ...userWithoutPrivate } = userWithoutPassword(user);
	return userWithoutPrivate;
}
