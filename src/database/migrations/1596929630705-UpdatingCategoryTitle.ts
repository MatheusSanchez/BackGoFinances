import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpdatingCategoryTitle1596929630705 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('categories', 'category_name');

        await queryRunner.addColumn('categories', new TableColumn({
            name: 'title',
            type: 'varchar',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('categories', 'title');
        await queryRunner.addColumn('categories', new TableColumn({
            name: 'category_name',
            type: 'varchar',
            isNullable: false,
        }));
    }



}
