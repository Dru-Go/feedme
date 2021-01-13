"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true, minLength: 2, maxLength: 300 },
    lastName: { type: String, minLength: 2, maxLength: 300 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 2, maxLength: 300 },
    // disable some or all operation if email is not verified based on your needs
    emailVerified: { type: Boolean, required: true, default: false },
}, { timestamps: true });
exports.default = userSchema;
//# sourceMappingURL=schema.js.map