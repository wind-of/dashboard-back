import { MigrationInterface, QueryRunner } from "typeorm";

export class PrimaryAndForeingKeys1703059179575 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			ALTER TABLE project ADD PRIMARY KEY (id);
			ALTER TABLE column ADD PRIMARY KEY (id);
			ALTER TABLE task ADD PRIMARY KEY (id);
			ALTER TABLE comment ADD PRIMARY KEY (id);
			ALTER TABLE member ADD PRIMARY KEY (id);
			ALTER TABLE user ADD PRIMARY KEY (id);
			
			ALTER TABLE column ADD FOREIGN KEY (projectId) REFERENCES project(id);
			ALTER TABLE task ADD FOREIGN KEY (columnId) REFERENCES column(id);
			ALTER TABLE comment ADD FOREIGN KEY (taskId) REFERENCES task(id);
			ALTER TABLE comment ADD FOREIGN KEY (userId) REFERENCES user(id);
			ALTER TABLE member ADD FOREIGN KEY (userId) REFERENCES user(id);
			ALTER TABLE member ADD FOREIGN KEY (projectId) REFERENCES project(id);
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			ALTER TABLE project DROP PRIMARY KEY;
			ALTER TABLE column DROP PRIMARY KEY;
			ALTER TABLE task DROP PRIMARY KEY;
			ALTER TABLE comment DROP PRIMARY KEY;
			ALTER TABLE member DROP PRIMARY KEY;
			ALTER TABLE user DROP PRIMARY KEY;

			ALTER TABLE column DROP FOREIGN KEY (projectId);
			ALTER TABLE task DROP FOREIGN KEY (columnId);
			ALTER TABLE comment DROP FOREIGN KEY (taskId);
			ALTER TABLE comment DROP FOREIGN KEY (userId);
			ALTER TABLE member DROP FOREIGN KEY (userId);
			ALTER TABLE member DROP FOREIGN KEY (projectId);
		`);
	}
}
