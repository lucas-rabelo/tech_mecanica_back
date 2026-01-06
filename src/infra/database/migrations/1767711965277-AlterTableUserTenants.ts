import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableUserTenants1767711965277 implements MigrationInterface {
    name = 'AlterTableUserTenants1767711965277'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_tenants" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user_tenants" DROP CONSTRAINT "UQ_0a6bf876b64600b3a9fce30f317"`);
        await queryRunner.query(`ALTER TABLE "user_tenants" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user_tenants" DROP COLUMN "birthDate"`);
        await queryRunner.query(`ALTER TABLE "user_tenants" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "user_tenants" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user_tenants" DROP CONSTRAINT "UQ_69344007ce34fcb2ad153d64cbe"`);
        await queryRunner.query(`ALTER TABLE "user_tenants" DROP COLUMN "document"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_tenants" ADD "document" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_tenants" ADD CONSTRAINT "UQ_69344007ce34fcb2ad153d64cbe" UNIQUE ("document")`);
        await queryRunner.query(`ALTER TABLE "user_tenants" ADD "password" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_tenants" ADD "phone" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_tenants" ADD "birthDate" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_tenants" ADD "email" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_tenants" ADD CONSTRAINT "UQ_0a6bf876b64600b3a9fce30f317" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "user_tenants" ADD "name" character varying(255) NOT NULL`);
    }

}
