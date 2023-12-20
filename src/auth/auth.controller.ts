import { Controller, Request, Post, UseGuards, Get, Res } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { LocalAuthGuard } from "src/guards/local-auth.guard";
import { AuthService } from "src/auth/auth.service";
import { Response } from "express";
import { AuthenticatedGuard } from "src/guards/authentication.guard";

@Controller("auth")
export class AuthController {
	constructor(
		private usersService: UsersService,
		private authService: AuthService
	) {}

	@UseGuards(AuthenticatedGuard)
	@Get("is-logged")
	isUserLogged() {}

	@UseGuards(LocalAuthGuard)
	@Post("login")
	async login(@Request() req, @Res({ passthrough: true }) res: Response) {
		const { accessToken, email } = await this.authService.login(req.user);
		res.cookie("accessToken", accessToken, {
			expires: new Date(new Date().getTime() + 60),
			sameSite: "strict",
			httpOnly: true
		});
		res.send({ email });
	}

	@Get("logout")
	logout(@Request() req): any {
		req.session.destroy();
		return { message: "The user session has ended" };
	}
}
