import { MigrationInterface, QueryRunner } from "typeorm";

export class TaskDefaults1703413538717 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			"ALTER TABLE task MODIFY shortDescription VARCHAR(255) NULL"
		);
		await queryRunner.query(
			"ALTER TABLE task MODIFY description VARCHAR(255) NULL"
		);
		await queryRunner.query("ALTER TABLE task MODIFY start TIMESTAMP NULL");
		await queryRunner.query("ALTER TABLE task MODIFY end TIMESTAMP NULL");
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			"ALTER TABLE task MODIFY shortDescription VARCHAR(255) NOT NULL"
		);
		await queryRunner.query(
			"ALTER TABLE task MODIFY description VARCHAR(255) NOT NULL"
		);
		await queryRunner.query("ALTER TABLE task MODIFY start TIMESTAMP NOT NULL");
		await queryRunner.query("ALTER TABLE task MODIFY end TIMESTAMP NOT NULL");
	}
}
