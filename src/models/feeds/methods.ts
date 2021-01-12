import httpStatus from 'http-status';
import APIError from '../../errors/APIError';
import { IFeed } from './interface';
import { modelNames } from '../../utils/constants';

// eslint-disable-next-line no-unused-vars
async function createFeed(this: IFeed) {
	try {
		const { image, caption, owner } = this;
		const existingFeed = await this.model(modelNames.feed)
			.findOne({ image })
			.exec();

		if (existingFeed) {
			return new APIError(
				'A feed with this image already exits.',
				httpStatus.CONFLICT,
				true
			);
		}

		await this.save();
		return { image, caption, owner: owner.name };
	} catch (error) {
		return new APIError(
			`Error Creating feed ${error}`,
			httpStatus.CONFLICT,
			true
		);
	}
}

export { createFeed };
