import { Module } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";
import { Project as ProjectEntity } from "src/entities/project.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
	imports: [TypeOrmModule.forFeature([ProjectEntity])],
	providers: [ProjectService],
	controllers: [ProjectController],
	exports: [ProjectService]
})
export class ProjectModule {}
