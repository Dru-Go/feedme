import mongoose from 'mongoose';
import { modelNames } from '../../utils/constants';
import { createFeed } from './methods';
import { getFeeds } from './static';
import { IFeed, IFeedBaseDocument } from './interface';
import feedSchema from './schema';

feedSchema.method({ createFeed });
feedSchema.static({ getFeeds });

const User = mongoose.model<IFeed>(
	modelNames.feed,
	feedSchema
) as IFeedBaseDocument;

export default User;
