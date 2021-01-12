import bcrypt from 'bcrypt';
import util from 'util';
import { storage } from '../config/environments';

const bucket = storage.bucket('simple-feed-704cd.appspot.com');
const { format } = util;

const generateHashedPassword = async (cleanPassword: string, saltVal = 10) => {
	const salt = await bcrypt.genSalt(saltVal);
	const hashedPassword = await bcrypt.hash(cleanPassword, salt);
	return hashedPassword;
};

const uploadImage = async (file: any) => {
	return new Promise((resolve, reject) => {
		const { name, data } = file;
		console.log(`Original file name ${name}`);

		const blob = bucket.file(name.replace(/ /g, '_'));
		const blobStream = blob.createWriteStream({
			resumable: false,
		});

		blobStream
			.on('finish', () => {
				const publicUrl = format(
					`https://storage.googleapis.com/${bucket.name}/${blob.name}`
				);
				console.info(publicUrl);
				resolve(publicUrl);
			})
			.on('error', (error) => {
				reject(`Unable to upload image, something went wrong ${error.stack}`);
			})
			.end(data);
	});
};

export { generateHashedPassword, uploadImage };
