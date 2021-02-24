// For now, this will be a small script that measures the uptime of the
// tools on our server. Having tools randomly not being available is
// really annoying to keep track of, and I'd like to have a way of
// keeping track of uptime.
import Logger from '@config/logger';
import axios from 'axios';
import { addNewUptime } from '@routes/uptime/creation';
/*
const tools = [
  'PredHPI', 'AP-iNET', 'deepHPI', 'hucopia', 'Plant-mSubP', 'AtSubP', 'rslpred',
  'PLpred', 'NECminer', 'GreeningDB', 'citSATdb', 'legumeSSRdb', 'ranchSATdb',
  'lacsubpred', 'ligpred', 'rbpred'
];
*/

export const toolCheck = async (tools: {name: string, link: string, availability: string}[]) => {
  for (const tool of tools) {
    // Set to slow, and if it takes a while to load, then it'll actually be slow
    tool.availability = 'slow';
    try {
      const response = await axios.get(tool.link);
      console.log(response.status);
      tool.availability = 'running';
      await addNewUptime(tool);
    } catch (err) {
      if (err.response) {
        console.log(err.response.status);
      }
      tool.availability = 'down';
      await addNewUptime(tool);
    }
    /*
    axios.get(tool.link)
      .then((response) => {
        console.log(response.status);
        if (response.status >= 200 && response.status > 300) {
          tool.availability = 'running';
          addNewUptime(tool);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.status);
          tool.availability = 'down';
        }
      });*/
  }
}
