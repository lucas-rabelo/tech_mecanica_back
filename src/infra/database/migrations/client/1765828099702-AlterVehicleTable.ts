import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterVehicleTable1765828099702 implements MigrationInterface {
    name = 'AlterVehicleTable1765828099702'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "createdBy" integer`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "updatedBy" integer`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "deletedBy" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "deletedBy"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "createdBy"`);
    }

}
