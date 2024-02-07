import { MigrationInterface, QueryRunner } from "typeorm";

export class Lexoranks1707302769716 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			ALTER TABLE columns ADD COLUMN lexorank VARCHAR(255)
		`);
		await queryRunner.query(`
			ALTER TABLE tasks ADD COLUMN lexorank VARCHAR(255)
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			ALTER TABLE columns DROP COLUMN lexorank
		`);
		await queryRunner.query(`
			ALTER TABLE tasks DROP COLUMN lexorank
		`);
	}
}
