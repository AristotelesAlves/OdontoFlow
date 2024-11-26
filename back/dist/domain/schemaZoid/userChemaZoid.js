"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = exports.tokenJwtSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    senha: zod_1.z.string().min(8).max(16)
});
exports.tokenJwtSchema = zod_1.z.object({
    token: zod_1.z.string()
});
exports.registerSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    senha: zod_1.z.string().min(8).max(16),
    cpf: zod_1.z.string().min(12).max(12),
    nome: zod_1.z.string(),
    adm: zod_1.z.boolean()
});
