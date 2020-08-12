import { Document } from 'mongoose';

export interface IAppointment extends Document {
  date: Date;
  description?: string;
  author: string;
  involved?: string[];
}
