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

	public async getAppointmentsByMonth(month: number): Promise<IAppointment[] | null> {
		const queryProject = {
			'$project': {
				'month': { '$month': '$date' },
				'day': { '$dayOfMonth': '$date'},
				'description': 1,
				'author': 1
			}
		};

		const queryMatch = {
			'$match': {month: month}
		}

		try {
      const foundModel: IAppointment[] = await Appointment.aggregate([queryProject, queryMatch]).exec();
      return foundModel;
    } catch (err) {
      console.log(err);
      return null;
    }
	}
}

const appointmentService = AppointmentService.getInstance();
export default appointmentService;
