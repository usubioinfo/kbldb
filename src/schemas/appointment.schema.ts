import mongoose, { Schema, Model } from 'mongoose';
import { IAppointment } from '@models/appointment.model';

const AppointmentSchema: Schema = new Schema({
	date: {type: Date, required: true},
	description: {type: String, required: false},
	author: {type: String, required: true},
	involved: [{type: String, required: false}]
},{
	minimize: false
});

export const Appointment: Model<IAppointment> = mongoose.model<IAppointment>('Appointment', AppointmentSchema);
