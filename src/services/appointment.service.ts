import { IAppointment } from '@models/appointment.model';
import { Appointment } from '@schemas/appointment.schema';
import { ModelService } from '@classes/model.service.class';

class AppointmentService extends ModelService<IAppointment> {
	private static instance: AppointmentService;
	
	private constructor() {
		super(Appointment);
	}
	
	public static getInstance(): AppointmentService {
		if (!AppointmentService.instance) {
			AppointmentService.instance = new AppointmentService();
		}
		
		return AppointmentService.instance;
	}
}

const appointmentService = AppointmentService.getInstance();
export default appointmentService;
