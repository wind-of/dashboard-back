import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Comments as CommentEntity } from "src/entities/comments.entity";

@Entity()
export class Users {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	firstname: string;

	@Column()
	lastname?: string;

	@Column()
	password: string;

	@Column()
	email: string;

	@Column()
	avatar?: string;

	@OneToMany(() => CommentEntity, (comment) => comment.user)
	comments: CommentEntity[];
}
