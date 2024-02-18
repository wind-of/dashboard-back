import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";

import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService) {}

	async validateUser(email: string, pass: string): Promise<any> {
		const user = await this.usersService.findBy({ email });
		if (user && bcrypt.compareSync(pass, user.password)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	async register(user: CreateUserDto) {
		return this.usersService.create(user);
	}
}
