import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentService } from "src/comment/comment.service";
import { CommentController } from "src/comment/comment.controller";
import { Comment as CommentsEntity } from "src/entities/comment.entity";
import { ProjectModule } from "src/project/project.module";
import { RolesModule } from "src/roles/roles.module";

@Module({
	imports: [
		TypeOrmModule.forFeature([CommentsEntity]),
		ProjectModule,
		RolesModule
	],
	providers: [CommentService],
	controllers: [CommentController]
})
export class CommentModule {}
