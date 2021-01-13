"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const environments_1 = require("./config/environments");
const mongoose_1 = require("./config/mongoose");
const express_1 = require("./config/express");
// import { nodeMailerVerify } from './config/nodemailer';
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.connectToDb();
    // nodeMailerVerify();
    express_1.app.listen(environments_1.mappedVars.port, () => {
        // eslint-disable-next-line no-console
        console.log(`[${environments_1.mappedVars.nodeEnv}] Server running on localhost:${environments_1.mappedVars.port}`);
    });
});
exports.start = start;
start();
//# sourceMappingURL=index.js.map