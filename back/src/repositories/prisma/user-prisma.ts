
import { prisma  } from '../../config/prisma'
import { userInterface } from '../../domain/interface/userInterface';
import { UserRepositoryInterface } from '../../domain/repository/UserRepositoryInterface';

export class userPrismaMemory implements UserRepositoryInterface {
    async findAll() {
        const users = await prisma.usuario.findMany();
        const usersWithoutPassword = users.map(({ senha, ...user }) => user);
        return usersWithoutPassword;
    }

    async findByEmail(email: string){
        const user = await prisma.usuario.findUnique({
            where: {
                email
            }
        })
        return user
    }

    async findByCpf(cpf: string){
        const user = await prisma.usuario.findUnique({
            where: {
                cpf
            }
        })
        return user
    }

    async save(userData: Omit<userInterface, 'id'>) {
        const user = await prisma.usuario.create({
            data: userData
        });
        const {senha, ...newUser} = user
        return newUser;
    }
    
}