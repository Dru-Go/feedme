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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDb = void 0;
const fs_1 = __importDefault(require("fs"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const environments_1 = require("./environments");
const modelsPath = path_1.default.join(process.cwd(), 'src/models');
// Initialize all models in src/models directory
fs_1.default.readdirSync(modelsPath)
    .filter((dir) => dir.indexOf(''))
    // eslint-disable-next-line
    .forEach((dir) => require(path_1.default.join(modelsPath, dir)));
const connectToDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connectOptions = {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        };
        yield mongoose_1.default.connect(environments_1.mappedVars.mongoUrl, connectOptions);
        // eslint-disable-next-line no-console
        console.info('Mongo Connection Successfull');
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error('Mongo Connection Failed', error);
        throw error;
    }
});
exports.connectToDb = connectToDb;
//# sourceMappingURL=mongoose.js.map