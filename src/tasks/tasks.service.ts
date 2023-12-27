import { Injectable } from "@nestjs/common";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Tasks as TaskEntity } from "src/entities/tasks.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskSearchCriteria } from "./types/task-criteria";

@Injectable()
export class TaskService {
	constructor(
		@InjectRepository(TaskEntity)
		private tasksRepository: Repository<TaskEntity>
	) {}

	private readonly relations = {
		comments: true
	};

	async create(task: CreateTaskDto) {
		return this.tasksRepository.save(task);
	}

	async update(id: number, task: UpdateTaskDto) {
		await this.tasksRepository.update(id, task);
		const updatedTask = await this.tasksRepository.findOne({
			where: { id },
			relations: this.relations
		});
		return updatedTask;
	}

	async remove(id: number): Promise<void> {
		await this.tasksRepository.delete(id);
	}

	async findBy(criteria: TaskSearchCriteria) {
		return this.tasksRepository.findOne({
			where: criteria,
			relations: this.relations
		});
	}

	async findAllBy(criteria: TaskSearchCriteria) {
		return this.tasksRepository.find({
			where: criteria,
			relations: this.relations
		});
	}
}
