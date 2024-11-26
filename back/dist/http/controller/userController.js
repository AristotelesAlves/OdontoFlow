"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userChemaZoid_1 = require("../../domain/schemaZoid/userChemaZoid");
const userService_1 = require("../../service/userService");
const zod_1 = require("zod");
const prisma_1 = require("../../config/prisma");
const crypt_1 = require("../../utils/crypt");
class UserController {
    constructor(memoryUser) {
        this.memoryUser = memoryUser;
    }
    async login(req, reply) {
        try {
            const { email, senha } = userChemaZoid_1.loginSchema.parse(req.body);
            const result = await new userService_1.UserService(this.memoryUser).login(email, senha);
            if (result.statusCode !== 200) {
                return reply.status(result.statusCode).send(result.message || result.data);
            }
            else {
                return reply.status(201).send(result.data);
            }
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return reply.status(400).send({
                    message: "Invalid request body for login",
                    errors: error.errors
                });
            }
            console.error("Login error:", error);
            return reply.status(500).send({ message: "Internal Server Error" });
        }
    }
    async register(req, reply) {
        try {
            const { cpf, email, nome, senha, adm } = userChemaZoid_1.registerSchema.parse(req.body);
            const result = await new userService_1.UserService(this.memoryUser).register({
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
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return reply.status(400).send({
                    message: "Invalid request body for registration",
                    errors: error.errors
                });
            }
            console.error("Registration error:", error);
            return reply.status(500).send({ message: "Internal Server Error" });
        }
    }
    async listUser(req, reply) {
        try {
            const service = await new userService_1.UserService(this.memoryUser);
            const result = await service.findAll();
            if (result.statusCode !== 200) {
                return reply.status(result.statusCode).send({ message: result.message });
            }
            return reply.status(200).send(result.data);
        }
        catch (error) {
            console.error("Error listing users:", error);
            return reply.status(500).send({ message: "Internal Server Error" });
        }
    }
    async authVerify(req, reply) {
        try {
            const { token } = userChemaZoid_1.tokenJwtSchema.parse(req.body);
            const service = new userService_1.UserService(this.memoryUser);
            const result = await service.authVerify(token);
            if (result.statusCode !== 200) {
                return reply.status(result.statusCode).send(result.message);
            }
            else {
                return reply.status(200).send(result.message);
            }
        }
        catch (error) {
            return reply.status(400).send({ message: "Invalid request" });
        }
    }
    async active(req, reply) {
        const { id, status } = req.query;
        const newStatus = status == 'true' ? true : false;
        const user = await prisma_1.prisma.usuario.update({
            where: { id: Number(id) },
            data: {
                status: newStatus
            }
        });
        return user;
    }
    async update(req, reply) {
        const data = req.body;
        console.log(data);
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
            const hash = await (0, crypt_1.generateHash)(data.senha);
            console.log({
                hash: hash,
                senha: data.senha
            });
            Object.assign(userDateUpdate, { senha: hash });
        }
        const service = await prisma_1.prisma.usuario.update({
            where: {
                id: data.id
            },
            data: userDateUpdate
        });
        if (service) {
            return 'ok';
        }
        return 'error';
    }
}
exports.UserController = UserController;
