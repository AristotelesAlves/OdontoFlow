import { UserRepositoryInterface } from "../../domain/repository/UserRepositoryInterface";
import { loginSchema, registerSchema, tokenJwtSchema } from "../../domain/schemaZoid/userChemaZoid";
import { UserService } from "../../service/userService";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class UserController {

    constructor (
        private memoryUser:UserRepositoryInterface
    ) {}

    async login(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { email, senha } = loginSchema.parse(req.body);

            const result = await new UserService(this.memoryUser).login(email, senha);

            if (result.statusCode !== 200) {
                return reply.status(result.statusCode).send(result.message || result.data);
            } else {
                return reply.status(201).send(result.data);
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
    }

    async register(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { cpf, email, nome, senha } = registerSchema.parse(req.body);
            const result = await new UserService(this.memoryUser).register({
                cpf,
                id_clinica: 1,
                dt_atualizado: new Date(),
                dt_deletado: null,
                email,
                nome_usuario: nome,
                senha,
                status: true
            });
            return reply.status(result.statusCode).send(result.message || result.data);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return reply.status(400).send({
                    message: "Invalid request body for registration",
                    errors: error.errors
                });
            }
            console.error("Registration error:", error);
            return reply.status(500).send({ message: "Internal Server Error" });
        }
    }

    async listUser(req: FastifyRequest, reply: FastifyReply) {
        try {
    
            const service = await new UserService(this.memoryUser);
            const result = await service.findAll();
            
            if (result.statusCode !== 200) {
                return reply.status(result.statusCode).send({ message: result.message });
            }
    
            return reply.status(200).send(result.data);
        } catch (error) {
            console.error("Error listing users:", error);
            return reply.status(500).send({ message: "Internal Server Error" });
        }
    }

    async authVerify(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { token } = tokenJwtSchema.parse(req.body);
            const service = new UserService(this.memoryUser);
            const result = await service.authVerify(token); 
    
            if (result.statusCode !== 200) {
                return reply.status(result.statusCode).send(result.message);
            } else {
                return reply.status(200).send(result.message);
            }
        } catch (error) {
            return reply.status(400).send({ message: "Invalid request" });
        }
    }
    
}
