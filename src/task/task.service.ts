import { Injectable } from "@nestjs/common";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task as TaskEntity } from "src/entities/task.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskSearchCriteria } from "./types/search-criteria";

@Injectable()
export class TaskService {
	constructor(
		@InjectRepository(TaskEntity)
		private tasksRepository: Repository<TaskEntity>
	) {}

	async create(task: CreateTaskDto) {
		return this.tasksRepository.save(task);
	}

	async update(id: number, task: UpdateTaskDto) {
		await this.tasksRepository.update(id, task);
		const updatedTask = await this.tasksRepository.findOneBy({
			id
		});
		return updatedTask;
	}

	async remove(id: number): Promise<void> {
		await this.tasksRepository.delete(id);
	}

	async findBy(criteria: TaskSearchCriteria) {
		return this.tasksRepository.findOneBy(criteria);
	}

	async findAllBy(criteria: TaskSearchCriteria) {
		return this.tasksRepository.findBy(criteria);
	}
}
