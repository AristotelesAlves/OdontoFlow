import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { date, z } from "zod";
import { userRepositoryMemory } from "../../repository/in-memory/memory-user";
import { generateHash } from "../../utils/crypt";
import { userInterface } from "../../interface/user-interface";

const registerSchema = z.object({
    nome_usuario: z.string(),
    cpf: z.string(),
    email: z.string().email(),
    senha: z.string().min(8).max(16)
})

export default async function registerUser(app: FastifyInstance){
    app.post('/register', async (req: FastifyRequest, reply: FastifyReply) => {
        try {
            const { nome_usuario, cpf, email, senha } = registerSchema.parse(req.body)

            const userByEmail = await userRepositoryMemory.findByEmail(email)
            const userByCpf = await userRepositoryMemory.findByCpf(cpf)

            if(userByEmail) {
                return reply.status(400).send({nessage: "Email already in use"})
            }

            if(userByCpf) {
                return reply.status(400).send({nessage: "CPF already in use"})
            }

            const hash = await generateHash(senha)

            const newUser: userInterface = {
                status: true,
                nome_usuario,
                email,
                senha: hash,
                cpf,
                dt_deletado: null,
                dt_atualizado: new Date()
            }

            await userRepositoryMemory.save(newUser) 

            const result = await userRepositoryMemory.findAll();

            return reply.status(201).send({
                message: "User registered successfully",
            })
        } catch (error) {
            if(error instanceof z.ZodError){
                return reply.status(400).send({
                    message: "Invalid request body for register",
                    errors: error.errors
                })
            }

            console.error("Error fetching login of user", error);
            return reply.status(500).send({
                message: "Internal Server Error",
            })
        }

    })
}