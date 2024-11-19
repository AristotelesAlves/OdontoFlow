import { z } from "zod";

export const createdProductChema = z.object({
    id: z.number().optional(),
    nome: z.string(),
    preco: z.number(),
    qt_compra: z.number(),
    descricao: z.string(),
    data_validade: z.date().or(z.string()),
    fornecedor: z.string(),
    qt_estoque: z.number(),
    qt_minima: z.number(),
    unidade_medida: z.string().max(4),
    nome_categoria: z.string(),
    nome_marca: z.string(),
    id_usuario_atualizacao: z.number(),
    id_usuario_cadastro: z.number(),
    id_clinica: z.number(),
});

export const findAllProduct = z.object({
    page: z.string(),
    limit: z.string()
})

