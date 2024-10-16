"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = require("dotenv");
const zod_1 = __importDefault(require("zod"));
(0, dotenv_1.config)();
const envSchema = zod_1.default.object({
    DATABASE_URL: zod_1.default.string().url(),
    JWT_SECRET: zod_1.default.string(),
});
exports.env = envSchema.parse(process.env);
