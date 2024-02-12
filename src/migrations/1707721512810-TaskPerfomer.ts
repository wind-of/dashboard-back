import { MigrationInterface, QueryRunner } from "typeorm";

export class TaskPerfomer1707721512810 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			ALTER TABLE tasks
			ADD COLUMN performerId INT;
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			ALTER TABLE tasks
			DROP COLUMN performerId;
		`);
	}
}
