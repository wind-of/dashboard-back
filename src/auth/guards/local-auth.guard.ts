import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {
	constructor(private authService: AuthService) {
		super();
	}
	async canActivate(context: ExecutionContext) {
		const result = (await super.canActivate(context)) as boolean;
		const request = context.switchToHttp().getRequest();
		await super.logIn(request);
		return result;
	}
}
