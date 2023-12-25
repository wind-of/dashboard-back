import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	OneToOne
} from "typeorm";
import { Columns as ColumnEntity } from "src/entities/column.entity";
import { User as UserEntity } from "src/entities/user.entity";
import { Participants as ParticipantsEntity } from "src/entities/participants.entity";

@Entity()
export class Project {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	@OneToOne(() => UserEntity, (user) => user.id)
	ownerId: number;

	@OneToMany(() => ColumnEntity, (column) => column.project)
	columns: ColumnEntity[];

	@OneToMany(() => ParticipantsEntity, (member) => member.project)
	participants: ParticipantsEntity[];
}
