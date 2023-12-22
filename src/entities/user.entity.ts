import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Comment as CommentEntity } from "src/entities/comment.entity";

@Entity()
export class User {
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
