import { EntityRepository, Repository } from 'typeorm';
import { Teacher } from '../domain/teacher.entity';

@EntityRepository(Teacher)
export class TeacherRepository extends Repository<Teacher> {}
