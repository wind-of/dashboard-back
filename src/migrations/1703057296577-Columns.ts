import { MigrationInterface, QueryRunner } from "typeorm";

export class Columns1703057296577 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
				CREATE TABLE IF NOT EXISTS column (
					id INT PRIMARY KEY AUTO_INCREMENT,
					title VARCHAR(255) NOT NULL DEFAULT("Column Title"),
					projectId INT NOT NULL
				)
			`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE IF EXISTS column`);
	}
}
