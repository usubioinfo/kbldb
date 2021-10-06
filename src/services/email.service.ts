import nodemailer from 'nodemailer';
import { APPT_EMAIL } from '@config/constants';

class EmailService {
	private static instance: EmailService;

  private transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail'
  });

	private constructor() {

	}

	public static getInstance(): EmailService {
		if (!EmailService.instance) {
			EmailService.instance = new EmailService();
		}

		return EmailService.instance;
	}

  public async sendMail(subject: string, body: string, recipient: string, options?: any): Promise<any | null> {
		const user = options.user ? options.user : 'noreply';
		const origin = '';
		const from = `${user}@bioinfocore.usu.edu`;

		this.transporter.sendMail({
      from: from,
      to: recipient,
      subject: subject,
      text: body
    }, (err, info) => {
      console.log(`Errors: ${err}`);
      console.log(info);
    });

    return null;
  }
}

const emailService = EmailService.getInstance();
export default emailService;
