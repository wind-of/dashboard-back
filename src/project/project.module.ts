import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectService } from "src/project/project.service";
import { ProjectController } from "src/project/project.controller";
import { Project as ProjectEntity } from "src/entities/project.entity";
import { ColumnsModule } from "src/columns/columns.module";
import { RolesModule } from "src/roles/roles.module";
import { TaskModule } from "src/task/task.module";

@Module({
	imports: [
		TypeOrmModule.forFeature([ProjectEntity]),
		ColumnsModule,
		TaskModule,
		RolesModule
	],
	providers: [ProjectService],
	controllers: [ProjectController],
	exports: [ProjectService]
})
export class ProjectModule {}
