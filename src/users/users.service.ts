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
			password: "something1",
			email: "3G4Yn@example.com"
		},
		{
			id: 2,
			firstname: "Ron",
			password: "something2",
			email: "3G4Y41n@example.com"
		}
	];

	async findOne(email: string): Promise<User | undefined> {
		return this.users.find((user) => user.email === email);
	}
}
