import { Document } from 'mongoose';

export interface IUptime extends Document {
  name: string,
  link: string,
  availability: string,
  time: number
}
