import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	OneToOne
} from "typeorm";
import { Columns as ColumnEntity } from "src/entities/column.entity";
import { Roles as RolesEntity } from "src/entities/roles.entity";
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

	@OneToMany(() => RolesEntity, (member) => member.project)
	members: RolesEntity[];
}
