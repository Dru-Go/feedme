"use strict";
/**
 * @extends Error
 */
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(message, status, isPublic) {
        super(message);
        this.message = '';
        this.status = 300;
        this.isPublic = false;
        this.isOperational = false;
        this.name = this.constructor.name;
        this.message = message;
        this.status = status;
        this.isPublic = isPublic;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = AppError;
//# sourceMappingURL=APPError.js.map