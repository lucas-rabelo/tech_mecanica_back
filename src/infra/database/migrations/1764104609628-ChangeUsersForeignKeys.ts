import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeUsersForeignKeys1764104609628 implements MigrationInterface {
    name = 'ChangeUsersForeignKeys1764104609628'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_c58f7e88c286e5e3478960a998b"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_fba1d16d693fbc4fa7becb96a8e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_65d6e2212d2d112bbddf56326df"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "REL_c58f7e88c286e5e3478960a998"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "REL_fba1d16d693fbc4fa7becb96a8"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "REL_65d6e2212d2d112bbddf56326d"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_c58f7e88c286e5e3478960a998b" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_fba1d16d693fbc4fa7becb96a8e" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_65d6e2212d2d112bbddf56326df" FOREIGN KEY ("userStatusId") REFERENCES "user_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_65d6e2212d2d112bbddf56326df"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_fba1d16d693fbc4fa7becb96a8e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_c58f7e88c286e5e3478960a998b"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "REL_65d6e2212d2d112bbddf56326d" UNIQUE ("userStatusId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "REL_fba1d16d693fbc4fa7becb96a8" UNIQUE ("permissionId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "REL_c58f7e88c286e5e3478960a998" UNIQUE ("tenantId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_65d6e2212d2d112bbddf56326df" FOREIGN KEY ("userStatusId") REFERENCES "user_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_fba1d16d693fbc4fa7becb96a8e" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_c58f7e88c286e5e3478960a998b" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
