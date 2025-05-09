/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { StudentCourseDTO } from './student-course.dto';
import { StudentCourseGradeDTO } from './student-course-grade.dto';

import { UserDTO } from './user.dto';

/**
 * A StudentDTO object.
 */
export class StudentDTO extends BaseDTO {
  @ApiProperty({ type: () => UserDTO, description: 'user relationship' })
  user: UserDTO;

  @ApiProperty({ type: () => StudentCourseDTO, isArray: true, description: 'studentCourses relationship' })
  studentCourses: StudentCourseDTO[];

  @ApiProperty({ type: () => StudentCourseGradeDTO, isArray: true, description: 'studentCourseGrades relationship' })
  studentCourseGrades: StudentCourseGradeDTO[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
