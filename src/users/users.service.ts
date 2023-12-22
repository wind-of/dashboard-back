import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User as UserEntity } from "src/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { BCRYPT_ROUNDS } from "src/constants";
import { ProjectService } from "src/project/project.service";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UserEntity)
		private usersRepository: Repository<UserEntity>,
		private projectService: ProjectService
	) {}

	async create(user: UserEntity) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...createdUser } = await this.usersRepository.save({
			...user,
			password: bcrypt.hashSync(user.password, BCRYPT_ROUNDS)
		});
		return createdUser;
	}

	async remove(id: number): Promise<void> {
		await this.usersRepository.delete(id);
	}

	findAll(): Promise<UserEntity[]> {
		return this.usersRepository.find();
	}

	findUserProjects(id: number) {
		return this.projectService.findAllByOwnerId(id);
	}

	findOneById(id: number): Promise<UserEntity | null> {
		return this.usersRepository.findOneBy({ id });
	}

	findOneByEmail(email: string): Promise<UserEntity | null> {
		return this.usersRepository.findOneBy({ email });
	}
}
