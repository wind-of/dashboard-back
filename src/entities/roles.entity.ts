import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Project as ProjectEntity } from "src/entities/project.entity";
import { User as UserEntity } from "src/entities/user.entity";

@Entity()
export class Roles {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	userId: number;

	@Column()
	projectId: number;

	@ManyToOne(() => UserEntity, (user) => user, {
		onDelete: "CASCADE"
	})
	user: UserEntity;

	@ManyToOne(() => ProjectEntity, (project) => project.members, {
		onDelete: "CASCADE"
	})
	project: ProjectEntity;

	@Column()
	role: string;
}
