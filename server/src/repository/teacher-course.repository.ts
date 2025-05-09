import { EntityRepository, Repository } from 'typeorm';
import { TeacherCourse } from '../domain/teacher-course.entity';

@EntityRepository(TeacherCourse)
export class TeacherCourseRepository extends Repository<TeacherCourse> {}
