import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskService } from "src/task/task.service";
import { TaskController } from "src/task/task.controller";
import { Task as TaskEntity } from "src/entities/task.entity";

@Module({
	imports: [TypeOrmModule.forFeature([TaskEntity])],
	providers: [TaskService],
	controllers: [TaskController],
	exports: [TaskService]
})
export class TaskModule {}
