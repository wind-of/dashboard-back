import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersTable1702996300756 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS user (
        id INT PRIMARY KEY AUTO_INCREMENT,
        firstname VARCHAR(255) NOT NULL,
        lastname VARCHAR(255),
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        avatar VARCHAR(255)
      )
    `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE IF EXISTS user`);
	}
}
