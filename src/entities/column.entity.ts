import {
	Entity,
	Column as TableColumn,
	PrimaryGeneratedColumn,
	OneToMany,
	ManyToOne
} from "typeorm";
import { Task } from "./task.entity";
import { Project } from "./project.entity";

@Entity()
export class Column {
	@PrimaryGeneratedColumn()
	id: number;

	@TableColumn()
	title: string;

	@ManyToOne(() => Project, (project) => project.columns)
	project: Project;

	@OneToMany(() => Task, (task) => task.column)
	tasks: Task[];
}
