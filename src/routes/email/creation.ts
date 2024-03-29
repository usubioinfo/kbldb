import EmailService from '@services/email.service';
import { Request, Response } from 'express';
import { EMAIL_PASS, ALLOWED_ORIGINS } from '@config/constants';

export const sendNewEmailRoute = async (req: Request, res: Response) => {
  const options: any = {};

  if (req.body.user) {
    options['user'] = req.body.user;
  }

  if (req.body.origin) {
    options['origin'] = req.body.origin;
  }

  console.log(req.get('origin'));

  if (!ALLOWED_ORIGINS.includes(req.get('origin') as string)) {
    return res.status(402).json({success: false, msg: 'Unauthorized'});
  }

  if (req.body.password != EMAIL_PASS) {
    return res.status(402).json({success: false, msg: 'Unauthorized'});
  }

  let body = req.body.messageBody;
  await EmailService.sendMail(req.body.subjectLine, body, req.body.recipient, options);
  return res.json({success: true, msg: 'Successfully sent.'});

};
