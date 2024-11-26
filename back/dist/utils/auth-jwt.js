"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
const env_1 = require("../config/env");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateToken(id) {
    const playLoad = { id };
    const options = { expiresIn: '1h' };
    return jsonwebtoken_1.default.sign(playLoad, env_1.env.SECRET_KEY_JWT, options);
}
function verifyToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, env_1.env.SECRET_KEY_JWT);
    }
    catch (error) {
        return false;
    }
}
;
