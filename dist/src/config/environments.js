"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.firebaseConfig = exports.serviceAccount = exports.mappedVars = void 0;
const joi_1 = __importDefault(require("joi"));
// Initiate dotenv to interact with .env file values
const dotenv_1 = __importDefault(require("dotenv"));
const storage_1 = require("@google-cloud/storage");
// import path from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require('./service_account.json');
exports.serviceAccount = serviceAccount;
// const storageKey = require('./real-service-account-file.json');
const firebaseConfig = {
    apiKey: 'AIzaSyB98Iz-ByLygbHPiGhF3ns92vnkiw9bNoQ',
    authDomain: 'feedme-30.firebaseapp.com',
    projectId: 'feedme-30',
    storageBucket: 'feedme-30.appspot.com',
    messagingSenderId: '1031540663181',
    appId: '1:1031540663181:web:c79a66d1a7c16e9e59d3c4',
};
exports.firebaseConfig = firebaseConfig;
const storage = new storage_1.Storage({
    keyFilename: 'real-service-account-file.json',
    projectId: 'simple-feed-704cd',
});
exports.storage = storage;
// Environment variables validation schema
const envSchema = joi_1.default.object({
    NODE_ENV: joi_1.default.string()
        .allow('development', 'test', 'production')
        .default('development'),
    MONGO_URL: joi_1.default.string().required().description('MongoDb connection URL'),
    PORT: joi_1.default.number().default(5000),
    APP_DOMAIN: joi_1.default.string().required(),
    APP_NAME: joi_1.default.string().required(),
    APP_EMAIL_ADDRESS: joi_1.default.string().email().required(),
    APP_EMAIL_PASSWORD: joi_1.default.string().required(),
})
    .unknown()
    .required();
dotenv_1.default.config();
const { error, value } = envSchema.validate(process.env);
if (error)
    throw new Error(`Env vars validation error: ${error.message}`);
const mappedVars = {
    nodeEnv: value.NODE_ENV,
    port: value.PORT,
    mongoUrl: value.MONGO_URL,
    appEmailAddress: value.APP_EMAIL_ADDRESS,
    appEmailPassword: value.APP_EMAIL_PASSWORD,
    appDomain: value.APP_DOMAIN,
    appName: value.APP_NAME,
};
exports.mappedVars = mappedVars;
//# sourceMappingURL=environments.js.map