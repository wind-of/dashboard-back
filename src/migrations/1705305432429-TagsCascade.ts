import { MigrationInterface, QueryRunner } from "typeorm";

export class TagsCascade1705305432429 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			ALTER TABLE tags DROP FOREIGN KEY tags_ibfk_1;
		`);
		await queryRunner.query(`
			ALTER TABLE tags DROP FOREIGN KEY tags_ibfk_2;
		`);
		await queryRunner.query(`
			ALTER TABLE tags ADD CONSTRAINT tags_ibfk_1 FOREIGN KEY (projectId) REFERENCES projects (id) ON DELETE CASCADE;
		`);
		await queryRunner.query(`
			ALTER TABLE tags ADD CONSTRAINT tags_ibfk_2 FOREIGN KEY (taskId) REFERENCES tasks (id) ON DELETE CASCADE;
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			ALTER TABLE tags DROP FOREIGN KEY tags_ibfk_1;
		`);
		await queryRunner.query(`
			ALTER TABLE tags DROP FOREIGN KEY tags_ibfk_2;
		`);
		await queryRunner.query(`
			ALTER TABLE tags ADD CONSTRAINT tags_ibfk_1 FOREIGN KEY (projectId) REFERENCES projects (id);
		`);
		await queryRunner.query(`
			ALTER TABLE tags ADD CONSTRAINT tags_ibfk_2 FOREIGN KEY (taskId) REFERENCES tasks (id);
		`);
	}
}
