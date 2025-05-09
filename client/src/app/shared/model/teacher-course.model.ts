import { ITeacher } from 'app/shared/model/teacher.model';
import { ICourse } from 'app/shared/model/course.model';

export interface ITeacherCourse {
  id?: number;
  teacher?: ITeacher | null;
  course?: ICourse | null;
}

export const defaultValue: Readonly<ITeacherCourse> = {};
