import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Project as ProjectEntity } from "src/entities/project.entity";

@Injectable()
export class ProjectService {
	constructor(
		@InjectRepository(ProjectEntity)
		private projectsRepository: Repository<ProjectEntity>
	) {}

	async create(project: ProjectEntity) {
		return this.projectsRepository.save(project);
	}

	async remove(id: number): Promise<void> {
		await this.projectsRepository.delete(id);
	}

	findOneById(id: number): Promise<ProjectEntity | null> {
		return this.projectsRepository.findOneBy({ id });
	}

	findAllByOwnerId(ownerId: number): Promise<ProjectEntity[]> {
		return this.projectsRepository.find({ where: { ownerId } });
	}

	findOneByOwnerId(ownerId: number): Promise<ProjectEntity | null> {
		return this.projectsRepository.findOneBy({ ownerId });
	}
}
