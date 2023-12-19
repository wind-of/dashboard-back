import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	firstname: string;

	@Column()
	lastname?: string;

	@Column()
	password: string;

	@Column()
	email: string;

	@Column()
	avatar?: string;
}
