import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { UsersService } from "../users.service";

@Injectable()
export class ProfileOwnerGuard implements CanActivate {
	constructor(private usersService: UsersService) {}

	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		const user = await this.usersService.findBy({
			id: request.params.userId
		});
		return user.id === request.user.id;
	}
}
