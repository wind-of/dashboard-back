import { User as UserEntity } from "src/entities/user.entity";

export function userWithourPassword(user: UserEntity) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { password, ...userWithoutPassword } = user;
	return userWithoutPassword;
}

export function userWithourPrivate(user: UserEntity) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { password, email, ...userWithoutPrivate } = user;
	return userWithoutPrivate;
}
