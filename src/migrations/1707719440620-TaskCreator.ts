import { MigrationInterface, QueryRunner } from "typeorm";

export class TaskCreator1707719440620 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			ALTER TABLE tasks
			ADD COLUMN creatorId INT NOT NULL;
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			ALTER TABLE tasks
			DROP COLUMN creatorId;
		`);
	}
}
