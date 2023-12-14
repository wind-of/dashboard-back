import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";

import * as bcrypt from "bcrypt";
const saltOrRounds = 10;

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService) {}

	async validateUser(email: string, pass: string): Promise<any> {
		const user = await this.usersService.findOne(email);
		const hash = await bcrypt.hash(pass, saltOrRounds);
		console.log(hash);
		if (user && user.password === hash) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}
}
