import { IUptime } from '@models/uptime.model';
import { Uptime } from '@schemas/uptime.schema';
import { ModelService } from '@classes/model.service.class';

class UptimeService extends ModelService<IUptime> {
	private static instance: UptimeService;

	private constructor() {
		super(Uptime);
	}

	public static getInstance(): UptimeService {
		if (!UptimeService.instance) {
			UptimeService.instance = new UptimeService();
		}

		return UptimeService.instance;
	}

  public async getAllToolData(tools: string[]): Promise<IUptime[]> {
    const toolAggregate: IUptime[] = [];
    for (const tool of tools) {
      const toolData = await Uptime.findOne({name: tool}).sort({_id: -1});
      toolAggregate.push(toolData as IUptime);
    }

    return toolAggregate;
  }
}

const uptimeService = UptimeService.getInstance();
export default uptimeService;
