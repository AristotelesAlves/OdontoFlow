import { FastifyReply, FastifyRequest } from "fastify";
import { app } from "../../app";
import { loginSchema, registerSchema } from "../../utils/schemaZoid/userChemaZoid";
import { UserService } from "../../service/userService";
import { UserInMemoryRepository } from "../../repositories/in-memory/memory-user";
import { z } from "zod";

export class UserController{

    private memory = new UserInMemoryRepository()

    async login(){
        app.post('/login', async (req: FastifyRequest, reply: FastifyReply) => {
                try {
                    const { email, password } = loginSchema.parse(req.body);
                    const service =  new UserService(this.memory);
                    const result =  await service.login(email, password);

                    if (result) {
                        if(result.statusCode == 200){
                            return reply.status(200).send(result.data);
                        } else {
                            return reply.status(result.statusCode).send(result.message)
                        }
                    } else {
                        return reply.status(401).send({ message: "Invalid credentials" });
                    }
                } catch (error) {
                    if (error instanceof z.ZodError) {
                        return reply.status(400).send({
                            message: "Invalid request body for login",
                            errors: error.errors
                        });
                    }
                    console.error("Login error:", error);
                    return reply.status(500).send({ message: "Internal Server Error" });
                }
                
            })
        }

    async register(){
        app.post('/register', async (req: FastifyRequest, reply: FastifyReply) => {
            try {
                const { cpf, email, nome, senha } = registerSchema.parse(req.body);
                const registerUseCase =  new UserService(this.memory);
                const result = await registerUseCase.register({
                    cpf,
                    dt_atualizado: new Date(),
                    dt_deletado: null,
                    email,
                    nome_usuario: nome,
                    senha,
                    status: true
                });
                if (result) {
                    if(result.statusCode == 200){
                        return reply.status(200).send(result.data);
                    } else {
                        return reply.status(result.statusCode).send(result.message)
                    }
                } else {
                    return reply.status(401).send({ message: "Invalid credentials" });
                }
            } catch (error) {
                if (error instanceof z.ZodError) {
                    return reply.status(400).send({
                        message: "Invalid request body for login",
                        errors: error.errors
                    });
                }
                console.error("Login error:", error);
                return reply.status(500).send({ message: "Internal Server Error" });
            }

        })
    }

}