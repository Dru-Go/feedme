import nodemailer from 'nodemailer';

import { mappedVars } from './environments';

const config = {
	service: 'gmail',
	auth: { user: mappedVars.appEmailAddress, pass: mappedVars.appEmailPassword },
};

const smtpTransport = nodemailer.createTransport(config);

const nodeMailerVerify = () => {
	smtpTransport.verify((err) => {
		if (err) {
			// eslint-disable-next-line no-console
			console.log(
				`[Nodemailer Loader] Verifying mailing account failed: ${err}`
			);
		}
		// eslint-disable-next-line no-console
		console.log('[Nodemailer] Ready to send messages');
	});
};

export { smtpTransport as mailer, nodeMailerVerify };
