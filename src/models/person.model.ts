import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPerson extends Document {
  name: string;
  password: string;

  // 0 is the highest
  permission: number;
  username: string;
}

const PersonSchema: Schema = new Schema({
  name: {type: String, required: true},
  password: {type: String, required: true},
  permission: {type: Number, required: true},
  username: {type: String, required: true}
}, {
  minimize: false
});

export const Person: Model<IPerson> = mongoose.model<IPerson>('Person', PersonSchema);
