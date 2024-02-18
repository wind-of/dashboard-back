import { Request } from "express";
import {
	Controller,
	Request as Req,
	Post,
	UseGuards,
	Get,
	Body
} from "@nestjs/common";
import { LocalAuthGuard } from "src/auth/guards/local-auth.guard";
import { AuthService } from "src/auth/auth.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Get("authenticated")
	isAuthenticated(@Req() req: Request) {
		return req.isAuthenticated();
	}

	@Post("register")
	register(@Body() createUserDto: CreateUserDto) {
		return this.authService.register(createUserDto);
	}

	@UseGuards(LocalAuthGuard)
	@Post("login")
	async login(@Req() req) {
		return req.user;
	}

	@Get("logout")
	logout(@Req() req): any {
		req.session.destroy();
		return { message: "The user session has ended" };
	}
}
