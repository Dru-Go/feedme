import { mappedVars } from './config/environments';
import { connectToDb } from './config/mongoose';
import { app } from './config/express';
// import { nodeMailerVerify } from './config/nodemailer';

const start = async () => {
	await connectToDb();
	// nodeMailerVerify();
	app.listen(mappedVars.port, () => {
		// eslint-disable-next-line no-console
		console.log(
			`[${mappedVars.nodeEnv}] Server running on localhost:${mappedVars.port}`
		);
	});
};
start();
export { start };
