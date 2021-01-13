"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const fileOptions = {
    maxSize: 2e6,
};
const logger = {
    level: 'info',
    format: winston_1.default.format.json(),
    transports: [
        new winston_1.default.transports.File(Object.assign({ filename: 'logs/error.log', level: 'error' }, fileOptions)),
        new winston_1.default.transports.File(Object.assign({ filename: 'logs/combined.log' }, fileOptions)),
    ],
};
exports.default = logger;
//# sourceMappingURL=winston.js.map