import UptimeService from '@services/uptime.service';
import { Uptime } from '@schemas/uptime.schema';

// Not meant to be called from the REST API
export const addNewUptime = async (tool:{name: string, link: string, availability: string}) => {
  const newUptime = new Uptime({
    name: tool.name,
    link: tool.link,
    availability: tool.availability,
    time: Date.now()
  });

  await UptimeService.saveModel(newUptime)
}
