import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Projects as ProjectEntity } from "src/entities/projects.entity";
import { Users as UserEntity } from "src/entities/users.entity";
import { ParticipantRolesEnum } from "src/participants/enums/roles.enum";

@Entity()
export class Participants {
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

	@ManyToOne(() => ProjectEntity, (project) => project.participants, {
		onDelete: "CASCADE"
	})
	project: ProjectEntity;

	@Column()
	role: ParticipantRolesEnum;
}
