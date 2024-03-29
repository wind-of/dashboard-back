import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Repository } from "typeorm";
import { Projects as ProjectEntity } from "src/entities/projects.entity";
import { ProjectCreateData } from "src/project/types/project-create";
import { UpdateProjectDto } from "src/project/dto/update-project.dto";
import { ProjectSearchCriteria } from "src/project/types/project-criteria";
import { ProjectRelations } from "src/project/types/project.relations";
import { ParticipantsService } from "src/participants/participants.service";
import { ParticipantRolesEnum } from "src/participants/enums/roles.enum";
import { TagsService } from "src/tags/tags.service";
import { DEFAULT_TAGS } from "src/constants";

@Injectable()
export class ProjectService {
	constructor(
		@InjectRepository(ProjectEntity)
		private projectsRepository: Repository<ProjectEntity>,
		private participantService: ParticipantsService,
		private tagsService: TagsService
	) {}

	private readonly relations: ProjectRelations = {
		participants: true,
		columns: {
			tasks: {
				comments: true,
				tags: true
			}
		}
	};

	async create(project: ProjectCreateData) {
		const newProject = await this.projectsRepository.save(project);
		await this.tagsService.create(
			DEFAULT_TAGS.map((v) => ({ ...v, projectId: newProject.id }))
		);
		return newProject;
	}

	async update(id: number, project: UpdateProjectDto) {
		await this.projectsRepository.update(id, project);
		return this.findBy({ id });
	}

	async remove(id: number): Promise<void> {
		await this.projectsRepository.delete(id);
	}

	async findBy(criteria: ProjectSearchCriteria, relations = this.relations) {
		return this.projectsRepository.findOne({
			where: criteria,
			relations
		});
	}

	async findAllBy(criteria: ProjectSearchCriteria, relations = this.relations) {
		return this.projectsRepository.find({
			where: criteria,
			relations
		});
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

	async getTags(projectId: number) {
		return this.tagsService.findAllBy({
			projectId,
			taskId: IsNull()
		});
	}
}
