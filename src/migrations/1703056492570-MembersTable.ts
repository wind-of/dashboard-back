import { MemberRoles } from "src/roles/enums/roles.enum";
import { MigrationInterface, QueryRunner } from "typeorm";

export class MembersTable1703056492570 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			CREATE TABLE IF NOT EXISTS member (
				id INT PRIMARY KEY AUTO_INCREMENT,
				userId INT NOT NULL,
				projectId INT NOT NULL,
				role VARCHAR(255) NOT NULL DEFAULT("${MemberRoles.Member}"),
				FOREIGN KEY (userId) REFERENCES user (id),
				FOREIGN KEY (projectId) REFERENCES project (id)
			)
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE IF EXISTS member`);
	}
}
