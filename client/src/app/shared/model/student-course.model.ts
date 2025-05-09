import { IStudent } from 'app/shared/model/student.model';
import { ICourse } from 'app/shared/model/course.model';

export interface IStudentCourse {
  id?: number;
  student?: IStudent | null;
  course?: ICourse | null;
}

export const defaultValue: Readonly<IStudentCourse> = {};
