import appointmentService from '@services/appointment.service';
import { Request, Response } from 'express';
import { Appointment } from '@schemas/appointment.schema';

export const getAppointmentsByMonthRoute = async (req: Request, res: Response) => {
  const month = parseInt(req.params.month, 10);
  if (!month) {
    return res.status(400).json({success: false, msg: 'Could not parse month'});
  }

  const appointments = await appointmentService.getAppointmentsByMonth(month);

  if (appointments) {
    return res.status(200).json({success: true, msg: 'Got appointments', payload: appointments});
  }

  return res.status(500).json({success: false, msg: 'Could not find appointments.'});
};
