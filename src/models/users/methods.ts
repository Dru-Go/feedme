import admin from 'firebase-admin';
import httpStatus from 'http-status';
import { modelNames } from '../../utils/constants';
import APIError from '../../errors/APIError';
import { generateHashedPassword } from '../../utils';
import { IUsers } from './interface';

// eslint-disable-next-line no-unused-vars
async function createUser(this: IUsers) {
	const { firstName, lastName, email, password } = this;
	const displayName = firstName + lastName;
	try {
		const existingUser = await this.model(modelNames.user)
			.findOne({ email })
			.exec();

		if (existingUser) {
			throw new APIError(
				'A user already exists by this email.',
				httpStatus.CONFLICT,
				true
			);
		}

		this.password = await generateHashedPassword(password);
		await this.save();
		// eslint-disable-next-line no-underscore-dangle
		const user = await admin
			.auth()
			.createUser({ displayName, email, password })
			.then((createdUser) => createdUser)
			.catch((err) => console.error(err));
		return user;
		// await admin.auth().setCustomUserClaims(uid, { role: 'user' });
		// eslint-disable-next-line no-console
	} catch (error) {
		if (error instanceof APIError) throw error;
		else {
			// eslint-disable-next-line no-console
			console.log('Create Error', error);
			return new APIError('Internal Error', httpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}

export { createUser };
