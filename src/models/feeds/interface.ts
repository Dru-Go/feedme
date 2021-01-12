/* eslint-disable no-unused-vars */
import { Document, Types, Model } from 'mongoose';
import APIError from '../../errors/APIError';

export interface IFeedReturn {
	image: string;
	caption: string;
	owner: string;
}
export interface IFeed extends Document {
	_id: Types.ObjectId;
	image: string;
	caption: string;
	owner: any;
	createFeed(): IFeedReturn | APIError;
}

export interface IFeedBaseDocument extends Model<IFeed> {
	getFeeds(): IFeed[];
	getMyFeeds(email: string): IFeed[];
}
