import Joi from 'joi';
// Initiate dotenv to interact with .env file values
import dotenv from 'dotenv';
import { Storage } from '@google-cloud/storage';
// import path from 'path';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require('./service_account.json');
// const storageKey = require('./real-service-account-file.json');

const firebaseConfig = {
	apiKey: 'AIzaSyB98Iz-ByLygbHPiGhF3ns92vnkiw9bNoQ',
	authDomain: 'feedme-30.firebaseapp.com',
	projectId: 'feedme-30',
	storageBucket: 'feedme-30.appspot.com',
	messagingSenderId: '1031540663181',
	appId: '1:1031540663181:web:c79a66d1a7c16e9e59d3c4',
};

const storage = new Storage({
	keyFilename: 'real-service-account-file.json',
	projectId: 'simple-feed-704cd',
});

interface IEnv {
	nodeEnv?: string;
	port?: number;
	mongoUrl: string;
	appEmailAddress: string;
	appEmailPassword: string;
	appDomain: string;
	appName: string;
}

// Environment variables validation schema
const envSchema = Joi.object({
	NODE_ENV: Joi.string()
		.allow('development', 'test', 'production')
		.default('development'),
	MONGO_URL: Joi.string().required().description('MongoDb connection URL'),
	PORT: Joi.number().default(5000),
	APP_DOMAIN: Joi.string().required(),
	APP_NAME: Joi.string().required(),
	APP_EMAIL_ADDRESS: Joi.string().email().required(),
	APP_EMAIL_PASSWORD: Joi.string().required(),
})
	.unknown()
	.required();

dotenv.config();
const { error, value } = envSchema.validate(process.env);

if (error) throw new Error(`Env vars validation error: ${error.message}`);

const mappedVars: IEnv = {
	nodeEnv: value.NODE_ENV,
	port: value.PORT,
	mongoUrl: value.MONGO_URL,
	appEmailAddress: value.APP_EMAIL_ADDRESS,
	appEmailPassword: value.APP_EMAIL_PASSWORD,
	appDomain: value.APP_DOMAIN,
	appName: value.APP_NAME,
};

export { mappedVars, serviceAccount, firebaseConfig, storage };
