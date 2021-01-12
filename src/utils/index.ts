import bcrypt from 'bcrypt';
import util from 'util';
import { storage } from '../config/environments';

const bucketOptions = {
	entity: 'allUsers',
	role: storage.acl.WRITER_ROLE,
};
const bucket = storage.bucket('http://simple-feed-704cd.appspot.com');

const { format } = util;

const generateHashedPassword = async (cleanPassword: string, saltVal = 10) => {
	const salt = await bcrypt.genSalt(saltVal);
	const hashedPassword = await bcrypt.hash(cleanPassword, salt);
	return hashedPassword;
};

// /**
//  *
//  * @param {string} passwordOrKey jwt secret key to be used to validate token. For this purpose we will use the user's encrypted password as secretKey
//  * @param {string} expiresIn The expiry time.
//  */
const uploadImage = async (file: any) => {
	// const [bucket1] = await storage.createBucket('dre_feeds');
	// await bucket1.acl.add(bucketOptions);
	return new Promise((resolve, reject) => {
		const { name, data } = file;
		console.log(`Original file name ${name.replace(/ /g, '_')}`);

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
				reject(`Unable to upload image, something went wrong ${error}`);
			})
			.end(data);
	});
};

export { generateHashedPassword, uploadImage };
