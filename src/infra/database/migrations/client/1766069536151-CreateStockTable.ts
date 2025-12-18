import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStockTable1766069536151 implements MigrationInterface {
    name = 'CreateStockTable1766069536151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stock_items" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" integer, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedBy" integer, "deletedAt" TIMESTAMP, "deletedBy" integer, "id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "sku" character varying(255) NOT NULL, "barcode" text NOT NULL, "unit" character varying(255) NOT NULL, "location" character varying(2) NOT NULL, "minQuantity" integer NOT NULL, "currentQuantity" integer NOT NULL, "notes" text NOT NULL, "isActive" boolean NOT NULL, CONSTRAINT "UQ_c427528a56ee9c7e24fdf6edd1f" UNIQUE ("sku"), CONSTRAINT "PK_52a266aa3e04b8ad1f01088f3f0" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "stock_items"`);
    }

}
