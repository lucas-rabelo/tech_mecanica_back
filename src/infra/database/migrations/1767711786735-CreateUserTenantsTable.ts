import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTenantsTable1767711786735 implements MigrationInterface {
    name = 'CreateUserTenantsTable1767711786735'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_tenants" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "birthDate" date NOT NULL, "phone" character varying(20) NOT NULL, "password" text NOT NULL, "document" character varying(20) NOT NULL, "tenantId" integer NOT NULL, "permissionId" integer NOT NULL, "userId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, CONSTRAINT "UQ_0a6bf876b64600b3a9fce30f317" UNIQUE ("email"), CONSTRAINT "UQ_69344007ce34fcb2ad153d64cbe" UNIQUE ("document"), CONSTRAINT "PK_aff681c6ee0171ce3cb116ea83f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "tenantId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "permissionId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_c58f7e88c286e5e3478960a998b" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_fba1d16d693fbc4fa7becb96a8e" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_tenants" ADD CONSTRAINT "FK_59a6c0786d010c6e563e77171d9" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_tenants" ADD CONSTRAINT "FK_83c922301e3d8803860903bb542" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_tenants" ADD CONSTRAINT "FK_0d56681b9dacffb884dfd16d9c5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_tenants" DROP CONSTRAINT "FK_0d56681b9dacffb884dfd16d9c5"`);
        await queryRunner.query(`ALTER TABLE "user_tenants" DROP CONSTRAINT "FK_83c922301e3d8803860903bb542"`);
        await queryRunner.query(`ALTER TABLE "user_tenants" DROP CONSTRAINT "FK_59a6c0786d010c6e563e77171d9"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_fba1d16d693fbc4fa7becb96a8e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_c58f7e88c286e5e3478960a998b"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "permissionId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "tenantId"`);
        await queryRunner.query(`DROP TABLE "user_tenants"`);
    }

}
