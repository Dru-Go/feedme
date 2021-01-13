"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const http_status_1 = __importDefault(require("http-status"));
const parceError = (req, res, next) => {
    const validationErrors = express_validator_1.validationResult(req);
    if (validationErrors.isEmpty()) {
        return next();
    }
    return res.status(http_status_1.default.BAD_REQUEST).json(validationErrors);
};
exports.default = parceError;
//# sourceMappingURL=errors.parser.js.map