import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

// CREATE TABLE IF NOT EXISTS task (
// 	id INT PRIMARY KEY AUTO_INCREMENT,
// 	title VARCHAR(255) NOT NULL,
// 	shortDescription VARCHAR(255) NOT NULL,
// 	description VARCHAR(255) NOT NULL,
// 	start TIMESTAMP NOT NULL,
// 	end TIMESTAMP NOT NULL,
// 	attachment VARCHAR(255),
// 	columnId INT NOT NULL
// )

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

	@Column()
	columnId: number;
}
