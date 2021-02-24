import UptimeService from '@services/uptime.service';
import { Request, Response } from 'express';
import { toolNames } from '../../tools';

export const getAllUptimesRoute = async (req: Request, res: Response) => {
  const data = await UptimeService.getAllToolData(toolNames);

  return res.json(data);
}
