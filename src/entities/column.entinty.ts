import { Entity, Column as TableColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Column {
	@PrimaryGeneratedColumn()
	id: number;

	@TableColumn()
	title: string;

	@TableColumn()
	projectId: number;
}
