import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentsService } from "src/comments/comments.service";
import { CommentsController } from "src/comments/comments.controller";
import { Comment as CommentsEntity } from "src/entities/comment.entity";
import { ProjectModule } from "src/project/project.module";
import { RolesModule } from "src/roles/roles.module";

@Module({
	imports: [
		TypeOrmModule.forFeature([CommentsEntity]),
		ProjectModule,
		RolesModule
	],
	providers: [CommentsService],
	controllers: [CommentsController]
})
export class CommentsModule {}
