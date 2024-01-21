import { v4 as uuidv4 } from "uuid";
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
		const tagEntities = this.tagsRepository.create(
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			tags.map((tag) => ({ uniqueId: uuidv4(), ...tag, id: null }))
		);
		return this.tagsRepository.insert(tagEntities);
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
