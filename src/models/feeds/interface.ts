/* eslint-disable no-unused-vars */
import { Document, Types, Model } from 'mongoose';

export interface IFeed extends Document {
	_id: Types.ObjectId;
	image: string;
	caption: string;
	owner: any;
	createFeed(): void;
}

export interface IFeedBaseDocument extends Model<IFeed> {
	getFeeds(): IFeed[];
}
