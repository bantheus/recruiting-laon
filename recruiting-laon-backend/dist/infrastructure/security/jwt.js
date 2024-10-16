"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../env");
function generateToken(userId) {
    return jsonwebtoken_1.default.sign({ userId }, env_1.env.JWT_SECRET, { expiresIn: "1h" });
}
