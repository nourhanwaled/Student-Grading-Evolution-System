/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { TeacherCourseDTO } from './teacher-course.dto';

import { UserDTO } from './user.dto';

/**
 * A TeacherDTO object.
 */
export class TeacherDTO extends BaseDTO {
  @ApiProperty({ type: () => UserDTO, description: 'user relationship' })
  user: UserDTO;

  @ApiProperty({ type: () => TeacherCourseDTO, isArray: true, description: 'teacherCourses relationship' })
  teacherCourses: TeacherCourseDTO[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
