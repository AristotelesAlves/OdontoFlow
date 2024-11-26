"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllProduct = exports.createdProductChema = void 0;
const zod_1 = require("zod");
exports.createdProductChema = zod_1.z.object({
    id: zod_1.z.number().optional(),
    nome: zod_1.z.string(),
    preco: zod_1.z.number(),
    qt_compra: zod_1.z.number(),
    descricao: zod_1.z.string(),
    data_validade: zod_1.z.date().or(zod_1.z.string()),
    fornecedor: zod_1.z.string(),
    qt_estoque: zod_1.z.number(),
    qt_minima: zod_1.z.number(),
    unidade_medida: zod_1.z.string().max(4),
    nome_categoria: zod_1.z.string(),
    nome_marca: zod_1.z.string(),
    id_usuario_atualizacao: zod_1.z.number(),
    id_usuario_cadastro: zod_1.z.number(),
    id_clinica: zod_1.z.number(),
});
exports.findAllProduct = zod_1.z.object({
    page: zod_1.z.string(),
    limit: zod_1.z.string()
});
