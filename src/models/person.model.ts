import { Document } from 'mongoose';

export interface IPerson extends Document {
  name: string;
  password: string;

  // 0 is the highest
  permission: number;
  username: string;
  changedPassword: boolean;
}
