import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Project as ProjectEntity } from "src/entities/project.entity";
import { User as UserEntity } from "src/entities/user.entity";
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
