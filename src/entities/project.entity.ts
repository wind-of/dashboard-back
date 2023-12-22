import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	OneToOne
} from "typeorm";
import { ColumnEntity } from "src/entities/column.entity";
import { Member } from "src/entities/member.entity";
import { UserEntity } from "src/entities/user.entity";

@Entity()
export class ProjectEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@OneToOne(() => UserEntity)
	ownerId: string;

	@OneToMany(() => ColumnEntity, (column) => column.project)
	columns: ColumnEntity[];

	@OneToMany(() => Member, (member) => member.project)
	members: Member[];
}
