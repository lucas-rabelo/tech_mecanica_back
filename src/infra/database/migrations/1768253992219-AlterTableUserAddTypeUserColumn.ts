import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableUserAddTypeUserColumn1768253992219 implements MigrationInterface {
    name = 'AlterTableUserAddTypeUserColumn1768253992219'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_typeuser_enum" AS ENUM('ADMIN', 'SUPPORT', 'USER')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "typeUser" "public"."users_typeuser_enum" NOT NULL DEFAULT 'USER'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "typeUser"`);
        await queryRunner.query(`DROP TYPE "public"."users_typeuser_enum"`);
    }

}
