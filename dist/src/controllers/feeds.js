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
exports.getMyFeeds = exports.getAllFeeds = exports.create = void 0;
const http_status_1 = __importDefault(require("http-status"));
const feeds_1 = __importDefault(require("../models/feeds"));
const utils_1 = require("../utils");
const APIError_1 = __importDefault(require("../errors/APIError"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    const { files, body, user } = req;
    const { caption } = body;
    try {
        const imageUrl = yield utils_1.uploadImage(files.image);
        const newFeed = new feeds_1.default({
            image: imageUrl,
            caption,
            owner: user,
        });
        const createdFeed = yield newFeed.createFeed();
        return res.status(http_status_1.default.CREATED).json(createdFeed);
    }
    catch (error) {
        return next(error);
    }
});
exports.create = create;
const getAllFeeds = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Secure routes middleware will automatically add user object to req.user
    try {
        const feeds = yield feeds_1.default.getFeeds();
        res.status(http_status_1.default.ACCEPTED).json(feeds);
    }
    catch (error) {
        const Issues = new APIError_1.default(`Issue fetching feeds ${error}`, http_status_1.default.INTERNAL_SERVER_ERROR);
        next(Issues);
    }
});
exports.getAllFeeds = getAllFeeds;
const getMyFeeds = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Secure routes middleware will automatically add user object to req.user
    try {
        const { user } = req;
        const { email } = user;
        const feeds = yield feeds_1.default.getMyFeeds(email);
        res.status(http_status_1.default.ACCEPTED).json(feeds);
    }
    catch (error) {
        const Issues = new APIError_1.default(`Issue fetching my feeds ${error}`, http_status_1.default.INTERNAL_SERVER_ERROR);
        next(Issues);
    }
});
exports.getMyFeeds = getMyFeeds;
//# sourceMappingURL=feeds.js.map