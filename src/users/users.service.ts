import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User as UserEntity } from "src/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { BCRYPT_ROUNDS } from "src/constants";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UserEntity)
		private usersRepository: Repository<UserEntity>
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

	findOneById(id: number): Promise<UserEntity | null> {
		return this.usersRepository.findOneBy({ id });
	}

	findOneByEmail(email: string): Promise<UserEntity | null> {
		return this.usersRepository.findOneBy({ email });
	}

	private readonly users = [
		{
			id: 1,
			firstname: "john",
			password: "$2b$10$Scl/sCdS1BOa/6ebWtXQ8ug.DJIwv/rQGOZ4uLhLG1BB0CXGlh4a6",
			email: "3G4Yn@example.com"
		},
		{
			id: 2,
			firstname: "Ron",
			password: "$2b$10$tPNlU74Akdp2hig4gWx.GuOJidgxq83qbANuQ5EJh3KZdx4h6c9Vq",
			email: "3G4Y41n@example.com"
		}
	];
}
