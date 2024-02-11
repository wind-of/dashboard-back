import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { Comments as CommentsEntity } from "src/entities/comments.entity";
import { CommentUpdateData } from "src/comments/types/comment-update";

@Injectable()
export class CommentsService {
	constructor(
		@InjectRepository(CommentsEntity)
		private commentsRepository: Repository<CommentsEntity>
	) {}
	async create(comment: Partial<CommentsEntity>) {
		return this.commentsRepository.save(comment);
	}

	async update(id: number, comment: CommentUpdateData) {
		await this.commentsRepository.update({ id }, comment);
	}

	async findBy(criteria: FindOptionsWhere<CommentsEntity>) {
		return this.commentsRepository.findOneBy(criteria);
	}

	async findAllBy(criteria: FindOptionsWhere<CommentsEntity>) {
		return this.commentsRepository.findBy(criteria);
	}

	async delete(id: number) {
		await this.commentsRepository.delete({ id });
	}

	async isAuthor(userId: number, commentId: number) {
		const comment = await this.findBy({ id: commentId });
		return userId === comment.userId;
	}
}
