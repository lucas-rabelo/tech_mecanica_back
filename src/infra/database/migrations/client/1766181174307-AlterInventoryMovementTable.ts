import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterInventoryMovementTable1766181174307 implements MigrationInterface {
    name = 'AlterInventoryMovementTable1766181174307'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory_movement" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "inventory_movement" ADD "updatedBy" integer`);
        await queryRunner.query(`ALTER TABLE "inventory_movement" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "inventory_movement" ADD "deletedBy" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory_movement" DROP COLUMN "deletedBy"`);
        await queryRunner.query(`ALTER TABLE "inventory_movement" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "inventory_movement" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "inventory_movement" DROP COLUMN "updatedAt"`);
    }

}
