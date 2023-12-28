import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	ManyToOne
} from "typeorm";
import { Columns as ColumnEntity } from "src/entities/columns.entity";
import { Comments as CommentEntity } from "src/entities/comments.entity";
import { Tags as TagsEntity } from "src/entities/tags.entity";

@Entity()
export class Tasks {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	shortDescription: string;

	@Column()
	description: string;

	@Column()
	startDate: Date;

	@Column()
	expirationDate: Date;

	@Column()
	attachment: string;

	@Column()
	columnId: number;

	@ManyToOne(() => ColumnEntity, (column) => column.tasks, {
		onDelete: "CASCADE"
	})
	column: ColumnEntity;

	@OneToMany(() => CommentEntity, (comment) => comment.task)
	comments: CommentEntity[];

	@OneToMany(() => TagsEntity, (tags) => tags.task)
	tags: TagsEntity[];
}
