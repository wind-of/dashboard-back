import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	OneToOne
} from "typeorm";
import { Column as ColumnEntity } from "./column.entity";
import { Member } from "./member.entity";
import { User } from "./user.entity";

@Entity()
export class Project {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@OneToOne(() => User)
	ownerId: string;

	@OneToMany(() => ColumnEntity, (column) => column.project)
	columns: ColumnEntity[];

	@OneToMany(() => Member, (member) => member.project)
	members: Member[];
}
