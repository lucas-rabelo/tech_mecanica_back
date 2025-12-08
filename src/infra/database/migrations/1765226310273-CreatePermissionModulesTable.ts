import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePermissionModulesTable1765226310273 implements MigrationInterface {
    name = 'CreatePermissionModulesTable1765226310273'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permission_modules" ("id" SERIAL NOT NULL, "permissionId" integer NOT NULL, "moduleId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, CONSTRAINT "PK_5c48abacc03bd94e1d0b52a96ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "permission_modules" ADD CONSTRAINT "FK_36431fa0c25353eb1f12a89dc63" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permission_modules" ADD CONSTRAINT "FK_c3d2c940b59c2bf6eb09ab61755" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission_modules" DROP CONSTRAINT "FK_c3d2c940b59c2bf6eb09ab61755"`);
        await queryRunner.query(`ALTER TABLE "permission_modules" DROP CONSTRAINT "FK_36431fa0c25353eb1f12a89dc63"`);
        await queryRunner.query(`DROP TABLE "permission_modules"`);
    }

}
