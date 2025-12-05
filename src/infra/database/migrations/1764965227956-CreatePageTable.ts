import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePageTable1764965227956 implements MigrationInterface {
    name = 'CreatePageTable1764965227956'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pages" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "moduleId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, CONSTRAINT "PK_8f21ed625aa34c8391d636b7d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pages" ADD CONSTRAINT "FK_da71d4c7fa909fc799dacc6e2b0" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pages" DROP CONSTRAINT "FK_da71d4c7fa909fc799dacc6e2b0"`);
        await queryRunner.query(`DROP TABLE "pages"`);
    }

}
