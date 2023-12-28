import { MigrationInterface, QueryRunner } from "typeorm";

export class TaskDatesRename1703751645667 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			ALTER TABLE tasks RENAME COLUMN start TO startDate
		`);
		await queryRunner.query(`
			ALTER TABLE tasks RENAME COLUMN end TO expirationDate
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			ALTER TABLE tasks RENAME COLUMN startDate TO start
		`);
		await queryRunner.query(`
			ALTER TABLE tasks RENAME COLUMN expirationDate TO end
		`);
	}
}
