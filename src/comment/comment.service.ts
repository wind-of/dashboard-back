import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment as CommentsEntity } from "src/entities/comment.entity";
import { UpdatedComment } from "src/comment/types/updated-comment";
import { CommentSerachCriteria } from "src/comment/types/search-criteria";

@Injectable()
export class CommentService {
	constructor(
		@InjectRepository(CommentsEntity)
		private commentsRepository: Repository<CommentsEntity>
	) {}
	async create(comment: Partial<CommentsEntity>) {
		return this.commentsRepository.save(comment);
	}

	async update(id: number, comment: UpdatedComment) {
		await this.commentsRepository.update({ id }, comment);
	}

	async findBy(criteria: CommentSerachCriteria) {
		return this.commentsRepository.findOneBy(criteria);
	}

	async findAllBy(criteria: CommentSerachCriteria) {
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
