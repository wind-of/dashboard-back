import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskService } from "src/task/task.service";
import { TaskController } from "src/task/task.controller";
import { Task as TaskEntity } from "src/entities/tasks.entity";
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
