import { aw } from "vitest/dist/chunks/reporters.WnPwkmgA";
import { UserRepositoryInterface } from "../../domain/repository/UserRepositoryInterface";
import { loginSchema, registerSchema, tokenJwtSchema } from "../../domain/schemaZoid/userChemaZoid";
import { UserService } from "../../service/userService";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../config/prisma";
import { generateHash } from "../../utils/crypt";

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
            const { cpf, email, nome, senha, adm } = registerSchema.parse(req.body);
            const result = await new UserService(this.memoryUser).register({
                cpf,
                id_clinica: 1,
                dt_atualizado: new Date(),
                dt_deletado: null,
                email,
                nome_usuario: nome,
                senha,
                status: true,
                adm,
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

    async active(req: FastifyRequest, reply: FastifyReply){
        const { id, status } = req.query as { id: number, status: string };
        const newStatus = status == 'true' ? true : false
        const user = await prisma.usuario.update({
            where: {id: Number(id)},
            data: {
                status: newStatus
            }
        })

        return user
    }

    async update(req: FastifyRequest, reply: FastifyReply) {
    
        const data = req.body as {
            adm?: boolean;
            cpf: string;
            email: string;
            senha?: string; // Opcional
            status: boolean;
            nome_usuario: string;
            id: number;
        };

        console.log(data)
    
        // // Copia os dados da requisição, exceto pela senha
        const userDateUpdate = {
            adm: data.adm,
            cpf: data.cpf,
            email: data.email,
            status: data.status,
            nome_usuario: data.nome_usuario,
            id: data.id,
        };
    
        
        // // Atualiza a senha somente se ela for enviada e não estiver vazia
        if (data.senha && data.senha.trim().length > 0) {
            const hash = await generateHash(data.senha)
            console.log({
                hash: hash,
                senha: data.senha
            })
            Object.assign(userDateUpdate, { senha: hash });
        }
    
        const service = await prisma.usuario.update({
            where :{
                id: data.id
            },
            data: userDateUpdate
        })

        if(service){
            return 'ok'
        }
        return 'error'
    }
    
}
