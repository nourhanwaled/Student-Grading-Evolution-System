/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { StudentCourse } from './student-course.entity';
import { TeacherCourse } from './teacher-course.entity';
import { StudentCourseGrade } from './student-course-grade.entity';

/**
 * A Course.
 */
@Entity('course')
export class Course extends BaseEntity {
  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @OneToMany(type => StudentCourse, other => other.course)
  studentCourses: StudentCourse[];

  @OneToMany(type => TeacherCourse, other => other.course)
  teacherCourses: TeacherCourse[];

  @OneToMany(type => StudentCourseGrade, other => other.course)
  studentCourseGrades: StudentCourseGrade[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
