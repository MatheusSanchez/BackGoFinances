import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpdatingTableCategory1595857214862 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn('categories', new TableColumn({
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
        }))
        await queryRunner.addColumn('categories', new TableColumn({
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('categories', 'created_at');
        await queryRunner.dropColumn('categories', 'updated_at');
    }

}
