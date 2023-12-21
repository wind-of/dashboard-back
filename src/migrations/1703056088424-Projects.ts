import { MigrationInterface, QueryRunner } from "typeorm";

export class Projects1703056088424 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			CREATE TABLE IF NOT EXISTS project (
				id INT PRIMARY KEY AUTO_INCREMENT,
				title VARCHAR(255) NOT NULL DEFAULT("Project Name"),
				ownerId INT NOT NULL,
				FOREIGN KEY (ownerId) REFERENCES user (id)
			)
    `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE IF EXISTS project`);
	}
}
