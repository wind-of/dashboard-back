import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { Users as UserEntity } from "src/entities/users.entity";

import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	async validateUser(email: string, pass: string): Promise<any> {
		const user = await this.usersService.findBy({ email });
		if (user && bcrypt.compareSync(pass, user.password)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	async login(user: UserEntity) {
		const payload = { email: user.email, sub: user.id };
		return {
			accessToken: this.jwtService.sign(payload, {
				secret: process.env.JWT_SECRET,
				expiresIn: "60s"
			}),
			email: user.email
		};
	}
}
