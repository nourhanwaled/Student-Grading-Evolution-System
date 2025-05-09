export interface ICourse {
  id?: number;
  name?: string | null;
  description?: string | null;
}

export const defaultValue: Readonly<ICourse> = {};
