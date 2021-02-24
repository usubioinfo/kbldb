import mongoose, { Schema, Model } from 'mongoose';
import { IUptime } from '@models/uptime.model';

const UptimeSchema: Schema = new Schema({
	name: {type: String, required: true},
	link: {type: String, required: true},
	availability: {type: String, required: true}
},{
	minimize: false
});

export const Uptime: Model<IUptime> = mongoose.model<IUptime>('Uptime', UptimeSchema);
