import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Migrate1762953802277 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
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
                    name: 'email',
                    type: 'varchar',
                    length: '255',
                    isUnique: true,
                },
                {
                    name: 'password',
                    type: 'text',
                },
                {
                    name: 'userStatusId',
                    type: 'int',
                },
                {
                    name: 'permissionId',
                    type: 'int',
                },
                {
                    name: 'tenantId',
                    type: 'int',
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
                    columnNames: ['userStatusId'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'user_status',
                    onDelete: 'NO ACTION',
                    onUpdate: 'NO ACTION',
                },
                {
                    columnNames: ['permissionId'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'permissions',
                    onDelete: 'NO ACTION',
                    onUpdate: 'NO ACTION',
                },
                {
                    columnNames: ['tenantId'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'tenants',
                    onDelete: 'NO ACTION',
                    onUpdate: 'NO ACTION',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
