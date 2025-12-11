import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterCustomerTable1765475463522 implements MigrationInterface {
    name = 'AlterCustomerTable1765475463522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" ADD "document" character varying(14) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "customerType" character varying(2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customers" ALTER COLUMN "isWhatsapp" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "customers" ALTER COLUMN "backupPhone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customers" ALTER COLUMN "ownerBackupPhone" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" ALTER COLUMN "ownerBackupPhone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customers" ALTER COLUMN "backupPhone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customers" ALTER COLUMN "isWhatsapp" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "customerType"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "document"`);
    }

}
