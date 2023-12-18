import { Controller, Request, Post, UseGuards, Get } from "@nestjs/common";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { AppService } from "./app.service";
import { AuthService } from "./auth/auth.service";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { Public } from "./decorators/public-route.decorator";

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private authService: AuthService
	) {}

	@Public()
	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@Public()
	@UseGuards(LocalAuthGuard)
	@Post("auth/login")
	async login(@Request() req) {
		return this.authService.login(req.user);
	}

	@UseGuards(JwtAuthGuard)
	@Get("profile")
	getProfile(@Request() req) {
		return req.user;
	}
}
