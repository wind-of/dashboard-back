import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateTaskDto } from "src/tasks/dto/update-task.dto";
import { Tasks as TaskEntity } from "src/entities/tasks.entity";
import { CreateTaskDto } from "src/tasks/dto/create-task.dto";
import { TaskSearchCriteria } from "src/tasks/types/task-criteria";
import { TagsService } from "src/tags/tags.service";
import { TaskRelations } from "./types/task.relations";

@Injectable()
export class TaskService {
	constructor(
		@InjectRepository(TaskEntity)
		private tasksRepository: Repository<TaskEntity>,
		private tagsService: TagsService
	) {}

	private readonly relations: TaskRelations = {
		comments: true,
		tags: true
	};

	async create(task: CreateTaskDto) {
		return this.tasksRepository.save(task);
	}

	async update(taskId: number, task: UpdateTaskDto) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { tags = [], projectId, ...updatedTask } = task;
		await this.tasksRepository.update(taskId, updatedTask);
		await this.tagsService.remove({ taskId });
		await this.tagsService.create(tags.map((tag) => ({ ...tag, taskId })));
		return this.tasksRepository.findOne({
			where: { id: taskId },
			relations: this.relations
		});
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
