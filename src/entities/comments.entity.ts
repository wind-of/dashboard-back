import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	CreateDateColumn,
	UpdateDateColumn
} from "typeorm";
import { Tasks as TaskEntity } from "src/entities/tasks.entity";
import { Users as UserEntity } from "src/entities/users.entity";

@Entity()
export class Comments {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	content: string;

	@Column()
	userId: number;

	@Column()
	taskId: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@ManyToOne(() => UserEntity, (user) => user.comments)
	user: UserEntity;

	@ManyToOne(() => TaskEntity, (task) => task.comments, {
		onDelete: "CASCADE"
	})
	task: TaskEntity;

	@Column()
	attachment: string;
}
