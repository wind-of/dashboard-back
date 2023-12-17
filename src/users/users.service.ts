import { Injectable } from "@nestjs/common";

export type User = {
	id: number;
	firstname: string;
	lastname?: string;
	password: string;
	email: string;
	avatar?: string;
};

@Injectable()
export class UsersService {
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

	async findOne(email: string): Promise<User | undefined> {
		return this.users.find((user) => user.email === email);
	}
}
