import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Task as TaskEntity } from "src/entities/tasks.entity";
import { User as UserEntity } from "src/entities/users.entity";

@Entity()
export class Comment {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	content: string;

	@Column()
	userId: number;

	@Column()
	taskId: number;

	@ManyToOne(() => UserEntity, (user) => user.comments)
	user: UserEntity;

	@ManyToOne(() => TaskEntity, (task) => task.comments, {
		onDelete: "CASCADE"
	})
	task: TaskEntity;

	@Column()
	attachment: string;
}
