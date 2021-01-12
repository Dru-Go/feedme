import firebase from 'firebase';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import APIError from '../../errors/APIError';
import { IUserBaseDocument } from './interface';

async function authenticateUser(
	this: IUserBaseDocument,
	email: string,
	password: string
) {
	const user = await this.findOne({ email }).exec();
	const doesntMatchError = new APIError(
		// eslint-disable-next-line quotes
		"Email or Password doesn't match",
		httpStatus.UNAUTHORIZED,
		true
	);
	if (!user) {
		throw doesntMatchError;
	}

	const passwordMatch = await bcrypt.compare(password, user.password);
	if (passwordMatch) {
		const loggedIn = await firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((signedUser) => signedUser)
			.catch((error) => {
				const userNotFound = new APIError(
					`Unable to login ${error}`,
					httpStatus.NETWORK_AUTHENTICATION_REQUIRED,
					true
				);
				return userNotFound;
			});
		return loggedIn;
	}
	return doesntMatchError;
}

async function validateUserToken(
	this: IUserBaseDocument,
	decodedToken: string
) {
	try {
		const tokenOwner = await this.findById(decodedToken.toString());
		if (!tokenOwner) {
			throw new APIError('User Not found', httpStatus.NOT_FOUND);
		}
		return tokenOwner;
	} catch (error) {
		return new APIError(
			`Issue Executing Finder ${error}`,
			httpStatus.INTERNAL_SERVER_ERROR
		);
	}
}

export { authenticateUser, validateUserToken };
