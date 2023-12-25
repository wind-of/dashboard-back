import {
	Body,
	Controller,
	Post,
	UseGuards,
	Request,
	Delete,
	Param
} from "@nestjs/common";
import { AuthenticatedGuard } from "src/guards/authentication.guard";
import { ProjectParticipantGuard } from "src/guards/project-participant.guard";
import { CommentService } from "src/comment/comment.service";
import { CreateCommentDto } from "src/comment/dto/create-comment.dto";
import { UpdateCommentDto } from "src/comment/dto/update-comment.dto";
import { DeleteCommentDto } from "src/comment/dto/delete-comment.dto";
import { ProjectExistenceGuard } from "src/guards/project-existence.guard";
import { CommentAuthorGuard } from "./guard/comment-author.guard";

@Controller("comment")
@UseGuards(AuthenticatedGuard, ProjectExistenceGuard, ProjectParticipantGuard)
export class CommentController {
	constructor(private commentService: CommentService) {}

	@Post()
	async createComment(
		@Request() req,
		@Body() createCommentDto: CreateCommentDto
	) {
		const comment = await this.commentService.create({
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
		await this.commentService.update(id, {
			content: updateComment.content,
			attachment: updateComment.attachment
		});
		return this.commentService.findBy({ id });
	}

	@Delete(":commentId")
	@UseGuards(CommentAuthorGuard)
	async deleteComment(
		@Param("commentId") id,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		@Body() deleteCommentDto: DeleteCommentDto
	) {
		await this.commentService.delete(id);
	}
}
