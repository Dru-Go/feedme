import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import Feed from '../models/feeds';
import { uploadImage } from '../utils';
import APIError from '../errors/APIError';

const create = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send('No files were uploaded.');
	}

	const { files, body, user } = req;
	const { caption } = body;
	try {
		const imageUrl = await uploadImage(files.image);
		console.log(imageUrl);

		const newFeed = new Feed({
			image: imageUrl,
			caption,
			owner: user,
			// eslint-disable-next-line no-underscore-dangle
		});
		console.log(newFeed);
		const createdFeed = newFeed.createFeed();
		return res.status(httpStatus.CREATED).json(createdFeed);
	} catch (error) {
		console.error(`Issue in controller ${error}`);
		return next(error);
	}
};

const getAll = (req: Request, res: Response, next: NextFunction) => {
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

export { create, getAll };
