import { projectMemberRoles } from "src/constants";
import { MigrationInterface, QueryRunner } from "typeorm";

export class MembersTable1703056492570 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			CREATE TABLE IF NOT EXISTS member (
				id INT PRIMARY KEY AUTO_INCREMENT,
				userId INT NOT NULL,
				projectId INT NOT NULL,
				role VARCHAR(255) NOT NULL DEFAULT("${projectMemberRoles.Member}")
			)
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE IF EXISTS member`);
	}
}
