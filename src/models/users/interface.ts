/* eslint-disable no-unused-vars */
import { Document, Model, Types } from 'mongoose';

export interface IUsers extends Document {
	_id: Types.ObjectId;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	emailVerified: boolean;
	token: string;
	createUser(this: IUsers): IUsers;
	clean(this: IUsers): IUsers;
}

export interface IUserBaseDocument extends Model<IUsers> {
	authenticateUser(email: string, password: string): IUsers;
	validateUserToken(decodedToken: string): IUsers;
}
