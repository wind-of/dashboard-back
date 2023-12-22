import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameMemberTable1703221597178 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE member RENAME TO roles`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE roles RENAME TO member`);
	}
}
