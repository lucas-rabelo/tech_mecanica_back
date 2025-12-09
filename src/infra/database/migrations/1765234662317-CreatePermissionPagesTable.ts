import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePermissionPagesTable1765234662317 implements MigrationInterface {
    name = 'CreatePermissionPagesTable1765234662317'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permission_pages" ("id" SERIAL NOT NULL, "permissionId" integer NOT NULL, "pageId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, CONSTRAINT "PK_a8d5e20ef0173d7b0af7247b70d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "permission_pages" ADD CONSTRAINT "FK_5cfbd9d02473bdc296a81fda243" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permission_pages" ADD CONSTRAINT "FK_8311f36bae0eb4481a325954e25" FOREIGN KEY ("pageId") REFERENCES "pages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission_pages" DROP CONSTRAINT "FK_8311f36bae0eb4481a325954e25"`);
        await queryRunner.query(`ALTER TABLE "permission_pages" DROP CONSTRAINT "FK_5cfbd9d02473bdc296a81fda243"`);
        await queryRunner.query(`DROP TABLE "permission_pages"`);
    }

}
