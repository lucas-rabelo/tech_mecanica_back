import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class Migrate1763123415863 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "permissions",
      "updatedAt",
      new TableColumn({
        name: "updatedAt",
        type: "timestamp",
        isNullable: true,
      })
    );

    await queryRunner.changeColumn(
      "permissions",
      "deletedAt",
      new TableColumn({
        name: "deletedAt",
        type: "timestamp",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "permissions",
      "updatedAt",
      new TableColumn({
        name: "updatedAt",
        type: "timestamp",
        isNullable: false,
      })
    );

    await queryRunner.changeColumn(
      "permissions",
      "deletedAt",
      new TableColumn({
        name: "deletedAt",
        type: "timestamp",
        isNullable: false,
      })
    );
  }

}
