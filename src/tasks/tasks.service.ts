import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { UpdateTaskDto } from "src/tasks/dto/update-task.dto";
import { Tasks as TaskEntity } from "src/entities/tasks.entity";
import { CreateTaskDto } from "src/tasks/dto/create-task.dto";
import { TagsService } from "src/tags/tags.service";
import { TaskRelations } from "src/tasks/types/task.relations";
import { RANK_START_POSITION, getNextRank } from "src/helpers/lexorank";
import { computeLexoranks } from "src/helpers/lexorank";

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

	async create(task: CreateTaskDto, creatorId: number) {
		const [last] = await this.tasksRepository.find({
			order: { lexorank: "DESC" },
			take: 1
		});
		const lexorank = last ? getNextRank(last.lexorank) : RANK_START_POSITION;
		return this.tasksRepository.save({ ...task, lexorank, creatorId });
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
		const {
			currentElementLexorank: currentLexorank,
			replacingElementLexorank: replacingLexorank
		} = computeLexoranks(
			nearbyTasks,
			currentTask.id === Number(tasks[position + 1]?.id),
			newColumnId === currentTask.columnId,
			shouldInsertAfter
		);
		await this.tasksRepository.update(taskId, {
			lexorank: currentLexorank,
			columnId: newColumnId
		});
		if (replacingLexorank) {
			await this.tasksRepository.update(tasks[position].id, {
				lexorank: replacingLexorank
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

	async findBy(criteria: FindOptionsWhere<TaskEntity>) {
		return this.tasksRepository.findOne({
			where: criteria,
			relations: this.relations,
			order: { lexorank: "ASC" }
		});
	}

	async findAllBy(criteria: FindOptionsWhere<TaskEntity>) {
		return this.tasksRepository.find({
			where: criteria,
			relations: this.relations,
			order: { lexorank: "ASC" }
		});
	}

	async findAllAssigned(userId: number) {
		const tasks = await this.tasksRepository.find({
			where: { performerId: userId },
			relations: {
				column: { project: true }
			},
			order: { lexorank: "ASC" }
		});
		return tasks.map((task) => ({
			task,
			project: {
				id: task.column.project.id,
				title: task.column.project.title
			}
		}));
	}
}
