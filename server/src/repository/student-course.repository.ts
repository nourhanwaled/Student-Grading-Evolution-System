import { EntityRepository, Repository } from 'typeorm';
import { StudentCourse } from '../domain/student-course.entity';

@EntityRepository(StudentCourse)
export class StudentCourseRepository extends Repository<StudentCourse> {}
