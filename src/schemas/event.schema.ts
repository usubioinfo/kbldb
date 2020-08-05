import mongoose, { Schema, Model } from 'mongoose';
import { IEvent } from '@models/event.model';

const EventSchema: Schema = new Schema({
	name: {type: String, required: true},
	date: {type: Date, required: true},
	description: {type: String, required: false},
	author: {type: String, required: true}
},{
	minimize: false
});

export const Event: Model<IEvent> = mongoose.model<IEvent>('Event', EventSchema);
