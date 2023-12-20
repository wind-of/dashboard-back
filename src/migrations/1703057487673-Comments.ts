import { MigrationInterface, QueryRunner } from "typeorm";

export class Comments1703057487673 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			CREATE TABLE IF NOT EXISTS comment (
				id INT PRIMARY KEY AUTO_INCREMENT,
				text VARCHAR(255) NOT NULL,
				userId INT NOT NULL,
				taskId INT NOT NULL,
				attachment VARCHAR(255),
			)
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE IF EXISTS comment`);
	}
}
