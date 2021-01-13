"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = exports.generateHashedPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const util_1 = __importDefault(require("util"));
const environments_1 = require("../config/environments");
const bucket = environments_1.storage.bucket('simple-feed-704cd.appspot.com');
const { format } = util_1.default;
const generateHashedPassword = (cleanPassword, saltVal = 10) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt(saltVal);
    const hashedPassword = yield bcrypt_1.default.hash(cleanPassword, salt);
    return hashedPassword;
});
exports.generateHashedPassword = generateHashedPassword;
const uploadImage = (file) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const { name, data } = file;
        console.log(`Original file name ${name}`);
        const blob = bucket.file(name.replace(/ /g, '_'));
        const blobStream = blob.createWriteStream({
            resumable: false,
        });
        blobStream
            .on('finish', () => {
            const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
            console.info(publicUrl);
            resolve(publicUrl);
        })
            .on('error', (error) => {
            reject(`Unable to upload image, something went wrong ${error.stack}`);
        })
            .end(data);
    });
});
exports.uploadImage = uploadImage;
//# sourceMappingURL=index.js.map