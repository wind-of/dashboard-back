import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Task as TaskEntity } from "src/entities/task.entity";
import { User as UserEntity } from "src/entities/user.entity";

@Entity()
export class Comment {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	content: string;

	@ManyToOne(() => UserEntity, (user) => user.comments)
	user: UserEntity;

	@ManyToOne(() => TaskEntity, (task) => task.comments)
	task: TaskEntity;

	@Column()
	attachment: string;
}
