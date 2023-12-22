import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	ManyToOne
} from "typeorm";
import { Columns as ColumnEntity } from "src/entities/column.entity";
import { Comment as CommentEntity } from "src/entities/comment.entity";

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

	@OneToMany(() => CommentEntity, (comment) => comment.task)
	comments: CommentEntity[];
}
