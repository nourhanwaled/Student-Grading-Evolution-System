/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { StudentCourseDTO } from './student-course.dto';
import { TeacherCourseDTO } from './teacher-course.dto';
import { StudentCourseGradeDTO } from './student-course-grade.dto';

/**
 * A CourseDTO object.
 */
export class CourseDTO extends BaseDTO {
  @ApiProperty({ description: 'name field', required: false })
  name: string;

  @ApiProperty({ description: 'description field', required: false })
  description: string;

  @ApiProperty({ type: () => StudentCourseDTO, isArray: true, description: 'studentCourses relationship' })
  studentCourses: StudentCourseDTO[];

  @ApiProperty({ type: () => TeacherCourseDTO, isArray: true, description: 'teacherCourses relationship' })
  teacherCourses: TeacherCourseDTO[];

  @ApiProperty({ type: () => StudentCourseGradeDTO, isArray: true, description: 'studentCourseGrades relationship' })
  studentCourseGrades: StudentCourseGradeDTO[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
