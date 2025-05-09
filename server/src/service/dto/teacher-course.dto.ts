/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { TeacherDTO } from './teacher.dto';
import { CourseDTO } from './course.dto';

/**
 * A TeacherCourseDTO object.
 */
export class TeacherCourseDTO extends BaseDTO {
  @ApiProperty({ type: () => TeacherDTO, description: 'teacher relationship' })
  teacher: TeacherDTO;

  @ApiProperty({ type: () => CourseDTO, description: 'course relationship' })
  course: CourseDTO;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
