import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Project as ProjectEntity } from "src/entities/project.entity";
import { User as UserEntity } from "src/entities/user.entity";

@Entity()
export class Member {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => UserEntity, (user) => user)
	user: UserEntity;

	@ManyToOne(() => ProjectEntity, (project) => project.members)
	project: ProjectEntity;

	@Column()
	role: string;
}
