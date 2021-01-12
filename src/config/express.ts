import express, { Request, Response, Application, NextFunction } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import compress from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import admin from 'firebase-admin';
import firebase from 'firebase';
import fileUpload from 'express-fileupload';
// import expressWinston from 'express-winston';
// import httpStatus from 'http-status';
// import logger from './winston';
import { serviceAccount, firebaseConfig } from './environments';
// import APIError from '../errors/APIError';
// import AppError from '../errors/APPError';
import routes from './routes';

// eslint-disable-next-line @typescript-eslint/no-var-requires

const app: Application = express();

app.use(fileUpload());
app.disable('x-powered-by');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

firebase.initializeApp(firebaseConfig);
// Uncomment next block and comment the line after to log only on dev environment
// if(environments.nodeEnv==='development'){
//   app.use(morgan('dev'));
// }

app.use(morgan('dev'));
// TODO Make use of winsten logger
// if (mappedVars.nodeEnv === 'test') {
// 	app.use(expressWinston.logger(logger));
// 	app.use(expressWinston.errorLogger(logger));
// }

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compress());

// Secure middlewares
app.use(helmet());
app.use(cors());

app.use('/api', routes);

// TODO Handle the following issue
// 404 - endpoint not found
// app.use((next: NextFunction) => {
// 	const notFoundError = new APIError(
// 		'Endpoint not found',
// 		httpStatus.NOT_FOUND,
// 		true
// 	);
// 	return next(notFoundError);
// });

// // Catch errors passed from controllers
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
// 	// Change error catched to APIError if instance is not APIError
// 	console.log(
// 		`The request is ${req} The responce is ${res} The next is ${next}`
// 	);
// 	if (!(err instanceof APIError)) {
// 		const newError = new APIError(
// 			err.message || 'An unknown error occured',
// 			httpStatus.INTERNAL_SERVER_ERROR
// 		);

// 		return next(newError);
// 	}

// 	return next(err);
// });

// // app.use((err, req, res, next) => {}
// app.use((err: any, req: Request, res: Response) => {
// 	res.status(err.status).send({
// 		message: err.isPublic ? err.message : httpStatus[err.status],
// 		stack: mappedVars.nodeEnv === 'development' ? err.stack : null,
// 	});
// });

export { app };
