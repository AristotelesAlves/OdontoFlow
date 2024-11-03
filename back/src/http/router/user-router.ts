import { FastifyReply, FastifyRequest } from "fastify";
import { app } from "../../app";
import { UserController } from "../controller/userController";
import { UserInMemoryRepository } from "../../repositories/in-memory/memory-user";
import authMiddleware from "../middleware/auth-middleware";

const controller = new UserController(new UserInMemoryRepository);

export async function userRouter() {
    app.post('/login', (req: FastifyRequest, reply: FastifyReply) => controller.login(req, reply));
    app.post('/auth/verify', (req: FastifyRequest, reply: FastifyReply) => controller.authVerify(req, reply));
    app.post('/register', { preHandler: authMiddleware },(req: FastifyRequest, reply: FastifyReply) => controller.register(req, reply));
    app.get('/users', { preHandler: authMiddleware }, (req: FastifyRequest, reply: FastifyReply) => controller.listUser(req, reply));
}


