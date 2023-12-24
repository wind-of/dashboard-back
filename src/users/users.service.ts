import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { BCRYPT_ROUNDS } from "src/constants";
import { User as UserEntity } from "src/entities/user.entity";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UpdateUserDto } from "src/users/dto/update-user.dto";
import { UserSearchCriteria } from "src/users/types/search-criteria";

function userWithourPassword(user: UserEntity) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { password, ...userWithoutPassword } = user;
	return userWithoutPassword;
}

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UserEntity)
		private usersRepository: Repository<UserEntity>
	) {}

	async create(user: CreateUserDto) {
		const createdUser = await this.usersRepository.save({
			...user,
			password: bcrypt.hashSync(user.password, BCRYPT_ROUNDS)
		});
		return userWithourPassword(createdUser);
	}

	async update(id: number, user: UpdateUserDto) {
		await this.usersRepository.update(id, user);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const updatedUser = await this.usersRepository.findOneBy({
			id
		});
		return userWithourPassword(updatedUser);
	}

	async updatePassword(id: number, password: string) {
		await this.usersRepository.update(id, {
			password: bcrypt.hashSync(password, BCRYPT_ROUNDS)
		});
		const updatedUser = await this.usersRepository.findOneBy({
			id
		});
		return userWithourPassword(updatedUser);
	}

	async remove(id: number): Promise<void> {
		await this.usersRepository.delete(id);
	}

	async findBy(criteria: UserSearchCriteria) {
		return this.usersRepository.findOneBy(criteria);
	}
}
