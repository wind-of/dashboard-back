import { MigrationInterface, QueryRunner } from "typeorm";

export class RolesRename1703508247784 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			ALTER TABLE roles RENAME TO participants
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			ALTER TABLE participants RENAME TO roles
		`);
	}
}
