import nodemailer from 'nodemailer';
import { APPT_EMAIL } from '@config/constants';

class EmailService {
	private static instance: EmailService;

  private transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail'
  })

	private constructor() {

	}

	public static getInstance(): EmailService {
		if (!EmailService.instance) {
			EmailService.instance = new EmailService();
		}

		return EmailService.instance;
	}

  public async sendMail(subject: string, body: string): Promise<any | null> {
    this.transporter.sendMail({
      from: 'billthemailbot@usu.edu',
      to: APPT_EMAIL,
      subject: subject,
      text: body
    }, (err, info) => {
      console.log(err);
      console.log(info);
    });

    return null;
  }
}

const emailService = EmailService.getInstance();
export default emailService;
