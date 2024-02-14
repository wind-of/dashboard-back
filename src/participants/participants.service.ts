import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { Participants as ParticipantsEntity } from "src/entities/participants.entity";
import { ParticipantCreationData } from "src/participants/types/participant-creation";
import { ParticipantUpdateData } from "src/participants/types/participant-update";
import { ParticipantDeletionData } from "src/participants/types/participant-delete";
import { ParticipantRolesEnum } from "src/participants/enums/roles.enum";
import { isAllowedToUpdateRole } from "src/participants/helpers";
import { Projects as ProjectsEntity } from "src/entities/projects.entity";
import { Users as UsersEntity } from "src/entities/users.entity";

@Injectable()
export class ParticipantsService {
	constructor(
		@InjectRepository(ParticipantsEntity)
		private participantsRepository: Repository<ParticipantsEntity>,
		@InjectRepository(ProjectsEntity)
		private projectsRepository: Repository<ProjectsEntity>,
		@InjectRepository(UsersEntity)
		private usersRepository: Repository<UsersEntity>
	) {}

	async create(participant: ParticipantCreationData) {
		const user = await this.usersRepository.findOneBy({
			email: participant.email,
			id: participant.userId
		});
		if (!user) {
			throw new BadRequestException(
				`User with email ${participant.email} not found`
			);
		}
		const participantExist = await this.participantsRepository.findOneBy({
			userId: user.id,
			projectId: participant.projectId
		});
		if (participantExist) {
			throw new BadRequestException("Participant already exist");
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { email, ...participantWithourEmail } = participant;
		return this.participantsRepository.save({
			...participantWithourEmail,
			userId: user.id
		});
	}

	async update({ userId, projectId, commiterId, role: updatedRole }) {
		const criteria = { userId, projectId };
		const commiter = await this.participantsRepository.findOneBy({
			userId: commiterId,
			projectId
		});
		if (!isAllowedToUpdateRole(updatedRole, commiter.role)) {
			return;
		}
		if (updatedRole === ParticipantRolesEnum.Owner) {
			await this.participantsRepository.update(
				{ projectId, userId: commiterId },
				{ role: ParticipantRolesEnum.Admin }
			);
			await this.projectsRepository.update(
				{ id: projectId },
				{ ownerId: userId }
			);
		}
		await this.participantsRepository.update(criteria, { role: updatedRole });
		return this.findBy(criteria);
	}

	async updateById(id: number, participant: ParticipantUpdateData) {
		await this.participantsRepository.update(id, participant);
		return this.findBy({ id });
	}

	async remove(participant: ParticipantDeletionData): Promise<void> {
		await this.participantsRepository.delete(participant);
	}

	findBy(criteria: FindOptionsWhere<ParticipantsEntity>) {
		return this.participantsRepository.findOneBy(criteria);
	}

	findAllBy(criteria: FindOptionsWhere<ParticipantsEntity>) {
		return this.participantsRepository.findBy(criteria);
	}

	async isOwner(participantId: number, projectId: number) {
		const participant = await this.findBy({ userId: participantId, projectId });
		return participant.role === ParticipantRolesEnum.Owner;
	}
}
