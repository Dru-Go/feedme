"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const status_1 = __importDefault(require("../routes/status"));
const user_1 = __importDefault(require("../routes/user"));
const feeds_1 = __importDefault(require("../routes/feeds"));
const middlewares_1 = __importDefault(require("../controllers/middlewares"));
const route = express_1.default.Router();
route.use('/test', status_1.default);
route.use('/user', user_1.default);
route.use('/feeds', middlewares_1.default, feeds_1.default);
exports.default = route;
//# sourceMappingURL=routes.js.map