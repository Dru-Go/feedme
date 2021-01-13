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
exports.validateUserToken = exports.authenticateUser = void 0;
const firebase_1 = __importDefault(require("firebase"));
const http_status_1 = __importDefault(require("http-status"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const APIError_1 = __importDefault(require("../../errors/APIError"));
function authenticateUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.findOne({ email }).exec();
        const doesntMatchError = new APIError_1.default(
        // eslint-disable-next-line quotes
        "Email or Password doesn't match", http_status_1.default.UNAUTHORIZED, true);
        if (!user) {
            throw doesntMatchError;
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (passwordMatch) {
            const loggedIn = yield firebase_1.default
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then((signedUser) => signedUser)
                .catch((error) => {
                const userNotFound = new APIError_1.default(`Unable to login ${error}`, http_status_1.default.NETWORK_AUTHENTICATION_REQUIRED, true);
                return userNotFound;
            });
            return loggedIn;
        }
        return doesntMatchError;
    });
}
exports.authenticateUser = authenticateUser;
function validateUserToken(decodedToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tokenOwner = yield this.findById(decodedToken.toString());
            if (!tokenOwner) {
                throw new APIError_1.default('User Not found', http_status_1.default.NOT_FOUND);
            }
            return tokenOwner;
        }
        catch (error) {
            return new APIError_1.default(`Issue Executing Finder ${error}`, http_status_1.default.INTERNAL_SERVER_ERROR);
        }
    });
}
exports.validateUserToken = validateUserToken;
//# sourceMappingURL=statics.js.map