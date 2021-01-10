import EmailService from '@services/email.service';
import { Request, Response } from 'express';
import { EMAIL_PASS } from '@config/constants';

export const sendNewEmailRoute = async (req: Request, res: Response) => {

  if (req.body.password != EMAIL_PASS) {
    return res.status(402).json({success: false, msg: 'Unauthorized'});
  }

  let body = req.body.messageBody;
  await EmailService.sendMail(req.body.subjectLine, body, req.body.recipient);
  return res.json({success: true, msg: 'Successfully sent.'});

};
