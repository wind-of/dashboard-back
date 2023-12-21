import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Task } from "./task.entity";
import { User } from "./user.entity";

@Entity()
export class Comment {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	content: string;

	@ManyToOne(() => User, (user) => user.comments)
	user: User;

	@ManyToOne(() => Task, (task) => task.comments)
	task: Task;

	@Column()
	attachment: string;
}
