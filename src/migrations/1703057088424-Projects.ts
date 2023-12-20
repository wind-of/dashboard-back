import { MigrationInterface, QueryRunner } from "typeorm";

export class Projects1703057088424 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			CREATE TABLE IF NOT EXISTS project (
				id INT PRIMARY KEY AUTO_INCREMENT,
				title VARCHAR(255) NOT NULL DEFAULT("Project Name")
			)
    `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE IF EXISTS project`);
	}
}
