"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const firebase_1 = __importDefault(require("firebase"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const express_winston_1 = __importDefault(require("express-winston"));
const http_status_1 = __importDefault(require("http-status"));
const winston_1 = __importDefault(require("./winston"));
const environments_1 = require("./environments");
const APIError_1 = __importDefault(require("../errors/APIError"));
const routes_1 = __importDefault(require("./routes"));
const app = express_1.default();
exports.app = app;
app.use(express_fileupload_1.default());
app.disable('x-powered-by');
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(environments_1.serviceAccount),
});
firebase_1.default.initializeApp(environments_1.firebaseConfig);
app.use(morgan_1.default('dev'));
// TODO Make use of winsten logger
if (environments_1.mappedVars.nodeEnv === 'production') {
    app.use(express_winston_1.default.logger(winston_1.default));
    app.use(express_winston_1.default.errorLogger(winston_1.default));
}
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(compression_1.default());
// Secure middlewares
app.use(helmet_1.default());
app.use(cors_1.default());
app.use('/api', routes_1.default);
// TODO Handle the following issue
// 404 - endpoint not found
app.use((next) => {
    const notFoundError = new APIError_1.default('Endpoint not found', http_status_1.default.NOT_FOUND, true);
    return next(notFoundError);
});
// // Catch errors passed from controllers
app.use((err, req, res, next) => {
    // Change error catched to APIError if instance is not APIError
    if (!(err instanceof APIError_1.default)) {
        const newError = new APIError_1.default(err.message || 'An unknown error occured', http_status_1.default.INTERNAL_SERVER_ERROR);
        return next(newError);
    }
    return next(err);
});
// // app.use((err, req, res, next) => {}
app.use((err, req, res) => {
    res.status(err.status).send({
        message: err.isPublic ? err.message : http_status_1.default[err.status],
        stack: environments_1.mappedVars.nodeEnv === 'development' ? err.stack : null,
    });
});
//# sourceMappingURL=express.js.map