import { IStudent } from 'app/shared/model/student.model';
import { ICourse } from 'app/shared/model/course.model';

export interface IStudentCourseGrade {
  id?: number;
  score?: number | null;
  student?: IStudent | null;
  course?: ICourse | null;
}

export const defaultValue: Readonly<IStudentCourseGrade> = {};
