import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tags as TagsEntity } from "src/entities/tags.entity";
import { TagSearchCriteria } from "src/tags/types/tag-criteria";
import { TagCreateData } from "./types/tag-create";

@Injectable()
export class TagsService {
	constructor(
		@InjectRepository(TagsEntity)
		private tagsRepository: Repository<TagsEntity>
	) {}

	create(tag: TagCreateData | TagCreateData[]) {
		return this.tagsRepository.save(tag as TagCreateData);
	}

	async remove(criteria: TagSearchCriteria) {
		await this.tagsRepository.delete(criteria);
	}

	findBy(criteria: TagSearchCriteria) {
		return this.tagsRepository.findOneBy(criteria);
	}

	findAllBy(criteria: TagSearchCriteria) {
		return this.tagsRepository.findBy(criteria);
	}
}
