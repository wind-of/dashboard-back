import { FindOptionsWhere, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Columns as ColumnEntity } from "src/entities/columns.entity";
import { CreateColumnDto } from "src/columns/dto/create-column.dto";
import { ColumnRelations } from "./types/columns.relations";

@Injectable()
export class ColumnsService {
	constructor(
		@InjectRepository(ColumnEntity)
		private columnsRepository: Repository<ColumnEntity>
	) {}

	private readonly relations: ColumnRelations = {
		tasks: {
			comments: true
		}
	};

	create(column: CreateColumnDto) {
		return this.columnsRepository.save(column);
	}

	async update(id: number, column: Partial<ColumnEntity>) {
		await this.columnsRepository.update({ id }, column);
	}

	async remove(id: number) {
		await this.columnsRepository.delete({ id });
	}

	findBy(criteria: FindOptionsWhere<ColumnEntity>) {
		return this.columnsRepository.findOne({
			relations: this.relations,
			where: criteria
		});
	}

	findAllBy(criteria: FindOptionsWhere<ColumnEntity>) {
		return this.columnsRepository.find({
			relations: this.relations,
			where: criteria
		});
	}
}
