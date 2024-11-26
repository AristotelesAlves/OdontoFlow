"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPrismaMemory = void 0;
const prisma_1 = require("../../config/prisma");
class userPrismaMemory {
    async findAll() {
        const users = await prisma_1.prisma.usuario.findMany();
        const usersWithoutPassword = users.map(({ senha, ...user }) => user);
        return usersWithoutPassword;
    }
    async findByEmail(email) {
        const user = await prisma_1.prisma.usuario.findUnique({
            where: {
                email
            }
        });
        return user;
    }
    async findByCpf(cpf) {
        const user = await prisma_1.prisma.usuario.findUnique({
            where: {
                cpf
            }
        });
        return user;
    }
    async save(userData) {
        const user = await prisma_1.prisma.usuario.create({
            data: userData
        });
        const { senha, ...newUser } = user;
        return newUser;
    }
}
exports.userPrismaMemory = userPrismaMemory;
