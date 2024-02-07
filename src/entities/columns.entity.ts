import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	ManyToOne
} from "typeorm";
import { Tasks as TaskEntity } from "src/entities/tasks.entity";
import { Projects as ProjectEntity } from "src/entities/projects.entity";

@Entity()
export class Columns {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	projectId: number;

	@Column()
	lexorank: string;

	@ManyToOne(() => ProjectEntity, (project) => project.columns, {
		onDelete: "CASCADE"
	})
	project: ProjectEntity;

	@OneToMany(() => TaskEntity, (task) => task.column)
	tasks: TaskEntity[];
}
