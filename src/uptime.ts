// For now, this will be a small script that measures the uptime of the
// tools on our server. Having tools randomly not being available is
// really annoying to keep track of, and I'd like to have a way of
// keeping track of uptime.
import * as https from 'https';
import axios from 'axios';

import Logger from '@config/logger';
import { addNewUptime } from '@routes/uptime/creation';

// Uncomment when you're ready to use SSL for Axios
// from { SSL_CERT_PATH } from '@config/constants';

// TODO: Fix this! This is a security hazard!
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

// Use this to actually set up SSL
// const httpsAgent = new https.Agent({ ca: SSL_CERT_PATH });

export const toolCheck = async (tools: {name: string, link: string, availability: string}[]) => {
  for (const tool of tools) {
    // Set to slow, and if it takes a while to load, well...it's slow then
    tool.availability = 'slow';

    try {
      const response = await axios.get(tool.link, { httpsAgent });
      console.log(`${tool.name} - ${response.status}`);
      
      tool.availability = 'running';
      await addNewUptime(tool);
    } catch (err) {
      console.log(err);
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
