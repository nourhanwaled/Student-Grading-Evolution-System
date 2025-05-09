import { IUser } from 'app/shared/model/user.model';

export interface ITeacher {
  id?: number;
  user?: IUser | null;
}

export const defaultValue: Readonly<ITeacher> = {};
