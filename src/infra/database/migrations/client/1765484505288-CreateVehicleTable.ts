import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVehicleTable1765484505288 implements MigrationInterface {
    name = 'CreateVehicleTable1765484505288'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vehicles" ("id" SERIAL NOT NULL, "licensePlate" character varying(255) NOT NULL, "brand" character varying(255) NOT NULL, "model" character varying(255) NOT NULL, "year" character varying(4) NOT NULL, "color" character varying(255) NOT NULL, "currentMileage" integer NOT NULL, "customerId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, CONSTRAINT "UQ_79a273823977d25c7523162cd5a" UNIQUE ("licensePlate"), CONSTRAINT "UQ_2af2b1382c2b8ecbbd77792319f" UNIQUE ("brand"), CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_ddb00709ac9788b3ded9296f2a8" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_ddb00709ac9788b3ded9296f2a8"`);
        await queryRunner.query(`DROP TABLE "vehicles"`);
    }

}
