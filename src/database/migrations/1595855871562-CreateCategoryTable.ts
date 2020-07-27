import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateCategoryTable1595855871562 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'category',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'category_name',
                    type: 'varchar',
                    isNullable: false,
                }
            ]
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('category');
    }

}
