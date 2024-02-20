import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { BCRYPT_ROUNDS } from "src/constants";
import { Users as UserEntity } from "src/entities/users.entity";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UpdateUserDto } from "src/users/dto/update-user.dto";
import { userWithoutPassword } from "src/users/helpers";
import { UpdateUserPasswordDto } from "src/users/dto/update-user-password.dto";

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
		return userWithoutPassword(createdUser);
	}

	async update(id: number, user: UpdateUserDto) {
		await this.usersRepository.update(id, user);
		const updatedUser = await this.usersRepository.findOneBy({
			id
		});
		return userWithoutPassword(updatedUser);
	}

	async updatePassword(
		id: number,
		{ newPassword, oldPassword }: UpdateUserPasswordDto
	) {
		const user = await this.usersRepository.findOneBy({ id });
		if (user.password !== bcrypt.hashSync(oldPassword, BCRYPT_ROUNDS)) {
			throw new BadRequestException("A problem.", {
				cause: new Error(),
				description: "Entered password is incorrect"
			});
		}
		await this.usersRepository.update(id, {
			password: bcrypt.hashSync(newPassword, BCRYPT_ROUNDS)
		});
		const updatedUser = await this.usersRepository.findOneBy({
			id
		});
		return userWithoutPassword(updatedUser);
	}

	async remove(id: number): Promise<void> {
		await this.usersRepository.delete(id);
	}

	async findBy(criteria: FindOptionsWhere<UserEntity>) {
		return this.usersRepository.findOneBy(criteria);
	}

	async findAllBy(criteria: FindOptionsWhere<UserEntity>) {
		return this.usersRepository.findBy(criteria);
	}
}
