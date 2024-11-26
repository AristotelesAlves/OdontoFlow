import { FastifyReply, FastifyRequest } from "fastify";
import { app } from "../../app";
import { UserController } from "../controller/userController";
import authMiddleware from "../middleware/auth-middleware";

import { userPrismaMemory } from "../../repositories/prisma/user-prisma";

const controller = new UserController(new userPrismaMemory);

export async function userRouter() {
    app.post('/login', (req: FastifyRequest, reply: FastifyReply) => controller.login(req, reply));
    app.post('/auth/verify', (req: FastifyRequest, reply: FastifyReply) => controller.authVerify(req, reply));
    app.post('/register',(req: FastifyRequest, reply: FastifyReply) => controller.register(req, reply));
    app.get('/users', (req: FastifyRequest, reply: FastifyReply) => controller.listUser(req, reply));
    app.put('/user', (req: FastifyRequest, reply: FastifyReply) => controller.active(req, reply));
    app.put('/user/update', (req: FastifyRequest, reply: FastifyReply) => controller.update(req, reply));


}


