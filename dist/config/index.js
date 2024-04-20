"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PG_URI = exports.MONGO_URI = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV === 'development') {
    console.log('RUNNING DEVELOPMENT MODE');
    const configFile = `./.env.${process.env.NODE_ENV}`;
    // const configFile = path.join(__dirname,'..', `.env.${process.env.NODE_ENV}`);
    dotenv_1.default.config({ path: configFile });
}
if (process.env.NODE_ENV === 'production') {
    console.log('RUNNING PRODUCTION MODE');
    dotenv_1.default.config();
}
const PORT = process.env.PORT || 3005;
exports.PORT = PORT;
const MONGO_URI = process.env.MONGO_URI;
exports.MONGO_URI = MONGO_URI;
const PG_URI = process.env.PG_URI;
exports.PG_URI = PG_URI;
