import { MigrationInterface, QueryRunner } from "typeorm";

export class Tags1705226290544 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			CREATE TABLE tags (
				id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
				title VARCHAR(255) NOT NULL DEFAULT('Tag'),
				color VARCHAR(255) NOT NULL DEFAULT('#dddddd'),
				projectId INT,
				taskId INT,
				FOREIGN KEY (projectId) REFERENCES projects (id),
				FOREIGN KEY (taskId) REFERENCES tasks (id)
			);
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			DROP TABLE tags;
		`);
	}
}
