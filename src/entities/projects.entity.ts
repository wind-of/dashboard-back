import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	OneToOne
} from "typeorm";
import { Columns as ColumnEntity } from "src/entities/columns.entity";
import { Users as UserEntity } from "src/entities/users.entity";
import { Participants as ParticipantsEntity } from "src/entities/participants.entity";

@Entity()
export class Projects {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	@OneToOne(() => UserEntity, (user) => user.id)
	ownerId: number;

	@OneToMany(() => ColumnEntity, (column) => column.project)
	columns: ColumnEntity[];

	@OneToMany(() => ParticipantsEntity, (participant) => participant.project)
	participants: ParticipantsEntity[];
}
