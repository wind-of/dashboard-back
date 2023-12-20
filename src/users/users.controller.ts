import {
	Controller,
	Request,
	UseGuards,
	Get,
	Param,
	Post
} from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { AuthenticatedGuard } from "src/guards/authentication.guard";

@Controller("users")
export class UsersController {
	constructor(private usersService: UsersService) {}

	@UseGuards(AuthenticatedGuard)
	@Get("profile")
	getProfile(@Request() req) {
		return req.user;
	}

	@Get(":id")
	async getUser(@Param("id") id: number) {
		console.log("Get user by id: " + id);
		return this.usersService.findOneById(id);
	}

	@Post()
	async createUser(@Request() req) {
		return this.usersService.create(req.body);
	}
}
