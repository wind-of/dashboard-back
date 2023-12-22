import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	OneToOne
} from "typeorm";
import { Columns as ColumnEntity } from "src/entities/column.entity";
import { Member as MemberEntity } from "src/entities/member.entity";
import { User as UserEntity } from "src/entities/user.entity";

@Entity()
export class Project {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	@OneToOne(() => UserEntity)
	ownerId: number;

	@OneToMany(() => ColumnEntity, (column) => column.project)
	columns: ColumnEntity[];

	@OneToMany(() => MemberEntity, (member) => member.project)
	members: MemberEntity[];
}
