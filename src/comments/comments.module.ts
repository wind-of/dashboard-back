import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentsService } from "src/comments/comments.service";
import { CommentsController } from "src/comments/comments.controller";
import { Comments as CommentsEntity } from "src/entities/comments.entity";
import { ProjectModule } from "src/project/project.module";
import { ParticipantsModule } from "src/participants/participants.module";

@Module({
	imports: [
		TypeOrmModule.forFeature([CommentsEntity]),
		ProjectModule,
		ParticipantsModule
	],
	providers: [CommentsService],
	controllers: [CommentsController]
})
export class CommentsModule {}
