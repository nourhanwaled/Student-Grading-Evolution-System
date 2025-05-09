/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Student } from './student.entity';
import { Course } from './course.entity';

/**
 * A StudentCourse.
 */
@Entity('student_course')
export class StudentCourse extends BaseEntity {
  @ManyToOne(type => Student)
  student: Student;

  @ManyToOne(type => Course)
  course: Course;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
