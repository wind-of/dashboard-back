import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	ManyToOne
} from "typeorm";
import { ColumnEntity } from "src/entities/column.entity";
import { CommentEntity } from "src/entities/comment.entity";

@Entity()
export class TaskEntity {
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
