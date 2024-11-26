"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = userRouter;
const app_1 = require("../../app");
const userController_1 = require("../controller/userController");
const user_prisma_1 = require("../../repositories/prisma/user-prisma");
const controller = new userController_1.UserController(new user_prisma_1.userPrismaMemory);
async function userRouter() {
    app_1.app.post('/login', (req, reply) => controller.login(req, reply));
    app_1.app.post('/auth/verify', (req, reply) => controller.authVerify(req, reply));
    app_1.app.post('/register', (req, reply) => controller.register(req, reply));
    app_1.app.get('/users', (req, reply) => controller.listUser(req, reply));
    app_1.app.put('/user', (req, reply) => controller.active(req, reply));
    app_1.app.put('/user/update', (req, reply) => controller.update(req, reply));
}
