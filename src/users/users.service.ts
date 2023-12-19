import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>
	) {}

	create(user: User): Promise<User> {
		return this.usersRepository.save(user);
	}

	async remove(id: number): Promise<void> {
		await this.usersRepository.delete(id);
	}

	findAll(): Promise<User[]> {
		return this.usersRepository.find();
	}

	findOneById(id: number): Promise<User | null> {
		return this.usersRepository.findOneBy({ id });
	}

	findOneByEmail(email: string): Promise<User | null> {
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
