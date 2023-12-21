import { MigrationInterface, QueryRunner } from "typeorm";

export class Tasks1703057470418 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			CREATE TABLE IF NOT EXISTS task (
				id INT PRIMARY KEY AUTO_INCREMENT,
				title VARCHAR(255) NOT NULL,
				shortDescription VARCHAR(255) NOT NULL,
				description VARCHAR(255) NOT NULL,
				start TIMESTAMP NOT NULL,
				end TIMESTAMP NOT NULL,
				attachment VARCHAR(255),
				columnId INT NOT NULL,
				FOREIGN KEY (columnId) REFERENCES columns (id)
			)
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE IF EXISTS task`);
	}
}
