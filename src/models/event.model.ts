import { Document } from 'mongoose';

export interface IEvent extends Document {
  name: string;
  date: Date;
  description?: string;
  author: string;
}
