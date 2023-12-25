import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Participants as ParticipantsEntity } from "src/entities/participants.entity";
import { ParticipantSearchCriteria } from "src/participants/types/participant-criteria";
import { ParticipantCreationData } from "src/participants/types/participant-creation";
import { ParticipantUpdateData } from "src/participants/types/participant-update";
import { ParticipantDeletionData } from "src/participants/types/participant-delete";
import { ParticipantRolesEnum } from "src/participants/enums/roles.enum";

@Injectable()
export class ParticipantsService {
	constructor(
		@InjectRepository(ParticipantsEntity)
		private participantsRepository: Repository<ParticipantsEntity>
	) {}

	async create(participant: ParticipantCreationData) {
		return this.participantsRepository.save(participant);
	}

	async update(participant: ParticipantUpdateData) {
		const criteria = {
			userId: participant.userId,
			projectId: participant.projectId
		};
		await this.participantsRepository.update(criteria, participant);
		return this.findBy(criteria);
	}

	async updateById(id: number, participant: ParticipantUpdateData) {
		await this.participantsRepository.update(id, participant);
		return this.findBy({ id });
	}

	async remove(participant: ParticipantDeletionData): Promise<void> {
		await this.participantsRepository.delete(participant);
	}

	findBy(criteria: ParticipantSearchCriteria) {
		return this.participantsRepository.findOneBy(criteria);
	}

	async isOwner(participantId: number, projectId: number) {
		const participant = await this.findBy({ userId: participantId, projectId });
		return participant.role === ParticipantRolesEnum.Owner;
	}
}
