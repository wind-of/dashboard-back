import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	ManyToOne
} from "typeorm";
import { Task as TaskEntity } from "src/entities/task.entity";
import { Project as ProjectEntity } from "src/entities/project.entity";

@Entity()
export class Columns {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@ManyToOne(() => ProjectEntity, (project) => project.columns, {
		onDelete: "CASCADE"
	})
	project: ProjectEntity;

	@OneToMany(() => TaskEntity, (task) => task.column)
	tasks: TaskEntity[];
}
