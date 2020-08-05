import { Document } from 'mongoose';

export interface IAppointment extends Document {
  name: string;
  date: Date;
  description?: string;
  author: string;
  involved: string[];
}
