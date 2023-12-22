import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { TaskEntity } from "src/entities/task.entity";
import { UserEntity } from "src/entities/user.entity";

@Entity()
export class CommentEntity {
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
