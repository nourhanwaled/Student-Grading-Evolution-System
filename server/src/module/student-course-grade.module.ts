import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentCourseGradeController } from '../web/rest/student-course-grade.controller';
import { StudentCourseGradeRepository } from '../repository/student-course-grade.repository';
import { StudentCourseGradeService } from '../service/student-course-grade.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudentCourseGradeRepository])],
  controllers: [StudentCourseGradeController],
  providers: [StudentCourseGradeService],
  exports: [StudentCourseGradeService],
})
export class StudentCourseGradeModule {}
