"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = exports.generateAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET_TOKEN;
// Generate a token
const generateAuthToken = (user) => {
    const payload = {
        userId: user.userId,
        role: user.role,
    };
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: "1y" });
};
exports.generateAuthToken = generateAuthToken;
// Verify the token
const verifyAuthToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET, { algorithms: ["HS256"] });
        return decoded;
    }
    catch (error) {
        throw new Error("Invalid token");
    }
};
exports.verifyAuthToken = verifyAuthToken;
