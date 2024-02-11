import { FindOptionsWhere, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Columns as ColumnEntity } from "src/entities/columns.entity";
import { CreateColumnDto } from "src/columns/dto/create-column.dto";
import { ColumnRelations } from "./types/columns.relations";
import {
	computeLexoranks,
	getNextRank,
	RANK_START_POSITION
} from "src/helpers/lexorank";

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

	async create(column: CreateColumnDto) {
		const [last] = await this.columnsRepository.find({
			order: { lexorank: "DESC" },
			take: 1
		});
		const lexorank = last ? getNextRank(last.lexorank) : RANK_START_POSITION;
		return this.columnsRepository.save({ ...column, lexorank });
	}

	async update(id: number, column: Partial<ColumnEntity>) {
		await this.columnsRepository.update({ id }, column);
	}

	async updateColumnPosition(
		columnId: number,
		newProjectId: number,
		position: number,
		shouldInsertAfter: boolean
	) {
		const currentColumn = await this.findBy({ id: columnId });
		const columns = await this.columnsRepository.find({
			where: { projectId: newProjectId },
			order: { lexorank: "ASC" },
			take: position + 2
		});
		const nearbyColumns = [
			columns[position - 1],
			columns[position],
			columns[position + 1]
		];
		console.log(columnId, newProjectId, position, shouldInsertAfter);
		const {
			currentElementLexorank: currentLexorank,
			replacingElementLexorank: replacingLexorank
		} = computeLexoranks(
			nearbyColumns,
			currentColumn.id === Number(columns[position + 1]?.id),
			newProjectId === currentColumn.projectId,
			shouldInsertAfter
		);
		await this.columnsRepository.update(columnId, {
			lexorank: currentLexorank,
			projectId: newProjectId
		});
		if (replacingLexorank) {
			await this.columnsRepository.update(columns[position].id, {
				lexorank: replacingLexorank
			});
		}
	}

	async remove(id: number) {
		await this.columnsRepository.delete({ id });
	}

	async findBy(criteria: FindOptionsWhere<ColumnEntity>) {
		return this.columnsRepository.findOne({
			where: criteria,
			relations: this.relations,
			order: { lexorank: "ASC" }
		});
	}

	async findAllBy(criteria: FindOptionsWhere<ColumnEntity>) {
		return this.columnsRepository.find({
			where: criteria,
			relations: this.relations,
			order: { lexorank: "ASC" }
		});
	}
}
