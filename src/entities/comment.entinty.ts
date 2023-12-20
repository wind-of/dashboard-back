import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	text: string;

	@Column()
	userId: number;

	@Column()
	taskId: number;

	@Column()
	attachment: string;
}
