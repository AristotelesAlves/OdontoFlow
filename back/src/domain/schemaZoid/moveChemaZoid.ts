import { z } from "zod";


export const createMoveSchema = z.object({
    destino: z.string(),
    tipo: z.enum(['entrada', 'saida', 'uso']), 
    id_clinica: z.number(), 
    id_usuario: z.number(), 
    produto_movimentaao: z.array(z.object({
        id: z.number(), 
        quantidade: z.number().positive(), 
    })),
});


export const findAllMoveSchema = z.object({
    page: z.string(), 
    limit: z.string(), 
});
