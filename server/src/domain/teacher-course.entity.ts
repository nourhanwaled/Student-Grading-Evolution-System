/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Teacher } from './teacher.entity';
import { Course } from './course.entity';

/**
 * A TeacherCourse.
 */
@Entity('teacher_course')
export class TeacherCourse extends BaseEntity {
  @ManyToOne(type => Teacher)
  teacher: Teacher;

  @ManyToOne(type => Course)
  course: Course;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
