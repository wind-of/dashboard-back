import { Response, Request } from "express";
import {
	Controller,
	Request as Req,
	Post,
	UseGuards,
	Get,
	Res,
	Body
} from "@nestjs/common";
import { LocalAuthGuard } from "src/auth/guards/local-auth.guard";
import { AuthService } from "src/auth/auth.service";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/users/dto/create-user.dto";

@Controller("auth")
export class AuthController {
	constructor(
		private authService: AuthService,
		private jwtService: JwtService
	) {}

	@Get("authenticated")
	isAuthenticated(@Req() req: Request) {
		const token = req.cookies.accessToken;
		return (
			token &&
			req.isAuthenticated() &&
			this.jwtService.verify(token, { secret: process.env.JWT_SECRET })
		);
	}

	@Post("register")
	register(@Body() createUserDto: CreateUserDto) {
		return this.authService.register(createUserDto);
	}

	@UseGuards(LocalAuthGuard)
	@Post("login")
	async login(@Req() req, @Res({ passthrough: true }) res: Response) {
		const { accessToken, user } = await this.authService.login(req.user);
		res.cookie("accessToken", accessToken, {
			expires: new Date(new Date().getTime() + 86400000),
			sameSite: "strict",
			httpOnly: true
		});
		res.send(user);
	}

	@Get("logout")
	logout(@Req() req): any {
		req.session.destroy();
		return { message: "The user session has ended" };
	}
}
