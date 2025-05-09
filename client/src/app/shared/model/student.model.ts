import { IUser } from 'app/shared/model/user.model';

export interface IStudent {
  id?: number;
  user?: IUser | null;
}

export const defaultValue: Readonly<IStudent> = {};
