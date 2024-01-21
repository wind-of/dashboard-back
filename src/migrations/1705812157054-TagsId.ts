import { MigrationInterface, QueryRunner } from "typeorm";

export class TagsId1705812157054 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			ALTER TABLE tags ADD COLUMN uniqueId CHAR(36) NOT NULL;
    `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			ALTER TABLE tags DROP COLUMN uniqueId;
    `);
	}
}
