import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';
import APIError from '../errors/APIError';
import User from '../models/users';

const createUserController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { firstName, lastName, password, email } = req.body;

	const newUser = new User({
		firstName,
		lastName,
		password,
		email,
		emailVerified: false,
	});

	try {
		const addedUser = await newUser.createUser();
		res.status(httpStatus.CREATED).json(addedUser);
	} catch (error) {
		next(error);
	}
};

const loginController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email, password } = req.body;
	try {
		const signedUser = await User.authenticateUser(email, password);
		res.status(httpStatus.ACCEPTED).json(signedUser);
	} catch (error) {
		next(error);
	}
};

const getTokenOwner = (req: Request, res: Response, next: NextFunction) => {
	// Secure routes middleware will automatically add user object to req.user
	if (req.user) {
		return res.json(req.user);
	}

	const userNotFound = new APIError(
		'User not found',
		httpStatus.NOT_FOUND,
		true
	);
	return next(userNotFound);
};

// const activateAccount = async (
// 	req: Request,
// 	res: Response,
// 	next: NextFunction
// ) => {
// 	const { token, email } = req.body;
// 	try {
// 		const verifiedUser = await User.validateActivationToken(token, email);
// 		res.json(verifiedUser);
// 	} catch (error) {
// 		next(error);
// 	}
// };

export {
	createUserController,
	loginController,
	getTokenOwner,
	// activateAccount,
};
