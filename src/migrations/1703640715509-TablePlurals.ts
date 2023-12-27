import { MigrationInterface, QueryRunner } from "typeorm";

export class TablePlurals1703640715509 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			ALTER TABLE project RENAME TO projects
		`);
		await queryRunner.query(`
			ALTER TABLE comment RENAME TO comments
		`);
		await queryRunner.query(`
			ALTER TABLE task RENAME TO tasks
		`);
		await queryRunner.query(`
			ALTER TABLE user RENAME TO users
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			ALTER TABLE projects RENAME TO project
		`);
		await queryRunner.query(`
			ALTER TABLE comments RENAME TO comment
		`);
		await queryRunner.query(`
			ALTER TABLE tasks RENAME TO task
		`);
		await queryRunner.query(`
			ALTER TABLE users RENAME TO user
		`);
	}
}
