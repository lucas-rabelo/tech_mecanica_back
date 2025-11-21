import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class Migrate1763498235193 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tenants',
      new TableColumn({
        name: 'tenantStatusId',
        type: 'int',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'tenants',
      new TableForeignKey({
        columnNames: ['tenantStatusId'],
        referencedTableName: 'tenant_status',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
      }),
    );
  }
}
