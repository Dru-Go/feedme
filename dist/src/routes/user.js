"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errors_parser_1 = __importDefault(require("../validators/errors.parser"));
const user_validator_1 = require("../validators/user.validator");
const user_1 = require("../controllers/user");
const route = express_1.default.Router();
route.post('/create', user_validator_1.createUserValidator(), errors_parser_1.default, user_1.createUserController);
route.post('/login', user_validator_1.loginValidator(), errors_parser_1.default, user_1.loginController);
exports.default = route;
//# sourceMappingURL=user.js.map