import { Request, Response } from 'express';
const { exec } = require('child-process-async');

export const updateSiteRoute = async (req: Request, res: Response) => {
  const body = req.body;
  const siteName = req.body.site;

  console.log(req.get('origin'));
  console.log(siteName);

  const { stdout, stderr } = await exec('who');

  return res.json({success: true, msg: stdout});

};
