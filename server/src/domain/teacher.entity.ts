/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { TeacherCourse } from './teacher-course.entity';

import { User } from './user.entity';

/**
 * A Teacher.
 */
@Entity('teacher')
export class Teacher extends BaseEntity {
  @OneToOne(type => User)
  @JoinColumn()
  user: User;

  @OneToMany(type => TeacherCourse, other => other.teacher)
  teacherCourses: TeacherCourse[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
