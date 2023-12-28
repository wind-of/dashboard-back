import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TagsService } from "src/tags/tags.service";
import { Tags as TagsEntity } from "src/entities/tags.entity";
import { TagsController } from "src/tags/tags.controller";
import { ParticipantsModule } from "src/participants/participants.module";

@Module({
	imports: [TypeOrmModule.forFeature([TagsEntity]), ParticipantsModule],
	providers: [TagsService],
	exports: [TagsService],
	controllers: [TagsController]
})
export class TagsModule {}
