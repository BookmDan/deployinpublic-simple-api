import { MigrationInterface, QueryRunner } from "typeorm";

export class EditTodosTable1722137732868 implements MigrationInterface {
    name = 'EditTodosTable1722137732868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" ADD "title" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "title"`);
    }

}
