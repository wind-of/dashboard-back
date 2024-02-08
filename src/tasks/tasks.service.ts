import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateTaskDto } from "src/tasks/dto/update-task.dto";
import { Tasks as TaskEntity } from "src/entities/tasks.entity";
import { CreateTaskDto } from "src/tasks/dto/create-task.dto";
import { TaskSearchCriteria } from "src/tasks/types/task-criteria";
import { TagsService } from "src/tags/tags.service";
import { TaskRelations } from "./types/task.relations";
import {
	RANK_END_POSITION,
	RANK_START_POSITION,
	getNextRank,
	getRankBetween
} from "src/helpers/lexorank";

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
		oldPosition: number
	) {
		const tasks = await this.tasksRepository.find({
			where: { columnId: newColumnId },
			order: { lexorank: "ASC" },
			take: position + 2
		});
		const [previousTask, replacingTask, nextTask] = [
			tasks[position - 1],
			tasks[position],
			tasks[position + 1]
		];
		console.log(previousTask, replacingTask, nextTask);
		console.log(taskId, newColumnId, position, oldPosition);
		if (!replacingTask) {
			await this.tasksRepository.update(taskId, {
				lexorank: RANK_START_POSITION,
				columnId: newColumnId
			});
			return;
		}
		if (!previousTask) {
			console.log("Предыдущего нет!");
			const currentTaskLexorank = replacingTask.lexorank;
			const replacingTaskLexorank = getRankBetween(
				currentTaskLexorank,
				nextTask?.lexorank || RANK_END_POSITION
			);
			await this.tasksRepository.update(taskId, {
				lexorank: currentTaskLexorank,
				columnId: newColumnId
			});
			await this.tasksRepository.update(replacingTask.id, {
				lexorank: replacingTaskLexorank
			});
			return;
		}
		// Нужно учитывать, если переставляют сверху вниз или снизу вверх.
		const [previous, next] =
			oldPosition < position
				? [replacingTask.lexorank, nextTask?.lexorank || RANK_END_POSITION]
				: [previousTask.lexorank, replacingTask.lexorank];
		await this.tasksRepository.update(taskId, {
			lexorank: getRankBetween(previous, next),
			columnId: newColumnId
		});
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
