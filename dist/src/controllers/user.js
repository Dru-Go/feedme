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
exports.getTokenOwner = exports.loginController = exports.createUserController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const APIError_1 = __importDefault(require("../errors/APIError"));
const users_1 = __importDefault(require("../models/users"));
const createUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, password, email } = req.body;
    const newUser = new users_1.default({
        firstName,
        lastName,
        password,
        email,
        emailVerified: false,
    });
    try {
        const addedUser = yield newUser.createUser();
        res.status(http_status_1.default.CREATED).json(addedUser);
    }
    catch (error) {
        next(error);
    }
});
exports.createUserController = createUserController;
const loginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const signedUser = yield users_1.default.authenticateUser(email, password);
        res.status(http_status_1.default.ACCEPTED).json(signedUser);
    }
    catch (error) {
        next(error);
    }
});
exports.loginController = loginController;
const getTokenOwner = (req, res, next) => {
    // Secure routes middleware will automatically add user object to req.user
    const { user } = req;
    if (user) {
        return res.json(user);
    }
    const userNotFound = new APIError_1.default('User not found', http_status_1.default.NOT_FOUND, true);
    return next(userNotFound);
};
exports.getTokenOwner = getTokenOwner;
//# sourceMappingURL=user.js.map