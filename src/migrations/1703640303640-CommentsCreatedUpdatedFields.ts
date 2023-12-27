import { MigrationInterface, QueryRunner } from "typeorm";

export class CommentsCreatedUpdatedFields1703640303640
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			"ALTER TABLE comments ADD createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP"
		);
		await queryRunner.query(
			"ALTER TABLE comments ADD updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query("ALTER TABLE comments DROP createdAt");
		await queryRunner.query("ALTER TABLE comments DROP updatedAt");
	}
}
