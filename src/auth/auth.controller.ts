import { Response } from "express";
import { Controller, Request, Post, UseGuards, Get, Res } from "@nestjs/common";
import { AuthenticatedGuard } from "src/auth/guards/authentication.guard";
import { LocalAuthGuard } from "src/auth/guards/local-auth.guard";
import { AuthService } from "src/auth/auth.service";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(AuthenticatedGuard)
	@Get("is-logged")
	isAuthenticated() {}

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
