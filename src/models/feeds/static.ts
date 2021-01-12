import httpStatus from 'http-status';
import APIError from '../../errors/APIError';
import { IFeedBaseDocument } from './interface';

// eslint-disable-next-line no-unused-vars
async function getFeeds(this: IFeedBaseDocument) {
	try {
		const feeds = await this.find().exec();
		return feeds;
	} catch (error) {
		return new APIError(
			`Error Getting feeds ${error}`,
			httpStatus.INTERNAL_SERVER_ERROR,
			true
		);
	}
}

// eslint-disable-next-line no-unused-vars
async function getMyFeeds(this: IFeedBaseDocument, email: string) {
	try {
		const feeds = await this.find({ 'owner.email': email }).exec();
		return feeds;
	} catch (error) {
		return new APIError(
			`Error Getting feeds ${error}`,
			httpStatus.INTERNAL_SERVER_ERROR,
			true
		);
	}
}

export { getFeeds, getMyFeeds };
