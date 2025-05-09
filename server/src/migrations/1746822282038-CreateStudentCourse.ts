import { baseColumns } from '../helpers/migration-base';
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
export class CreateStudentCourse1746822282038 implements MigrationInterface {

       private table = 'student_course';
         public async up(queryRunner: QueryRunner): Promise<void> {
           await queryRunner.createTable(
             new Table({
               name: this.table,
               columns: [
                 ...baseColumns,
                 {
                   name: 'studentId',
                   type: 'int4',
                   isNullable: true,
                 },
                 {
                   name: 'courseId',
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
               columnNames: ['studentId'],
               referencedColumnNames: ['id'],
               referencedTableName: 'student',
               onDelete: 'CASCADE',
             }),
           );
              await queryRunner.createForeignKey(
             this.table,
             new TableForeignKey({
               columnNames: ['courseId'],
               referencedColumnNames: ['id'],
               referencedTableName: 'course',
               onDelete: 'CASCADE',
             }),
           );
         }

         public async down(queryRunner: QueryRunner): Promise<void> {
           await queryRunner.query(`DROP TABLE ${this.table}`);
         }

}
