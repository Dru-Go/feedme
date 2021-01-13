"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.createUserValidator = void 0;
const express_validator_1 = require("express-validator");
const constants_1 = require("../utils/constants");
const createUserValidator = () => [
    express_validator_1.body('firstName')
        .isString()
        .isLength({ min: 2, max: 100 })
        .withMessage('First name is required'),
    express_validator_1.body('lastName').isString().isLength({ min: 0, max: 100 }).optional(),
    express_validator_1.body('email').isEmail().withMessage('A valid email is required'),
    express_validator_1.body('password')
        .isString()
        .isLength({ min: 8, max: 60 })
        .withMessage('Password should be at least 8 cahracters and not greater than 60')
        .withMessage((val) => constants_1.strongPasswordRegex.test(val))
        .withMessage('Password should contain a lower case letter, an upper case letter, a number and one of these symbols (!@#$%^&*).'),
];
exports.createUserValidator = createUserValidator;
const loginValidator = () => [
    express_validator_1.body('email').isEmail().withMessage('Email is required to login'),
    express_validator_1.body('password').isString().withMessage('password is required'),
];
exports.loginValidator = loginValidator;
//# sourceMappingURL=user.validator.js.map