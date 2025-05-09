import { baseColumns } from '../helpers/migration-base';
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';


export class CreateTeacherCourse1746822078479 implements MigrationInterface {

      private table = 'teacher_course';
        public async up(queryRunner: QueryRunner): Promise<void> {
          await queryRunner.createTable(
            new Table({
              name: this.table,
              columns: [
                ...baseColumns,
                {
                  name: 'teacherId',
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
              columnNames: ['teacherId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'teacher',
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
