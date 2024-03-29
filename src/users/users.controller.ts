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
	Req,
	BadRequestException
} from "@nestjs/common";
import { AuthenticatedGuard } from "src/auth/guards/authentication.guard";
import { UsersService } from "src/users/users.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UpdateUserDto } from "src/users/dto/update-user.dto";
import { ProfileOwnerGuard } from "src/users/guards/profile-owner.guard";
import { userWithoutPassword, userWithourPrivate } from "src/users/helpers";
import { Raw } from "typeorm";
import { UpdateUserPasswordDto } from "src/users/dto/update-user-password.dto";

@Controller("users")
export class UsersController {
	constructor(private usersService: UsersService) {}

	@UseGuards(AuthenticatedGuard)
	@Get("profile")
	getProfile(@Request() req) {
		return this.usersService.findBy({ id: req.user.id });
	}

	@UseGuards(AuthenticatedGuard)
	@Get("list")
	async getUsersByProjectId(@Query() query) {
		const ids = query.userIds.split(",").map(Number);
		const users = await this.usersService.findAllBy({
			id: Raw((alias) => `${alias} IN (${ids})`)
		});
		return users.map((user) => userWithoutPassword(user));
	}

	@UseGuards(AuthenticatedGuard)
	@Get("me")
	async getMe(@Req() req) {
		const user = await this.usersService.findBy({ email: req.user.email });
		return userWithoutPassword(user);
	}

	@UseGuards(AuthenticatedGuard)
	@Get(":userId")
	async getUser(@Param("userId") id: number, @Request() req) {
		const user = await this.usersService.findBy({ id });
		if (!user) {
			throw new BadRequestException("User not found");
		}
		return user.id === req.user.id
			? userWithoutPassword(user)
			: userWithourPrivate(user);
	}

	@Post()
	async createUser(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
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
	@Delete(":userId")
	async deleteUser(@Param("userId") id: number) {
		return this.usersService.remove(id);
	}

	@UseGuards(AuthenticatedGuard, ProfileOwnerGuard)
	@Patch("password/:userId")
	async updateUserPassword(
		@Param("userId") id: number,
		@Body() updateUserPasswordDto: UpdateUserPasswordDto
	) {
		return this.usersService.updatePassword(id, updateUserPasswordDto);
	}
}
