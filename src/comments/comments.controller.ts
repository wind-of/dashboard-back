import {
	Body,
	Controller,
	Post,
	UseGuards,
	Request,
	Delete,
	Param
} from "@nestjs/common";
import { AuthenticatedGuard } from "src/auth/guards/authentication.guard";
import { ParticipantGuard } from "src/participants/guards/participant.guard";
import { CommentsService } from "src/comments/comments.service";
import { CreateCommentDto } from "src/comments/dto/create-comment.dto";
import { UpdateCommentDto } from "src/comments/dto/update-comment.dto";
import { DeleteCommentDto } from "src/comments/dto/delete-comment.dto";
import { ProjectExistenceGuard } from "src/project/guards/project-existence.guard";
import { CommentAuthorGuard } from "src/comments/guard/comment-author.guard";

@Controller("comments")
@UseGuards(AuthenticatedGuard, ProjectExistenceGuard, ParticipantGuard)
export class CommentsController {
	constructor(private commentsService: CommentsService) {}

	@Post()
	async createComment(
		@Request() req,
		@Body() createCommentDto: CreateCommentDto
	) {
		const comment = await this.commentsService.create({
			attachment: createCommentDto.attachment,
			content: createCommentDto.content,
			userId: req.user.id
		});
		return comment;
	}

	@Post(":commentId")
	@UseGuards(CommentAuthorGuard)
	async updateComment(
		@Param("commentId") id,
		@Body() updateComment: UpdateCommentDto
	) {
		await this.commentsService.update(id, {
			content: updateComment.content,
			attachment: updateComment.attachment
		});
		return this.commentsService.findBy({ id });
	}

	@Delete(":commentId")
	@UseGuards(CommentAuthorGuard)
	async deleteComment(
		@Param("commentId") id,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		@Body() deleteCommentDto: DeleteCommentDto
	) {
		await this.commentsService.delete(id);
	}
}
