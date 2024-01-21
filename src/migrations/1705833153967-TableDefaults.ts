import { MigrationInterface, QueryRunner } from "typeorm";

export class TableDefaults1705833153967 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			ALTER TABLE tasks	ALTER COLUMN description SET DEFAULT ("");
		`);
		await queryRunner.query(`
			ALTER TABLE tasks	ALTER COLUMN shortDescription SET DEFAULT ("");
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			ALTER TABLE tasks	ALTER COLUMN description DROP DEFAULT;
		`);
		await queryRunner.query(`
			ALTER TABLE tasks	ALTER COLUMN shortDescription DROP DEFAULT;
		`);
	}
}
