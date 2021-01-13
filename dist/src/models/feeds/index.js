"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("../../utils/constants");
const methods_1 = require("./methods");
const static_1 = require("./static");
const schema_1 = __importDefault(require("./schema"));
schema_1.default.method({ createFeed: methods_1.createFeed });
schema_1.default.static({ getFeeds: static_1.getFeeds, getMyFeeds: static_1.getMyFeeds });
const User = mongoose_1.default.model(constants_1.modelNames.feed, schema_1.default);
exports.default = User;
//# sourceMappingURL=index.js.map