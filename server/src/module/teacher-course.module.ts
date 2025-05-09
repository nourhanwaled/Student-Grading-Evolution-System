import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherCourseController } from '../web/rest/teacher-course.controller';
import { TeacherCourseRepository } from '../repository/teacher-course.repository';
import { TeacherCourseService } from '../service/teacher-course.service';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherCourseRepository])],
  controllers: [TeacherCourseController],
  providers: [TeacherCourseService],
  exports: [TeacherCourseService],
})
export class TeacherCourseModule {}
