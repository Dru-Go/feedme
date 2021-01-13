"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeMailerVerify = exports.mailer = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const environments_1 = require("./environments");
const config = {
    service: 'gmail',
    auth: { user: environments_1.mappedVars.appEmailAddress, pass: environments_1.mappedVars.appEmailPassword },
};
const smtpTransport = nodemailer_1.default.createTransport(config);
exports.mailer = smtpTransport;
const nodeMailerVerify = () => {
    smtpTransport.verify((err) => {
        if (err) {
            // eslint-disable-next-line no-console
            console.log(`[Nodemailer Loader] Verifying mailing account failed: ${err}`);
        }
        // eslint-disable-next-line no-console
        console.log('[Nodemailer] Ready to send messages');
    });
};
exports.nodeMailerVerify = nodeMailerVerify;
//# sourceMappingURL=nodemailer.js.map