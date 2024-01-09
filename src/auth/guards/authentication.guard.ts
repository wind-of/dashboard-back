import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class AuthenticatedGuard implements CanActivate {
	async canActivate(context: ExecutionContext) {
		// TODO: check if token is valid
		const request = context.switchToHttp().getRequest();
		return request.isAuthenticated();
	}
}
