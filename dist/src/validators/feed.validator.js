"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFile = exports.createFeedValidator = void 0;
const express_validator_1 = require("express-validator");
const http_status_1 = __importDefault(require("http-status"));
const createFeedValidator = () => [
    express_validator_1.body('caption')
        .isString()
        .isLength({ min: 2, max: 100 })
        .withMessage('Image Caption is required'),
];
exports.createFeedValidator = createFeedValidator;
const validateFile = (req, res, next) => {
    const exceptedFileType = ['png', 'jpg', 'jpeg'];
    if (!req.file) {
        return res
            .status(http_status_1.default.FORBIDDEN)
            .json({ success: false, message: 'Image is required!' });
    }
    const fileExtension = req.file.mimetype.split('/').pop();
    if (fileExtension && !exceptedFileType.includes(fileExtension)) {
        return res
            .status(http_status_1.default.FORBIDDEN)
            .json({ success: false, message: 'Image file is not valid!' });
    }
    return next();
};
exports.validateFile = validateFile;
//# sourceMappingURL=feed.validator.js.map