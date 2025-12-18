import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInventoryMovementTable1766093023030 implements MigrationInterface {
    name = 'CreateInventoryMovementTable1766093023030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."inventory_movement_type_enum" AS ENUM('ENTRY', 'EXIT', 'ADJUSTMENT', 'TRANSFER')`);
        await queryRunner.query(`CREATE TYPE "public"."inventory_movement_reason_enum" AS ENUM('PURCHASE', 'SALE', 'SERVICE', 'LOSS', 'INVENTORY', 'RETURN')`);
        await queryRunner.query(`CREATE TYPE "public"."inventory_movement_referencetype_enum" AS ENUM('OS', 'MANUAL', 'INVENTORY', 'PURCHASE')`);
        await queryRunner.query(`CREATE TABLE "inventory_movement" ("id" SERIAL NOT NULL, "stockItemId" integer NOT NULL, "type" "public"."inventory_movement_type_enum" NOT NULL, "quantity" integer NOT NULL, "balanceAfter" integer NOT NULL, "reason" "public"."inventory_movement_reason_enum" NOT NULL, "description" text NOT NULL, "referenceType" "public"."inventory_movement_referencetype_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" integer, CONSTRAINT "PK_e17362693c889da517444ad8fb5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "inventory_movement" ADD CONSTRAINT "FK_34e0b808814cc65296f9d09a063" FOREIGN KEY ("stockItemId") REFERENCES "stock_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory_movement" DROP CONSTRAINT "FK_34e0b808814cc65296f9d09a063"`);
        await queryRunner.query(`DROP TABLE "inventory_movement"`);
        await queryRunner.query(`DROP TYPE "public"."inventory_movement_referencetype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."inventory_movement_reason_enum"`);
        await queryRunner.query(`DROP TYPE "public"."inventory_movement_type_enum"`);
    }

}
