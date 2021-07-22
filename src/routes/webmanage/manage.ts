import { Request, Response } from 'express';
import { exec } from 'child-process-async';

export const updateSiteRoute = async (req: Request, res: Response) => {
  const body = req.body;
  const siteName = req.body.site;

  console.log(req.get('origin'));
  console.log(siteName);

  const { stdout, stderr } = await exec('ls -a');

  return res.json({success: true, msg: stdout});

};
