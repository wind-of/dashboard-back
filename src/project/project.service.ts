import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Project as ProjectEntity } from "src/entities/project.entity";
import { ProjectProto } from "src/project/types/create.project";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { RolesService } from "src/roles/roles.service";
import { MemberRoles } from "src/roles/enums/roles.enum";

@Injectable()
export class ProjectService {
	constructor(
		@InjectRepository(ProjectEntity)
		private projectsRepository: Repository<ProjectEntity>,
		private rolesService: RolesService
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

	async isAdmin(userId: number, projectId: number) {
		const project = await this.findOneById(projectId);
		if (!project) {
			return false;
		}
		const member = await this.rolesService.findBy({ userId, projectId });
		return member?.role === MemberRoles.Owner;
	}
}
