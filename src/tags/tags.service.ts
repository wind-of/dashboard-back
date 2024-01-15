import { FindOptionsWhere, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tags as TagsEntity } from "src/entities/tags.entity";
import { TagCreateData } from "./types/tag-create";

@Injectable()
export class TagsService {
	constructor(
		@InjectRepository(TagsEntity)
		private tagsRepository: Repository<TagsEntity>
	) {}

	create(tags: TagCreateData[]) {
		return this.tagsRepository.save(tags);
	}

	async remove(criteria: FindOptionsWhere<TagsEntity>) {
		await this.tagsRepository.delete(criteria);
	}

	findBy(criteria: FindOptionsWhere<TagsEntity>) {
		return this.tagsRepository.findOneBy(criteria);
	}

	findAllBy(criteria: FindOptionsWhere<TagsEntity>) {
		return this.tagsRepository.findBy(criteria);
	}
}
