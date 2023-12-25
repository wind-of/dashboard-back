import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Project as ProjectEntity } from "src/entities/project.entity";
import { ProjectProto } from "src/project/types/create.project";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { ProjectSearchCriteria } from "src/project/types/project-criteria";
import { ParticipantsService } from "src/participants/participants.service";
import { ParticipantRolesEnum } from "src/participants/enums/roles.enum";

@Injectable()
export class ProjectService {
	constructor(
		@InjectRepository(ProjectEntity)
		private projectsRepository: Repository<ProjectEntity>,
		private participantService: ParticipantsService
	) {}

	async create(project: ProjectProto) {
		return this.projectsRepository.save(project);
	}

	async update(id: number, project: UpdateProjectDto) {
		await this.projectsRepository.update(id, project);
		return this.findBy({ id });
	}

	async remove(id: number): Promise<void> {
		await this.projectsRepository.delete(id);
	}

	async findBy(criteria: ProjectSearchCriteria) {
		return this.projectsRepository.findOneBy(criteria);
	}

	async findAllBy(criteria: ProjectSearchCriteria) {
		return this.projectsRepository.findBy(criteria);
	}

	async isOwner(userId: number, projectId: number) {
		const project = await this.findBy({ id: projectId });
		if (!project) {
			return false;
		}
		const member = await this.participantService.findBy({ userId, projectId });
		return member?.role === ParticipantRolesEnum.Owner;
	}

	async isParticipant(userId: number, projectId: number) {
		const project = await this.findBy({ id: projectId });
		if (!project) {
			return false;
		}
		const member = await this.participantService.findBy({ userId, projectId });
		return !!member;
	}
}
