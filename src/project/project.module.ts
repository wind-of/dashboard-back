import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectService } from "src/project/project.service";
import { ProjectController } from "src/project/project.controller";
import { Project as ProjectEntity } from "src/entities/projects.entity";
import { ColumnsModule } from "src/columns/columns.module";
import { TaskModule } from "src/task/task.module";
import { ParticipantsModule } from "src/participants/participants.module";

@Module({
	imports: [
		TypeOrmModule.forFeature([ProjectEntity]),
		ColumnsModule,
		TaskModule,
		ParticipantsModule
	],
	providers: [ProjectService],
	controllers: [ProjectController],
	exports: [ProjectService]
})
export class ProjectModule {}
