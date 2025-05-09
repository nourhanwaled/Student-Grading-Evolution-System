/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Student } from './student.entity';
import { Course } from './course.entity';

/**
 * A StudentCourseGrade.
 */
@Entity('student_course_grade')
export class StudentCourseGrade extends BaseEntity {
  @Column({ type: 'float', name: 'score', nullable: true })
  score: number;

  @ManyToOne(type => Student)
  student: Student;

  @ManyToOne(type => Course)
  course: Course;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
