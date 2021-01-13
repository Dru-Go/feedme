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
const http_status_1 = __importDefault(require("http-status"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const APIError_1 = __importDefault(require("../errors/APIError"));
const validateFirebaseIdToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Check if request is authorized with Firebase ID token');
    if ((!req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer ')) &&
        // eslint-disable-next-line no-underscore-dangle
        !(req.cookies && req.cookies.__session)) {
        console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.', 'Make sure you authorize your request by providing the following HTTP header:', 'Authorization: Bearer <Firebase ID Token>', 'or by passing a "__session" cookie.');
        const unauthorized = new APIError_1.default('User is unauthorized', http_status_1.default.UNAUTHORIZED, true);
        return next(unauthorized);
    }
    let idToken;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer ')) {
        console.log('Found "Authorization" header');
        // Read the ID Token from the Authorization header.
        // eslint-disable-next-line prefer-destructuring
        idToken = req.headers.authorization.split('Bearer ')[1];
    }
    else if (req.cookies) {
        console.log('Found "__session" cookie');
        // Read the ID Token from cookie.
        // eslint-disable-next-line no-underscore-dangle
        idToken = req.cookies.__session;
    }
    else {
        // No cookie
        const unauthorized = new APIError_1.default('User is unauthorized, no cookie found', http_status_1.default.UNAUTHORIZED, true);
        return next(unauthorized);
    }
    try {
        req.user = yield firebase_admin_1.default.auth().verifyIdToken(idToken);
        return next();
    }
    catch (error) {
        const unauthorized = new APIError_1.default('User is unauthorized', http_status_1.default.UNAUTHORIZED, true);
        console.error('Error while verifying Firebase ID token:', error);
        return next(unauthorized);
    }
});
exports.default = validateFirebaseIdToken;
//# sourceMappingURL=middlewares.js.map