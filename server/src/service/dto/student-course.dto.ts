/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { StudentDTO } from './student.dto';
import { CourseDTO } from './course.dto';

/**
 * A StudentCourseDTO object.
 */
export class StudentCourseDTO extends BaseDTO {
  @ApiProperty({ type: () => StudentDTO, description: 'student relationship' })
  student: StudentDTO;

  @ApiProperty({ type: () => CourseDTO, description: 'course relationship' })
  course: CourseDTO;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
