import { EntityRepository, Repository } from 'typeorm';
import { StudentCourseGrade } from '../domain/student-course-grade.entity';

@EntityRepository(StudentCourseGrade)
export class StudentCourseGradeRepository extends Repository<StudentCourseGrade> {}
