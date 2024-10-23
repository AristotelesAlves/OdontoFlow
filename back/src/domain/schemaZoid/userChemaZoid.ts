import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    senha: z.string().min(8).max(16)
})

export const tokenJwtSchema = z.object({
    token: z.string()
})

export const registerSchema = z.object({
    email: z.string().email(),
    senha: z.string().min(8).max(16),
    cpf: z.string().min(12).max(12),
    nome: z.string()
})