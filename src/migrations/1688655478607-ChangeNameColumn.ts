import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeNameColumn1688655478607 implements MigrationInterface {
    name = 'ChangeNameColumn1688655478607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "deleteAt" TO "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "real_estate" ALTER COLUMN "sold" SET DEFAULT 'false'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate" ALTER COLUMN "sold" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "deletedAt" TO "deleteAt"`);
    }

}
