import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { CommentService } from "../comment.service";

@Injectable()
export class CommentAuthorGuard implements CanActivate {
	constructor(private commentsService: CommentService) {}
	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		const membership = await this.commentsService.isAuthor(
			request.user.id,
			request.params?.commentId
		);
		return !!membership;
	}
}
