import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Comment } from "./comment.entity";

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

	@OneToMany(() => Comment, (comment) => comment.user)
	comments: Comment[];
}
