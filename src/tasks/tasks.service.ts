import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateTaskDto } from "src/tasks/dto/update-task.dto";
import { Tasks as TaskEntity } from "src/entities/tasks.entity";
import { CreateTaskDto } from "src/tasks/dto/create-task.dto";
import { TaskSearchCriteria } from "src/tasks/types/task-criteria";
import { TagsService } from "src/tags/tags.service";
import { TaskRelations } from "src/tasks/types/task.relations";
import { RANK_START_POSITION, getNextRank } from "src/helpers/lexorank";
import { computeLexoranks } from "src/tasks/helpers";

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
		const [last] = await this.tasksRepository.find({
			order: { lexorank: "DESC" },
			take: 1
		});
		const lexorank = last ? getNextRank(last.lexorank) : RANK_START_POSITION;
		return this.tasksRepository.save({ ...task, lexorank });
	}

	async updateTaskPosition(
		taskId: number,
		newColumnId: number,
		position: number,
		shouldInsertAfter: boolean
	) {
		const currentTask = await this.findBy({ id: taskId });
		const tasks = await this.tasksRepository.find({
			where: { columnId: newColumnId },
			order: { lexorank: "ASC" },
			take: position + 2
		});
		const nearbyTasks = [
			tasks[position - 1],
			tasks[position],
			tasks[position + 1]
		];
		const { currentTaskLexorank, replacingTaskLexorank } = computeLexoranks(
			currentTask,
			nearbyTasks,
			newColumnId,
			shouldInsertAfter
		);
		await this.tasksRepository.update(taskId, {
			lexorank: currentTaskLexorank,
			columnId: newColumnId
		});
		if (replacingTaskLexorank) {
			await this.tasksRepository.update(tasks[position].id, {
				lexorank: replacingTaskLexorank
			});
		}
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
			relations: this.relations,
			order: { lexorank: "ASC" }
		});
	}

	async findAllBy(criteria: TaskSearchCriteria) {
		return this.tasksRepository.find({
			where: criteria,
			relations: this.relations,
			order: { lexorank: "ASC" }
		});
	}
}
