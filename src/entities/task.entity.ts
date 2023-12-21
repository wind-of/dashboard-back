import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	ManyToOne
} from "typeorm";
import { Column as ColumnEntity } from "./column.entity";
import { Comment } from "./comment.entity";

@Entity()
export class Task {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	shortDescription: string;

	@Column()
	description: string;

	@Column()
	start: Date;

	@Column()
	end: Date;

	@Column()
	attachment: string;

	@ManyToOne(() => ColumnEntity, (column) => column.tasks)
	column: ColumnEntity;

	@OneToMany(() => Comment, (comment) => comment.task)
	comments: Comment[];
}
