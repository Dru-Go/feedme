import mongoose from 'mongoose';
import { modelNames } from '../../utils/constants';

import userSchema from './schema';
import { authenticateUser, validateUserToken } from './statics';
import { createUser } from './methods';
import { IUsers, IUserBaseDocument } from './interface';

userSchema.static({
	authenticateUser,
	validateUserToken,
});
userSchema.method({ createUser });

const User = mongoose.model<IUsers>(
	modelNames.user,
	userSchema
) as IUserBaseDocument;

export default User;
