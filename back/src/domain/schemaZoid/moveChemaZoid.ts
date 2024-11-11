import { z } from "zod"

export const newMoveZod = z.object({
    type: z.string(),
    userId: z.number(),
    id_clinica : z.number(),
    destino: z.string(),
    dt_movimentacao: z.string(),  
    produto_movimentaao: z.object({
        id: z.number(),
        quantidade: z.number()
    }).array()
})
