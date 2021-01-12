import mongoose, { Types } from 'mongoose';

function isValidObjectId(id: Types.ObjectId) {
	return mongoose.Types.ObjectId.isValid(id);
}
export { isValidObjectId };
