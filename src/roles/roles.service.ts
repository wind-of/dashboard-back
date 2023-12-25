import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Roles as RolesEntity } from "src/entities/roles.entity";
import { UpdateRolesDto } from "src/roles/dto/update-roles.dto";
import { CreateRolesDto } from "src/roles/dto/create-roles.dto";
import { RolesSearchCriteria } from "./types/roles-criteria";

@Injectable()
export class RolesService {
	constructor(
		@InjectRepository(RolesEntity)
		private rolesRepository: Repository<RolesEntity>
	) {}

	async create(roles: CreateRolesDto) {
		return this.rolesRepository.save(roles);
	}

	async updateById(id: number, roles: UpdateRolesDto) {
		await this.rolesRepository.update(id, roles);
		return this.findBy({ id });
	}

	async remove(id: number): Promise<void> {
		await this.rolesRepository.delete(id);
	}

	findBy(criteria: RolesSearchCriteria): Promise<RolesEntity | null> {
		return this.rolesRepository.findOneBy(criteria);
	}
}
