import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCustomerTable1765393388671 implements MigrationInterface {
    name = 'CreateCustomerTable1765393388671'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customers" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "phone" character varying(14) NOT NULL, "isWhatsapp" boolean NOT NULL, "backupPhone" character varying(14) NOT NULL, "ownerBackupPhone" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "customers"`);
    }

}
