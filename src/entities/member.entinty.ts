import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Member {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	userId: number;

	@Column()
	projectId: number;

	@Column()
	role: string;
}
