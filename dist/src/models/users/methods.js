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
exports.createUser = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const http_status_1 = __importDefault(require("http-status"));
const constants_1 = require("../../utils/constants");
const APIError_1 = __importDefault(require("../../errors/APIError"));
const utils_1 = require("../../utils");
// eslint-disable-next-line no-unused-vars
function createUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const { firstName, lastName, email, password } = this;
        const displayName = firstName + lastName;
        try {
            const existingUser = yield this.model(constants_1.modelNames.user)
                .findOne({ email })
                .exec();
            if (existingUser) {
                throw new APIError_1.default('A user already exists by this email.', http_status_1.default.CONFLICT, true);
            }
            this.password = yield utils_1.generateHashedPassword(password);
            yield this.save();
            // eslint-disable-next-line no-underscore-dangle
            const user = yield firebase_admin_1.default
                .auth()
                .createUser({ displayName, email, password })
                .then((createdUser) => createdUser)
                .catch((err) => console.error(err));
            return user;
            // await admin.auth().setCustomUserClaims(uid, { role: 'user' });
            // eslint-disable-next-line no-console
        }
        catch (error) {
            if (error instanceof APIError_1.default)
                throw error;
            else {
                // eslint-disable-next-line no-console
                console.log('Create Error', error);
                return new APIError_1.default('Internal Error', http_status_1.default.INTERNAL_SERVER_ERROR);
            }
        }
    });
}
exports.createUser = createUser;
//# sourceMappingURL=methods.js.map