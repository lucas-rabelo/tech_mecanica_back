import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableUsers1767712432279 implements MigrationInterface {
    name = 'AlterTableUsers1767712432279'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_c58f7e88c286e5e3478960a998b"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_fba1d16d693fbc4fa7becb96a8e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "tenantId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "permissionId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "permissionId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "tenantId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_fba1d16d693fbc4fa7becb96a8e" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_c58f7e88c286e5e3478960a998b" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
