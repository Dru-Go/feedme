import httpStatus from 'http-status';
import admin from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';
import APIError from '../errors/APIError';

const validateFirebaseIdToken = async (
	req: any,
	res: Response,
	next: NextFunction
) => {
	console.log('Check if request is authorized with Firebase ID token');

	if (
		(!req.headers.authorization ||
			!req.headers.authorization.startsWith('Bearer ')) &&
		// eslint-disable-next-line no-underscore-dangle
		!(req.cookies && req.cookies.__session)
	) {
		console.error(
			'No Firebase ID token was passed as a Bearer token in the Authorization header.',
			'Make sure you authorize your request by providing the following HTTP header:',
			'Authorization: Bearer <Firebase ID Token>',
			'or by passing a "__session" cookie.'
		);
		const unauthorized = new APIError(
			'User is unauthorized',
			httpStatus.UNAUTHORIZED,
			true
		);
		return next(unauthorized);
	}

	let idToken;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer ')
	) {
		console.log('Found "Authorization" header');
		// Read the ID Token from the Authorization header.
		// eslint-disable-next-line prefer-destructuring
		idToken = req.headers.authorization.split('Bearer ')[1];
	} else if (req.cookies) {
		console.log('Found "__session" cookie');
		// Read the ID Token from cookie.
		// eslint-disable-next-line no-underscore-dangle
		idToken = req.cookies.__session;
	} else {
		// No cookie
		const unauthorized = new APIError(
			'User is unauthorized, no cookie found',
			httpStatus.UNAUTHORIZED,
			true
		);
		return next(unauthorized);
	}

	try {
		req.user = await admin.auth().verifyIdToken(idToken);
		return next();
	} catch (error) {
		const unauthorized = new APIError(
			'User is unauthorized',
			httpStatus.UNAUTHORIZED,
			true
		);
		console.error('Error while verifying Firebase ID token:', error);
		return next(unauthorized);
	}
};

export default validateFirebaseIdToken;
