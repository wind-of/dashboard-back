import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { CommentEntity } from "src/entities/comment.entity";

@Entity()
export class UserEntity {
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
