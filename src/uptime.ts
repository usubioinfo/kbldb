// For now, this will be a small script that measures the uptime of the
// tools on our server. Having tools randomly not being available is
// really annoying to keep track of, and I'd like to have a way of
// keeping track of uptime.
import Logger from '@config/logger';
import axios from 'axios';
import { addNewUptime } from '@routes/uptime/creation';

export const toolCheck = async (tools: {name: string, link: string, availability: string}[]) => {
  for (const tool of tools) {
    // Set to slow, and if it takes a while to load, well...it's slow then
    tool.availability = 'slow';

    try {
      const response = await axios.get(tool.link);
      
      tool.availability = 'running';
      await addNewUptime(tool);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.status) {
          console.log(`${tool.name} - ${err.response.status}`);
        }
      }

      tool.availability = 'down';
      await addNewUptime(tool);
    }
  }
}
