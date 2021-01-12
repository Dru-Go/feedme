import httpStatus from 'http-status';
import APIError from '../../errors/APIError';
import { IFeed } from './interface';

// eslint-disable-next-line no-unused-vars
async function getFeeds(this: IFeed) {
	return new Promise((resolve, reject) => {
		this.save()
			.then((doc) => {
				resolve(doc);
			})
			.catch(() => {
				reject(
					new APIError(
						'An error occured while creating a feed',
						httpStatus.INTERNAL_SERVER_ERROR
					)
				);
			});
	});
}

export { getFeeds };
