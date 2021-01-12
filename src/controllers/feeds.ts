import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import Feed from '../models/feeds';
import { uploadImage } from '../utils';
import APIError from '../errors/APIError';

const create = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send('No files were uploaded.');
	}

	const { files, body, user } = req as any;
	const { caption } = body;
	try {
		const imageUrl = await uploadImage(files.image);

		const newFeed = new Feed({
			image: imageUrl,
			caption,
			owner: user,
		});
		const createdFeed = await newFeed.createFeed();
		return res.status(httpStatus.CREATED).json(createdFeed);
	} catch (error) {
		return next(error);
	}
};

const getAllFeeds = async (req: Request, res: Response, next: NextFunction) => {
	// Secure routes middleware will automatically add user object to req.user
	try {
		const feeds = await Feed.getFeeds();
		res.status(httpStatus.ACCEPTED).json(feeds);
	} catch (error) {
		const Issues = new APIError(
			`Issue fetching feeds ${error}`,
			httpStatus.INTERNAL_SERVER_ERROR
		);
		next(Issues);
	}
};

const getMyFeeds = async (req: Request, res: Response, next: NextFunction) => {
	// Secure routes middleware will automatically add user object to req.user
	try {
		const { user } = req as any;
		const { email } = user as any;
		const feeds = await Feed.getMyFeeds(email);
		res.status(httpStatus.ACCEPTED).json(feeds);
	} catch (error) {
		const Issues = new APIError(
			`Issue fetching my feeds ${error}`,
			httpStatus.INTERNAL_SERVER_ERROR
		);
		next(Issues);
	}
};

export { create, getAllFeeds, getMyFeeds };
