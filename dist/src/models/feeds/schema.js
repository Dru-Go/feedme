"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const feedSchema = new mongoose_1.Schema({
    image: { type: String, required: true, minLength: 2, maxLength: 300 },
    caption: { type: String, minLength: 2, maxLength: 300 },
    owner: {
        uid: { type: String, minlength: 2, maxlength: 100 },
        name: { type: String, minlength: 2, maxlength: 100 },
        iss: { type: String, minlength: 2, maxlength: 100 },
        aud: { type: String, minlength: 2, maxlength: 100 },
        email: { type: String, minlength: 2, maxlength: 100 },
        email_verified: { type: Boolean },
    },
}, { timestamps: true });
exports.default = feedSchema;
//# sourceMappingURL=schema.js.map