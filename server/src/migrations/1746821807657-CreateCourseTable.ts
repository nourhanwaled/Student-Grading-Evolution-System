import { baseColumns } from '../helpers/migration-base';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';


export class CreateCourseTable1746821807657 implements MigrationInterface {

    private table = 'course';
     public async up(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.createTable(
         new Table({
           name: this.table,
           columns: [
             ...baseColumns,
             {
               name: 'userId',
               type: 'int4',
               isNullable: true,
             },
             {
               name: 'name',
               type: 'varchar',
               isNullable: true,
             },
             {
               name: 'description',
               type: 'varchar',
               isNullable: true,
             },
           ],
         }),
         false,
       );

     }

     public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.query(`DROP TABLE ${this.table}`);
     }

}
