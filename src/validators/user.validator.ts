import { body } from 'express-validator';
import { strongPasswordRegex } from '../utils/constants';

const createUserValidator = () => [
	body('firstName')
		.isString()
		.isLength({ min: 2, max: 100 })
		.withMessage('First name is required'),
	body('lastName').isString().isLength({ min: 0, max: 100 }).optional(),
	body('email').isEmail().withMessage('A valid email is required'),
	body('password')
		.isString()
		.isLength({ min: 8, max: 60 })
		.withMessage(
			'Password should be at least 8 cahracters and not greater than 60'
		)
		.withMessage((val) => strongPasswordRegex.test(val))
		.withMessage(
			'Password should contain a lower case letter, an upper case letter, a number and one of these symbols (!@#$%^&*).'
		),
];

const loginValidator = () => [
	body('email').isEmail().withMessage('Email is required to login'),
	body('password').isString().withMessage('password is required'),
];

export { createUserValidator, loginValidator };
