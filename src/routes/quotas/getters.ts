import { Request, Response } from 'express';
const { exec } = require('child-process-async');

export const getQuotasRoute = async (req: Request, res: Response) => {
  const { stdout, stderr } = await exec('beegfs-ctl --getquota --uid --all');

  return res.status(500).json({success: false, msg: stdout});
};
