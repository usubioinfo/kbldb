import { Request, Response } from 'express';

export const updateSiteRoute = async (req: Request, res: Response) => {
  const body = req.body;
  const siteName = req.body.site;

  console.log(req.get('origin'));
  console.log(siteName);

  return res.json({success: true, msg: 'Test'});

};
