import { Request, Response } from 'express';
const { exec } = require('child-process-async');

export const updateSiteRoute = async (req: Request, res: Response) => {
  const body = req.body;
  const siteName = req.body.site;

  const sites = ['bioinformatics', 'bioinfocore', 'biocluster'];

  if (!sites.includes(siteName)) {
    return res.json({success: false, msg: `Incorrect site name ${siteName}`});
  }

  console.log(req.get('origin'));
  console.log(siteName);

  const { stdout, stderr } = await exec(`bxz update ${siteName}`);

  return res.json({success: true, msg: stdout});

};
