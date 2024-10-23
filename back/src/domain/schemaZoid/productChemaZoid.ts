import { z } from "zod";

export const createdProductChema = z.object({
    nome: z.string(),
    descricao: z.string(),
    dt_validade: z.date(),
    unidade_medida: z.string().max(4),
    id_categoria: z.number().optional(),
    nome_categoria: z.string().optional(),
    id_marca: z.number().optional(),
    nome_marca: z.string().optional(),
    id_usuario_atualizacao: z.number(),
    id_usuario_cadastro: z.number(),
    id_clinica: z.number(),
});