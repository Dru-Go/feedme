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
exports.createFeed = void 0;
const http_status_1 = __importDefault(require("http-status"));
const APIError_1 = __importDefault(require("../../errors/APIError"));
const constants_1 = require("../../utils/constants");
// eslint-disable-next-line no-unused-vars
function createFeed() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { image, caption, owner } = this;
            const existingFeed = yield this.model(constants_1.modelNames.feed)
                .findOne({ image })
                .exec();
            if (existingFeed) {
                return new APIError_1.default('A feed with this image already exits.', http_status_1.default.CONFLICT, true);
            }
            yield this.save();
            return { image, caption, owner: owner.name };
        }
        catch (error) {
            return new APIError_1.default(`Error Creating feed ${error}`, http_status_1.default.CONFLICT, true);
        }
    });
}
exports.createFeed = createFeed;
//# sourceMappingURL=methods.js.map