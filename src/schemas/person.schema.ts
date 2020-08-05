import mongoose, { Schema, Model } from 'mongoose';
import { IPerson } from '@models/person.model';

const PersonSchema: Schema = new Schema({
	name: {type: String, required: true},
	password: {type: String, required: true},
	permission: {type: Number, required: true},
	username: {type: String, required: true},
	changedPassword: {type: Boolean, required: true}
},{
	minimize: false
});

export const Person: Model<IPerson> = mongoose.model<IPerson>('Person', PersonSchema);
