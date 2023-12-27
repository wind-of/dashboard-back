import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskService } from "src/tasks/tasks.service";
import { TaskController } from "src/tasks/tasks.controller";
import { Tasks as TaskEntity } from "src/entities/tasks.entity";
import { ParticipantsModule } from "src/participants/participants.module";
import { ColumnsModule } from "src/columns/columns.module";

@Module({
	imports: [
		TypeOrmModule.forFeature([TaskEntity]),
		ParticipantsModule,
		ColumnsModule
	],
	providers: [TaskService],
	controllers: [TaskController],
	exports: [TaskService]
})
export class TaskModule {}
