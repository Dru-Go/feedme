"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const feeds_1 = require("../controllers/feeds");
const errors_parser_1 = __importDefault(require("../validators/errors.parser"));
// import {
// 	createFeedValidator,
// 	validateFile,
// } from '../validators/feed.validator';
const routes = express_1.default.Router();
routes.post('/create', errors_parser_1.default, feeds_1.create);
routes.get('/all', errors_parser_1.default, feeds_1.getAllFeeds);
routes.get('/my', errors_parser_1.default, feeds_1.getMyFeeds);
exports.default = routes;
//# sourceMappingURL=feeds.js.map