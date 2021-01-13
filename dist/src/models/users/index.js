"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("../../utils/constants");
const schema_1 = __importDefault(require("./schema"));
const statics_1 = require("./statics");
const methods_1 = require("./methods");
schema_1.default.static({
    authenticateUser: statics_1.authenticateUser,
    validateUserToken: statics_1.validateUserToken,
});
schema_1.default.method({ createUser: methods_1.createUser });
const User = mongoose_1.default.model(constants_1.modelNames.user, schema_1.default);
exports.default = User;
//# sourceMappingURL=index.js.map