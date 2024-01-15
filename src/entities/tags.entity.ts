import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Tasks as TaskEntity } from "src/entities/tasks.entity";

@Entity()
export class Tags {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	color: string;

	@Column()
	title: string;

	@Column()
	taskId?: number;

	@Column()
	projectId?: number;

	@ManyToOne(() => TaskEntity, (task) => task.tags, {
		onDelete: "CASCADE"
	})
	task: TaskEntity;
}
