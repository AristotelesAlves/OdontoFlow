"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHash = generateHash;
exports.verifyHash = verifyHash;
const bcrypt_1 = __importDefault(require("bcrypt"));
async function generateHash(password) {
    const salt = 10;
    const hash = await bcrypt_1.default.hash(password, salt);
    return hash;
}
async function verifyHash(password, hash) {
    const match = await bcrypt_1.default.compare(password, hash);
    return match;
}
