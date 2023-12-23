import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Project as ProjectEntity } from "src/entities/project.entity";
import { ProjectProto } from "src/project/types/create.project";
import { UpdateProjectDto } from "./dto/update-project.dto";

@Injectable()
export class ProjectService {
	constructor(
		@InjectRepository(ProjectEntity)
		private projectsRepository: Repository<ProjectEntity>
	) {}

	async create(project: ProjectProto) {
		return this.projectsRepository.save(project);
	}

	async update(id: number, project: UpdateProjectDto) {
		await this.projectsRepository.update(id, project);
		return this.findOneById(id);
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
