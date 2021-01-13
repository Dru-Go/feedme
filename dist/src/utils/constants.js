"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxMinScore = exports.strongPasswordRegex = exports.modelNames = void 0;
const modelNames = {
    user: 'Users',
    feed: 'Feeds',
};
exports.modelNames = modelNames;
const maxMinScore = {
    max: 10,
    min: 0,
};
exports.maxMinScore = maxMinScore;
const strongPasswordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
exports.strongPasswordRegex = strongPasswordRegex;
//# sourceMappingURL=constants.js.map