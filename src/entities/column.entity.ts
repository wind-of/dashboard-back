import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	ManyToOne
} from "typeorm";
import { TaskEntity } from "src/entities/task.entity";
import { ProjectEntity } from "src/entities/project.entity";

@Entity()
export class ColumnEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@ManyToOne(() => ProjectEntity, (project) => project.columns)
	project: ProjectEntity;

	@OneToMany(() => TaskEntity, (task) => task.column)
	tasks: TaskEntity[];
}
