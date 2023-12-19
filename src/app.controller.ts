import { Controller, Request, Post, UseGuards, Get, Res } from "@nestjs/common";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { AppService } from "./app.service";
import { AuthService } from "./auth/auth.service";
import { Response } from "express";

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private authService: AuthService
	) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@UseGuards(LocalAuthGuard)
	@Post("auth/login")
	async login(@Request() req, @Res({ passthrough: true }) res: Response) {
		const { accessToken, email } = await this.authService.login(req.user);
		res.cookie("accessToken", accessToken, {
			expires: new Date(new Date().getTime() + 60),
			sameSite: "strict",
			httpOnly: true
		});
		res.send({ email });
	}

	@Get("/logout")
	logout(@Request() req): any {
		req.session.destroy();
		return { message: "The user session has ended" };
	}
}
