import { MigrationInterface, QueryRunner } from "typeorm";

export class CascadeDeletion1703320756635 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE roles DROP FOREIGN KEY roles_ibfk_1`);
		await queryRunner.query(
			`ALTER TABLE roles ADD CONSTRAINT roles_ibfk_3 FOREIGN KEY (projectId) REFERENCES project (id) ON DELETE CASCADE`
		);
		await queryRunner.query(`ALTER TABLE roles DROP FOREIGN KEY roles_ibfk_2`);
		await queryRunner.query(
			`ALTER TABLE roles ADD CONSTRAINT roles_ibfk_4 FOREIGN KEY (userId) REFERENCES user (id) ON DELETE CASCADE`
		);
		await queryRunner.query(
			`ALTER TABLE comments DROP FOREIGN KEY comments_ibfk_1`
		);
		await queryRunner.query(
			`ALTER TABLE comments ADD CONSTRAINT comments_ibfk_3 FOREIGN KEY (taskId) REFERENCES task (id) ON DELETE CASCADE`
		);
		await queryRunner.query(
			`ALTER TABLE comments DROP FOREIGN KEY comments_ibfk_2`
		);
		await queryRunner.query(`ALTER TABLE task DROP FOREIGN KEY task_ibfk_1`);
		await queryRunner.query(
			`ALTER TABLE task ADD CONSTRAINT task_ibfk_2 FOREIGN KEY (columnId) REFERENCES columns (id) ON DELETE CASCADE`
		);
		await queryRunner.query(
			`ALTER TABLE columns DROP FOREIGN KEY columns_ibfk_1`
		);
		await queryRunner.query(
			`ALTER TABLE columns ADD CONSTRAINT columns_ibfk_2 FOREIGN KEY (projectId) REFERENCES project (id) ON DELETE CASCADE`
		);

		await queryRunner.query(
			`ALTER TABLE project DROP FOREIGN KEY project_ibfk_1`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE roles DROP FOREIGN KEY roles_ibfk_3`);
		await queryRunner.query(
			`ALTER TABLE roles ADD CONSTRAINT roles_ibfk_1 FOREIGN KEY (projectId) REFERENCES project (id)`
		);
		await queryRunner.query(`ALTER TABLE roles DROP FOREIGN KEY roles_ibfk_4`);
		await queryRunner.query(
			`ALTER TABLE roles ADD CONSTRAINT roles_ibfk_2 FOREIGN KEY (userId) REFERENCES user (id)`
		);
		await queryRunner.query(
			`ALTER TABLE comments DROP FOREIGN KEY comments_ibfk_3`
		);
		await queryRunner.query(
			`ALTER TABLE comments ADD CONSTRAINT comments_ibfk_1 FOREIGN KEY (taskId) REFERENCES task (id)`
		);
		await queryRunner.query(
			`ALTER TABLE comments ADD FOREIGN KEY comments_ibfk_2 (userId) REFERENCES user (id)`
		);
		await queryRunner.query(`ALTER TABLE task DROP FOREIGN KEY task_ibfk_2`);
		await queryRunner.query(
			`ALTER TABLE task ADD CONSTRAINT task_ibfk_1 FOREIGN KEY (columnId) REFERENCES column (id)`
		);
		await queryRunner.query(
			`ALTER TABLE columns DROP FOREIGN KEY columns_ibfk_2`
		);
		await queryRunner.query(
			`ALTER TABLE columns ADD CONSTRAINT columns_ibfk_1 FOREIGN KEY (projectId) REFERENCES project (id)`
		);

		await queryRunner.query(
			`ALTER TABLE project ADD FOREIGN KEY project_ibfk_1 (ownerId) REFERENCES user (id)`
		);
	}
}
