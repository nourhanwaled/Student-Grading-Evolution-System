import { baseColumns } from '../helpers/migration-base';
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTeacherTable1746821780479 implements MigrationInterface {

    private table = 'teacher';
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
           ],
         }),
         false,
       );
       await queryRunner.createForeignKey(
         this.table,
         new TableForeignKey({
           columnNames: ['userId'],
           referencedColumnNames: ['id'],
           referencedTableName: 'jhi_user',
           onDelete: 'CASCADE',
         }),
       );
     }

     public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.query(`DROP TABLE ${this.table}`);
     }
}
