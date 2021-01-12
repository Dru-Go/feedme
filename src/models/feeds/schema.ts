import { Schema } from 'mongoose';

const feedSchema = new Schema(
	{
		image: { type: String, required: true, minLength: 2, maxLength: 300 },
		caption: { type: String, minLength: 2, maxLength: 300 },
		owner: {
			uid: { type: String, minlength: 2, maxlength: 100 },
			name: { type: String, minlength: 2, maxlength: 100 },
			iss: { type: String, minlength: 2, maxlength: 100 },
			aud: { type: String, minlength: 2, maxlength: 100 },
			email: { type: String, minlength: 2, maxlength: 100 },
			email_verified: { type: Boolean },
		},
	},
	{ timestamps: true }
);

export default feedSchema;
