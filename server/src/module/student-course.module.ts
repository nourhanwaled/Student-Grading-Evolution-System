import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentCourseController } from '../web/rest/student-course.controller';
import { StudentCourseRepository } from '../repository/student-course.repository';
import { StudentCourseService } from '../service/student-course.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudentCourseRepository])],
  controllers: [StudentCourseController],
  providers: [StudentCourseService],
  exports: [StudentCourseService],
})
export class StudentCourseModule {}
