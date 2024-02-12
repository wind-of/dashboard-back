import {
	Controller,
	Request,
	UseGuards,
	Get,
	Param,
	Post,
	Body,
	Patch,
	Delete,
	Query,
	Req
} from "@nestjs/common";
import { AuthenticatedGuard } from "src/auth/guards/authentication.guard";
import { UsersService } from "src/users/users.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UpdateUserDto } from "src/users/dto/update-user.dto";
import { ProfileOwnerGuard } from "src/users/guards/profile-owner.guard";
import { userWithourPassword, userWithourPrivate } from "src/users/helpers";
import { Raw } from "typeorm";
import { UpdateUserPasswordDto } from "src/users/dto/update-user-password.dto";

@Controller("users")
export class UsersController {
	constructor(private usersService: UsersService) {}

	@UseGuards(AuthenticatedGuard)
	@Get("profile")
	getProfile(@Request() req) {
		return req.user;
	}

	@UseGuards(AuthenticatedGuard)
	@Get("project")
	async getUsersByProjectId(@Query() query) {
		const ids = query.userIds.split(",").map(Number);
		const users = await this.usersService.findAllBy({
			id: Raw((alias) => `${alias} IN (${ids})`)
		});
		return users.map((user) => userWithourPassword(user));
	}

	@UseGuards(AuthenticatedGuard)
	@Get("me")
	async getMe(@Req() req) {
		return req.user;
	}

	@UseGuards(AuthenticatedGuard)
	@Get(":userId")
	async getUser(@Param("userId") id: number, @Request() req) {
		const user = await this.usersService.findBy({ id });
		return user.id === req.user.id ? user : userWithourPrivate(user);
	}

	@Post()
	async createUser(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@UseGuards(AuthenticatedGuard, ProfileOwnerGuard)
	@Patch(":userId/password")
	async updateUserPassword(
		@Param("userId") id: number,
		@Body() updateUserPasswordDto: UpdateUserPasswordDto
	) {
		return this.usersService.updatePassword(id, updateUserPasswordDto);
	}

	@UseGuards(AuthenticatedGuard, ProfileOwnerGuard)
	@Patch(":userId")
	async updateUser(
		@Param("userId") id: number,
		@Body() updateUserDto: UpdateUserDto
	) {
		return this.usersService.update(id, updateUserDto);
	}

	@UseGuards(AuthenticatedGuard, ProfileOwnerGuard)
	@Patch(":userId/password")
	async updatePassword(
		@Param("userId") id: number,
		@Body("password") password: string
	) {
		return this.usersService.updatePassword(id, password);
	}

	@UseGuards(AuthenticatedGuard, ProfileOwnerGuard)
	@Delete(":userId")
	async deleteUser(@Param("userId") id: number) {
		return this.usersService.remove(id);
	}
}
