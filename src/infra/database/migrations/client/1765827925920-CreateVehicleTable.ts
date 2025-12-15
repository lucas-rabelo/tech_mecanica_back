import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVehicleTable1765827925920 implements MigrationInterface {
    name = 'CreateVehicleTable1765827925920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" ADD "createdBy" integer`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "updatedBy" integer`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "deletedBy" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "deletedBy"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "createdBy"`);
    }

}
