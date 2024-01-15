import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectService } from "src/project/project.service";
import { ProjectController } from "src/project/project.controller";
import { Projects as ProjectEntity } from "src/entities/projects.entity";
import { ColumnsModule } from "src/columns/columns.module";
import { TaskModule } from "src/tasks/tasks.module";
import { ParticipantsModule } from "src/participants/participants.module";
import { TagsModule } from "src/tags/tags.module";

@Module({
	imports: [
		TypeOrmModule.forFeature([ProjectEntity]),
		ColumnsModule,
		TaskModule,
		TagsModule,
		ParticipantsModule
	],
	providers: [ProjectService],
	controllers: [ProjectController],
	exports: [ProjectService]
})
export class ProjectModule {}
