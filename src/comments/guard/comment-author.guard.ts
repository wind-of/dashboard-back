import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { CommentsService } from "../comments.service";

@Injectable()
export class CommentAuthorGuard implements CanActivate {
	constructor(private commentsService: CommentsService) {}
	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		const membership = await this.commentsService.isAuthor(
			request.user.id,
			request.params?.commentId
		);
		return !!membership;
	}
}
