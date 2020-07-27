import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UpdateIdPkFromTransactions1595852897955 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('transactions');

        await queryRunner.createTable(new Table({
            name: 'transactions',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'title',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'value',
                    type: 'int', // values can be float
                    isNullable: false,
                },
                {
                    name: 'type',
                    type: 'varchar', // type can be just two strings 'income,outcome'
                    isNullable: false,
                },
                {
                    name: 'category_id',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                },

            ]
        }));


    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('transactions');

        await queryRunner.createTable(new Table({
            name: 'transactions',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'title',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'value',
                    type: 'int', // values can be float
                    isNullable: false,
                },
                {
                    name: 'type',
                    type: 'varchar', // type can be just two strings 'income,outcome'
                    isNullable: false,
                },
                {
                    name: 'category_id',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                },

            ]
        }));
    }

}
