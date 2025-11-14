import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Migrate1762953620804 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tenants',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'tenantStatusId',
                    type: 'int',
                },
                {
                    name: 'subdomain',
                    type: 'varchar',
                    length: '255',
                    isUnique: true,
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    isNullable: true,
                    default: null,
                },
                {
                    name: 'deletedAt',
                    type: 'timestamp',
                    isNullable: true,
                    default: null,
                },
            ],
            foreignKeys: [
                {
                    columnNames: ['tenantStatusId'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'tenant_status',
                    onDelete: 'NO ACTION',
                    onUpdate: 'NO ACTION',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tenants');
    }

}
