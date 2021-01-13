"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const APPError_1 = __importDefault(require("./APPError"));
/**
 * @extends AppError
 */
class APIError extends APPError_1.default {
    constructor(message = '', status = http_status_1.default.INTERNAL_SERVER_ERROR, isPublic = false) {
        super(message, status, isPublic);
    }
}
exports.default = APIError;
//# sourceMappingURL=APIError.js.map