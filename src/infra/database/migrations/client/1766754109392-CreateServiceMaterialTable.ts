import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateServiceMaterialTable1766754109392 implements MigrationInterface {
    name = 'CreateServiceMaterialTable1766754109392'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "service_materials" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" integer, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedBy" integer, "deletedAt" TIMESTAMP, "deletedBy" integer, "id" SERIAL NOT NULL, "serviceId" integer NOT NULL, "stockId" integer NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "PK_64dd95763ab3e0596441543d4ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "service_materials" ADD CONSTRAINT "FK_3c4f99d22a0cf321ef234bee9e7" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service_materials" ADD CONSTRAINT "FK_e72ecbccb9d56571baa70c023b0" FOREIGN KEY ("stockId") REFERENCES "stock_items"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service_materials" DROP CONSTRAINT "FK_e72ecbccb9d56571baa70c023b0"`);
        await queryRunner.query(`ALTER TABLE "service_materials" DROP CONSTRAINT "FK_3c4f99d22a0cf321ef234bee9e7"`);
        await queryRunner.query(`DROP TABLE "service_materials"`);
    }

}
