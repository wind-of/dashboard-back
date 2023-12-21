import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Project } from "./project.entity";
import { User } from "./user.entity";

@Entity()
export class Member {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => User, (user) => user)
	user: User;

	@ManyToOne(() => Project, (project) => project.members)
	project: Project;

	@Column()
	role: string;
}
