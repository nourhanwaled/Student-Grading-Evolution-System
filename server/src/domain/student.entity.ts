/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { StudentCourse } from './student-course.entity';
import { StudentCourseGrade } from './student-course-grade.entity';

import { User } from './user.entity';

/**
 * A Student.
 */
@Entity('student')
export class Student extends BaseEntity {
  @OneToOne(type => User)
  @JoinColumn()
  user: User;

  @OneToMany(type => StudentCourse, other => other.student)
  studentCourses: StudentCourse[];

  @OneToMany(type => StudentCourseGrade, other => other.student)
  studentCourseGrades: StudentCourseGrade[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
